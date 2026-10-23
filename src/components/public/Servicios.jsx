const G = '#00A676'
const N = '#0B1F3A'

const servicios = [
  {
    titulo: 'Consultoría Estratégica',
    desc: 'Diagnóstico y hoja de ruta a la medida de tu organización.',
    href: '#contacto',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="M12 3v2M21 12h-2M12 21v-2M3 12h2"/></svg>,
  },
  {
    titulo: 'Seguridad y Riesgos',
    desc: 'Sistemas de prevención y cumplimiento normativo integral.',
    href: '#contacto',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>,
  },
  {
    titulo: 'Desarrollo Organizacional',
    desc: 'Equipos, procesos y cultura orientados a resultados.',
    href: '#contacto',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M12 8.5v4M12 12.5L6.8 16M12 12.5L17.2 16"/></svg>,
  },
  {
    titulo: 'Seguimiento de Proyectos',
    desc: 'Trazabilidad de avances, hitos y responsables en tiempo real.',
    href: '#contacto',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M7 14h4M7 17h7"/></svg>,
  },
]

export default function Servicios() {
  return (
    <section id="servicios" style={{ padding: '88px 0', background: 'white' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <p style={{ color: G, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem' }}>Nuestros servicios</p>
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', color: N, marginTop: 10, lineHeight: 1.2 }}>
            Un marco, adaptable a cualquier sector
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="servicios-grid">
          {servicios.map(({ icon, titulo, desc, href }) => (
            <a key={titulo} href={href} style={{ display: 'block', textDecoration: 'none', background: '#F5F7FA', borderRadius: 10, padding: '28px 22px', borderTop: `3px solid ${G}`, transition: 'transform .15s ease, box-shadow .15s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(11,31,58,.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
              <div style={{ marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '1.02rem', color: N, marginBottom: 10 }}>{titulo}</h3>
              <p style={{ fontSize: '.9rem', color: '#4B5259', lineHeight: 1.6 }}>{desc}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, padding: '9px 16px', background: G, color: 'white', fontWeight: 700, fontSize: '.82rem', borderRadius: 6, boxShadow: '0 3px 0 #007a54' }}>
                Ver más →
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .servicios-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .servicios-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
