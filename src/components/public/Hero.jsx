const N = '#0B1F3A'
const G = '#00A676'
const B = '#2F5D9F'

export default function Hero() {
  return (
    <section id="inicio" style={{ background: `linear-gradient(155deg, ${N} 0%, #123058 60%, ${B} 130%)`, color: 'white', overflow: 'hidden', padding: '96px 0 120px', position: 'relative' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center' }}
        className="hero-grid">

        <div>
          <p style={{ color: '#5FE3B4', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem', marginBottom: 16 }}>
            Consultoría integral · Multisector
          </p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(2.1rem,4.2vw,3.4rem)', color: 'white', fontWeight: 800, marginBottom: 20, lineHeight: 1.2 }}>
            Diagnosticamos, diseñamos<br />
            <em style={{ fontStyle: 'normal', color: G }}>y controlamos</em> cada proyecto.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#D7DEE9', maxWidth: 520, marginBottom: 32, lineHeight: 1.6 }}>
            Asesoría en seguridad, desarrollo organizacional y control de proyectos, adaptada a la realidad de tu sector — sin plantillas genéricas.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: G, color: 'white', padding: '12px 22px', borderRadius: 6, fontWeight: 700, fontSize: '.9rem', textDecoration: 'none' }}>
              Conversemos hoy →
            </a>
            <a href="#servicios" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'transparent', color: 'white', padding: '12px 22px', borderRadius: 6, fontWeight: 700, fontSize: '.9rem', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.5)' }}>
              Ver servicios
            </a>
          </div>
        </div>

        <div style={{ maxWidth: 420, margin: '0 auto', width: '100%' }} aria-hidden="true">
          <svg viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg" width="100%">
            <polygon points="200,20 370,320 30,320" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2"/>
            <polygon points="200,90 320,300 80,300" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2"/>
            <polygon points="230,150 300,280 160,280" fill="#00A676" opacity="0.9"/>
            <circle cx="200" cy="20" r="6" fill="#5FE3B4"/>
            <circle cx="370" cy="320" r="6" fill="#5FE3B4"/>
            <circle cx="30" cy="320" r="6" fill="#5FE3B4"/>
          </svg>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}
