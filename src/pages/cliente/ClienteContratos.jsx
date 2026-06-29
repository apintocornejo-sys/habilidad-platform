import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useCondominio } from '../../hooks/useCondominio'

const G = {
  white: '#FFFFFF', sidebar: '#1A5C47', accent: '#2A7F62', accentLight: '#E6F5F1',
  sand: '#8C8880', sandBorder: '#E8E6E0', alert: '#C8601A', alertLight: '#FBF0E8',
  warn: '#B45309', warnLight: '#FEF3C7', bg: '#F0F7F5',
}

const ESTADO_CFG = {
  vigente:    { label: 'Vigente',    bg: G.accentLight, color: G.accent },
  por_vencer: { label: 'Por vencer', bg: G.warnLight,   color: G.warn   },
  vencido:    { label: 'Vencido',    bg: G.alertLight,  color: G.alert  },
  cancelado:  { label: 'Cancelado',  bg: '#F3F4F6',     color: '#6B7280'},
}

function EstadoBadge({ estado }) {
  const cfg = ESTADO_CFG[estado] ?? ESTADO_CFG.vigente
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

export default function ClienteContratos() {
  const { condominioId, loading: loadingCondo } = useCondominio()
  const [contratos, setContratos] = useState([])
  const [loading, setLoading]     = useState(false)

  useEffect(() => {
    if (!condominioId) return
    setLoading(true)
    supabase
      .from('contratos')
      .select('id, proveedor, descripcion, monto_mensual, inicio, termino, estado, renovacion_auto')
      .eq('condominio_id', condominioId)
      .order('estado')
      .then(({ data }) => { setContratos(data ?? []); setLoading(false) })
  }, [condominioId])

  if (loadingCondo || loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: G.accent, borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: G.sidebar }}>Mis contratos</h1>
        <p className="text-sm mt-0.5" style={{ color: G.sand }}>{contratos.length} contrato{contratos.length !== 1 ? 's' : ''} de tu condominio</p>
      </div>

      {contratos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: G.sand }}>No hay contratos registrados para tu condominio.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {contratos.map(c => (
            <div key={c.id} className="rounded-2xl p-5"
              style={{ backgroundColor: G.white, border: `1px solid ${G.sandBorder}` }}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-base font-semibold" style={{ color: G.sidebar }}>{c.proveedor}</p>
                    <EstadoBadge estado={c.estado} />
                    {c.renovacion_auto && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: G.accentLight, color: G.accent }}>Auto-renovable</span>
                    )}
                  </div>
                  {c.descripcion && (
                    <p className="text-sm" style={{ color: G.sand }}>{c.descripcion}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold" style={{ color: G.accent }}>{formatCLP(c.monto_mensual)}</p>
                  <p className="text-xs" style={{ color: G.sand }}>mensual</p>
                </div>
              </div>
              {(c.inicio || c.termino) && (
                <div className="flex gap-6 mt-4 pt-4" style={{ borderTop: `1px solid ${G.sandBorder}` }}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: G.sand }}>Inicio</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: G.sidebar }}>{formatFecha(c.inicio)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: G.sand }}>Término</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: G.sidebar }}>{formatFecha(c.termino)}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
