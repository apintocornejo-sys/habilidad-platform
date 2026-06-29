import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const C = {
  bg: '#F5F3EE', white: '#FFFFFF', brand: '#1B3A5C', brandLight: '#E8F0F7',
  accent: '#2A7F62', accentLight: '#E6F5F1', sand: '#8C8880', sandBorder: '#E8E6E0',
  alert: '#C8601A', alertLight: '#FBF0E8',
}

const inputCls = 'w-full px-3 py-2.5 text-sm rounded-lg outline-none'
const inputStyle = (err) => ({
  border: `1px solid ${err ? C.alert : C.sandBorder}`,
  backgroundColor: C.white, color: C.brand,
})

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: C.brand }}>
        {label}{required && <span style={{ color: C.alert }}> *</span>}
      </label>
      {children}
      {error && <p className="text-xs" style={{ color: C.alert }}>{error}</p>}
    </div>
  )
}

const initial = {
  condominio_id: '', titulo: '', descripcion: '',
  prioridad: 'normal', estado: 'pendiente',
  asignado_a: '', fecha_limite: '',
}

export default function TareaForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm]         = useState(initial)
  const [errors, setErrors]     = useState({})
  const [saving, setSaving]     = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [loading, setLoading]   = useState(esEdicion)
  const [condominios, setCondominios] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    supabase.from('condominios').select('id, nombre').order('nombre')
      .then(({ data }) => setCondominios(data ?? []))
    supabase.from('profiles').select('id, full_name').order('full_name')
      .then(({ data }) => setUsuarios(data ?? []))
  }, [])

  useEffect(() => {
    if (!esEdicion) return
    supabase.from('tareas').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        if (error || !data) return navigate('/admin/tareas', { replace: true })
        setForm({
          condominio_id: data.condominio_id ?? '',
          titulo:        data.titulo        ?? '',
          descripcion:   data.descripcion   ?? '',
          prioridad:     data.prioridad     ?? 'normal',
          estado:        data.estado        ?? 'pendiente',
          asignado_a:    data.asignado_a    ?? '',
          fecha_limite:  data.fecha_limite  ?? '',
        })
        setLoading(false)
      })
  }, [id])

  function handle(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(e => ({ ...e, [name]: null }))
  }

  function validate() {
    const e = {}
    if (!form.titulo.trim()) e.titulo = 'El título es obligatorio.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true); setSaveError(null)

    const payload = {
      condominio_id: form.condominio_id || null,
      titulo:        form.titulo.trim(),
      descripcion:   form.descripcion.trim() || null,
      prioridad:     form.prioridad,
      estado:        form.estado,
      asignado_a:    form.asignado_a || null,
      fecha_limite:  form.fecha_limite || null,
    }

    const { error } = esEdicion
      ? await supabase.from('tareas').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id)
      : await supabase.from('tareas').insert([payload])

    if (error) { setSaveError('No se pudo guardar. Intenta nuevamente.'); setSaving(false) }
    else navigate('/admin/tareas')
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: C.brand, borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: C.sand }}>
        <Link to="/admin/tareas" style={{ color: C.sand }}>Tareas</Link>
        <span>/</span>
        <span style={{ color: C.brand }}>{esEdicion ? 'Editar tarea' : 'Nueva tarea'}</span>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: C.brand }}>
        {esEdicion ? 'Editar tarea' : 'Nueva tarea'}
      </h1>

      {saveError && (
        <div className="rounded-xl px-4 py-3 text-sm mb-5"
          style={{ backgroundColor: C.alertLight, color: C.alert, border: '1px solid #F7D4B8' }}>
          {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-2xl p-6 mb-5"
          style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
          <h2 className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: C.sand }}>
            Detalle de la tarea
          </h2>
          <div className="flex flex-col gap-4">
            <Field label="Título" required error={errors.titulo}>
              <input name="titulo" type="text" value={form.titulo} onChange={handle}
                placeholder="Ej: Revisar extintores piso 3"
                className={inputCls} style={inputStyle(errors.titulo)} />
            </Field>

            <Field label="Descripción" error={errors.descripcion}>
              <textarea name="descripcion" value={form.descripcion} onChange={handle}
                placeholder="Detalle adicional de la tarea..."
                rows={3} className={inputCls} style={inputStyle(false)} />
            </Field>

            <Field label="Condominio" error={errors.condominio_id}>
              <select name="condominio_id" value={form.condominio_id} onChange={handle}
                className={inputCls} style={inputStyle(false)}>
                <option value="">Sin condominio asignado</option>
                {condominios.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Prioridad" error={errors.prioridad}>
                <select name="prioridad" value={form.prioridad} onChange={handle}
                  className={inputCls} style={inputStyle(false)}>
                  <option value="baja">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </Field>

              <Field label="Estado" error={errors.estado}>
                <select name="estado" value={form.estado} onChange={handle}
                  className={inputCls} style={inputStyle(false)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En progreso</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Asignado a" error={errors.asignado_a}>
                <select name="asignado_a" value={form.asignado_a} onChange={handle}
                  className={inputCls} style={inputStyle(false)}>
                  <option value="">Sin asignar</option>
                  {usuarios.map(u => (
                    <option key={u.id} value={u.id}>{u.full_name || u.id}</option>
                  ))}
                </select>
              </Field>

              <Field label="Fecha límite" error={errors.fecha_limite}>
                <input name="fecha_limite" type="date" value={form.fecha_limite} onChange={handle}
                  className={inputCls} style={inputStyle(false)} />
              </Field>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl disabled:opacity-60"
            style={{ backgroundColor: C.brand, color: 'white' }}>
            {saving ? (
              <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Guardando...</>
            ) : esEdicion ? 'Guardar cambios' : 'Crear tarea'}
          </button>
          <Link to="/admin/tareas" className="text-sm font-medium px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: C.bg, color: C.brand }}>Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
