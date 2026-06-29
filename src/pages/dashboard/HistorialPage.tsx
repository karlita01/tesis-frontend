import { useState, useEffect } from 'react';
import type { AnalysisResult, NivelAglomeracion } from '../../types/api';
import { getHistorial } from '../../services/analisisService';

const NIVEL_LABELS: Record<NivelAglomeracion, string> = {
  sin_aglomeracion: 'Sin aglomeración',
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
};

const NIVEL_COLORS: Record<NivelAglomeracion, string> = {
  sin_aglomeracion: 'bg-slate-100 text-slate-600 border-slate-200',
  bajo: 'bg-green-100 text-green-700 border-green-200',
  medio: 'bg-amber-100 text-amber-700 border-amber-200',
  alto: 'bg-red-100 text-red-700 border-red-200',
};

function formatDate(s: string | null): string {
  if (!s) return '—';
  try {
    return new Date(s).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' });
  } catch { return s; }
}

function formatDuration(inicio: string | null, fin: string | null): string {
  if (!inicio || !fin) return '—';
  const secs = Math.round((new Date(fin).getTime() - new Date(inicio).getTime()) / 1000);
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

export default function HistorialPage() {
  const [resultados, setResultados] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setResultados(await getHistorial());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar historial.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Historial de análisis</h1>
          <p className="text-slate-500 text-sm mt-1">EP-003 · Resultados guardados por sesión</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 text-sm">Cargando historial…</p>
        </div>
      ) : resultados.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">📊</p>
          <p className="font-medium text-slate-600 text-sm">Sin análisis registrados</p>
          <p className="text-slate-400 text-xs mt-1">
            Los resultados aparecen aquí después de analizar un video o sesión de webcam.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {resultados.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-start gap-4 flex-wrap">
                {/* Sesión + nivel */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-xs font-bold text-slate-400">Sesión #{r.sesion_id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${NIVEL_COLORS[r.nivel_maximo]}`}
                    >
                      {NIVEL_LABELS[r.nivel_maximo]}
                    </span>
                    {r.alerta_activada && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                        ⚠ ALERTA ACTIVADA
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Stat label="Personas máx." value={String(r.personas_maximas)} />
                    <Stat label="Frames" value={String(r.frames_procesados)} />
                    <Stat
                      label="Primera detección media"
                      value={r.tiempo_primera_media_seg != null
                        ? `${r.tiempo_primera_media_seg.toFixed(1)}s`
                        : '—'}
                    />
                    <Stat
                      label="Duración análisis"
                      value={formatDuration(r.inicio_analisis, r.fin_analisis)}
                    />
                  </div>
                </div>

                {/* Fecha */}
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-400">{formatDate(r.fecha_registro)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-lg px-3 py-2">
      <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-bold text-[#0F172A]">{value}</p>
    </div>
  );
}
