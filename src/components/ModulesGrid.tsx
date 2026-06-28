import { MODULES } from '../data/landingContent';
import FeatureCard from './ui/FeatureCard';
import SectionHeader from './ui/SectionHeader';

export default function ModulesGrid() {
  return (
    <section
      id="modulos"
      className="py-24 bg-white"
      aria-labelledby="modules-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Módulos del sistema"
          title="Todos los componentes para el monitoreo inteligente"
          subtitle="CrowdSense AI integra múltiples módulos que trabajan en conjunto para transformar el video de seguridad en información operativa accionable."
          titleHighlight="monitoreo inteligente"
          centered
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod) => (
            <FeatureCard
              key={mod.id}
              icon={mod.icon}
              title={mod.title}
              description={mod.description}
              color={mod.color as 'cyan' | 'blue' | 'orange' | 'red' | 'green'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
