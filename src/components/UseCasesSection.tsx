import { USE_CASES } from '../data/landingContent';
import SectionHeader from './ui/SectionHeader';

export default function UseCasesSection() {
  return (
    <section
      id="casos-de-uso"
      className="py-24 bg-[#F8FAFC]"
      aria-labelledby="use-cases-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Aplicaciones del sistema"
          title="Espacios donde CrowdSense AI puede marcar la diferencia"
          subtitle="El sistema está diseñado para cualquier espacio de alta concurrencia donde la detección oportuna de aglomeraciones sea un factor crítico de seguridad y operación."
          titleHighlight="marcar la diferencia"
          centered
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map((uc) => (
            <article
              key={uc.id}
              className="bg-glass rounded-xl p-6 flex flex-col gap-4 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl group-hover:border-blue-300 transition-colors">
                <span aria-hidden="true">{uc.icon}</span>
              </div>
              <h3 className="text-base font-semibold text-[#0F172A]">{uc.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{uc.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 p-5 rounded-xl bg-glass-cyan text-center max-w-2xl mx-auto">
          <p className="text-sm text-slate-700">
            <span className="text-[#2563EB] font-semibold">Contexto principal de este proyecto:</span>{' '}
            Centros comerciales de la ciudad de Trujillo, Perú — con foco en pasillos de alta
            afluencia y zonas de acceso durante temporadas de alta demanda.
          </p>
        </div>
      </div>
    </section>
  );
}
