import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const C = {
  bg: '#F5F3EE', white: '#FFFFFF', brand: '#1B3A5C', brandLight: '#E8F0F7',
  accent: '#2A7F62', accentLight: '#E6F5F1', sand: '#8C8880', sandBorder: '#E8E6E0',
  alert: '#C8601A', alertLight: '#FBF0E8',
}

function Dato({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide" style={{ color: C.sand }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: C.brand }}>{value || '—'}</span>
    </div>
  )
}

export default function UsuarioDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [profile, setProfile]       = useState(null)
  const [condominio, setCondominio] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting]     = useState(false)

  useEffect(() => {
    Promise.all([
      supabase.from('profiles').select('*').eq('id', id).single(),
      supabase.from('condominio_usuarios').select('condominios(id, nombre)').eq('user_id', id).limit(1).single(),
    ]).then(([{ data: prof, error: e1 }, { data: cu }]) => {
      if (e1 || !prof) { setError('Usuario no encontrado.'); setLoading(false); return }
      setProfile(prof)
      setCondominio(cu?.condominios ?? null)
      setLoading(false)
    })
  }, [id])

  async function handleDelete() {
    setDeleting(true)
    const { error } = await supabase.rpc('eliminar_usuario_cliente', { p_user_id: id })
    if (error) { alert('Error al eliminar: ' + error.message); setDeleting(false); return }
    navigate('/admin/usuarios', { replace: true })
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: C.brand, borderTopColor: 'transparent' }} />
    </div>
  )

  if (error || !profile) return (
    <div className="text-center py-20">
      <p className="text-sm mb-3" style={{ color: C.alert }}>{error}</p>
      <Link to="/admin/usuarios" className="text-sm font-medium" style={{ color: C.brand }}>← Volver</Link>
    </div>
  )

  const initials = (profile.full_name ?? profile.email ?? '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: C.sand }}>
        <Link to="/admin/usuarios" style={{ color: C.sand }}>Usuarios</Link>
        <span>/</span>
        <span style={{ color: C.brand }}>{profile.full_name || profile.email}</span>
      </div>

      {/* Header */}
      <div className="rounded-2xl p-6 mb-5"
        style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
              style={{ backgroundColor: C.brand }}>
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: C.brand }}>{profile.full_name || '—'}</h1>
              <p className="text-sm mt-0.5" style={{ color: C.sand }}>{profile.email}</p>
            </div>
          </div>
          <Link to={`/admin/usuarios/${id}/editar`}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg"
            style={{ backgroundColor: C.brandLight, color: C.brand }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </Link>
        </div>
      </div>

      {/* Datos */}
      <div className="rounded-2xl p-6 mb-5"
        style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
        <h2 className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: C.sand }}>
          Información
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <Dato label="Nombre"     value={profile.full_name} />
          <Dato label="Correo"     value={profile.email} />
          <Dato label="Teléfono"   value={profile.phone} />
          <Dato label="Condominio" value={condominio?.nombre} />
          <Dato label="Unidad"     value={profile.unidad} />
          <Dato label="Registrado" value={new Date(profile.created_at).toLocaleDateString('es-CL')} />
        </div>
      </div>

      {/* Zona de peligro */}
      <div className="rounded-2xl p-6"
        style={{ border: '1px solid #F7D4B8', backgroundColor: C.alertLight }}>
        <h2 className="text-sm font-semibold mb-1" style={{ color: C.alert }}>Zona de peligro</h2>
        <p className="text-xs mb-4" style={{ color: C.alert }}>
          Eliminar el usuario revoca su acceso al portal inmediatamente. Esta acción no se puede deshacer.
        </p>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)}
            className="text-sm font-medium px-4 py-2 rounded-lg"
            style={{ backgroundColor: C.alert, color: 'white' }}>
            Eliminar usuario
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={handleDelete} disabled={deleting}
              className="text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-60"
              style={{ backgroundColor: C.alert, color: 'white' }}>
              {deleting ? 'Eliminando...' : 'Confirmar eliminación'}
            </button>
            <button onClick={() => setConfirmDelete(false)}
              className="text-sm font-medium px-4 py-2 rounded-lg"
              style={{ backgroundColor: C.white, color: C.brand, border: `1px solid ${C.sandBorder}` }}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
