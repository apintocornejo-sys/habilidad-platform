import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { href: '#inicio',   label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

const N = '#0B1F3A'
const G = '#00A676'
const W = 'white'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: N, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: W, fontSize: '1rem', textDecoration: 'none' }}>
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 4 L34 32 H6 Z" fill="#FFFFFF"/>
            <path d="M22 18 L30 32 H14 Z" fill="#00A676"/>
          </svg>
          <span>HABILIDAD <span style={{ display: 'block', fontFamily: "'Open Sans',sans-serif", fontWeight: 600, fontSize: '.52rem', letterSpacing: '.18em', color: '#B9C3D1' }}>CONSULTORES</span></span>
        </a>

        <nav style={{ display: 'flex', gap: 24 }} className="hidden-mobile">
          {links.map(({ href, label }) => (
            <a key={href} href={href} style={{ fontWeight: 600, fontSize: '.88rem', color: W, textDecoration: 'none' }}>{label}</a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="#contacto"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: G, color: W, padding: '8px 14px', borderRadius: 6, fontWeight: 700, fontSize: '.8rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Conversemos
          </a>
          <Link to="/login"
            style={{ fontSize: '.8rem', color: '#C5D8EB', textDecoration: 'none', padding: '8px 14px', border: '1px solid rgba(255,255,255,.25)', borderRadius: 6, whiteSpace: 'nowrap' }}>
            Ingresar
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menú"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            className="menu-toggle-btn">
            <svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div style={{ backgroundColor: '#071527', borderTop: '1px solid rgba(255,255,255,.1)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ color: '#C5D8EB', textDecoration: 'none', fontWeight: 600, fontSize: '.88rem' }}>{label}</a>
          ))}
          <hr style={{ borderColor: 'rgba(255,255,255,.1)' }} />
          <Link to="/login" onClick={() => setOpen(false)} style={{ color: '#C5D8EB', textDecoration: 'none', fontSize: '.88rem' }}>Ingresar</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .menu-toggle-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
