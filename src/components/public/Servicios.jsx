const servicios = [
  {
    titulo: 'Administración integral',
    desc: 'Gestión completa del condominio: asambleas, comunicaciones, proveedores y cumplimiento legal conforme a la Ley 21.442.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    titulo: 'Cobranza de gastos comunes',
    desc: 'Emisión, seguimiento y cobranza de gastos comunes. Gestión de morosos con procesos claros y comunicación respetuosa.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    titulo: 'Mantención y obras',
    desc: 'Coordinación de mantenciones preventivas y correctivas. Supervisión de obras menores con presupuestos aprobados por el comité.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
  },
  {
    titulo: 'Gestión de contratos',
    desc: 'Administración del ciclo completo de contratos con proveedores y prestadores de servicios: redacción, vigencia y renovación.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    titulo: 'Informes financieros',
    desc: 'Reportes mensuales de ingresos, egresos y estado de fondos. Acceso digital en tiempo real para el comité y los residentes.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  },
  {
    titulo: 'Portal digital residentes',
    desc: 'Cada condominio accede a su portal propio: informes, estado de cuenta, documentos y comunicados desde cualquier dispositivo.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-accent-600 text-sm font-semibold uppercase tracking-widest">Qué hacemos</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-600 mt-2 mb-4">Servicios de administración</h2>
          <p className="text-sand-600 max-w-xl mx-auto text-base leading-relaxed">
            Todo lo que tu condominio necesita, gestionado por profesionales con experiencia comprobada en Chile.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map(({ icon, titulo, desc }) => (
            <div key={titulo} className="group border border-sand-200 rounded-2xl p-6 hover:border-brand-200 hover:shadow-sm transition-all duration-200 bg-sand-100 hover:bg-white">
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200">
                {icon}
              </div>
              <h3 className="font-semibold text-brand-600 text-base mb-2">{titulo}</h3>
              <p className="text-sand-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
