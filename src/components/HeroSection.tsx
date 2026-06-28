import { DensityBadge, StatusBadge } from './ui/StatusBadge';

const MOCK_EVENTS_HERO = [
  { id: 1, sector: 'Pasillo principal', people: 38, level: 'high' as const, time: '19:30' },
  { id: 2, sector: 'Entrada', people: 22, level: 'medium' as const, time: '19:28' },
  { id: 3, sector: 'Zona lateral', people: 8, level: 'low' as const, time: '19:25' },
];

function HeroMockup() {
  return (
    <div className="bg-[#0d1526] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl w-full max-w-lg mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0a0f1e]/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-slate-500 font-mono">CrowdSense AI — Monitor</span>
        <StatusBadge status="processing" />
      </div>

      {/* Video panel simulado */}
      <div className="relative bg-[#060c18] aspect-video flex items-center justify-center overflow-hidden">
        {/* Fondo tipo grilla de cámara */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Siluetas / bounding boxes simuladas */}
        <svg
          viewBox="0 0 400 225"
          className="w-full h-full absolute inset-0"
          aria-label="Panel de detección de personas simulado"
        >
          {[
            { x: 40, y: 60, w: 38, h: 80, id: '#01' },
            { x: 90, y: 55, w: 36, h: 82, id: '#02' },
            { x: 140, y: 62, w: 40, h: 78, id: '#03' },
            { x: 195, y: 50, w: 38, h: 84, id: '#04' },
            { x: 250, y: 58, w: 36, h: 80, id: '#05' },
            { x: 305, y: 65, w: 40, h: 75, id: '#06' },
            { x: 120, y: 100, w: 35, h: 78, id: '#07' },
            { x: 220, y: 95, w: 38, h: 82, id: '#08' },
          ].map((box) => (
            <g key={box.id}>
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                rx="2"
              />
              <rect x={box.x} y={box.y - 13} width={28} height={13} fill="#2563EB" rx="2" />
              <text x={box.x + 4} y={box.y - 3} fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold">
                {box.id}
              </text>
            </g>
          ))}

          {/* Zona de alerta sombreada */}
          <rect x="30" y="45" width="330" height="125" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" strokeDasharray="4,4" rx="4" />
          <text x="36" y="57" fontSize="7" fill="rgba(239,68,68,0.7)" fontFamily="monospace">ZONA CRÍTICA</text>
        </svg>

        {/* Overlay superior: contador */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <div className="bg-[#0a0f1e]/80 border border-blue-500/30 rounded-lg px-2.5 py-1.5 text-right">
            <p className="text-[10px] text-slate-400">Personas detectadas</p>
            <p className="text-xl font-bold text-blue-400 font-mono">38</p>
          </div>
          <DensityBadge level="high" />
        </div>

        {/* Label inferior */}
        <div className="absolute bottom-2 left-2 bg-[#0a0f1e]/80 rounded px-2 py-1">
          <p className="text-[9px] text-slate-400 font-mono">CAM-01 · Pasillo principal · 19:30:04</p>
        </div>
      </div>

      {/* Panel inferior */}
      <div className="grid grid-cols-2 gap-px bg-white/5">
        {/* Mini mapa de calor */}
        <div className="bg-[#0d1526] p-3">
          <p className="text-[10px] text-slate-500 mb-2 font-semibold uppercase tracking-wider">Mapa de calor</p>
          <div className="relative rounded overflow-hidden" style={{ height: 60, background: '#060c18' }}>
            {[
              { left: '20%', top: '20%', size: 36, opacity: 0.85 },
              { left: '40%', top: '30%', size: 44, opacity: 0.95 },
              { left: '60%', top: '25%', size: 32, opacity: 0.7 },
              { left: '30%', top: '55%', size: 28, opacity: 0.6 },
              { left: '65%', top: '60%', size: 24, opacity: 0.5 },
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: dot.size,
                  height: dot.size,
                  background: `radial-gradient(circle, rgba(239,68,68,${dot.opacity}), rgba(249,115,22,0.3), transparent)`,
                  transform: 'translate(-50%,-50%)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Eventos recientes */}
        <div className="bg-[#0d1526] p-3">
          <p className="text-[10px] text-slate-500 mb-2 font-semibold uppercase tracking-wider">Eventos recientes</p>
          <ul className="flex flex-col gap-1">
            {MOCK_EVENTS_HERO.map((ev) => (
              <li key={ev.id} className="flex items-center justify-between gap-1">
                <span className="text-[9px] text-slate-400 truncate">{ev.sector}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-mono text-white">{ev.people}</span>
                  <DensityBadge level={ev.level} showDot={false} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alerta activa */}
      <div className="bg-red-500/10 border-t border-red-500/30 px-4 py-2.5 flex items-center gap-2">
        <span className="text-red-400 animate-pulse text-base" aria-hidden="true">⚠️</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-red-400">Alerta — Aglomeración alta</p>
          <p className="text-[10px] text-slate-400">Pasillo principal · 38 personas detectadas</p>
        </div>
        <span className="text-[10px] text-slate-500">19:30</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center pt-16 bg-[#F8FAFC] relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Copy */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs text-green-700 font-semibold tracking-wider uppercase">
              Sistema activo · Centro comercial
            </span>
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#0F172A] leading-tight"
          >
            Detecta aglomeraciones{' '}
            <span className="text-gradient-cyan">antes de que se conviertan</span>{' '}
            en un riesgo
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
            CrowdSense AI analiza video de seguridad mediante visión artificial para detectar
            personas, estimar densidad peatonal, clasificar niveles de aglomeración y alertar al
            personal operativo en tiempo oportuno.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#solucion"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Ver cómo funciona CrowdSense AI"
            >
              <span>Ver cómo funciona</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#modulos"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              aria-label="Ver los módulos del sistema"
            >
              Ver módulos
            </a>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-2">
            <span className="text-slate-400" aria-hidden="true">🔒</span>
            Sin reconocimiento facial · Sin identificación real de visitantes · Enfocado en seguridad operativa
          </p>
        </div>

        {/* Mockup dashboard */}
        <div className="order-1 lg:order-2">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
