import { SOLUTION_STEPS } from '../data/landingContent';
import SectionHeader from './ui/SectionHeader';

export default function SolutionFlow() {
  return (
    <section
      id="solucion"
      className="py-24 bg-[#F8FAFC]"
      aria-labelledby="solution-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Solución"
          title="Una capa inteligente sobre la videovigilancia existente"
          subtitle="El sistema transforma el video en información accionable para que el personal de seguridad pueda actuar con mayor rapidez y respaldo visual. No reemplaza al operador: lo apoya."
          titleHighlight="capa inteligente"
        />

        {/* Flujo de pasos */}
        <div className="mt-16 relative">
          {/* Línea conectora — solo desktop */}
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {SOLUTION_STEPS.map((step) => (
              <article
                key={step.step}
                className="relative flex flex-col items-center text-center gap-4"
              >
                {/* Paso número + ícono */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-glass-cyan glow-cyan flex items-center justify-center text-2xl z-10 relative">
                    <span aria-hidden="true">{step.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="text-base font-semibold text-[#0F172A] mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Nota aclaratoria */}
        <div className="mt-14 p-5 rounded-xl bg-glass-cyan max-w-3xl mx-auto text-center">
          <p className="text-sm text-slate-700 leading-relaxed">
            <span className="text-[#2563EB] font-semibold">Diseñado para apoyar, no reemplazar:</span>{' '}
            CrowdSense AI está orientado a reducir la carga cognitiva del operador, no a eliminar
            la supervisión humana. La decisión final de actuación siempre recae en el personal de seguridad.
          </p>
        </div>
      </div>
    </section>
  );
}
