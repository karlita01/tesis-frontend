import { useState, useRef } from 'react';
import type { ExclusionRect } from '../../types/zones';

interface Props {
  imageUrl: string;
  rects: ExclusionRect[];
  onChange: (rects: ExclusionRect[]) => void;
}

interface Point {
  x: number;
  y: number;
}

function round3(n: number) {
  return Math.round(n * 1000) / 1000;
}

export default function ZoneEditor({ imageUrl, rects, onChange }: Props) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<Point | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<Point | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function getPos(e: React.MouseEvent): Point {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
    };
  }

  function handleSvgMouseDown(e: React.MouseEvent<SVGSVGElement>) {
    if (e.button !== 0) return;
    e.preventDefault();
    const pos = getPos(e);
    setDrawStart(pos);
    setDrawCurrent(pos);
    setIsDrawing(true);
    setSelected(null);
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!isDrawing) return;
    e.preventDefault();
    setDrawCurrent(getPos(e));
  }

  function handleMouseUp() {
    if (!isDrawing || !drawStart || !drawCurrent) return;
    setIsDrawing(false);

    const x = Math.min(drawStart.x, drawCurrent.x);
    const y = Math.min(drawStart.y, drawCurrent.y);
    const w = Math.abs(drawCurrent.x - drawStart.x);
    const h = Math.abs(drawCurrent.y - drawStart.y);

    if (w > 0.01 && h > 0.01) {
      onChange([...rects, { x: round3(x), y: round3(y), width: round3(w), height: round3(h) }]);
    }

    setDrawStart(null);
    setDrawCurrent(null);
  }

  function handleRectMouseDown(e: React.MouseEvent, index: number) {
    e.stopPropagation();
    setSelected(selected === index ? null : index);
    setIsDrawing(false);
  }

  function deleteSelected() {
    if (selected === null) return;
    onChange(rects.filter((_, i) => i !== selected));
    setSelected(null);
  }

  const preview =
    isDrawing && drawStart && drawCurrent
      ? {
          x: Math.min(drawStart.x, drawCurrent.x),
          y: Math.min(drawStart.y, drawCurrent.y),
          width: Math.abs(drawCurrent.x - drawStart.x),
          height: Math.abs(drawCurrent.y - drawStart.y),
        }
      : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Legend + hint */}
      <div className="flex items-center gap-4 flex-wrap text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-cyan-400 bg-cyan-400/20 shrink-0" />
          Zona dibujada
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-red-400 bg-red-400/20 shrink-0" />
          Seleccionada
        </span>
        <span className="text-slate-500">
          Arrastra para dibujar · clic sobre zona para seleccionar
        </span>
      </div>

      {/* Drawing area */}
      <div className="relative select-none rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950">
        <img
          src={imageUrl}
          alt="Frame de referencia"
          className="w-full block"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          style={{ cursor: isDrawing ? 'crosshair' : 'crosshair', touchAction: 'none' }}
          onMouseDown={handleSvgMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            if (isDrawing) {
              setIsDrawing(false);
              setDrawStart(null);
              setDrawCurrent(null);
            }
          }}
        >
          {/* Saved rects */}
          {rects.map((rect, i) => {
            const sel = selected === i;
            return (
              <g key={i}>
                <rect
                  x={`${rect.x * 100}%`}
                  y={`${rect.y * 100}%`}
                  width={`${rect.width * 100}%`}
                  height={`${rect.height * 100}%`}
                  fill={sel ? 'rgba(239,68,68,0.25)' : 'rgba(34,211,238,0.15)'}
                  stroke={sel ? '#ef4444' : '#22d3ee'}
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onMouseDown={(e) => handleRectMouseDown(e, i)}
                />
                <text
                  x={`${(rect.x + rect.width / 2) * 100}%`}
                  y={`${rect.y * 100}%`}
                  dominantBaseline="hanging"
                  textAnchor="middle"
                  fill={sel ? '#ef4444' : '#22d3ee'}
                  fontSize="11"
                  fontWeight="700"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* Preview rect while drawing */}
          {preview && preview.width > 0.005 && preview.height > 0.005 && (
            <rect
              x={`${preview.x * 100}%`}
              y={`${preview.y * 100}%`}
              width={`${preview.width * 100}%`}
              height={`${preview.height * 100}%`}
              fill="rgba(34,211,238,0.1)"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeDasharray="6 3"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {selected !== null && (
            <button
              onClick={deleteSelected}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors"
            >
              Eliminar zona {selected + 1}
            </button>
          )}
          {rects.length > 0 && (
            <button
              onClick={() => { onChange([]); setSelected(null); }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 text-xs hover:bg-slate-700 transition-colors"
            >
              Limpiar todo
            </button>
          )}
        </div>
        <p className={`text-xs font-medium ${rects.length === 0 ? 'text-slate-500' : 'text-cyan-400'}`}>
          {rects.length === 0
            ? 'Sin zonas — arrastra para dibujar'
            : `${rects.length} zona${rects.length !== 1 ? 's' : ''} definida${rects.length !== 1 ? 's' : ''}`}
        </p>
      </div>
    </div>
  );
}
