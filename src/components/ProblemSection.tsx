import { PROBLEM_CARDS } from '../data/landingContent';
import SectionHeader from './ui/SectionHeader';

export default function ProblemSection() {
  return (
    <section
      id="problema"
      className="py-24 bg-white relative"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="El problema"
          title="El problema no es la falta de cámaras. Es detectar el riesgo demasiado tarde."
          subtitle="Muchos centros comerciales ya cuentan con CCTV instalado, pero el análisis sigue dependiendo del ojo humano: un recurso limitado, susceptible a la fatiga y al error en condiciones de alta afluencia."
          titleHighlight="detectar el riesgo demasiado tarde"
        />

        {/* Estadística de contexto */}
        <div className="mt-10 p-5 rounded-xl bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 max-w-2xl">
          <p className="text-sm text-slate-700 leading-relaxed">
            <span className="text-amber-700 font-semibold">Situación frecuente:</span>{' '}
            En pasillos con alta afluencia, las aglomeraciones suelen detectarse cuando el
            operador ya observa visualmente la congestión. Para entonces, el tiempo disponible
            para una respuesta organizada se ha reducido significativamente.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEM_CARDS.map((card) => (
            <article
              key={card.id}
              className="bg-glass rounded-xl p-6 flex flex-col gap-4 border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-xl">
                <span aria-hidden="true">{card.icon}</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#0F172A] mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Transición a solución */}
        <div className="mt-14 text-center">
          <p className="text-slate-500 text-sm">
            Estos factores combinados reducen la efectividad del monitoreo en los momentos de mayor afluencia.
          </p>
          <a
            href="#solucion"
            className="inline-flex items-center gap-2 mt-4 text-[#2563EB] text-sm hover:text-blue-800 transition-colors focus-visible:outline-none focus-visible:underline"
            aria-label="Ver la solución propuesta"
          >
            Ver la solución propuesta <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
