import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { href: '#inicio',    label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros',  label: 'Nosotros' },
  { href: '#contacto',  label: 'Contacto' },
]

const N = '#0B1F3A'
const G = '#00A676'
const W = 'white'
const FONT = "'Century Gothic','Trebuchet MS','Nunito',sans-serif"

/* ── Logo SVG mejorado ─────────────────────────────────── */
function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* glow sutil */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* triángulo exterior blanco */}
      <polygon points="24,4 44,40 4,40" fill={W} opacity=".95" filter="url(#glow)"/>
      {/* triángulo interior verde — marca el ángulo del método */}
      <polygon points="24,18 36,40 12,40" fill={G}/>
      {/* punto apex */}
      <circle cx="24" cy="4" r="2.2" fill={G}/>
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bg = scrolled
    ? 'rgba(11,31,58,0.97)'
    : N
  const shadow = scrolled ? '0 4px 24px rgba(11,31,58,.35)' : 'none'

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      backgroundColor: bg,
      borderBottom: '1px solid rgba(255,255,255,.08)',
      boxShadow: shadow,
      transition: 'background .3s, box-shadow .3s',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

        {/* ── Brand ── */}
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Logo size={36}/>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: FONT, fontWeight: 800, color: W, fontSize: '1rem', letterSpacing: '.06em' }}>HABILIDAD</span>
            <span style={{ fontFamily: FONT, fontWeight: 600, color: '#8DA8C4', fontSize: '.52rem', letterSpacing: '.22em', marginTop: 2 }}>CONSULTORES</span>
          </span>
        </a>

        {/* ── Nav desktop ── */}
        <nav style={{ display: 'flex', gap: 28 }} className="hb-nav-desktop">
          {links.map(({ href, label }) => (
            <a key={href} href={href} style={{
              fontFamily: FONT, fontWeight: 600, fontSize: '.86rem',
              color: 'rgba(255,255,255,.82)', textDecoration: 'none',
              letterSpacing: '.04em', transition: 'color .15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = W }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.82)' }}
            >{label}</a>
          ))}
        </nav>

        {/* ── CTA ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="#contacto" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            backgroundColor: G, color: W,
            padding: '9px 18px', borderRadius: 7,
            fontFamily: FONT, fontWeight: 700, fontSize: '.82rem',
            textDecoration: 'none', whiteSpace: 'nowrap',
            boxShadow: `0 3px 0 #007a54`,
            transition: 'transform .12s, box-shadow .12s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 0 #007a54' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 0 #007a54' }}
          >Conversemos</a>

          <Link to="/login" style={{
            fontFamily: FONT, fontSize: '.82rem', color: '#8DA8C4',
            textDecoration: 'none', padding: '9px 14px',
            border: '1px solid rgba(255,255,255,.18)', borderRadius: 7,
            whiteSpace: 'nowrap', transition: 'color .15s, border-color .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = W; e.currentTarget.style.borderColor = 'rgba(255,255,255,.4)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8DA8C4'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.18)' }}
          >Ingresar</Link>

          <button onClick={() => setOpen(!open)} aria-label="Menú"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 6, lineHeight: 0 }}
            className="hb-menu-btn">
            <svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div style={{ backgroundColor: '#071527', borderTop: '1px solid rgba(255,255,255,.08)', padding: '18px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              style={{ fontFamily: FONT, color: '#C5D8EB', textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>{label}</a>
          ))}
          <hr style={{ borderColor: 'rgba(255,255,255,.08)' }} />
          <Link to="/login" onClick={() => setOpen(false)}
            style={{ fontFamily: FONT, color: '#8DA8C4', textDecoration: 'none', fontSize: '.86rem' }}>Ingresar</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hb-nav-desktop { display: none !important; }
          .hb-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
