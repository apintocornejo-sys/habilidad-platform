import { Link } from 'react-router-dom'

const servicios = [
  'Administración de condominio',
  'Cobranza de gastos comunes',
  'Mantención y obras',
  'Gestión de contratos',
]

export default function Footer() {
  return (
    <footer className="bg-brand-800 text-brand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded bg-accent-600 flex items-center justify-center font-bold text-xs text-white">H</span>
            <span className="font-semibold text-white tracking-tight">Habilidad Chile</span>
          </div>
          <p className="text-sm leading-relaxed text-brand-200 max-w-xs">
            Consultora especializada en administración profesional de condominios en Chile.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-400">Servicios</h3>
          <ul className="flex flex-col gap-2">
            {servicios.map((s) => (
              <li key={s}><a href="/#servicios" className="text-sm text-brand-200 hover:text-white transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-400">Acceso</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="/login" className="text-sm text-brand-200 hover:text-white transition-colors">Iniciar sesión</Link></li>
            <li><Link to="/admin" className="text-sm text-brand-200 hover:text-white transition-colors">Portal administración</Link></li>
            <li><Link to="/cliente" className="text-sm text-brand-200 hover:text-white transition-colors">Portal condominios</Link></li>
          </ul>
          <a href="mailto:contacto@habilidad.cl" className="text-sm text-brand-200 hover:text-white transition-colors mt-2">contacto@habilidad.cl</a>
        </div>
      </div>

      <div className="border-t border-brand-600/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-400">
          <span>© {new Date().getFullYear()} Habilidad Chile SpA. Todos los derechos reservados.</span>
          <span>Santiago, Chile</span>
        </div>
      </div>
    </footer>
  )
}
