import type { Metric } from '../../types';

interface MetricCardProps {
  metric: Metric;
}

const STATUS_LABELS: Record<Metric['status'], { label: string; color: string }> = {
  ready:      { label: 'Listo para medir', color: 'text-[#2563EB]' },
  validating: { label: 'En validación',    color: 'text-amber-600' },
  mock:       { label: 'Dato simulado',    color: 'text-slate-500' },
};

export default function MetricCard({ metric }: MetricCardProps) {
  const { label: statusLabel, color: statusColor } = STATUS_LABELS[metric.status];

  return (
    <article className="bg-glass rounded-xl p-5 flex flex-col gap-3 hover:border-blue-400 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-slate-600 leading-tight">{metric.label}</p>
        <span className={`text-xs font-medium shrink-0 ${statusColor}`}>{statusLabel}</span>
      </div>
      <div>
        <p className="text-lg font-semibold text-[#0F172A] leading-tight">{metric.value}</p>
        {metric.unit && <p className="text-xs text-slate-500 mt-0.5">{metric.unit}</p>}
      </div>
      {metric.description && (
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
          {metric.description}
        </p>
      )}
    </article>
  );
}
