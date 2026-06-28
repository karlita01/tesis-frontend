import { KPIS } from '../data/landingContent';
import MetricCard from './ui/MetricCard';
import SectionHeader from './ui/SectionHeader';

export default function KpiDashboard() {
  return (
    <section
      id="indicadores"
      className="py-24 bg-[#F8FAFC]"
      aria-labelledby="kpi-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Indicadores de desempeño"
          title="Indicadores preparados para medir y comparar"
          subtitle="El sistema está diseñado para permitir la comparación entre supervisión manual y monitoreo automático, usando las mismas grabaciones representativas del entorno real."
          titleHighlight="medir y comparar"
        />

        {/* Aviso metodológico */}
        <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-200 max-w-2xl">
          <div className="flex items-start gap-3">
            <span className="text-[#2563EB] text-lg mt-0.5" aria-hidden="true">📋</span>
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="text-[#0F172A] font-semibold">Nota metodológica:</span>{' '}
              Estos indicadores permiten comparar la supervisión manual frente al sistema
              automatizado usando las mismas grabaciones representativas. Los valores finales
              se obtendrán durante la fase de validación experimental.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map((kpi) => (
            <MetricCard key={kpi.id} metric={kpi} />
          ))}
        </div>

        {/* Leyenda de estados */}
        <div className="mt-8 flex flex-wrap gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-[#2563EB]">●</span>
            <span>Listo para medir — Indicador implementado, pendiente de datos reales</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-600">●</span>
            <span>En validación — Requiere experimento comparativo para obtener valor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
