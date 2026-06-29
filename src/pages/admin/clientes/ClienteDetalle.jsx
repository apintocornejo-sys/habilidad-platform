import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const COLORS = {
  bg: '#F5F3EE',
  white: '#FFFFFF',
  brand: '#1B3A5C',
  brandLight: '#E8F0F7',
  accent: '#2A7F62',
  accentLight: '#E6F5F1',
  sand: '#8C8880',
  sandBorder: '#E8E6E0',
  alert: '#C8601A',
  alertLight: '#FBF0E8',
}

function Dato({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide" style={{ color: COLORS.sand }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: COLORS.brand }}>{value || '—'}</span>
    </div>
  )
}

export default function ClienteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [condominio, setCondominio] = useState(null)
  const [usuarios, setUsuarios]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting]     = useState(false)

  useEffect(() => { fetchData() }, [id])

  async function fetchData() {
    setLoading(true)
    const [{ data: condo, error: e1 }, { data: users, error: e2 }] = await Promise.all([
      supabase.from('condominios').select('*').eq('id', id).single(),
      supabase
        .from('condominio_usuarios')
        .select('user_id, profiles(id, full_name, phone, role)')
        .eq('condominio_id', id),
    ])
    if (e1) setError(e1.message)
    else {
      setCondominio(condo)
      setUsuarios(users?.map((u) => u.profiles).filter(Boolean) ?? [])
    }
    setLoading(false)
  }

  async function toggleActivo() {
    const { error } = await supabase
      .from('condominios')
      .update({ activo: !condominio.activo })
      .eq('id', id)
    if (!error) setCondominio((c) => ({ ...c, activo: !c.activo }))
  }

  async function handleDelete() {
    setDeleting(true)
    await supabase.from('condominios').delete().eq('id', id)
    navigate('/admin/clientes', { replace: true })
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: COLORS.brand, borderTopColor: 'transparent' }} />
    </div>
  )

  if (error || !condominio) return (
    <div className="text-center py-20">
      <p className="text-sm mb-3" style={{ color: COLORS.alert }}>No se encontró el condominio.</p>
      <Link to="/admin/clientes" className="text-sm font-medium" style={{ color: COLORS.brand }}>← Volver al listado</Link>
    </div>
  )

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: COLORS.sand }}>
        <Link to="/admin/clientes" style={{ color: COLORS.sand }}>Clientes</Link>
        <span>/</span>
        <span style={{ color: COLORS.brand }}>{condominio.nombre}</span>
      </div>

      {/* Header ficha */}
      <div className="rounded-2xl p-6 mb-5"
        style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.sandBorder}` }}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
              style={{ backgroundColor: COLORS.brand }}>
              {condominio.nombre[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: COLORS.brand }}>{condominio.nombre}</h1>
              <p className="text-sm mt-0.5" style={{ color: COLORS.sand }}>
                {[condominio.direccion, condominio.comuna, condominio.ciudad].filter(Boolean).join(', ') || 'Sin dirección registrada'}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mt-2"
                style={{
                  backgroundColor: condominio.activo ? COLORS.accentLight : COLORS.alertLight,
                  color: condominio.activo ? COLORS.accent : COLORS.alert,
                }}>
                <span className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: condominio.activo ? COLORS.accent : COLORS.alert }} />
                {condominio.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <Link to={`/admin/clientes/${id}/editar`}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg"
              style={{ backgroundColor: COLORS.brandLight, color: COLORS.brand }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </Link>
            <button onClick={toggleActivo}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg"
              style={{
                backgroundColor: condominio.activo ? COLORS.alertLight : COLORS.accentLight,
                color: condominio.activo ? COLORS.alert : COLORS.accent,
              }}>
              {condominio.activo ? 'Desactivar' : 'Activar'}
            </button>
          </div>
        </div>
      </div>

      {/* Datos del condominio */}
      <div className="rounded-2xl p-6 mb-5"
        style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.sandBorder}` }}>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: COLORS.sand }}>
          Datos del condominio
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <Dato label="Nombre" value={condominio.nombre} />
          <Dato label="Dirección" value={condominio.direccion} />
          <Dato label="Comuna" value={condominio.comuna} />
          <Dato label="Ciudad" value={condominio.ciudad} />
          <Dato label="Unidades" value={condominio.unidades} />
          <Dato label="Registrado" value={new Date(condominio.created_at).toLocaleDateString('es-CL')} />
        </div>
      </div>

      {/* Usuarios vinculados */}
      <div className="rounded-2xl p-6 mb-5"
        style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.sandBorder}` }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: COLORS.sand }}>
            Usuarios vinculados ({usuarios.length})
          </h2>
        </div>
        {usuarios.length === 0 ? (
          <p className="text-sm" style={{ color: COLORS.sand }}>Sin usuarios vinculados.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {usuarios.map((u) => (
              <div key={u.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                style={{ backgroundColor: COLORS.bg }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: COLORS.brand }}>
                    {(u.full_name ?? '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: COLORS.brand }}>{u.full_name || 'Sin nombre'}</p>
                    {u.phone && <p className="text-xs" style={{ color: COLORS.sand }}>{u.phone}</p>}
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: COLORS.brandLight, color: COLORS.brand }}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zona de peligro */}
      <div className="rounded-2xl p-6"
        style={{ border: `1px solid #F7D4B8`, backgroundColor: COLORS.alertLight }}>
        <h2 className="text-sm font-semibold mb-1" style={{ color: COLORS.alert }}>Zona de peligro</h2>
        <p className="text-xs mb-4" style={{ color: COLORS.alert }}>
          Eliminar el condominio borrará todos sus registros asociados. Esta acción no se puede deshacer.
        </p>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)}
            className="text-sm font-medium px-4 py-2 rounded-lg"
            style={{ backgroundColor: COLORS.alert, color: 'white' }}>
            Eliminar condominio
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={handleDelete} disabled={deleting}
              className="text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-60"
              style={{ backgroundColor: COLORS.alert, color: 'white' }}>
              {deleting ? 'Eliminando...' : 'Confirmar eliminación'}
            </button>
            <button onClick={() => setConfirmDelete(false)}
              className="text-sm font-medium px-4 py-2 rounded-lg"
              style={{ backgroundColor: COLORS.white, color: COLORS.brand, border: `1px solid ${COLORS.sandBorder}` }}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
