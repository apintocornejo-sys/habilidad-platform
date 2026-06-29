import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const C = {
  bg: '#F5F3EE', white: '#FFFFFF', brand: '#1B3A5C', brandLight: '#E8F0F7',
  accent: '#2A7F62', accentLight: '#E6F5F1', sand: '#8C8880', sandBorder: '#E8E6E0',
  alert: '#C8601A', alertLight: '#FBF0E8',
}

const inputCls = 'w-full px-3 py-2.5 text-sm rounded-lg outline-none'
const inputStyle = err => ({
  border: `1px solid ${err ? C.alert : C.sandBorder}`,
  backgroundColor: C.white, color: C.brand,
})

function Field({ label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: C.brand }}>
        {label}{required && <span style={{ color: C.alert }}> *</span>}
      </label>
      {children}
      {hint  && <p className="text-xs" style={{ color: C.sand }}>{hint}</p>}
      {error && <p className="text-xs" style={{ color: C.alert }}>{error}</p>}
    </div>
  )
}

const initial = { full_name: '', email: '', password: '', phone: '', condominio_id: '', unidad: '' }

export default function UsuarioForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm]         = useState(initial)
  const [errors, setErrors]     = useState({})
  const [saving, setSaving]     = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [loading, setLoading]   = useState(esEdicion)
  const [condominios, setCondominios] = useState([])
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    supabase.from('condominios').select('id, nombre').eq('activo', true).order('nombre')
      .then(({ data }) => setCondominios(data ?? []))
  }, [])

  useEffect(() => {
    if (!esEdicion) return
    Promise.all([
      supabase.from('profiles').select('full_name, email, phone, unidad').eq('id', id).single(),
      supabase.from('condominio_usuarios').select('condominio_id').eq('user_id', id).limit(1).single(),
    ]).then(([{ data: prof }, { data: cu }]) => {
      if (!prof) return navigate('/admin/usuarios', { replace: true })
      setForm({
        full_name:     prof.full_name    ?? '',
        email:         prof.email        ?? '',
        password:      '',
        phone:         prof.phone        ?? '',
        condominio_id: cu?.condominio_id ?? '',
        unidad:        prof.unidad       ?? '',
      })
      setLoading(false)
    })
  }, [id])

  function handle(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(e => ({ ...e, [name]: null }))
  }

  function validate() {
    const e = {}
    if (!form.full_name.trim()) e.full_name = 'El nombre es obligatorio.'
    if (!esEdicion) {
      if (!form.email.trim()) e.email = 'El correo es obligatorio.'
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correo inválido.'
      if (!form.password) e.password = 'La contraseña es obligatoria.'
      else if (form.password.length < 8) e.password = 'Mínimo 8 caracteres.'
    }
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true); setSaveError(null)

    if (!esEdicion) {
      // Crear via RPC
      const { error } = await supabase.rpc('crear_usuario_cliente', {
        p_email:          form.email.trim(),
        p_password:       form.password,
        p_full_name:      form.full_name.trim(),
        p_phone:          form.phone.trim() || null,
        p_condominio_id:  form.condominio_id || null,
        p_unidad:         form.unidad.trim() || null,
      })
      if (error) { setSaveError(error.message); setSaving(false); return }
    } else {
      // Editar solo profile + condominio (no email/password)
      const { error: pe } = await supabase.from('profiles').update({
        full_name: form.full_name.trim(),
        phone:     form.phone.trim() || null,
        unidad:    form.unidad.trim() || null,
      }).eq('id', id)

      if (pe) { setSaveError(pe.message); setSaving(false); return }

      // Actualizar vínculo de condominio
      await supabase.from('condominio_usuarios').delete().eq('user_id', id)
      if (form.condominio_id) {
        await supabase.from('condominio_usuarios').insert({ condominio_id: form.condominio_id, user_id: id })
      }
    }

    navigate('/admin/usuarios')
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: C.brand, borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: C.sand }}>
        <Link to="/admin/usuarios" style={{ color: C.sand }}>Usuarios</Link>
        <span>/</span>
        <span style={{ color: C.brand }}>{esEdicion ? 'Editar usuario' : 'Nuevo usuario'}</span>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: C.brand }}>
        {esEdicion ? 'Editar usuario' : 'Nuevo usuario cliente'}
      </h1>

      {saveError && (
        <div className="rounded-xl px-4 py-3 text-sm mb-5"
          style={{ backgroundColor: C.alertLight, color: C.alert, border: '1px solid #F7D4B8' }}>
          {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Datos personales */}
        <div className="rounded-2xl p-6 mb-5"
          style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
          <h2 className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: C.sand }}>
            Datos personales
          </h2>
          <div className="flex flex-col gap-4">
            <Field label="Nombre completo" required error={errors.full_name}>
              <input name="full_name" type="text" value={form.full_name} onChange={handle}
                placeholder="Ej: Juan Pérez Soto"
                className={inputCls} style={inputStyle(errors.full_name)} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Correo electrónico" required={!esEdicion} error={errors.email}
                hint={esEdicion ? 'El correo no puede modificarse.' : null}>
                <input name="email" type="email" value={form.email} onChange={handle}
                  placeholder="juan@ejemplo.cl" disabled={esEdicion}
                  className={inputCls}
                  style={{ ...inputStyle(errors.email), opacity: esEdicion ? 0.6 : 1 }} />
              </Field>

              <Field label="Teléfono" error={errors.phone}>
                <input name="phone" type="tel" value={form.phone} onChange={handle}
                  placeholder="+56 9 1234 5678"
                  className={inputCls} style={inputStyle(false)} />
              </Field>
            </div>

            {!esEdicion && (
              <Field label="Contraseña temporal" required error={errors.password}
                hint="El cliente podrá cambiarla después desde su perfil.">
                <div className="relative">
                  <input name="password" type={showPass ? 'text' : 'password'}
                    value={form.password} onChange={handle}
                    placeholder="Mínimo 8 caracteres"
                    className={inputCls}
                    style={{ ...inputStyle(errors.password), paddingRight: '2.5rem' }} />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: C.sand, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPass
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                      }
                    </svg>
                  </button>
                </div>
              </Field>
            )}
          </div>
        </div>

        {/* Condominio */}
        <div className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
          <h2 className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: C.sand }}>
            Asignación
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Condominio" error={errors.condominio_id}>
              <select name="condominio_id" value={form.condominio_id} onChange={handle}
                className={inputCls} style={inputStyle(false)}>
                <option value="">Sin condominio asignado</option>
                {condominios.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </Field>

            <Field label="Unidad / departamento" error={errors.unidad}>
              <input name="unidad" type="text" value={form.unidad} onChange={handle}
                placeholder="Ej: 401-A"
                className={inputCls} style={inputStyle(false)} />
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl disabled:opacity-60"
            style={{ backgroundColor: C.brand, color: 'white' }}>
            {saving ? (
              <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Guardando...</>
            ) : esEdicion ? 'Guardar cambios' : 'Crear usuario'}
          </button>
          <Link to="/admin/usuarios" className="text-sm font-medium px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: C.bg, color: C.brand }}>Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
