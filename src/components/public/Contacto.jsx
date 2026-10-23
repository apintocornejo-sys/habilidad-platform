import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const N = '#0B1F3A'
const G = '#00A676'

const initialForm = { nombre: '', correo: '', sector: '', mensaje: '' }

export default function Contacto() {
  const [form, setForm] = useState(initialForm)
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

  const inputStyle = { width: '100%', padding: '12px 14px', border: '1px solid #D6DCE3', borderRadius: 6, fontFamily: "'Open Sans',sans-serif", fontSize: '.92rem' }

  return (
    <section id="contacto" style={{ padding: '88px 0', background: '#F5F7FA' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 56 }} className="contacto-grid">
        <div>
          <p style={{ color: G, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem' }}>Contacto</p>
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', color: N, marginTop: 10, marginBottom: 20, lineHeight: 1.2 }}>
            Conversemos sobre tu proyecto
          </h2>
          <div style={{ marginBottom: 24 }}>
            <strong style={{ display: 'block', fontFamily: "'Montserrat',sans-serif", color: N, fontSize: '.95rem', marginBottom: 4 }}>Correo</strong>
            contacto@habilidad.cl
          </div>
          <div style={{ marginBottom: 24 }}>
            <strong style={{ display: 'block', fontFamily: "'Montserrat',sans-serif", color: N, fontSize: '.95rem', marginBottom: 4 }}>Ubicación</strong>
            La Serena, Región de Coquimbo, Chile
          </div>
          <div>
            <strong style={{ display: 'block', fontFamily: "'Montserrat',sans-serif", color: N, fontSize: '.95rem', marginBottom: 4 }}>Cobertura</strong>
            Atención a organizaciones a nivel nacional
          </div>
        </div>

        <div>
          {status === 'success' ? (
            <div style={{ background: 'white', borderRadius: 10, padding: 32, border: '1px solid #D6DCE3', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: G, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 style={{ fontFamily: "'Montserrat',sans-serif", color: N, marginBottom: 8 }}>Mensaje enviado</h3>
              <p style={{ color: '#4B5259', fontSize: '.9rem' }}>Nos pondremos en contacto contigo pronto.</p>
              <button onClick={() => setStatus('idle')} style={{ marginTop: 16, color: G, background: 'none', border: 'none', cursor: 'pointer', fontSize: '.9rem', textDecoration: 'underline' }}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 10, padding: 32, border: '1px solid #E7EAEE' }}>
              {status === 'error' && (
                <div style={{ background: '#FFF0EE', border: '1px solid #FFCCC5', color: '#8B1F0F', borderRadius: 6, padding: '12px 16px', marginBottom: 16, fontSize: '.9rem' }}>
                  Hubo un error al enviar. Escríbenos directamente a contacto@habilidad.cl
                </div>
              )}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '.85rem', marginBottom: 6, color: N }}>Nombre</label>
                <input name="nombre" type="text" required value={form.nombre} onChange={handleChange} style={inputStyle} placeholder="Tu nombre" />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '.85rem', marginBottom: 6, color: N }}>Correo</label>
                <input name="correo" type="email" required value={form.correo} onChange={handleChange} style={inputStyle} placeholder="tu@correo.cl" />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '.85rem', marginBottom: 6, color: N }}>Sector</label>
                <input name="sector" type="text" value={form.sector} onChange={handleChange} style={inputStyle} placeholder="Ej: construcción, salud, sector público" />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '.85rem', marginBottom: 6, color: N }}>Cuéntanos tu necesidad</label>
                <textarea name="mensaje" required rows={4} value={form.mensaje} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />
              </div>
              <button type="submit" disabled={status === 'sending'}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: G, color: 'white', padding: '12px 22px', borderRadius: 6, fontWeight: 700, fontSize: '.9rem', border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.6 : 1 }}>
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width:880px) { .contacto-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
