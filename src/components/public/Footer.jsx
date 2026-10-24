import { Link } from 'react-router-dom'

const N    = '#0B1F3A'
const G    = '#00A676'
const FONT = "'Century Gothic','Trebuchet MS','Nunito',sans-serif"

const servicios = [
  { label: 'Consultoría Estratégica', code: 'CE' },
  { label: 'Seguridad y Riesgos',     code: 'SR' },
  { label: 'Desarrollo Organizacional', code: 'DO' },
  { label: 'Seguimiento de Proyectos', code: 'SP' },
]

function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <polygon points="24,4 44,40 4,40" fill="white" opacity=".9"/>
      <polygon points="24,18 36,40 12,40" fill={G}/>
      <circle cx="24" cy="4" r="2.2" fill={G}/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#071527', color: '#7A91AB' }}>

      {/* ── Main footer ── */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '52px 28px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 48 }} className="footer-grid">

          {/* Brand col */}
          <div>
            <a href="#inicio" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 18 }}>
              <Logo size={32}/>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontFamily: FONT, fontWeight: 800, color: 'white', fontSize: '.96rem', letterSpacing: '.06em' }}>HABILIDAD</span>
                <span style={{ fontFamily: FONT, fontWeight: 600, color: '#4A6A8A', fontSize: '.5rem', letterSpacing: '.22em', marginTop: 2 }}>CONSULTORES</span>
              </span>
            </a>
            <p style={{ fontFamily: FONT, fontSize: '.85rem', lineHeight: 1.75, maxWidth: 300, color: '#5A7A9A' }}>
              Consultoría integral en seguridad, desarrollo organizacional y control de proyectos — adaptada a tu sector, con rigor y cercanía.
            </p>
            <div style={{ marginTop: 24 }}>
              <a href="mailto:contacto@habilidad.cl" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                fontFamily: FONT, color: '#5A7A9A', textDecoration: 'none', fontSize: '.84rem',
                transition: 'color .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = G }}
                onMouseLeave={e => { e.currentTarget.style.color = '#5A7A9A' }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                contacto@habilidad.cl
              </a>
            </div>
          </div>

          {/* Servicios col */}
          <div>
            <p style={{ fontFamily: FONT, fontWeight: 800, color: 'white', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18 }}>Servicios</p>
            <ul style={{ listStyle: 'none' }}>
              {servicios.map(({ label, code }) => (
                <li key={code} style={{ marginBottom: 12 }}>
                  <a href="#servicios" style={{
                    fontFamily: FONT, color: '#5A7A9A', textDecoration: 'none', fontSize: '.86rem',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    transition: 'color .15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = G }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5A7A9A' }}
                  >
                    <span style={{ fontFamily: FONT, fontSize: '.62rem', color: G, fontWeight: 800, letterSpacing: '.06em' }}>{code}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Accesos col */}
          <div>
            <p style={{ fontFamily: FONT, fontWeight: 800, color: 'white', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18 }}>Accesos</p>
            <ul style={{ listStyle: 'none' }}>
              {[
                { href: '#inicio',    label: 'Inicio' },
                { href: '#nosotros',  label: 'Nosotros' },
                { href: '#contacto',  label: 'Contacto' },
              ].map(({ href, label }) => (
                <li key={label} style={{ marginBottom: 12 }}>
                  <a href={href} style={{
                    fontFamily: FONT, color: '#5A7A9A', textDecoration: 'none', fontSize: '.86rem',
                    transition: 'color .15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = G }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5A7A9A' }}
                  >{label}</a>
                </li>
              ))}
              <li style={{ marginTop: 4 }}>
                <Link to="/login" style={{
                  fontFamily: FONT, color: G, textDecoration: 'none', fontSize: '.86rem', fontWeight: 700,
                }}>Ingresar al sistema →</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontFamily: FONT, fontSize: '.76rem', color: 'rgba(90,122,154,.6)' }}>
            © {new Date().getFullYear()} Habilidad Consultores — La Serena, Región de Coquimbo, Chile
          </span>
          <span style={{ fontFamily: FONT, fontSize: '.76rem', color: 'rgba(90,122,154,.45)' }}>
            Sistema de Gestión Integral · ISO 9001:2015
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr !important; gap: 32px; } }
      `}</style>
    </footer>
  )
}
