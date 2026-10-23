const N = '#0B1F3A'
const G = '#00A676'

const ciclo = [
  { num: '01', titulo: 'Diagnóstico', desc: 'Levantamos brechas reales, no supuestos.' },
  { num: '02', titulo: 'Diseño',      desc: 'Plan de acción medible y con dueños claros.' },
  { num: '03', titulo: 'Implementación', desc: 'Ejecutamos junto a tu equipo, no en su reemplazo.' },
  { num: '04', titulo: 'Control',     desc: 'Seguimiento continuo y ajuste sobre la marcha.' },
]

const stats = [
  { value: '4',    label: 'Etapas de control por proyecto' },
  { value: '100%', label: 'Planes a medida del sector' },
  { value: '1',    label: 'Interlocutor directo, sin intermediarios' },
  { value: '360°', label: 'Visión integral del proyecto' },
]

const checks = [
  'Metodología adaptable, no genérica',
  'Seguimiento activo, no solo informes',
  'Un solo interlocutor durante todo el proyecto',
  'Resultados medibles desde el primer hito',
]

export default function PorQue() {
  return (
    <>
      {/* Ciclo de control */}
      <section style={{ background: N, color: 'white', padding: '96px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <p style={{ color: '#5FE3B4', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem' }}>Cómo trabajamos</p>
            <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', color: 'white', marginTop: 10, lineHeight: 1.2 }}>
              El ciclo de control Habilidad
            </h2>
            <p style={{ color: '#C9D3E0', marginTop: 12 }}>Cuatro etapas que se repiten en cada proyecto, sin importar el sector.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }} className="ciclo-row">
            <div style={{ position: 'absolute', top: 29, left: '6%', right: '6%', height: 2, background: 'rgba(255,255,255,.18)' }} className="ciclo-line" />
            {ciclo.map(({ num, titulo, desc }) => (
              <div key={num} style={{ position: 'relative', zIndex: 1, padding: '0 16px' }}>
                <div style={{ width: 58, height: 58, borderRadius: '50%', background: G, color: N, fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{num}</div>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", color: 'white', fontSize: '1.05rem', marginBottom: 8 }}>{titulo}</h3>
                <p style={{ color: '#C9D3E0', fontSize: '.88rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width:880px) { .ciclo-row { grid-template-columns: 1fr 1fr !important; row-gap: 32px; } .ciclo-line { display: none; } }
        `}</style>
      </section>

      {/* Nosotros */}
      <section id="nosotros" style={{ padding: '88px 0', background: 'white' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="nosotros-grid">
          <div>
            <p style={{ color: G, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem' }}>Nosotros</p>
            <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', color: N, marginTop: 10, lineHeight: 1.2 }}>
              Cercanía técnica, no burocracia
            </h2>
            <p style={{ marginTop: 14, color: '#4B5259', lineHeight: 1.6 }}>
              Habilidad nace para llevar a organizaciones de cualquier tamaño y sector una consultoría rigurosa, sin la rigidez de las grandes firmas.
            </p>
            <ul style={{ listStyle: 'none', marginTop: 24 }}>
              {checks.map((c) => (
                <li key={c} style={{ display: 'flex', gap: 12, marginBottom: 14, fontWeight: 600, fontSize: '.96rem' }}>
                  <span style={{ color: G, fontWeight: 800 }}>✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#F5F7FA', borderRadius: 10, padding: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <strong style={{ display: 'block', fontFamily: "'Montserrat',sans-serif", fontSize: '2rem', color: N }}>{value}</strong>
                <span style={{ fontSize: '.82rem', color: '#4B5259' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width:880px) { .nosotros-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  )
}
