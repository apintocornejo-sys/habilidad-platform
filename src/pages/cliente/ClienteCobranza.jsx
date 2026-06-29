import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useCondominio } from '../../hooks/useCondominio'
import { useAuth } from '../../context/AuthContext'

const G = {
  white: '#FFFFFF', sidebar: '#1A5C47', accent: '#2A7F62', accentLight: '#E6F5F1',
  sand: '#8C8880', sandBorder: '#E8E6E0', alert: '#C8601A', alertLight: '#FBF0E8',
  warn: '#B45309', warnLight: '#FEF3C7', bg: '#F0F7F5',
}

function formatCLP(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)
}

function formatFecha(d) {
  if (!d) return '—'
  return new Date(d + 'T00:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
}

function estadoPago(c) {
  if (c.pagado) return { label: 'Pagado', color: G.accent, bg: G.accentLight }
  const hoy = new Date(); hoy.setHours(0,0,0,0)
  const vence = c.fecha_vence ? new Date(c.fecha_vence + 'T00:00:00') : null
  if (vence && vence < hoy) return { label: 'Vencido', color: G.alert, bg: G.alertLight }
  return { label: 'Pendiente', color: G.warn, bg: G.warnLight }
}

export default function ClienteCobranza() {
  const { condominioId, loading: loadingCondo } = useCondominio()
  const { user } = useAuth()
  const [cobros, setCobros]     = useState([])
  const [loading, setLoading]   = useState(false)
  const [resumen, setResumen]   = useState({ total: 0, pagado: 0, pendiente: 0 })

  useEffect(() => {
    if (!condominioId || !user) return
    setLoading(true)
    supabase
      .from('cobranzas')
      .select('id, periodo, monto, pagado, fecha_pago, fecha_vence, observacion')
      .eq('condominio_id', condominioId)
      .eq('user_id', user.id)
      .order('periodo', { ascending: false })
      .then(({ data }) => {
        const list = data ?? []
        setCobros(list)
        setResumen({
          total:     list.reduce((s, c) => s + (c.monto ?? 0), 0),
          pagado:    list.filter(c => c.pagado).reduce((s, c) => s + (c.monto ?? 0), 0),
          pendiente: list.filter(c => !c.pagado).reduce((s, c) => s + (c.monto ?? 0), 0),
        })
        setLoading(false)
      })
  }, [condominioId, user])

  if (loadingCondo || loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: G.accent, borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: G.sidebar }}>Mi cobranza</h1>
        <p className="text-sm mt-0.5" style={{ color: G.sand }}>{cobros.length} registro{cobros.length !== 1 ? 's' : ''} en tu historial</p>
      </div>

      {/* Resumen */}
      {cobros.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total facturado', value: formatCLP(resumen.total),     color: G.sidebar, bg: G.white    },
            { label: 'Total pagado',    value: formatCLP(resumen.pagado),    color: G.accent,  bg: G.accentLight },
            { label: 'Por pagar',       value: formatCLP(resumen.pendiente), color: resumen.pendiente > 0 ? G.alert : G.accent, bg: resumen.pendiente > 0 ? G.alertLight : G.accentLight },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className="rounded-xl p-4"
              style={{ backgroundColor: bg, border: `1px solid ${G.sandBorder}` }}>
              <p className="text-sm font-bold" style={{ color }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: G.sand }}>{label}</p>
            </div>
          ))}
        </div>
      )}

      {cobros.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: G.sand }}>No hay registros de cobranza para tu cuenta.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${G.sandBorder}`, backgroundColor: G.white }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: G.bg, borderBottom: `1px solid ${G.sandBorder}` }}>
                {['Período', 'Monto', 'Vencimiento', 'Fecha pago', 'Estado'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap"
                    style={{ color: G.sand, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cobros.map((c, i) => {
                const est = estadoPago(c)
                return (
                  <tr key={c.id} style={{ borderBottom: i < cobros.length - 1 ? `1px solid ${G.sandBorder}` : 'none' }}>
                    <td className="px-4 py-3.5">
                      <p className="font-medium" style={{ color: G.sidebar }}>{c.periodo ?? '—'}</p>
                      {c.observacion && <p className="text-xs mt-0.5" style={{ color: G.sand }}>{c.observacion}</p>}
                    </td>
                    <td className="px-4 py-3.5 font-semibold whitespace-nowrap" style={{ color: G.sidebar }}>
                      {formatCLP(c.monto)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs" style={{ color: G.sand }}>
                      {formatFecha(c.fecha_vence)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs" style={{ color: G.sand }}>
                      {c.pagado ? formatFecha(c.fecha_pago) : '—'}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: est.bg, color: est.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: est.color }} />
                        {est.label}
                      </span>
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
