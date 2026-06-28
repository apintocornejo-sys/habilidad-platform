const razones = [
  { numero: '01', titulo: 'Transparencia total', desc: 'Acceso en línea a todos los movimientos financieros, contratos vigentes y actas de asamblea. Sin información oculta.' },
  { numero: '02', titulo: 'Equipo dedicado', desc: 'Cada condominio tiene un administrador asignado con disponibilidad directa — no un call center genérico.' },
  { numero: '03', titulo: 'Tecnología al servicio', desc: 'Portal digital propio para residentes y comité. Informes automáticos, alertas y documentos siempre disponibles.' },
  { numero: '04', titulo: 'Cumplimiento legal garantizado', desc: 'Operamos conforme a la Ley de Copropiedad Inmobiliaria 21.442 y sus reglamentos. Tu condominio siempre al día.' },
]

const testimonios = [
  { texto: 'Desde que llegó Habilidad, las asambleas son más ordenadas y los gastos comunes se pagan puntualmente. La diferencia es notable.', autor: 'Comité Condominio Las Palmas', ciudad: 'Las Condes, Santiago' },
  { texto: 'El portal digital nos cambió la vida. Ahora puedo ver el estado de cuenta de mi departamento en cualquier momento.', autor: 'Residente Torre Norte', ciudad: 'Providencia, Santiago' },
]

export default function PorQue() {
  return (
    <section id="por-que" className="py-20 sm:py-28 bg-sand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-widest">Por qué nosotros</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-600 mt-2 mb-6">La diferencia está en los detalles</h2>
            <p className="text-sand-600 leading-relaxed mb-10">
              Administrar un condominio no es solo cobrar gastos comunes. Es resolver problemas antes de que ocurran, comunicarse con claridad y rendir cuentas sin que nadie tenga que pedir explicaciones.
            </p>
            <div className="flex flex-col gap-7">
              {razones.map(({ numero, titulo, desc }) => (
                <div key={numero} className="flex gap-5">
                  <span className="text-2xl font-bold text-brand-200 leading-none mt-0.5 w-8 shrink-0">{numero}</span>
                  <div>
                    <h3 className="font-semibold text-brand-600 mb-1">{titulo}</h3>
                    <p className="text-sand-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-brand-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                {[{ v: '+120', l: 'Condominios' }, { v: '15+', l: 'Años de experiencia' }, { v: '4.9★', l: 'Valoración promedio' }, { v: '<4h', l: 'Tiempo de respuesta' }].map(({ v, l }) => (
                  <div key={l} className="flex flex-col gap-1 border-l-2 border-accent-600 pl-4">
                    <span className="text-2xl font-bold text-accent-400">{v}</span>
                    <span className="text-brand-100 text-sm">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            {testimonios.map(({ texto, autor, ciudad }) => (
              <div key={autor} className="bg-white border border-sand-200 rounded-2xl p-6">
                <p className="text-sand-800 text-sm leading-relaxed mb-4 italic">"{texto}"</p>
                <span className="text-brand-600 text-sm font-semibold block">{autor}</span>
                <span className="text-sand-600 text-xs">{ciudad}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
