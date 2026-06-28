import type { Alert } from '../../types';
import { DensityBadge } from './StatusBadge';

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const time = new Date(alert.created_at).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
      <span className="text-red-600 text-lg mt-0.5" aria-hidden="true">🔔</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-[#0F172A] truncate">{alert.sector}</p>
          <DensityBadge level={alert.severity} />
        </div>
        <p className="text-xs text-slate-600 mt-0.5">{alert.message}</p>
      </div>
      <time className="text-xs text-slate-500 shrink-0">{time}</time>
    </div>
  );
}
