import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const C = {
  bg: '#F5F3EE', white: '#FFFFFF', brand: '#1B3A5C', brandLight: '#E8F0F7',
  accent: '#2A7F62', accentLight: '#E6F5F1', sand: '#8C8880', sandBorder: '#E8E6E0',
  alert: '#C8601A', alertLight: '#FBF0E8', warn: '#B45309', warnLight: '#FEF3C7',
}

const PRIORIDAD = {
  baja:    { label: 'Baja',    color: C.sand,    bg: '#F3F4F6' },
  normal:  { label: 'Normal',  color: C.accent,  bg: C.accentLight },
  alta:    { label: 'Alta',    color: C.warn,    bg: C.warnLight },
  urgente: { label: 'Urgente', color: C.alert,   bg: C.alertLight },
}

const ESTADO = {
  pendiente:   { label: 'Pendiente',   color: C.sand,   bg: '#F3F4F6' },
  en_progreso: { label: 'En progreso', color: C.warn,   bg: C.warnLight },
  completada:  { label: 'Completada',  color: C.accent, bg: C.accentLight },
  cancelada:   { label: 'Cancelada',   color: '#6B7280', bg: '#F3F4F6' },
}

function PrioBadge({ prioridad }) {
  const cfg = PRIORIDAD[prioridad] ?? PRIORIDAD.normal
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  )
}

function EstadoBadge({ estado }) {
  const cfg = ESTADO[estado] ?? ESTADO.pendiente
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  )
}

function formatFecha(d) {
  if (!d) return null
  const date = new Date(d + 'T00:00:00')
  const hoy = new Date(); hoy.setHours(0,0,0,0)
  const diff = Math.ceil((date - hoy) / 86400000)
  const fmt = date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })
  return { fmt, vencida: diff < 0, hoy: diff === 0, proxima: diff >= 1 && diff <= 3 }
}

export default function TareasPage() {
  const [tareas, setTareas]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [busqueda, setBusqueda]     = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroPrioridad, setFiltroPrioridad] = useState('todas')

  useEffect(() => { fetchTareas() }, [])

  async function fetchTareas() {
    setLoading(true)
    const { data, error } = await supabase
      .from('tareas')
      .select('id, titulo, descripcion, prioridad, estado, fecha_limite, condominios(nombre), profiles(full_name)')
      .order('fecha_limite', { nullsFirst: false })
    if (error) setError(error.message)
    else setTareas(data ?? [])
    setLoading(false)
  }

  const filtradas = tareas.filter(t => {
    const matchBusqueda =
      t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      (t.condominios?.nombre ?? '').toLowerCase().includes(busqueda.toLowerCase())
    const matchEstado    = filtroEstado === 'todos'   || t.estado === filtroEstado
    const matchPrioridad = filtroPrioridad === 'todas' || t.prioridad === filtroPrioridad
    return matchBusqueda && matchEstado && matchPrioridad
  })

  const resumen = {
    total:       tareas.length,
    pendientes:  tareas.filter(t => t.estado === 'pendiente').length,
    en_progreso: tareas.filter(t => t.estado === 'en_progreso').length,
    completadas: tareas.filter(t => t.estado === 'completada').length,
    urgentes:    tareas.filter(t => t.prioridad === 'urgente' && t.estado !== 'completada' && t.estado !== 'cancelada').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.brand }}>Tareas</h1>
          <p className="text-sm mt-0.5" style={{ color: C.sand }}>{resumen.total} tarea{resumen.total !== 1 ? 's' : ''} registrada{resumen.total !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/admin/tareas/nueva"
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: C.brand, color: 'white' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva tarea
        </Link>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Pendientes',   value: resumen.pendientes,  estado: 'pendiente',   color: C.sand,   bg: '#F3F4F6' },
          { label: 'En progreso',  value: resumen.en_progreso, estado: 'en_progreso', color: C.warn,   bg: C.warnLight },
          { label: 'Completadas',  value: resumen.completadas, estado: 'completada',  color: C.accent, bg: C.accentLight },
          { label: 'Urgentes',     value: resumen.urgentes,    estado: 'todos',       color: C.alert,  bg: C.alertLight },
        ].map(({ label, value, estado, color, bg }) => (
          <button key={label} onClick={() => setFiltroEstado(estado)}
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

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.sand }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input type="text" placeholder="Buscar por título o condominio..."
            value={busqueda} onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl"
            style={{ border: `1px solid ${C.sandBorder}`, backgroundColor: C.white, color: C.brand, outline: 'none' }} />
        </div>
        <select value={filtroPrioridad} onChange={e => setFiltroPrioridad(e.target.value)}
          className="px-3 py-2.5 text-sm rounded-xl"
          style={{ border: `1px solid ${C.sandBorder}`, backgroundColor: C.white, color: C.brand, outline: 'none' }}>
          <option value="todas">Todas las prioridades</option>
          <option value="urgente">Urgente</option>
          <option value="alta">Alta</option>
          <option value="normal">Normal</option>
          <option value="baja">Baja</option>
        </select>
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
      ) : filtradas.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: C.sand }}>
            {busqueda || filtroEstado !== 'todos' || filtroPrioridad !== 'todas'
              ? 'Sin resultados.' : 'No hay tareas registradas.'}
          </p>
          {!busqueda && filtroEstado === 'todos' && filtroPrioridad === 'todas' && (
            <Link to="/admin/tareas/nueva" className="inline-block mt-3 text-sm font-medium" style={{ color: C.accent }}>
              Crear la primera →
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.sandBorder}`, backgroundColor: C.white }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.sandBorder}` }}>
                {['Tarea', 'Condominio', 'Prioridad', 'Vence', 'Estado', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap"
                    style={{ color: C.sand, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtradas.map((t, i) => {
                const fecha = t.fecha_limite ? formatFecha(t.fecha_limite) : null
                return (
                  <tr key={t.id} style={{ borderBottom: i < filtradas.length - 1 ? `1px solid ${C.sandBorder}` : 'none' }}>
                    <td className="px-4 py-3.5">
                      <p className="font-medium" style={{ color: C.brand }}>{t.titulo}</p>
                      {t.profiles?.full_name && (
                        <p className="text-xs mt-0.5" style={{ color: C.sand }}>→ {t.profiles.full_name}</p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: C.sand }}>
                      {t.condominios?.nombre ?? '—'}
                    </td>
                    <td className="px-4 py-3.5"><PrioBadge prioridad={t.prioridad} /></td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs">
                      {fecha ? (
                        <span style={{
                          color: fecha.vencida ? C.alert : fecha.hoy ? C.warn : fecha.proxima ? C.warn : C.sand,
                          fontWeight: fecha.vencida || fecha.hoy ? 600 : 400,
                        }}>
                          {fecha.vencida ? '⚠ ' : ''}{fecha.fmt}
                          {fecha.hoy ? ' (hoy)' : fecha.vencida ? ' (vencida)' : ''}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3.5"><EstadoBadge estado={t.estado} /></td>
                    <td className="px-4 py-3.5 text-right">
                      <Link to={`/admin/tareas/${t.id}/editar`}
                        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: C.brandLight, color: C.brand }}>
                        Editar
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
