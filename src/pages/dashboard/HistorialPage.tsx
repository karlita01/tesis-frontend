import { useState, useEffect } from 'react';
import type { AnalysisResult, NivelAglomeracion, ZonaCritica } from '../../types/api';
import { getHistorial, getZonasCriticas } from '../../services/analisisService';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

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

// ── Vista: Sesiones ───────────────────────────────────────────────────────────

function SessionList({
  resultados,
  loading,
  onReload,
}: {
  resultados: AnalysisResult[];
  loading: boolean;
  onReload: () => void;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-400 text-sm">Cargando historial…</p>
      </div>
    );
  }

  if (resultados.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-3xl mb-3" aria-hidden="true">📊</p>
        <p className="font-medium text-slate-600 text-sm">Sin análisis registrados</p>
        <p className="text-slate-400 text-xs mt-1">
          Los resultados aparecen aquí después de analizar un video o sesión de webcam.
        </p>
      </div>
    );
  }

  return (
    <>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Frame de evidencia"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-slate-300 leading-none"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {resultados.map((r) => {
          const evidenciaUrl = r.frame_evidencia
            ? `${API_URL}/${r.frame_evidencia}`
            : null;

          return (
            <div key={r.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-start gap-4 flex-wrap">

                {/* Evidencia — thumbnail */}
                {evidenciaUrl && (
                  <button
                    onClick={() => setLightbox(evidenciaUrl)}
                    className="shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-slate-200
                               hover:border-[#2563EB] transition-colors focus:outline-none focus-visible:ring-2"
                    title="Ver frame de mayor concentración"
                  >
                    <img
                      src={evidenciaUrl}
                      alt="Evidencia"
                      className="w-full h-full object-cover"
                    />
                  </button>
                )}

                {/* Info principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-xs font-bold text-slate-400">Sesión #{r.sesion_id}</span>

                    {r.zona_nombre && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-medium">
                        {r.zona_nombre}
                      </span>
                    )}

                    {r.tipo_dia && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        {r.tipo_dia}
                      </span>
                    )}

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
                    <Stat label="Frames analizados" value={String(r.frames_procesados)} />
                    <Stat
                      label="Primera detección media"
                      value={r.tiempo_primera_media_seg != null
                        ? `${r.tiempo_primera_media_seg.toFixed(1)}s`
                        : '—'}
                    />
                    <Stat
                      label="Duración sesión"
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
          );
        })}
      </div>

      <button
        onClick={onReload}
        className="mt-4 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-slate-50 transition-colors"
      >
        Actualizar
      </button>
    </>
  );
}

// ── Vista: Zonas críticas ─────────────────────────────────────────────────────

function ZonasCriticasView() {
  const [zonas, setZonas] = useState<ZonaCritica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      setZonas(await getZonasCriticas());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar zonas.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-400 text-sm">Cargando zonas críticas…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
        {error}
        <button onClick={load} className="ml-3 underline text-red-500 hover:text-red-700">Reintentar</button>
      </div>
    );
  }

  if (zonas.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-3xl mb-3" aria-hidden="true">🗺</p>
        <p className="font-medium text-slate-600 text-sm">Sin zonas configuradas</p>
        <p className="text-slate-400 text-xs mt-1">
          Crea zonas de exclusión en la sección correspondiente para ver estadísticas por sector.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {zonas.map((z) => {
        const tasaAlerta = z.total_sesiones > 0
          ? Math.round((z.sesiones_con_alerta / z.total_sesiones) * 100)
          : 0;

        const criticidad =
          tasaAlerta >= 50
            ? { label: 'Crítica', cls: 'bg-red-100 text-red-700 border-red-200' }
            : tasaAlerta >= 20
            ? { label: 'Moderada', cls: 'bg-amber-100 text-amber-700 border-amber-200' }
            : { label: 'Normal', cls: 'bg-green-100 text-green-700 border-green-200' };

        return (
          <div
            key={z.zona_id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-[#0F172A] text-sm leading-tight">{z.zona_nombre}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${criticidad.cls}`}>
                {criticidad.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Stat label="Total sesiones" value={String(z.total_sesiones)} />
              <Stat label="Con alerta" value={String(z.sesiones_con_alerta)} />
              <Stat label="Máx. personas" value={String(z.max_personas)} />
              <Stat label="Promedio" value={String(z.promedio_personas)} />
            </div>

            {z.total_sesiones > 0 && (
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Tasa de alerta</span>
                  <span className="font-bold">{tasaAlerta}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      tasaAlerta >= 50 ? 'bg-red-500' : tasaAlerta >= 20 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${tasaAlerta}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Componente raíz ───────────────────────────────────────────────────────────

type Tab = 'sesiones' | 'zonas';

export default function HistorialPage() {
  const [tab, setTab] = useState<Tab>('sesiones');
  const [resultados, setResultados] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadSesiones() {
    try {
      setLoading(true);
      setError(null);
      setResultados(await getHistorial());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar historial.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadSesiones(); }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">Historial de análisis</h1>
        <p className="text-slate-500 text-sm mt-1">EP-005 · Sesiones registradas y resumen por sector</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {([
          { id: 'sesiones', label: 'Sesiones' },
          { id: 'zonas', label: 'Zonas críticas' },
        ] as { id: Tab; label: string }[]).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              tab === id
                ? 'bg-white text-[#0F172A] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Error banner (sesiones) */}
      {tab === 'sesiones' && error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* Contenido */}
      {tab === 'sesiones' ? (
        <SessionList
          resultados={resultados}
          loading={loading}
          onReload={loadSesiones}
        />
      ) : (
        <ZonasCriticasView />
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
