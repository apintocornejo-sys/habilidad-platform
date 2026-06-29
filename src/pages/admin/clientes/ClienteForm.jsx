import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

const COLORS = {
  bg: '#F5F3EE',
  white: '#FFFFFF',
  brand: '#1B3A5C',
  brandLight: '#E8F0F7',
  accent: '#2A7F62',
  sand: '#8C8880',
  sandBorder: '#E8E6E0',
  alert: '#C8601A',
  alertLight: '#FBF0E8',
}

const COMUNAS_SANTIAGO = [
  'Cerrillos','Cerro Navia','Conchalí','El Bosque','Estación Central',
  'Huechuraba','Independencia','La Cisterna','La Florida','La Granja',
  'La Pintana','La Reina','Las Condes','Lo Barnechea','Lo Espejo',
  'Lo Prado','Macul','Maipú','Ñuñoa','Pedro Aguirre Cerda',
  'Peñalolén','Providencia','Pudahuel','Quilicura','Quinta Normal',
  'Recoleta','Renca','San Joaquín','San Miguel','San Ramón','Santiago',
  'Vitacura',
]

const initialForm = {
  nombre: '', direccion: '', comuna: '', ciudad: 'Santiago', unidades: '', activo: true,
}

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: COLORS.brand }}>
        {label}{required && <span style={{ color: COLORS.alert }}> *</span>}
      </label>
      {children}
      {error && <p className="text-xs" style={{ color: COLORS.alert }}>{error}</p>}
    </div>
  )
}

const inputClass = "w-full px-3 py-2.5 text-sm rounded-lg outline-none"
const inputStyle = (hasError) => ({
  border: `1px solid ${hasError ? COLORS.alert : COLORS.sandBorder}`,
  backgroundColor: COLORS.white,
  color: COLORS.brand,
})

export default function ClienteForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm]       = useState(initialForm)
  const [errors, setErrors]   = useState({})
  const [saving, setSaving]   = useState(false)
  const [loading, setLoading] = useState(esEdicion)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    if (!esEdicion) return
    supabase.from('condominios').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        if (error || !data) navigate('/admin/clientes', { replace: true })
        else setForm({
          nombre:    data.nombre    ?? '',
          direccion: data.direccion ?? '',
          comuna:    data.comuna    ?? '',
          ciudad:    data.ciudad    ?? 'Santiago',
          unidades:  data.unidades  ?? '',
          activo:    data.activo    ?? true,
        })
        setLoading(false)
      })
  }, [id])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setErrors((e) => ({ ...e, [name]: null }))
  }

  function validate() {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio.'
    if (form.unidades && isNaN(Number(form.unidades))) e.unidades = 'Debe ser un número.'
    if (form.unidades && Number(form.unidades) < 1) e.unidades = 'Debe ser mayor a 0.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    setSaveError(null)

    const payload = {
      nombre:    form.nombre.trim(),
      direccion: form.direccion.trim() || null,
      comuna:    form.comuna || null,
      ciudad:    form.ciudad.trim() || 'Santiago',
      unidades:  form.unidades ? Number(form.unidades) : null,
      activo:    form.activo,
    }

    const { error } = esEdicion
      ? await supabase.from('condominios').update(payload).eq('id', id)
      : await supabase.from('condominios').insert([payload])

    if (error) {
      setSaveError('No se pudo guardar. Intenta nuevamente.')
      setSaving(false)
    } else {
      navigate('/admin/clientes')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: COLORS.brand, borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: COLORS.sand }}>
        <Link to="/admin/clientes" style={{ color: COLORS.sand }}>Clientes</Link>
        <span>/</span>
        {esEdicion && (
          <>
            <Link to={`/admin/clientes/${id}`} style={{ color: COLORS.sand }}>Ficha</Link>
            <span>/</span>
          </>
        )}
        <span style={{ color: COLORS.brand }}>{esEdicion ? 'Editar' : 'Nuevo condominio'}</span>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: COLORS.brand }}>
        {esEdicion ? 'Editar condominio' : 'Nuevo condominio'}
      </h1>

      {saveError && (
        <div className="rounded-xl px-4 py-3 text-sm mb-5"
          style={{ backgroundColor: COLORS.alertLight, color: COLORS.alert, border: '1px solid #F7D4B8' }}>
          {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-2xl p-6 mb-5"
          style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.sandBorder}` }}>
          <h2 className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: COLORS.sand }}>
            Información general
          </h2>

          <div className="flex flex-col gap-4">
            <Field label="Nombre del condominio" required error={errors.nombre}>
              <input name="nombre" type="text" value={form.nombre} onChange={handleChange}
                placeholder="Ej: Edificio Las Palmas"
                className={inputClass} style={inputStyle(errors.nombre)} />
            </Field>

            <Field label="Dirección" error={errors.direccion}>
              <input name="direccion" type="text" value={form.direccion} onChange={handleChange}
                placeholder="Ej: Av. Providencia 1234"
                className={inputClass} style={inputStyle(false)} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Comuna" error={errors.comuna}>
                <select name="comuna" value={form.comuna} onChange={handleChange}
                  className={inputClass} style={inputStyle(false)}>
                  <option value="">Selecciona una comuna</option>
                  {COMUNAS_SANTIAGO.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="Ciudad" error={errors.ciudad}>
                <input name="ciudad" type="text" value={form.ciudad} onChange={handleChange}
                  placeholder="Santiago"
                  className={inputClass} style={inputStyle(false)} />
              </Field>
            </div>

            <Field label="Número de unidades" error={errors.unidades}>
              <input name="unidades" type="number" min="1" value={form.unidades} onChange={handleChange}
                placeholder="Ej: 48"
                className={inputClass} style={inputStyle(errors.unidades)} />
            </Field>
          </div>
        </div>

        {/* Estado */}
        <div className="rounded-2xl p-5 mb-6"
          style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.sandBorder}` }}>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange}
                className="sr-only" />
              <div className="w-10 h-6 rounded-full transition-colors"
                style={{ backgroundColor: form.activo ? COLORS.accent : COLORS.sandBorder }}>
                <div className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
                  style={{ transform: form.activo ? 'translateX(20px)' : 'translateX(4px)' }} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.brand }}>Condominio activo</p>
              <p className="text-xs" style={{ color: COLORS.sand }}>
                Los condominios inactivos no son visibles en el portal cliente.
              </p>
            </div>
          </label>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl disabled:opacity-60"
            style={{ backgroundColor: COLORS.brand, color: 'white' }}>
            {saving ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Guardando...
              </>
            ) : esEdicion ? 'Guardar cambios' : 'Crear condominio'}
          </button>
          <Link to={esEdicion ? `/admin/clientes/${id}` : '/admin/clientes'}
            className="text-sm font-medium px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: COLORS.bg, color: COLORS.brand }}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
