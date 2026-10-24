const N    = '#0B1F3A'
const G    = '#00A676'
const B    = '#2F5D9F'
const FONT = "'Century Gothic','Trebuchet MS','Nunito',sans-serif"

const ciclo = [
  { num: '01', titulo: 'Diagnóstico',     desc: 'Levantamos brechas reales, no supuestos. Entendemos tu organización antes de proponer.' },
  { num: '02', titulo: 'Diseño',          desc: 'Plan de acción medible, con hitos, plazos y dueños claros. Sin ambigüedad.' },
  { num: '03', titulo: 'Implementación',  desc: 'Ejecutamos junto a tu equipo, no en su reemplazo. Transferimos capacidad.' },
  { num: '04', titulo: 'Control',         desc: 'Seguimiento continuo de indicadores y ajuste sobre la marcha cuando el contexto cambia.' },
]

const stats = [
  { value: '4',    label: 'Etapas de control por proyecto', icon: '◈' },
  { value: '100%', label: 'Planes a medida del sector',     icon: '◎' },
  { value: '1',    label: 'Interlocutor directo, sin intermediarios', icon: '◉' },
  { value: '360°', label: 'Visión integral del proyecto',   icon: '◐' },
]

const checks = [
  'Metodología adaptable, no genérica',
  'Seguimiento activo, no solo informes',
  'Un solo interlocutor durante todo el proyecto',
  'Resultados medibles desde el primer hito',
  'Normativa chilena vigente integrada al proceso',
]

export default function PorQue() {
  return (
    <>
      {/* ══════════ Ciclo PDCA ══════════ */}
      <section style={{ background: N, color: 'white', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>

        {/* decoración de fondo */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', right: '-6%', bottom: '-10%', opacity: .04 }} width="560" height="560" viewBox="0 0 560 560">
            <polygon points="280,0 560,560 0,560" fill="white"/>
          </svg>
        </div>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 600, marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 2, background: G, borderRadius: 2 }}/>
              <span style={{ fontFamily: FONT, color: G, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', fontSize: '.72rem' }}>Cómo trabajamos</span>
            </div>
            <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.7rem,2.8vw,2.4rem)', color: 'white', lineHeight: 1.18, letterSpacing: '-.01em' }}>
              El ciclo de control Habilidad
            </h2>
            <p style={{ fontFamily: FONT, color: '#8DA8C4', marginTop: 12, lineHeight: 1.7, fontSize: '.95rem' }}>
              Cuatro etapas que se repiten en cada proyecto, sin importar el sector. Basado en el ciclo PDCA ISO 9001.
            </p>
          </div>

          {/* ── Steps ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }} className="ciclo-row">
            {/* línea conectora */}
            <div style={{ position: 'absolute', top: 27, left: '6.5%', right: '6.5%', height: 1, background: 'linear-gradient(90deg,rgba(0,166,118,.8),rgba(47,93,159,.5),rgba(0,166,118,.3))', zIndex: 0 }} className="ciclo-line"/>

            {ciclo.map(({ num, titulo, desc }, i) => (
              <div key={num} style={{ position: 'relative', zIndex: 1, padding: '0 18px' }}>
                {/* circle */}
                <div style={{
                  width: 54, height: 54, borderRadius: '50%',
                  background: i === 0 ? G : 'rgba(255,255,255,.06)',
                  border: `2px solid ${i === 0 ? G : 'rgba(255,255,255,.18)'}`,
                  color: i === 0 ? N : G,
                  fontFamily: FONT, fontWeight: 900, fontSize: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 22,
                  boxShadow: i === 0 ? `0 0 0 8px rgba(0,166,118,.18), 0 0 0 16px rgba(0,166,118,.07)` : 'none',
                }}>{num}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: '1rem', color: 'white' }}>{titulo}</span>
                </div>
                <p style={{ fontFamily: FONT, fontSize: '.84rem', color: '#8DA8C4', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) { .ciclo-row { grid-template-columns: 1fr 1fr !important; row-gap: 36px; } .ciclo-line { display: none; } }
          @media (max-width: 480px) { .ciclo-row { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══════════ Nosotros ══════════ */}
      <section id="nosotros" style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="nosotros-grid">

          {/* copy */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 2, background: G, borderRadius: 2 }}/>
              <span style={{ fontFamily: FONT, color: G, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', fontSize: '.72rem' }}>Nosotros</span>
            </div>
            <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.7rem,2.8vw,2.4rem)', color: N, lineHeight: 1.18, letterSpacing: '-.01em' }}>
              Cercanía técnica,<br/>no burocracia
            </h2>
            <p style={{ fontFamily: FONT, marginTop: 16, color: '#5A6A80', lineHeight: 1.75, fontSize: '.97rem' }}>
              Habilidad nace para llevar a organizaciones de cualquier tamaño y sector una consultoría rigurosa, sin la rigidez de las grandes firmas.
            </p>
            <ul style={{ listStyle: 'none', marginTop: 28 }}>
              {checks.map((c) => (
                <li key={c} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 22, height: 22, minWidth: 22, borderRadius: '50%',
                    background: G + '18', color: G,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.65rem', fontWeight: 800, marginTop: 1,
                  }}>✓</span>
                  <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: '.93rem', color: '#2A3A4E', lineHeight: 1.5 }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {stats.map(({ value, label, icon }) => (
              <div key={label} style={{
                background: '#F4F7FB', borderRadius: 14, padding: '28px 24px',
                border: '1px solid #E4EAF2', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -8, right: -4,
                  fontFamily: FONT, fontSize: '3.5rem', color: N, opacity: .04, lineHeight: 1,
                }}>{icon}</div>
                <strong style={{
                  display: 'block', fontFamily: FONT, fontWeight: 900,
                  fontSize: '2.2rem', color: N, lineHeight: 1,
                  marginBottom: 8,
                }}>{value}</strong>
                <span style={{ fontFamily: FONT, fontSize: '.78rem', color: '#5A6A80', lineHeight: 1.45, fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>

        </div>
        <style>{`
          @media (max-width: 860px) { .nosotros-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  )
}
