import { TECH_STACK } from '../data/landingContent';
import SectionHeader from './ui/SectionHeader';

export default function TechnologySection() {
  return (
    <section
      id="tecnologia"
      className="py-24 bg-[#0d1526]"
      aria-labelledby="tech-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Arquitectura técnica"
          title="Tecnología orientada a resultados operativos"
          subtitle="CrowdSense AI combina visión artificial, procesamiento de video y una arquitectura web moderna para entregar información útil en tiempo oportuno, sin necesidad de hardware especializado adicional."
          titleHighlight="resultados operativos"
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12 items-start">
          {/* Stack de capas */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
              Capas del sistema
            </h3>
            <div className="flex flex-col gap-3">
              {TECH_STACK.map((layer, i) => (
                <div
                  key={i}
                  className="bg-glass rounded-xl p-4 flex items-start gap-4 hover:border-cyan-500/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl shrink-0">
                    <span aria-hidden="true">{layer.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1.5">{layer.layer}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/8"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagrama de flujo */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
              Flujo de datos
            </h3>
            <div className="bg-glass rounded-xl p-6 font-mono text-sm">
              <FlowDiagram />
            </div>

            <div className="mt-6 p-4 rounded-xl bg-glass border border-cyan-500/15">
              <h4 className="text-sm font-semibold text-white mb-2">Integración con FastAPI</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                El frontend consume una API REST desarrollada en FastAPI (Python). Toda la
                comunicación se realiza mediante endpoints documentados que pueden conectarse
                al motor de visión artificial y a la base de datos de eventos.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['REST API', 'FastAPI', 'Python', 'OpenCV', 'YOLO', 'PostgreSQL'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  const layers = [
    { label: 'Frontend React + Vite + TypeScript', color: 'text-cyan-400', arrow: true },
    { label: 'API REST (FastAPI + Python)', color: 'text-blue-400', arrow: true },
    { label: 'Motor de visión artificial (YOLO + OpenCV)', color: 'text-purple-400', arrow: true },
    { label: 'Base de datos · Logs · Evidencia', color: 'text-green-400', arrow: true },
    { label: 'Dashboard · Alertas · Reportes', color: 'text-orange-400', arrow: false },
  ];

  return (
    <div className="flex flex-col gap-1" role="list" aria-label="Flujo de datos del sistema">
      {layers.map((layer, i) => (
        <div key={i} role="listitem">
          <div className={`flex items-center gap-3 py-2 px-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors ${layer.color}`}>
            <span className="text-slate-600 text-xs w-4 text-center">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-xs">{layer.label}</span>
          </div>
          {layer.arrow && (
            <div className="flex items-center justify-start pl-8 py-0.5">
              <span className="text-slate-600 text-xs" aria-hidden="true">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
