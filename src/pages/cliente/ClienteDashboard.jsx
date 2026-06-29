import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useCondominio } from '../../hooks/useCondominio'

const G = {
  bg: '#F0F7F5', white: '#FFFFFF', sidebar: '#1A5C47',
  accent: '#2A7F62', accentLight: '#E6F5F1',
  sand: '#8C8880', sandBorder: '#E8E6E0',
  alert: '#C8601A', alertLight: '#FBF0E8',
  warn: '#B45309', warnLight: '#FEF3C7',
}

function formatCLP(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)
}

function StatCard({ label, value, sub, color, bg, to }) {
  const content = (
    <div className="rounded-2xl p-5" style={{ backgroundColor: bg ?? G.white, border: `1px solid ${G.sandBorder}` }}>
      <p className="text-3xl font-bold" style={{ color: color ?? G.accent }}>{value}</p>
      <p className="text-sm font-medium mt-1" style={{ color: G.sidebar }}>{label}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: G.sand }}>{sub}</p>}
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}

export default function ClienteDashboard() {
  const { condominio, condominioId, loading: loadingCondo } = useCondominio()
  const [stats, setStats] = useState({ contratos: 0, tareas: 0, ultimoPago: null })
  const [loadingStats, setLoadingStats] = useState(false)

  useEffect(() => {
    if (!condominioId) return
    setLoadingStats(true)
    Promise.all([
      supabase.from('contratos').select('id', { count: 'exact', head: true }).eq('condominio_id', condominioId).eq('estado', 'vigente'),
      supabase.from('tareas').select('id', { count: 'exact', head: true }).eq('condominio_id', condominioId).in('estado', ['pendiente', 'en_progreso']),
      supabase.from('cobranzas').select('periodo, monto, pagado, fecha_pago').eq('condominio_id', condominioId).order('periodo', { ascending: false }).limit(1).single(),
    ]).then(([{ count: contratos }, { count: tareas }, { data: pago }]) => {
      setStats({ contratos: contratos ?? 0, tareas: tareas ?? 0, ultimoPago: pago ?? null })
      setLoadingStats(false)
    })
  }, [condominioId])

  if (loadingCondo) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: G.accent, borderTopColor: 'transparent' }} />
    </div>
  )

  if (!condominio) return (
    <div className="text-center py-20">
      <p className="text-sm" style={{ color: G.sand }}>No tienes un condominio asignado aún.</p>
      <p className="text-xs mt-1" style={{ color: G.sand }}>Contacta a tu administrador.</p>
    </div>
  )

  return (
    <div>
      {/* Header condominio */}
      <div className="rounded-2xl p-6 mb-6 flex items-start gap-4"
        style={{ backgroundColor: G.white, border: `1px solid ${G.sandBorder}` }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0"
          style={{ backgroundColor: G.accent }}>
          {condominio.nombre[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: G.sidebar }}>{condominio.nombre}</h1>
          <p className="text-sm mt-0.5" style={{ color: G.sand }}>
            {[condominio.direccion, condominio.comuna, condominio.ciudad].filter(Boolean).join(', ') || 'Sin dirección registrada'}
          </p>
          {condominio.unidades && (
            <p className="text-xs mt-1.5 px-2 py-0.5 rounded-full inline-block font-medium"
              style={{ backgroundColor: G.accentLight, color: G.accent }}>
              {condominio.unidades} unidades
            </p>
          )}
        </div>
      </div>

      <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: G.sand }}>Resumen</h2>

      {loadingStats ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: G.sand }}>
          <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: G.accent, borderTopColor: 'transparent' }} />
          Cargando estadísticas…
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Contratos vigentes"
            value={stats.contratos}
            sub="De tu condominio"
            color={G.accent}
            to="/cliente/contratos"
          />
          <StatCard
            label="Tareas activas"
            value={stats.tareas}
            sub="Pendientes o en progreso"
            color={stats.tareas > 0 ? G.warn : G.accent}
            bg={stats.tareas > 0 ? G.warnLight : G.white}
          />
          <StatCard
            label="Último pago"
            value={stats.ultimoPago ? formatCLP(stats.ultimoPago.monto) : '—'}
            sub={stats.ultimoPago
              ? `${stats.ultimoPago.pagado ? 'Pagado' : 'Pendiente'} · ${stats.ultimoPago.periodo ?? ''}`
              : 'Sin registros'}
            color={stats.ultimoPago?.pagado ? G.accent : stats.ultimoPago ? G.alert : G.sand}
            bg={stats.ultimoPago?.pagado ? G.accentLight : stats.ultimoPago ? G.alertLight : G.white}
            to="/cliente/cobranza"
          />
        </div>
      )}

      {/* Accesos rápidos */}
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: G.sand }}>Accesos rápidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { to: '/cliente/contratos', label: 'Ver mis contratos', desc: 'Contratos activos de tu condominio' },
          { to: '/cliente/cobranza',  label: 'Ver mi cobranza',   desc: 'Historial de pagos y estados' },
          { to: '/cliente/documentos',label: 'Ver documentos',    desc: 'Actas, informes y reglamentos' },
        ].map(({ to, label, desc }) => (
          <Link key={to} to={to}
            className="flex items-center justify-between p-4 rounded-xl group transition-all"
            style={{ backgroundColor: G.white, border: `1px solid ${G.sandBorder}` }}>
            <div>
              <p className="text-sm font-medium" style={{ color: G.sidebar }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: G.sand }}>{desc}</p>
            </div>
            <svg className="w-4 h-4 shrink-0" style={{ color: G.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
