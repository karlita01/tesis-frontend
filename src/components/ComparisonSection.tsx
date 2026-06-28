import { COMPARISON_ROWS } from '../data/landingContent';
import SectionHeader from './ui/SectionHeader';

export default function ComparisonSection() {
  return (
    <section
      id="comparacion"
      className="py-24 bg-white"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Comparativa"
          title="Monitoreo tradicional vs CrowdSense AI"
          subtitle="Una comparación directa entre la supervisión manual existente y el apoyo que ofrece el sistema automatizado al personal de seguridad."
          titleHighlight="CrowdSense AI"
          centered
        />

        <div className="mt-12 overflow-x-auto scrollbar-hide rounded-2xl border border-slate-200">
          <table className="w-full min-w-[640px]" aria-label="Comparativa entre monitoreo tradicional y CrowdSense AI">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-5 w-1/4">
                  Aspecto
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-5 w-3/8">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600" aria-hidden="true">⚠️</span>
                    Monitoreo tradicional
                  </div>
                </th>
                <th className="text-left text-xs font-semibold text-[#2563EB] uppercase tracking-wider py-4 px-5 w-3/8">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true">✅</span>
                    CrowdSense AI
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  <td className="py-4 px-5 text-sm font-medium text-[#0F172A]">{row.feature}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 text-base mt-0.5 shrink-0" aria-hidden="true">✗</span>
                      <span className="text-sm text-slate-600">{row.traditional}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-start gap-2">
                      <span className="text-[#2563EB] text-base mt-0.5 shrink-0" aria-hidden="true">✓</span>
                      <span className="text-sm text-slate-700">{row.crowdsense}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          La comparativa refleja las capacidades diseñadas del sistema. Los resultados
          cuantitativos se obtendrán durante la validación experimental con grabaciones reales.
        </p>
      </div>
    </section>
  );
}
