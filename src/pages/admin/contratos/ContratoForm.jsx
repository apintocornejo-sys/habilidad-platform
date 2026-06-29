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
  condominio_id: '', proveedor: '', descripcion: '',
  monto_mensual: '', inicio: '', termino: '',
  renovacion_auto: false, estado: 'vigente',
}

export default function ContratoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm]         = useState(initial)
  const [errors, setErrors]     = useState({})
  const [saving, setSaving]     = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [loading, setLoading]   = useState(esEdicion)
  const [condominios, setCondominios] = useState([])

  useEffect(() => {
    supabase.from('condominios').select('id, nombre').order('nombre')
      .then(({ data }) => setCondominios(data ?? []))
  }, [])

  useEffect(() => {
    if (!esEdicion) return
    supabase.from('contratos').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        if (error || !data) return navigate('/admin/contratos', { replace: true })
        setForm({
          condominio_id:  data.condominio_id  ?? '',
          proveedor:      data.proveedor      ?? '',
          descripcion:    data.descripcion    ?? '',
          monto_mensual:  data.monto_mensual  ?? '',
          inicio:         data.inicio         ?? '',
          termino:        data.termino        ?? '',
          renovacion_auto: data.renovacion_auto ?? false,
          estado:         data.estado         ?? 'vigente',
        })
        setLoading(false)
      })
  }, [id])

  function handle(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setErrors(e => ({ ...e, [name]: null }))
  }

  function validate() {
    const e = {}
    if (!form.proveedor.trim()) e.proveedor = 'El proveedor es obligatorio.'
    if (!form.condominio_id)    e.condominio_id = 'Selecciona un condominio.'
    if (form.monto_mensual && isNaN(Number(form.monto_mensual))) e.monto_mensual = 'Debe ser un número.'
    if (form.inicio && form.termino && form.termino < form.inicio) e.termino = 'La fecha de término debe ser posterior al inicio.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true); setSaveError(null)

    const payload = {
      condominio_id:  form.condominio_id || null,
      proveedor:      form.proveedor.trim(),
      descripcion:    form.descripcion.trim() || null,
      monto_mensual:  form.monto_mensual ? Number(form.monto_mensual) : null,
      inicio:         form.inicio || null,
      termino:        form.termino || null,
      renovacion_auto: form.renovacion_auto,
      estado:         form.estado,
    }

    const { error } = esEdicion
      ? await supabase.from('contratos').update(payload).eq('id', id)
      : await supabase.from('contratos').insert([payload])

    if (error) { setSaveError('No se pudo guardar. Intenta nuevamente.'); setSaving(false) }
    else navigate('/admin/contratos')
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
        <Link to="/admin/contratos" style={{ color: C.sand }}>Contratos</Link>
        <span>/</span>
        <span style={{ color: C.brand }}>{esEdicion ? 'Editar' : 'Nuevo contrato'}</span>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: C.brand }}>
        {esEdicion ? 'Editar contrato' : 'Nuevo contrato'}
      </h1>

      {saveError && (
        <div className="rounded-xl px-4 py-3 text-sm mb-5"
          style={{ backgroundColor: C.alertLight, color: C.alert, border: '1px solid #F7D4B8' }}>
          {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Bloque principal */}
        <div className="rounded-2xl p-6 mb-5"
          style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
          <h2 className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: C.sand }}>
            Datos del contrato
          </h2>
          <div className="flex flex-col gap-4">
            <Field label="Condominio" required error={errors.condominio_id}>
              <select name="condominio_id" value={form.condominio_id} onChange={handle}
                className={inputCls} style={inputStyle(errors.condominio_id)}>
                <option value="">Selecciona un condominio</option>
                {condominios.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </Field>

            <Field label="Proveedor / empresa" required error={errors.proveedor}>
              <input name="proveedor" type="text" value={form.proveedor} onChange={handle}
                placeholder="Ej: Empresa de Seguridad Ltda."
                className={inputCls} style={inputStyle(errors.proveedor)} />
            </Field>

            <Field label="Descripción" error={errors.descripcion}>
              <textarea name="descripcion" value={form.descripcion} onChange={handle}
                placeholder="Ej: Servicio de mantención de ascensores"
                rows={3} className={inputCls} style={inputStyle(false)} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Monto mensual (CLP)" error={errors.monto_mensual}>
                <input name="monto_mensual" type="number" min="0" value={form.monto_mensual} onChange={handle}
                  placeholder="Ej: 150000"
                  className={inputCls} style={inputStyle(errors.monto_mensual)} />
              </Field>

              <Field label="Estado" error={errors.estado}>
                <select name="estado" value={form.estado} onChange={handle}
                  className={inputCls} style={inputStyle(false)}>
                  <option value="vigente">Vigente</option>
                  <option value="por_vencer">Por vencer</option>
                  <option value="vencido">Vencido</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Fecha de inicio" error={errors.inicio}>
                <input name="inicio" type="date" value={form.inicio} onChange={handle}
                  className={inputCls} style={inputStyle(false)} />
              </Field>
              <Field label="Fecha de término" error={errors.termino}>
                <input name="termino" type="date" value={form.termino} onChange={handle}
                  className={inputCls} style={inputStyle(errors.termino)} />
              </Field>
            </div>
          </div>
        </div>

        {/* Toggle renovación */}
        <div className="rounded-2xl p-5 mb-6"
          style={{ backgroundColor: C.white, border: `1px solid ${C.sandBorder}` }}>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" name="renovacion_auto" checked={form.renovacion_auto} onChange={handle} className="sr-only" />
              <div className="w-10 h-6 rounded-full transition-colors"
                style={{ backgroundColor: form.renovacion_auto ? C.accent : C.sandBorder }}>
                <div className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
                  style={{ transform: form.renovacion_auto ? 'translateX(20px)' : 'translateX(4px)' }} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: C.brand }}>Renovación automática</p>
              <p className="text-xs" style={{ color: C.sand }}>El contrato se renueva automáticamente al vencer.</p>
            </div>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl disabled:opacity-60"
            style={{ backgroundColor: C.brand, color: 'white' }}>
            {saving ? (
              <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Guardando...</>
            ) : esEdicion ? 'Guardar cambios' : 'Crear contrato'}
          </button>
          <Link to="/admin/contratos" className="text-sm font-medium px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: C.bg, color: C.brand }}>Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
