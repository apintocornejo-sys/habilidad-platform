import { Link } from 'react-router-dom'

const N = '#0B1F3A'
const G = '#00A676'

const servicios = [
  'Consultoría Estratégica',
  'Seguridad y Riesgos',
  'Desarrollo Organizacional',
  'Seguimiento de Proyectos',
]

export default function Footer() {
  return (
    <footer style={{ background: N, color: '#B9C3D1', padding: '40px 0', fontSize: '.85rem' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 4 L34 32 H6 Z" fill="#FFFFFF"/>
            <path d="M22 18 L30 32 H14 Z" fill="#00A676"/>
          </svg>
          <span style={{ color: 'white', fontWeight: 700 }}>Habilidad Consultores</span>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {servicios.map((s) => (
            <a key={s} href="#servicios" style={{ color: '#B9C3D1', textDecoration: 'none' }}>{s}</a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/login" style={{ color: '#B9C3D1', textDecoration: 'none' }}>Ingresar</Link>
          <a href="mailto:contacto@habilidad.cl" style={{ color: '#B9C3D1', textDecoration: 'none' }}>contacto@habilidad.cl</a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', marginTop: 24 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: '.8rem', color: 'rgba(185,195,209,.6)' }}>
          <span>© {new Date().getFullYear()} Habilidad Consultores — La Serena, Chile</span>
          <span>contacto@habilidad.cl</span>
        </div>
      </div>
    </footer>
  )
}
