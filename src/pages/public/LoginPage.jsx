import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const C = {
  brand:       '#1B3A5C',
  brandHover:  '#16304D',
  brandLight:  '#E8F0F7',
  accent:      '#2A7F62',
  sand:        '#8C8880',
  sandBorder:  '#E8E6E0',
  bg:          '#F5F3EE',
  white:       '#FFFFFF',
  alert:       '#C8601A',
  alertLight:  '#FBF0E8',
}

export default function LoginPage() {
  const { user, role, loading } = useAuth()
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [error, setError]           = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [hovered, setHovered]       = useState(false)
  const navigate = useNavigate()

  if (!loading && user) {
    return <Navigate to={role === 'admin' ? '/admin' : '/cliente'} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError('Correo o contraseña incorrectos.')
      setSubmitting(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    navigate(profile?.role === 'admin' ? '/admin' : '/cliente', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: C.bg }}>
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-base"
              style={{ backgroundColor: C.accent }}>H</span>
            <span className="font-semibold text-xl tracking-tight" style={{ color: C.brand }}>
              Habilidad <span style={{ color: C.sand, fontWeight: 400 }}>Chile</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-sm"
          style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
          <h1 className="text-xl font-semibold mb-1" style={{ color: C.brand }}>Iniciar sesión</h1>
          <p className="text-sm mb-6" style={{ color: C.sand }}>
            Accede a tu portal de administración o condominio.
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 text-sm rounded-xl px-4 py-3 mb-5"
              style={{ backgroundColor: C.alertLight, color: C.alert, border: `1px solid #F7D4B8` }}>
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" htmlFor="email" style={{ color: C.brand }}>
                Correo electrónico
              </label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.cl"
                style={{
                  border: `1px solid ${C.sandBorder}`, borderRadius: '0.5rem',
                  padding: '0.625rem 0.75rem', fontSize: '0.875rem',
                  color: C.brand, backgroundColor: C.white, outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = C.brand}
                onBlur={e  => e.target.style.borderColor = C.sandBorder}
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" htmlFor="password" style={{ color: C.brand }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password" type={showPass ? 'text' : 'password'} required autoComplete="current-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', border: `1px solid ${C.sandBorder}`, borderRadius: '0.5rem',
                    padding: '0.625rem 2.5rem 0.625rem 0.75rem', fontSize: '0.875rem',
                    color: C.brand, backgroundColor: C.white, outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = C.brand}
                  onBlur={e  => e.target.style.borderColor = C.sandBorder}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: C.sand, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={submitting || loading}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-xl transition-all disabled:opacity-60"
              style={{
                backgroundColor: hovered && !submitting ? C.brandHover : C.brand,
                color: C.white,
                padding: '0.75rem 1.25rem',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                width: '100%',
                fontSize: '0.9375rem',
                letterSpacing: '0.01em',
              }}>
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Ingresar
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: C.sand }}>
          ¿Necesitas acceso?{' '}
          <a href="/#contacto" style={{ color: C.brand }}>Contáctanos</a>
        </p>
      </div>
    </div>
  )
}
