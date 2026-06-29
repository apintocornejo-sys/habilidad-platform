import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const C = {
  bg: '#F5F3EE', white: '#FFFFFF', brand: '#1B3A5C', brandLight: '#E8F0F7',
  accent: '#2A7F62', accentLight: '#E6F5F1', sand: '#8C8880', sandBorder: '#E8E6E0',
  alert: '#C8601A', alertLight: '#FBF0E8', warn: '#B45309', warnLight: '#FEF3C7',
}

const ESTADO_CONFIG = {
  vigente:    { label: 'Vigente',    bg: C.accentLight, color: C.accent },
  por_vencer: { label: 'Por vencer', bg: C.warnLight,   color: C.warn   },
  vencido:    { label: 'Vencido',    bg: C.alertLight,  color: C.alert  },
  cancelado:  { label: 'Cancelado',  bg: '#F3F4F6',     color: '#6B7280'},
}

function EstadoBadge({ estado }) {
  const cfg = ESTADO_CONFIG[estado] ?? ESTADO_CONFIG.vigente
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  )
}

function formatCLP(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)
}

function formatFecha(d) {
  if (!d) return '—'
  return new Date(d + 'T00:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function ContratosPage() {
  const [contratos, setContratos] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [busqueda, setBusqueda]   = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')

  useEffect(() => { fetchContratos() }, [])

  async function fetchContratos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('contratos')
      .select('id, proveedor, descripcion, monto_mensual, inicio, termino, estado, renovacion_auto, condominios(nombre)')
      .order('estado')
    if (error) setError(error.message)
    else setContratos(data ?? [])
    setLoading(false)
  }

  const filtrados = contratos.filter((c) => {
    const matchBusqueda =
      c.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.condominios?.nombre ?? '').toLowerCase().includes(busqueda.toLowerCase())
    const matchEstado = filtroEstado === 'todos' || c.estado === filtroEstado
    return matchBusqueda && matchEstado
  })

  const resumen = {
    total:      contratos.length,
    vigentes:   contratos.filter(c => c.estado === 'vigente').length,
    por_vencer: contratos.filter(c => c.estado === 'por_vencer').length,
    vencidos:   contratos.filter(c => c.estado === 'vencido').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.brand }}>Contratos</h1>
          <p className="text-sm mt-0.5" style={{ color: C.sand }}>{resumen.total} contrato{resumen.total !== 1 ? 's' : ''} registrado{resumen.total !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/admin/contratos/nuevo"
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: C.brand, color: 'white' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo contrato
        </Link>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total',      value: resumen.total,      estado: 'todos',      color: C.brand,   bg: C.brandLight  },
          { label: 'Vigentes',   value: resumen.vigentes,   estado: 'vigente',    color: C.accent,  bg: C.accentLight },
          { label: 'Por vencer', value: resumen.por_vencer, estado: 'por_vencer', color: C.warn,    bg: C.warnLight   },
          { label: 'Vencidos',   value: resumen.vencidos,   estado: 'vencido',    color: C.alert,   bg: C.alertLight  },
        ].map(({ label, value, estado, color, bg }) => (
          <button key={estado} onClick={() => setFiltroEstado(estado)}
            className="rounded-xl p-4 text-left transition-all"
            style={{
              backgroundColor: filtroEstado === estado ? bg : C.white,
              border: `1px solid ${filtroEstado === estado ? color : C.sandBorder}`,
            }}>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color: C.sand }}>{label}</p>
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.sand }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input type="text" placeholder="Buscar por proveedor o condominio..."
          value={busqueda} onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl"
          style={{ border: `1px solid ${C.sandBorder}`, backgroundColor: C.white, color: C.brand, outline: 'none' }} />
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm mb-4"
          style={{ backgroundColor: C.alertLight, color: C.alert, border: '1px solid #F7D4B8' }}>
          Error al cargar: {error}
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
            {busqueda || filtroEstado !== 'todos' ? 'Sin resultados.' : 'No hay contratos registrados.'}
          </p>
          {!busqueda && filtroEstado === 'todos' && (
            <Link to="/admin/contratos/nuevo" className="inline-block mt-3 text-sm font-medium" style={{ color: C.accent }}>
              Crear el primero →
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.sandBorder}`, backgroundColor: C.white }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.sandBorder}` }}>
                {['Proveedor', 'Condominio', 'Monto/mes', 'Vigencia', 'Estado', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap"
                    style={{ color: C.sand, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < filtrados.length - 1 ? `1px solid ${C.sandBorder}` : 'none' }}>
                  <td className="px-4 py-3.5">
                    <p className="font-medium" style={{ color: C.brand }}>{c.proveedor}</p>
                    {c.descripcion && <p className="text-xs mt-0.5 truncate max-w-xs" style={{ color: C.sand }}>{c.descripcion}</p>}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: C.sand }}>
                    {c.condominios?.nombre ?? '—'}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-medium" style={{ color: C.brand }}>
                    {formatCLP(c.monto_mensual)}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs" style={{ color: C.sand }}>
                    {formatFecha(c.inicio)} → {formatFecha(c.termino)}
                    {c.renovacion_auto && (
                      <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: C.brandLight, color: C.brand }}>Auto</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5"><EstadoBadge estado={c.estado} /></td>
                  <td className="px-4 py-3.5 text-right">
                    <Link to={`/admin/contratos/${c.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: C.brandLight, color: C.brand }}>
                      Ver
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
