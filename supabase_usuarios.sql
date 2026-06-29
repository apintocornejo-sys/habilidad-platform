-- Habilitar pgcrypto si no está activo
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Agregar columnas a profiles si no existen
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS unidad text;

-- Actualizar trigger para guardar email al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'cliente'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  RETURN NEW;
END;
$$;

-- RPC: crear usuario cliente desde el browser (sin supabase.auth.admin)
CREATE OR REPLACE FUNCTION public.crear_usuario_cliente(
  p_email      text,
  p_password   text,
  p_full_name  text,
  p_phone      text    DEFAULT NULL,
  p_condominio_id uuid DEFAULT NULL,
  p_unidad     text    DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id   uuid;
  v_enc_pass  text;
BEGIN
  -- Solo admins pueden ejecutar esta función
  IF (SELECT role FROM public.profiles WHERE id = auth.uid()) <> 'admin' THEN
    RAISE EXCEPTION 'Acceso denegado';
  END IF;

  -- Verificar que el email no esté en uso
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = p_email) THEN
    RAISE EXCEPTION 'El correo % ya está registrado', p_email;
  END IF;

  v_user_id  := gen_random_uuid();
  v_enc_pass := crypt(p_password, gen_salt('bf'));

  -- Crear usuario en auth.users
  INSERT INTO auth.users (
    id, aud, role, email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at, updated_at,
    is_super_admin, confirmation_token
  ) VALUES (
    v_user_id, 'authenticated', 'authenticated', p_email,
    v_enc_pass,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('full_name', p_full_name, 'role', 'cliente'),
    now(), now(),
    false, ''
  );

  -- Crear identidad para login email/password
  INSERT INTO auth.identities (
    id, user_id, provider_id, provider,
    identity_data, last_sign_in_at, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), v_user_id, p_email, 'email',
    jsonb_build_object('sub', v_user_id::text, 'email', p_email),
    now(), now(), now()
  );

  -- Crear / actualizar perfil
  INSERT INTO public.profiles (id, role, full_name, phone, email, unidad)
  VALUES (v_user_id, 'cliente', p_full_name, p_phone, p_email, p_unidad)
  ON CONFLICT (id) DO UPDATE SET
    role      = 'cliente',
    full_name = p_full_name,
    phone     = p_phone,
    email     = p_email,
    unidad    = p_unidad;

  -- Vincular a condominio
  IF p_condominio_id IS NOT NULL THEN
    INSERT INTO public.condominio_usuarios (condominio_id, user_id)
    VALUES (p_condominio_id, v_user_id)
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN v_user_id;
END;
$$;

-- RPC: eliminar usuario cliente
CREATE OR REPLACE FUNCTION public.eliminar_usuario_cliente(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (SELECT role FROM public.profiles WHERE id = auth.uid()) <> 'admin' THEN
    RAISE EXCEPTION 'Acceso denegado';
  END IF;
  -- No permitir eliminar al propio admin
  IF p_user_id = auth.uid() THEN
    RAISE EXCEPTION 'No puedes eliminarte a ti mismo';
  END IF;
  DELETE FROM auth.users WHERE id = p_user_id;
END;
$$;

-- Permisos de ejecución
GRANT EXECUTE ON FUNCTION public.crear_usuario_cliente TO authenticated;
GRANT EXECUTE ON FUNCTION public.eliminar_usuario_cliente TO authenticated;
