import { useState, useCallback } from 'react';
import type { ProcessingStatus, DensityLevel, CrowdEvent } from '../types';
import { SECTORS, SECTOR_PROFILES } from '../data/mockEvents';
import { DensityBadge, StatusBadge } from './ui/StatusBadge';
import SectionHeader from './ui/SectionHeader';

function formatTime(isoStr: string) {
  return new Date(isoStr).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function HeatmapPreview({ intensity }: { intensity: number[][] }) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-[#060c18] h-32" aria-label="Mapa de calor del sector">
      {/* Fondo de grilla */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />
      {intensity.map((row, ri) =>
        row.map((val, ci) => {
          if (val < 0.1) return null;
          return (
            <div
              key={`${ri}-${ci}`}
              className="absolute rounded-full"
              aria-hidden="true"
              style={{
                left: `${(ci / row.length) * 100}%`,
                top: `${(ri / intensity.length) * 100}%`,
                width: 28,
                height: 28,
                background: `radial-gradient(circle, rgba(239,68,68,${val}), rgba(249,115,22,${val * 0.5}), transparent)`,
                transform: 'translate(-50%,-50%)',
              }}
            />
          );
        })
      )}
    </div>
  );
}

function generateHeatmap(density: DensityLevel): number[][] {
  const scale = density === 'high' ? 1 : density === 'medium' ? 0.6 : 0.25;
  return Array.from({ length: 5 }, () =>
    Array.from({ length: 8 }, () => Math.random() * scale)
  );
}

function generateEvents(sector: string, count: number, density: DensityLevel): CrowdEvent[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    id: `demo_evt_${i}`,
    sector,
    density_level: density,
    detected_people: Math.max(1, count - i * 3),
    created_at: new Date(now - i * 45000).toISOString(),
    alert: density === 'high' && i < 2,
  }));
}

export default function DemoPreview() {
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [detectedPeople, setDetectedPeople] = useState(0);
  const [densityLevel, setDensityLevel] = useState<DensityLevel>('low');
  const [activeAlert, setActiveAlert] = useState(false);
  const [detectionTime, setDetectionTime] = useState(0);
  const [events, setEvents] = useState<CrowdEvent[]>([]);
  const [heatmap, setHeatmap] = useState<number[][]>(Array.from({ length: 5 }, () => Array(8).fill(0)));

  const runSimulation = useCallback(async () => {
    const profile = SECTOR_PROFILES[selectedSector];
    setStatus('processing');
    setDetectedPeople(0);
    setActiveAlert(false);
    setEvents([]);
    setHeatmap(Array.from({ length: 5 }, () => Array(8).fill(0)));

    await new Promise((r) => setTimeout(r, 800));

    const people = Math.floor(Math.random() * (profile.people[1] - profile.people[0] + 1)) + profile.people[0];
    const time = +(Math.random() * 2 + 0.8).toFixed(2);

    setDetectedPeople(people);
    setDensityLevel(profile.density);
    setDetectionTime(time);
    setHeatmap(generateHeatmap(profile.density));

    await new Promise((r) => setTimeout(r, 400));

    if (profile.alert) {
      setStatus('alert');
      setActiveAlert(true);
    } else {
      setStatus('completed');
    }

    setEvents(generateEvents(selectedSector, people, profile.density));
  }, [selectedSector]);

  const resetDemo = useCallback(() => {
    setStatus('idle');
    setDetectedPeople(0);
    setDensityLevel('low');
    setActiveAlert(false);
    setDetectionTime(0);
    setEvents([]);
    setHeatmap(Array.from({ length: 5 }, () => Array(8).fill(0)));
  }, []);

  const isRunning = status === 'processing';

  return (
    <section
      id="demo"
      className="py-24 bg-[#0a0f1e]"
      aria-labelledby="demo-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Demo interactiva"
          title="Simula un análisis de aglomeración"
          subtitle="Esta demo funciona completamente en el navegador con datos simulados. El código está preparado para conectar con el backend FastAPI y recibir resultados reales."
          titleHighlight="análisis de aglomeración"
        />

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {/* Panel de control */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* Selector de sector */}
            <div className="bg-glass rounded-xl p-5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3" htmlFor="sector-select">
                Sector a analizar
              </label>
              <select
                id="sector-select"
                value={selectedSector}
                onChange={(e) => { setSelectedSector(e.target.value); resetDemo(); }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                disabled={isRunning}
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s} className="bg-[#0d1526]">{s}</option>
                ))}
              </select>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0f1e] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Iniciar simulación de análisis"
                >
                  {isRunning ? '⏳ Analizando...' : '▶ Simular análisis'}
                </button>
                <button
                  onClick={resetDemo}
                  disabled={isRunning}
                  className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 text-slate-300 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  aria-label="Limpiar resultados de la demo"
                >
                  Limpiar demo
                </button>
              </div>
            </div>

            {/* Indicadores principales */}
            <div className="bg-glass rounded-xl p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Estado del análisis</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Estado</span>
                  <StatusBadge status={status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Personas detectadas</span>
                  <span className="text-lg font-bold text-white font-mono">{detectedPeople}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Nivel de densidad</span>
                  {status !== 'idle' ? (
                    <DensityBadge level={densityLevel} />
                  ) : (
                    <span className="text-xs text-slate-600">—</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Tiempo de detección</span>
                  <span className="text-sm text-white font-mono">
                    {detectionTime > 0 ? `${detectionTime}s` : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Alerta activa */}
            {activeAlert && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 glow-alert" role="alert">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl animate-pulse" aria-hidden="true">⚠️</span>
                  <div>
                    <p className="text-sm font-semibold text-red-400">Alerta generada</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Aglomeración <strong>alta</strong> detectada en{' '}
                      <strong>{selectedSector}</strong>. Se recomienda evaluar el sector.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel derecho: mapa de calor + eventos */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Video panel simulado */}
            <div className="bg-[#0d1526] rounded-xl overflow-hidden border border-white/8">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
                <span className="text-xs text-slate-500 font-mono">CAM-01 · {selectedSector}</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                  <span className="text-xs text-red-400">REC</span>
                </div>
              </div>

              <div className="relative bg-[#060c18] aspect-video flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                  aria-hidden="true"
                />
                {status === 'idle' && (
                  <p className="text-slate-600 text-sm">Selecciona un sector y pulsa "Simular análisis"</p>
                )}
                {isRunning && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    <p className="text-cyan-400 text-sm animate-pulse">Analizando video...</p>
                  </div>
                )}
                {(status === 'completed' || status === 'alert') && (
                  <svg viewBox="0 0 400 225" className="w-full h-full absolute inset-0" aria-label={`${detectedPeople} personas detectadas en ${selectedSector}`}>
                    {Array.from({ length: Math.min(detectedPeople, 12) }).map((_, i) => {
                      const x = 30 + (i % 6) * 60;
                      const y = 40 + Math.floor(i / 6) * 85;
                      return (
                        <g key={i}>
                          <rect x={x} y={y} width={38} height={78} fill="none" stroke="#00d4ff" strokeWidth="1.5" rx="2" />
                          <rect x={x} y={y - 13} width={26} height={13} fill="#00d4ff" rx="2" />
                          <text x={x + 3} y={y - 3} fontSize="8" fill="#0a0f1e" fontFamily="monospace" fontWeight="bold">
                            #{String(i + 1).padStart(2, '0')}
                          </text>
                        </g>
                      );
                    })}
                    {detectedPeople > 12 && (
                      <text x="200" y="180" textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="monospace">
                        + {detectedPeople - 12} personas más detectadas
                      </text>
                    )}
                  </svg>
                )}

                {/* Contador overlay */}
                {detectedPeople > 0 && (
                  <div className="absolute top-2 right-2 bg-[#0a0f1e]/80 border border-cyan-500/30 rounded-lg px-3 py-1.5 text-right">
                    <p className="text-[10px] text-slate-400">Detectadas</p>
                    <p className="text-2xl font-bold text-cyan-400 font-mono">{detectedPeople}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mapa de calor */}
            <div className="bg-glass rounded-xl p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Mapa de calor — {selectedSector}
              </p>
              <HeatmapPreview intensity={heatmap} />
              <p className="text-xs text-slate-600 mt-2">
                Intensidad de concentración por área del sector analizado
              </p>
            </div>

            {/* Tabla de eventos */}
            {events.length > 0 && (
              <div className="bg-glass rounded-xl p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Eventos registrados en esta sesión
                </p>
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-sm min-w-[400px]">
                    <thead>
                      <tr className="border-b border-white/8">
                        <th className="text-left text-xs text-slate-500 font-semibold py-2 pr-4">Hora</th>
                        <th className="text-left text-xs text-slate-500 font-semibold py-2 pr-4">Sector</th>
                        <th className="text-right text-xs text-slate-500 font-semibold py-2 pr-4">Personas</th>
                        <th className="text-center text-xs text-slate-500 font-semibold py-2 pr-4">Densidad</th>
                        <th className="text-center text-xs text-slate-500 font-semibold py-2">Alerta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 6).map((ev) => (
                        <tr key={ev.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="py-2 pr-4 text-xs text-slate-400 font-mono">{formatTime(ev.created_at)}</td>
                          <td className="py-2 pr-4 text-xs text-white">{ev.sector}</td>
                          <td className="py-2 pr-4 text-right text-sm font-bold text-white font-mono">{ev.detected_people}</td>
                          <td className="py-2 pr-4 text-center">
                            <DensityBadge level={ev.density_level} />
                          </td>
                          <td className="py-2 text-center">
                            {ev.alert ? (
                              <span className="text-red-400 text-base" aria-label="Alerta activa">⚠️</span>
                            ) : (
                              <span className="text-green-400 text-base" aria-label="Sin alerta">✓</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nota de mock */}
        <p className="mt-8 text-center text-xs text-slate-600">
          Demo simulada en frontend · Sin conexión al backend ·{' '}
          <span className="text-cyan-700">Preparada para conectar con FastAPI</span>
        </p>
      </div>
    </section>
  );
}
