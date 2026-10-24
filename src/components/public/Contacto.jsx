import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const N    = '#0B1F3A'
const G    = '#00A676'
const FONT = "'Century Gothic','Trebuchet MS','Nunito',sans-serif"

const initialForm = { nombre: '', correo: '', sector: '', mensaje: '' }

const inputBase = {
  width: '100%', padding: '12px 14px',
  border: '1.5px solid #D6DCE9', borderRadius: 8,
  fontFamily: FONT, fontSize: '.9rem', color: N,
  outline: 'none', transition: 'border-color .15s, box-shadow .15s',
  background: '#FAFBFD',
}

export default function Contacto() {
  const [form, setForm]   = useState(initialForm)
  const [status, setStatus] = useState('idle')

  function handleChange(e) { setForm((f) => ({ ...f, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const { error } = await supabase.from('contactos').insert([{
      nombre: form.nombre, email: form.correo,
      sector: form.sector || null, mensaje: form.mensaje,
    }])
    setStatus(error ? 'error' : 'success')
    if (!error) setForm(initialForm)
  }

  return (
    <section id="contacto" style={{ padding: '100px 0', background: '#F4F7FB' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 56, alignItems: 'start' }} className="contacto-grid">

          {/* ── Info ── */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 2, background: G, borderRadius: 2 }}/>
              <span style={{ fontFamily: FONT, color: G, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', fontSize: '.72rem' }}>Contacto</span>
            </div>
            <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.7rem,2.8vw,2.4rem)', color: N, lineHeight: 1.18, letterSpacing: '-.01em', marginBottom: 18 }}>
              Conversemos<br/>sobre tu proyecto
            </h2>
            <p style={{ fontFamily: FONT, color: '#5A6A80', lineHeight: 1.7, fontSize: '.95rem', marginBottom: 36 }}>
              Cuéntanos qué necesita tu organización. Respondemos en menos de 24 horas.
            </p>

            {[
              {
                label: 'Correo',
                value: 'contacto@habilidad.cl',
                icon: <svg width="18" height="18" fill="none" stroke={G} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
              },
              {
                label: 'Ubicación',
                value: 'La Serena, Región de Coquimbo, Chile',
                icon: <svg width="18" height="18" fill="none" stroke={G} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round"><path d="M12 21s-7-6.75-7-11A7 7 0 0 1 19 10c0 4.25-7 11-7 11z"/><circle cx="12" cy="10" r="2"/></svg>,
              },
              {
                label: 'Cobertura',
                value: 'Atención nacional a organizaciones de todos los sectores',
                icon: <svg width="18" height="18" fill="none" stroke={G} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>,
              },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 22, alignItems: 'flex-start' }}>
                <div style={{
                  width: 40, height: 40, minWidth: 40, borderRadius: 10,
                  background: G + '14', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{icon}</div>
                <div>
                  <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: '.8rem', color: N, display: 'block', marginBottom: 3, letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ fontFamily: FONT, fontSize: '.9rem', color: '#5A6A80' }}>{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Form ── */}
          <div>
            {status === 'success' ? (
              <div style={{
                background: 'white', borderRadius: 16, padding: '48px 36px',
                border: '1px solid #E4EAF2', textAlign: 'center',
                boxShadow: '0 4px 32px rgba(11,31,58,.06)',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: G, color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: `0 0 0 10px ${G}22`,
                }}>
                  <svg width="26" height="26" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 style={{ fontFamily: FONT, fontWeight: 800, color: N, marginBottom: 10, fontSize: '1.2rem' }}>¡Mensaje enviado!</h3>
                <p style={{ fontFamily: FONT, color: '#5A6A80', fontSize: '.9rem', marginBottom: 20 }}>Nos pondremos en contacto contigo pronto.</p>
                <button onClick={() => setStatus('idle')} style={{
                  color: G, background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: FONT, fontSize: '.9rem', fontWeight: 700, textDecoration: 'underline',
                }}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: 'white', borderRadius: 16, padding: '36px 32px',
                border: '1px solid #E4EAF2',
                boxShadow: '0 4px 32px rgba(11,31,58,.06)',
              }}>
                {status === 'error' && (
                  <div style={{ background: '#FFF0EE', border: '1px solid #FFCCC5', color: '#8B1F0F', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: '.88rem', fontFamily: FONT }}>
                    Hubo un error al enviar. Escríbenos a contacto@habilidad.cl
                  </div>
                )}

                {[
                  { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre', required: true },
                  { name: 'correo', label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.cl', required: true },
                  { name: 'sector', label: 'Sector o industria', type: 'text', placeholder: 'Ej: construcción, salud, municipio…', required: false },
                ].map(({ name, label, type, placeholder, required }) => (
                  <div key={name} style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontFamily: FONT, fontWeight: 700, fontSize: '.8rem', marginBottom: 7, color: N, letterSpacing: '.03em' }}>{label}</label>
                    <input name={name} type={type} required={required} value={form[name]} onChange={handleChange}
                      placeholder={placeholder} style={inputBase}
                      onFocus={e => { e.target.style.borderColor = G; e.target.style.boxShadow = `0 0 0 3px ${G}22` }}
                      onBlur={e => { e.target.style.borderColor = '#D6DCE9'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontFamily: FONT, fontWeight: 700, fontSize: '.8rem', marginBottom: 7, color: N, letterSpacing: '.03em' }}>Cuéntanos tu necesidad</label>
                  <textarea name="mensaje" required rows={4} value={form.mensaje} onChange={handleChange}
                    placeholder="Describe brevemente el proyecto o desafío…"
                    style={{ ...inputBase, resize: 'vertical', minHeight: 110 }}
                    onFocus={e => { e.target.style.borderColor = G; e.target.style.boxShadow = `0 0 0 3px ${G}22` }}
                    onBlur={e => { e.target.style.borderColor = '#D6DCE9'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <button type="submit" disabled={status === 'sending'} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: G, color: 'white',
                  padding: '13px 22px', borderRadius: 8,
                  fontFamily: FONT, fontWeight: 800, fontSize: '.9rem',
                  border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.65 : 1,
                  boxShadow: '0 4px 0 #007a54',
                  transition: 'transform .12s',
                }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = '' }}
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                  {status !== 'sending' && (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
      <style>{`
        @media (max-width: 860px) { .contacto-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
