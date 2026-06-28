import type { DensityLevel, ProcessingStatus } from '../../types';

interface DensityBadgeProps {
  level: DensityLevel;
  showDot?: boolean;
}

export function DensityBadge({ level, showDot = true }: DensityBadgeProps) {
  const config = {
    low: {
      label: 'Bajo',
      classes: 'bg-green-50 text-green-700 border border-green-200',
      dot: 'bg-green-500',
    },
    medium: {
      label: 'Medio',
      classes: 'bg-amber-50 text-amber-700 border border-amber-200',
      dot: 'bg-amber-500',
    },
    high: {
      label: 'Alto',
      classes: 'bg-red-50 text-red-700 border border-red-200',
      dot: 'bg-red-500',
    },
  };

  const { label, classes, dot } = config[level];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${classes}`}
      aria-label={`Nivel de densidad: ${label}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} aria-hidden="true" />}
      {label}
    </span>
  );
}

interface StatusBadgeProps {
  status: ProcessingStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config: Record<ProcessingStatus, { label: string; classes: string; dot: string }> = {
    idle: {
      label: 'En espera',
      classes: 'bg-slate-100 text-slate-600 border border-slate-200',
      dot: 'bg-slate-400',
    },
    uploading: {
      label: 'Subiendo video',
      classes: 'bg-blue-50 text-blue-700 border border-blue-200',
      dot: 'bg-blue-500 animate-pulse',
    },
    processing: {
      label: 'Analizando',
      classes: 'bg-blue-50 text-blue-700 border border-blue-200',
      dot: 'bg-blue-500 animate-pulse',
    },
    alert: {
      label: 'Alerta activa',
      classes: 'bg-red-50 text-red-700 border border-red-200',
      dot: 'bg-red-500 animate-pulse',
    },
    completed: {
      label: 'Finalizado',
      classes: 'bg-green-50 text-green-700 border border-green-200',
      dot: 'bg-green-500',
    },
    error: {
      label: 'Error',
      classes: 'bg-red-50 text-red-700 border border-red-200',
      dot: 'bg-red-500',
    },
  };

  const { label, classes, dot } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}
