import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const initialForm = { nombre: '', email: '', telefono: '', condominio: '', mensaje: '' }

const info = [
  { label: 'Correo', value: 'contacto@habilidad.cl', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { label: 'Teléfono', value: '+56 2 XXXX XXXX', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
  { label: 'Ubicación', value: 'Santiago, Chile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: 'Horario', value: 'Lunes a viernes, 9:00 – 18:00 hrs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
]

function Field({ label, name, type, required, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-brand-600">{label}</label>
      <input name={name} type={type} required={required} value={value} onChange={onChange} placeholder={placeholder}
        className="border border-sand-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 bg-white" />
    </div>
  )
}

export default function Contacto() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  function handleChange(e) { setForm((f) => ({ ...f, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const { error } = await supabase.from('contactos').insert([{
      nombre: form.nombre, email: form.email,
      telefono: form.telefono || null, condominio: form.condominio || null, mensaje: form.mensaje,
    }])
    setStatus(error ? 'error' : 'success')
    if (!error) setForm(initialForm)
  }

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-widest">Contacto</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-600 mt-2 mb-4">Cuéntanos sobre tu condominio</h2>
            <p className="text-sand-600 leading-relaxed mb-8">Responderemos dentro de las próximas 4 horas hábiles con una propuesta adaptada a las necesidades de tu comunidad.</p>
            <div className="flex flex-col gap-5">
              {info.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">{icon}</div>
                  <div>
                    <p className="text-xs text-sand-600 uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-brand-600 font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div className="bg-accent-50 border border-accent-100 rounded-2xl p-8 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent-600 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-semibold text-accent-800 text-lg">Mensaje enviado</h3>
                <p className="text-accent-800 text-sm">Nos pondremos en contacto contigo pronto.</p>
                <button onClick={() => setStatus('idle')} className="mt-2 text-sm text-accent-600 hover:text-accent-800 underline underline-offset-2">Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-sand-100 rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
                {status === 'error' && (
                  <div className="bg-alert-50 border border-alert-100 text-alert-800 text-sm rounded-lg px-4 py-3">Hubo un error al enviar. Intenta nuevamente o escríbenos directamente.</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombre *" name="nombre" type="text" required value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
                  <Field label="Correo electrónico *" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="tu@correo.cl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Teléfono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="+56 9 XXXX XXXX" />
                  <Field label="Nombre del condominio" name="condominio" type="text" value={form.condominio} onChange={handleChange} placeholder="Ej: Edificio Las Palmas" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-brand-600">Mensaje *</label>
                  <textarea name="mensaje" required rows={4} value={form.mensaje} onChange={handleChange}
                    placeholder="Cuéntanos cuántas unidades tiene tu condominio y qué servicio te interesa..."
                    className="border border-sand-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 resize-none bg-white" />
                </div>
                <button type="submit" disabled={status === 'sending'}
                  className="bg-brand-600 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  {status === 'sending' ? (<><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Enviando...</>) : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
