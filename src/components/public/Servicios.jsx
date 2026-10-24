const G    = '#00A676'
const N    = '#0B1F3A'
const B    = '#2F5D9F'
const FONT = "'Century Gothic','Trebuchet MS','Nunito',sans-serif"

const servicios = [
  {
    titulo: 'Consultoría Estratégica',
    codigo: 'CE',
    color: B,
    desc: 'Diagnóstico organizacional, hoja de ruta y plan de negocio a la medida de tu sector.',
    items: ['Diagnóstico de brechas', 'Plan estratégico', 'Indicadores de resultado'],
    icon: (c) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>
        <path d="M12 3v2M21 12h-2M12 21v-2M3 12h2"/>
      </svg>
    ),
  },
  {
    titulo: 'Seguridad y Riesgos',
    codigo: 'SR',
    color: '#E8530E',
    desc: 'Sistemas de prevención, cumplimiento normativo y gestión de riesgos laboral.',
    items: ['Evaluación IPER', 'Plan de emergencias', 'Ley 16.744 / DS 594'],
    icon: (c) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    titulo: 'Desarrollo Organizacional',
    codigo: 'DO',
    color: G,
    desc: 'Equipos, procesos y cultura orientados a resultados sostenibles.',
    items: ['Capacitación y clima', 'Rediseño de procesos', 'Cambio organizacional'],
    icon: (c) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="6" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/>
        <path d="M12 8.5v4M12 12.5L6.8 16M12 12.5L17.2 16"/>
      </svg>
    ),
  },
  {
    titulo: 'Seguimiento de Proyectos',
    codigo: 'SP',
    color: '#8B5CF6',
    desc: 'Trazabilidad de avances, hitos y responsables en tiempo real para tu organización.',
    items: ['PMO / control de hitos', 'Informes de avance', 'Gestión de riesgos'],
    icon: (c) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path d="M3 10h18M8 3v4M16 3v4M7 14h4M7 17h7"/>
      </svg>
    ),
  },
]

export default function Servicios() {
  return (
    <section id="servicios" style={{ padding: '100px 0', background: '#F4F7FB' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>

        {/* ── Header ── */}
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 2, background: G, borderRadius: 2 }}/>
            <span style={{ fontFamily: FONT, color: G, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', fontSize: '.72rem' }}>Nuestros servicios</span>
          </div>
          <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.7rem,2.8vw,2.4rem)', color: N, lineHeight: 1.18, letterSpacing: '-.01em' }}>
            Un marco, adaptable<br/>a cualquier sector
          </h2>
          <p style={{ fontFamily: FONT, color: '#5A6A80', marginTop: 14, lineHeight: 1.7, fontSize: '.97rem' }}>
            Cada área opera con el ciclo PDCA de Habilidad: diagnóstico, diseño, ejecución y control continuo.
          </p>
        </div>

        {/* ── Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }} className="serv-grid">
          {servicios.map(({ icon, titulo, codigo, color, desc, items }) => (
            <a key={titulo} href="#contacto" style={{
              display: 'flex', flexDirection: 'column',
              textDecoration: 'none', background: 'white',
              borderRadius: 14, padding: '28px 24px 24px',
              border: '1px solid #E4EAF2',
              transition: 'transform .18s ease, box-shadow .18s ease, border-color .18s ease',
              position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(11,31,58,.12)`
                e.currentTarget.style.borderColor = color
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
                e.currentTarget.style.borderColor = '#E4EAF2'
              }}
            >
              {/* barra superior de color */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color, borderRadius: '14px 14px 0 0' }}/>

              {/* badge código */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                background: color + '18', color, borderRadius: 6,
                fontFamily: FONT, fontWeight: 800, fontSize: '.65rem',
                letterSpacing: '.1em', padding: '3px 8px',
              }}>{codigo}</div>

              {/* icono */}
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                {icon(color)}
              </div>

              <h3 style={{ fontFamily: FONT, fontWeight: 800, fontSize: '1rem', color: N, marginBottom: 10, lineHeight: 1.3 }}>{titulo}</h3>
              <p style={{ fontFamily: FONT, fontSize: '.88rem', color: '#5A6A80', lineHeight: 1.65, marginBottom: 18, flexGrow: 1 }}>{desc}</p>

              {/* mini lista */}
              <ul style={{ listStyle: 'none', marginBottom: 20 }}>
                {items.map(it => (
                  <li key={it} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontFamily: FONT, fontSize: '.8rem', color: '#4B5870', marginBottom: 6 }}>
                    <span style={{ color, fontWeight: 800, lineHeight: 1.5, fontSize: '.7rem' }}>▶</span>
                    {it}
                  </li>
                ))}
              </ul>

              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', background: color, color: 'white',
                fontFamily: FONT, fontWeight: 800, fontSize: '.8rem',
                borderRadius: 8, boxShadow: `0 3px 0 ${color}aa`,
                alignSelf: 'flex-start',
              }}>
                Ver más
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .serv-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 520px) { .serv-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
