export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-600 mb-2">Bienvenido</h2>
      <p className="text-sand-600 mb-8">Selecciona un módulo en el menú lateral para comenzar.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {['Clientes', 'Contratos', 'Tareas', 'Cobranza', 'Documentos'].map((mod) => (
          <div key={mod} className="bg-white border border-sand-200 rounded-xl p-5 flex flex-col gap-1">
            <span className="text-xs text-sand-600 uppercase tracking-wide">{mod}</span>
            <span className="text-2xl font-bold text-brand-600">—</span>
          </div>
        ))}
      </div>
    </div>
  )
}
