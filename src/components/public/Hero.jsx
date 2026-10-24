const N    = '#0B1F3A'
const G    = '#00A676'
const B    = '#2F5D9F'
const FONT = "'Century Gothic','Trebuchet MS','Nunito',sans-serif"

const stats = [
  { value: '4',    label: 'Áreas de servicio' },
  { value: '100%', label: 'Planes a medida' },
  { value: '360°', label: 'Visión integral' },
]

export default function Hero() {
  return (
    <section id="inicio" style={{
      background: `linear-gradient(148deg, ${N} 0%, #102847 55%, ${B} 130%)`,
      color: 'white', overflow: 'hidden', padding: '104px 0 96px',
      position: 'relative',
    }}>

      {/* ── Fondo geométrico decorativo ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* triángulo grande translúcido */}
        <svg style={{ position: 'absolute', right: '-4%', top: '-8%', opacity: .07 }} width="640" height="640" viewBox="0 0 640 640">
          <polygon points="320,0 640,640 0,640" fill="white"/>
        </svg>
        {/* círculo verde — accent */}
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, ${G}22 0%, transparent 70%)`, right: '8%', top: '15%' }}/>
        {/* líneas diagonales tenues */}
        <svg style={{ position: 'absolute', left: 0, bottom: 0, opacity: .04 }} width="400" height="300" viewBox="0 0 400 300">
          {[0,40,80,120,160].map(o => <line key={o} x1={o} y1="300" x2={o+220} y2="0" stroke="white" strokeWidth="1.5"/>)}
        </svg>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 56, alignItems: 'center' }} className="hero-grid">

          {/* ── Copy ── */}
          <div className="anim-fade-up">
            {/* tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,166,118,.18)', border: '1px solid rgba(0,166,118,.35)',
              color: '#5FE3B4', borderRadius: 100, padding: '5px 14px',
              fontFamily: FONT, fontWeight: 700, fontSize: '.72rem', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 22,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5FE3B4', display: 'inline-block' }}/>
              Consultoría integral · Multisector
            </div>

            <h1 style={{
              fontFamily: FONT, fontWeight: 900,
              fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
              lineHeight: 1.18, marginBottom: 22, color: 'white',
              letterSpacing: '-.01em',
            }}>
              Diagnosticamos,<br/>
              diseñamos <em style={{ fontStyle: 'normal', color: G }}>y controlamos</em><br/>
              cada proyecto.
            </h1>

            <p style={{
              fontFamily: FONT, fontSize: '1.05rem', color: '#B8CAE0',
              maxWidth: 510, marginBottom: 36, lineHeight: 1.7,
            }}>
              Asesoría en seguridad, desarrollo organizacional y control de proyectos, adaptada a la realidad de tu sector — sin plantillas genéricas.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 52 }}>
              <a href="#contacto" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                backgroundColor: G, color: 'white',
                padding: '13px 26px', borderRadius: 8,
                fontFamily: FONT, fontWeight: 800, fontSize: '.9rem',
                textDecoration: 'none',
                boxShadow: `0 4px 0 #007a54, 0 8px 24px rgba(0,166,118,.35)`,
                transition: 'transform .12s, box-shadow .12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = '' }}
              >
                Conversemos hoy
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="#servicios" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(255,255,255,.06)',
                color: 'white', padding: '13px 26px', borderRadius: 8,
                fontFamily: FONT, fontWeight: 700, fontSize: '.9rem',
                textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.2)',
                backdropFilter: 'blur(8px)',
                transition: 'background .15s, border-color .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)' }}
              >Ver servicios</a>
            </div>

            {/* ── Mini stats strip ── */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {stats.map(({ value, label }, i) => (
                <div key={i} style={{ borderLeft: i ? '1px solid rgba(255,255,255,.12)' : 'none', paddingLeft: i ? 32 : 0 }}>
                  <span style={{ display: 'block', fontFamily: FONT, fontWeight: 900, fontSize: '1.7rem', color: G, lineHeight: 1 }}>{value}</span>
                  <span style={{ fontFamily: FONT, fontSize: '.72rem', color: '#8DA8C4', letterSpacing: '.06em' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Gráfico triangular ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }} aria-hidden="true" className="hero-graphic">
            <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 420 }}>
              <defs>
                <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={G} stopOpacity=".9"/>
                  <stop offset="100%" stopColor={B} stopOpacity=".7"/>
                </linearGradient>
                <filter id="hshadow">
                  <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor={G} floodOpacity=".3"/>
                </filter>
              </defs>
              {/* triángulos de contorno */}
              <polygon points="200,16 376,336 24,336" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>
              <polygon points="200,72 340,316 60,316" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
              {/* triángulo sólido principal */}
              <polygon points="200,130 310,306 90,306" fill="url(#hg1)" filter="url(#hshadow)"/>
              {/* triángulo pequeño interior */}
              <polygon points="200,168 268,296 132,296" fill={N} opacity=".5"/>
              {/* vértices iluminados */}
              <circle cx="200" cy="16"  r="5" fill={G}/>
              <circle cx="376" cy="336" r="5" fill="#5FE3B4"/>
              <circle cx="24"  cy="336" r="5" fill="#5FE3B4"/>
              {/* etiquetas de ciclo */}
              {[
                { x: 200, y:  6, label: 'Diagnóstico', anchor: 'middle', dy: -14 },
                { x: 390, y: 346, label: 'Diseño',      anchor: 'start',  dy:  18 },
                { x:  10, y: 346, label: 'Control',     anchor: 'end',    dy:  18 },
              ].map(({ x, y, label, anchor, dy }) => (
                <text key={label} x={x} y={y + dy}
                  textAnchor={anchor} fill="rgba(255,255,255,.55)"
                  fontSize="11" fontFamily={FONT} fontWeight="600">{label}</text>
              ))}
            </svg>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-graphic { display: none; }
        }
      `}</style>
    </section>
  )
}
