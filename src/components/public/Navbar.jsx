import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { to: '/#servicios', label: 'Servicios' },
  { to: '/#por-que',   label: '¿Por qué nosotros?' },
  { to: '/#contacto',  label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: '#1B3A5C', color: 'white' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        <Link to="/" className="flex items-center gap-2 shrink-0 no-underline">
          <span className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm text-white"
            style={{ backgroundColor: '#2A7F62' }}>H</span>
          <span className="font-semibold text-lg tracking-tight leading-none" style={{ color: 'white' }}>
            Habilidad<span style={{ color: '#5CB49A', fontWeight: 400 }}> Chile</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <a key={to} href={to} className="text-sm" style={{ color: '#C5D8EB' }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = '#C5D8EB'}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm" style={{ color: '#C5D8EB' }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = '#C5D8EB'}>
            Iniciar sesión
          </Link>
          <a href="/#contacto"
            className="text-sm font-medium px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: '#2A7F62' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5CB49A'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2A7F62'}>
            Contáctanos
          </a>
        </div>

        <button className="md:hidden p-2 rounded" style={{ color: '#C5D8EB' }}
          onClick={() => setOpen(!open)} aria-label="Menú">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 py-4 flex flex-col gap-4"
          style={{ backgroundColor: '#0D2038', borderTop: '1px solid rgba(78,126,168,0.2)' }}>
          {links.map(({ to, label }) => (
            <a key={to} href={to} onClick={() => setOpen(false)}
              className="text-sm" style={{ color: '#C5D8EB' }}>
              {label}
            </a>
          ))}
          <hr style={{ borderColor: 'rgba(78,126,168,0.2)' }} />
          <Link to="/login" onClick={() => setOpen(false)}
            className="text-sm" style={{ color: '#C5D8EB' }}>
            Iniciar sesión
          </Link>
          <a href="/#contacto" onClick={() => setOpen(false)}
            className="text-sm font-medium px-4 py-2 rounded-lg text-center text-white"
            style={{ backgroundColor: '#2A7F62' }}>
            Contáctanos
          </a>
        </div>
      )}
    </header>
  )
}
