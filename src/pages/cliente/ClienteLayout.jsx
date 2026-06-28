import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const navItems = [
  { to: '/cliente/informes',      label: 'Informes' },
  { to: '/cliente/estado-cuenta', label: 'Estado de cuenta' },
  { to: '/cliente/documentos',    label: 'Documentos' },
]

export default function ClienteLayout() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-sand-100">
      <aside className="w-56 bg-accent-800 text-accent-100 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-5 border-b border-accent-600/30">
          <span className="font-semibold text-white tracking-tight">Mi <span className="text-accent-400 font-normal">Condominio</span></span>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `text-sm px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-accent-600 text-white font-medium' : 'text-accent-100 hover:bg-accent-600/40 hover:text-white'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-accent-600/30">
          <button onClick={handleLogout} className="w-full text-sm text-accent-200 hover:text-white transition-colors text-left px-3 py-2 rounded-lg hover:bg-accent-600/30">
            Cerrar sesión
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-sand-200 flex items-center px-6">
          <h1 className="text-sm font-semibold text-accent-600">Portal Condominio</h1>
        </header>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  )
}
