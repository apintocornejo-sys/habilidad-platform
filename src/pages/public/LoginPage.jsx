import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { user, role, loading } = useAuth()
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [error, setError]           = useState('')
  const [submitting, setSubmitting] = useState(false)
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
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-lg bg-accent-600 flex items-center justify-center font-bold text-white">H</span>
            <span className="font-semibold text-xl text-brand-600 tracking-tight">
              Habilidad <span className="font-normal text-sand-600">Chile</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-8">
          <h1 className="text-xl font-semibold text-brand-600 mb-1">Iniciar sesión</h1>
          <p className="text-sm text-sand-600 mb-6">Accede a tu portal de administración o condominio.</p>

          {error && (
            <div className="flex items-start gap-2 bg-alert-50 border border-alert-100 text-alert-800 text-sm rounded-lg px-4 py-3 mb-5">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-brand-600" htmlFor="email">Correo electrónico</label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.cl"
                className="border border-sand-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 placeholder:text-sand-400 bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-brand-600" htmlFor="password">Contraseña</label>
              <div className="relative">
                <input
                  id="password" type={showPass ? 'text' : 'password'} required autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-sand-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 placeholder:text-sand-400 bg-white"
                />
                <button
                  type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 hover:text-sand-600"
                  aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={submitting || loading}
              className="mt-2 bg-brand-600 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-sand-600 mt-6">
          ¿Necesitas acceso?{' '}
          <a href="/#contacto" className="text-brand-600 hover:underline">Contáctanos</a>
        </p>
      </div>
    </div>
  )
}
