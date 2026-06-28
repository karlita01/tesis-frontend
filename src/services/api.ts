/**
 * CrowdSense AI — Capa de servicios frontend
 *
 * Preparado para conectar con FastAPI backend.
 * Variables de entorno requeridas:
 *   VITE_API_URL   → URL base del backend FastAPI
 *   VITE_WS_URL    → URL base para WebSocket (análisis en tiempo real)
 *
 * Para activar la integración real:
 *   1. Configurar .env con VITE_API_URL=http://tu-servidor:8000
 *   2. Descomentar las llamadas fetch/axios en cada función
 *   3. Remover el bloque de mock correspondiente
 */

import type {
  AnalysisResult,
  AnalysisStatus,
  CrowdEvent,
  HeatmapPoint,
  SummaryReport,
  Zone,
} from '../types';
import { MOCK_EVENTS, MOCK_HEATMAP } from '../data/mockEvents';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
// const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000';

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// ─────────────────────────────────────────────
// POST /api/videos/upload
// Payload: multipart/form-data { file, sector, date, time_range }
// ─────────────────────────────────────────────
export async function uploadVideo(
  file: File,
  sector: string,
  date: string,
  timeRange?: string
): Promise<{ video_id: string }> {
  await delay(800);

  /* REAL — descomentar para conectar con FastAPI:
  const form = new FormData();
  form.append('file', file);
  form.append('sector', sector);
  form.append('date', date);
  if (timeRange) form.append('time_range', timeRange);
  const res = await fetch(`${API_URL}/api/videos/upload`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Error al subir video');
  return res.json();
  */

  console.log('[MOCK] uploadVideo', { file: file.name, sector, date, timeRange, API_URL });
  return { video_id: 'vid_mock_001' };
}

// ─────────────────────────────────────────────
// POST /api/analysis/start
// Payload: { video_id, sector, mode, use_zones }
// ─────────────────────────────────────────────
export async function startAnalysis(
  videoId: string,
  sector: string,
  mode = 'crowd_detection',
  useZones = true
): Promise<{ analysis_id: string }> {
  await delay(600);

  /* REAL:
  const res = await fetch(`${API_URL}/api/analysis/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ video_id: videoId, sector, mode, use_zones: useZones }),
  });
  if (!res.ok) throw new Error('Error al iniciar análisis');
  return res.json();
  */

  console.log('[MOCK] startAnalysis', { videoId, sector, mode, useZones });
  return { analysis_id: 'ana_mock_001' };
}

// ─────────────────────────────────────────────
// GET /api/analysis/{analysis_id}/status
// Respuesta: { analysis_id, status, progress }
// ─────────────────────────────────────────────
export async function getAnalysisStatus(analysisId: string): Promise<AnalysisStatus> {
  await delay(400);

  /* REAL:
  const res = await fetch(`${API_URL}/api/analysis/${analysisId}/status`);
  if (!res.ok) throw new Error('Error al obtener estado');
  return res.json();
  */

  return {
    analysis_id: analysisId,
    status: 'completed',
    progress: 100,
  };
}

// ─────────────────────────────────────────────
// GET /api/analysis/{analysis_id}/results
// ─────────────────────────────────────────────
export async function getAnalysisResults(
  analysisId: string,
  sector = 'Pasillo principal'
): Promise<AnalysisResult> {
  await delay(500);

  /* REAL:
  const res = await fetch(`${API_URL}/api/analysis/${analysisId}/results`);
  if (!res.ok) throw new Error('Error al obtener resultados');
  return res.json();
  */

  return {
    analysis_id: analysisId,
    sector,
    detected_people: 34,
    density_level: 'high',
    detection_time_seconds: 1.8,
    alerts: [
      {
        id: 'alert_mock_001',
        sector,
        severity: 'high',
        message: 'Aglomeración alta detectada',
        created_at: new Date().toISOString(),
      },
    ],
  };
}

// ─────────────────────────────────────────────
// GET /api/events
// ─────────────────────────────────────────────
export async function getEvents(): Promise<CrowdEvent[]> {
  await delay(300);

  /* REAL:
  const res = await fetch(`${API_URL}/api/events`);
  if (!res.ok) throw new Error('Error al obtener eventos');
  return res.json();
  */

  return MOCK_EVENTS;
}

// ─────────────────────────────────────────────
// GET /api/zones
// ─────────────────────────────────────────────
export async function getZones(): Promise<Zone[]> {
  await delay(300);

  /* REAL:
  const res = await fetch(`${API_URL}/api/zones`);
  if (!res.ok) throw new Error('Error al obtener zonas');
  return res.json();
  */

  return [
    {
      id: 'zone_001',
      name: 'Pasillo principal',
      points: [{ x: 120, y: 80 }, { x: 480, y: 80 }, { x: 500, y: 320 }, { x: 100, y: 320 }],
      threshold: 25,
    },
  ];
}

// ─────────────────────────────────────────────
// POST /api/zones
// Payload: { name, points }
// ─────────────────────────────────────────────
export async function saveZone(zone: Omit<Zone, 'id'>): Promise<Zone> {
  await delay(400);

  /* REAL:
  const res = await fetch(`${API_URL}/api/zones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zone),
  });
  if (!res.ok) throw new Error('Error al guardar zona');
  return res.json();
  */

  console.log('[MOCK] saveZone', zone);
  return { id: `zone_${Date.now()}`, ...zone };
}

// ─────────────────────────────────────────────
// GET /api/heatmaps/{sector_id}
// ─────────────────────────────────────────────
export async function getHeatmapData(sectorId: string): Promise<{ sector_id: string; heatmap: HeatmapPoint[] }> {
  await delay(400);

  /* REAL:
  const res = await fetch(`${API_URL}/api/heatmaps/${sectorId}`);
  if (!res.ok) throw new Error('Error al obtener mapa de calor');
  return res.json();
  */

  return {
    sector_id: sectorId,
    heatmap: MOCK_HEATMAP,
  };
}

// ─────────────────────────────────────────────
// GET /api/reports/summary
// ─────────────────────────────────────────────
export async function getSummaryReport(): Promise<SummaryReport> {
  await delay(350);

  /* REAL:
  const res = await fetch(`${API_URL}/api/reports/summary`);
  if (!res.ok) throw new Error('Error al obtener reporte');
  return res.json();
  */

  return {
    date: new Date().toISOString().slice(0, 10),
    total_alerts: 12,
    critical_zones: 3,
    average_detection_time: 1.9,
    most_crowded_sector: 'Pasillo principal',
  };
}
