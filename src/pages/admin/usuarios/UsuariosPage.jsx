import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const C = {
  bg: '#F5F3EE', white: '#FFFFFF', brand: '#1B3A5C', brandLight: '#E8F0F7',
  accent: '#2A7F62', accentLight: '#E6F5F1', sand: '#8C8880', sandBorder: '#E8E6E0',
  alert: '#C8601A', alertLight: '#FBF0E8',
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading]   = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [error, setError]       = useState(null)

  useEffect(() => { fetchUsuarios() }, [])

  async function fetchUsuarios() {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, unidad, created_at, condominio_usuarios(condominio_id, condominios(nombre))')
      .eq('role', 'cliente')
      .order('full_name')
    if (error) setError(error.message)
    else setUsuarios(data ?? [])
    setLoading(false)
  }

  const filtrados = usuarios.filter(u =>
    (u.full_name ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (u.email ?? '').toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.brand }}>Usuarios</h1>
          <p className="text-sm mt-0.5" style={{ color: C.sand }}>
            {usuarios.length} cliente{usuarios.length !== 1 ? 's' : ''} registrado{usuarios.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/admin/usuarios/nuevo"
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: C.brand, color: 'white' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo usuario
        </Link>
      </div>

      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.sand }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input type="text" placeholder="Buscar por nombre o correo..."
          value={busqueda} onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl"
          style={{ border: `1px solid ${C.sandBorder}`, backgroundColor: C.white, color: C.brand, outline: 'none' }} />
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm mb-4"
          style={{ backgroundColor: C.alertLight, color: C.alert, border: '1px solid #F7D4B8' }}>
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: C.brand, borderTopColor: 'transparent' }} />
        </div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: C.sand }}>
            {busqueda ? 'Sin resultados.' : 'No hay usuarios registrados.'}
          </p>
          {!busqueda && (
            <Link to="/admin/usuarios/nuevo" className="inline-block mt-3 text-sm font-medium" style={{ color: C.accent }}>
              Crear el primero →
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.sandBorder}`, backgroundColor: C.white }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.sandBorder}` }}>
                {['Nombre', 'Correo', 'Condominio', 'Unidad', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap"
                    style={{ color: C.sand, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u, i) => {
                const condo = u.condominio_usuarios?.[0]?.condominios?.nombre
                return (
                  <tr key={u.id} style={{ borderBottom: i < filtrados.length - 1 ? `1px solid ${C.sandBorder}` : 'none' }}>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                          style={{ backgroundColor: C.brand }}>
                          {(u.full_name ?? u.email ?? '?')[0].toUpperCase()}
                        </div>
                        <p className="font-medium" style={{ color: C.brand }}>{u.full_name || '—'}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5" style={{ color: C.sand }}>{u.email ?? '—'}</td>
                    <td className="px-4 py-3.5" style={{ color: C.sand }}>{condo ?? '—'}</td>
                    <td className="px-4 py-3.5" style={{ color: C.sand }}>{u.unidad ?? '—'}</td>
                    <td className="px-4 py-3.5 text-right">
                      <Link to={`/admin/usuarios/${u.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: C.brandLight, color: C.brand }}>
                        Ver
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
