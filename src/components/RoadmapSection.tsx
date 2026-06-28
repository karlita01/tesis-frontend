import { ROADMAP_ITEMS } from '../data/landingContent';
import SectionHeader from './ui/SectionHeader';

const TAG_CLASSES: Record<string, string> = {
  cyan: 'bg-blue-50 text-blue-700 border-blue-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  gray: 'bg-slate-100 text-slate-500 border-slate-200',
};

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="py-24 bg-[#F8FAFC]"
      aria-labelledby="roadmap-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Hoja de ruta"
          title="Módulos planificados para versiones futuras"
          subtitle="El sistema actual cubre detección, conteo, clasificación, alertas, mapas de calor y registro. Las siguientes capacidades están en desarrollo o planificadas para versiones posteriores."
          titleHighlight="versiones futuras"
        />

        {/* Leyenda */}
        <div className="mt-8 flex flex-wrap gap-4 text-xs">
          {[
            { color: 'cyan', label: 'En desarrollo' },
            { color: 'blue', label: 'Próxima versión' },
            { color: 'gray', label: 'Futuro módulo' },
          ].map((item) => (
            <div key={item.color} className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded border ${TAG_CLASSES[item.color]} text-xs`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAP_ITEMS.map((item) => (
            <article
              key={item.id}
              className="bg-glass rounded-xl p-5 flex flex-col gap-3 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border shrink-0 ${TAG_CLASSES[item.tagColor]}`}
                >
                  {item.tag}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#0F172A]">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200 max-w-2xl text-sm text-slate-600 leading-relaxed">
          <strong className="text-[#0F172A]">Nota sobre el alcance actual:</strong>{' '}
          Los módulos presentados en la sección anterior (monitoreo de video, detección, conteo,
          clasificación, alertas y mapas de calor) corresponden al sistema implementado en esta
          versión. Los elementos de esta hoja de ruta son capacidades planificadas para fases
          posteriores del desarrollo.
        </div>
      </div>
    </section>
  );
}
