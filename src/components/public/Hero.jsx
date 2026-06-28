const stats = [
  { value: '+120', label: 'Condominios administrados' },
  { value: '15+',  label: 'Años de experiencia en Chile' },
  { value: '98%',  label: 'Tasa de satisfacción de clientes' },
  { value: '24/7', label: 'Atención ante emergencias' },
]

const trust = [
  '✓ Sin letra chica',
  '✓ Informes mensuales detallados',
  '✓ Portal digital para residentes',
  '✓ Equipo certificado',
]

export default function Hero() {
  return (
    <section style={{ backgroundColor: '#1B3A5C', color: 'white' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
            style={{ color: '#5CB49A' }}>
            <span className="w-6 h-px" style={{ backgroundColor: '#5CB49A' }} />
            Consultora de condominios
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: 'white' }}>
            Administración profesional<br />
            <span style={{ color: '#5CB49A' }}>que genera confianza</span>
          </h1>

          <p className="text-lg leading-relaxed max-w-lg" style={{ color: '#C5D8EB' }}>
            Gestionamos tu condominio con transparencia total, tecnología moderna y un equipo dedicado.
            Tú te preocupas de vivir bien; nosotros del resto.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="#contacto"
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm"
              style={{ backgroundColor: '#2A7F62', color: 'white' }}>
              Solicitar cotización
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#servicios"
              className="inline-flex items-center justify-center gap-2 font-medium px-6 py-3 rounded-xl text-sm"
              style={{ border: '1px solid rgba(78,126,168,0.5)', color: '#C5D8EB' }}>
              Ver servicios
            </a>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl p-6 flex flex-col gap-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <span className="text-3xl font-bold" style={{ color: 'white' }}>{value}</span>
              <span className="text-sm leading-snug" style={{ color: '#C5D8EB' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(78,126,168,0.3)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap gap-6 sm:gap-12 items-center justify-center sm:justify-start">
          {trust.map((item) => (
            <span key={item} className="text-sm" style={{ color: '#A8C4DC' }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
