import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const G = {
  sidebar:      '#1A5C47',
  sidebarHover: 'rgba(255,255,255,0.10)',
  sidebarActive:'#2A7F62',
  accent:       '#2A7F62',
  accentLight:  '#E6F5F1',
  white:        '#FFFFFF',
  bg:           '#F0F7F5',
  border:       'rgba(255,255,255,0.12)',
}

const navItems = [
  {
    to: '/cliente', end: true, label: 'Dashboard',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    to: '/cliente/contratos', label: 'Mis contratos',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    to: '/cliente/cobranza', label: 'Mi cobranza',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  },
  {
    to: '/cliente/documentos', label: 'Documentos',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /></svg>,
  },
]

export default function ClienteLayout() {
  const { fullName, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : (user?.email?.[0] ?? 'C').toUpperCase()

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: G.bg }}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-60 flex flex-col shrink-0 transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ backgroundColor: G.sidebar }}>

        {/* Logo */}
        <div className="h-16 flex items-center px-5 shrink-0" style={{ borderBottom: `1px solid ${G.border}` }}>
          <span className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs mr-2 shrink-0"
            style={{ backgroundColor: G.accent, color: G.white }}>H</span>
          <span className="font-semibold tracking-tight" style={{ color: G.white }}>
            Mi <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>Condominio</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2 overflow-y-auto">
          <p className="text-xs uppercase tracking-widest px-3 mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Portal cliente
          </p>
          {navItems.map(({ to, end, label, icon }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 text-sm px-3 py-2.5 rounded-lg transition-colors"
              style={({ isActive }) => ({
                backgroundColor: isActive ? G.sidebarActive : 'transparent',
                color: isActive ? G.white : 'rgba(255,255,255,0.70)',
                fontWeight: isActive ? 500 : 400,
              })}
              onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = G.sidebarHover }}
              onMouseLeave={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = 'transparent' }}>
              {icon}{label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-3 shrink-0" style={{ borderTop: `1px solid ${G.border}` }}>
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: G.white }}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: G.white }}>{fullName || 'Cliente'}</p>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 text-sm px-3 py-2 rounded-lg transition-colors"
            style={{ color: 'rgba(255,255,255,0.60)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = G.sidebarHover; e.currentTarget.style.color = G.white }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.60)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center px-4 sm:px-6 gap-4 shrink-0"
          style={{ backgroundColor: G.white, borderBottom: '1px solid #E8E6E0' }}>
          <button className="lg:hidden p-1.5 rounded-lg transition-colors"
            style={{ color: '#8C8880' }}
            onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ backgroundColor: G.accentLight, color: G.accent }}>
              {initials}
            </div>
            <span className="font-medium" style={{ color: G.sidebar }}>{fullName || 'Cliente'}</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto"><Outlet /></main>
      </div>
    </div>
  )
}
