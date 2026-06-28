import type { CrowdEvent, HeatmapPoint } from '../types';

export const MOCK_EVENTS: CrowdEvent[] = [
  {
    id: 'evt_001',
    sector: 'Pasillo principal',
    density_level: 'high',
    detected_people: 38,
    created_at: '2026-06-27T19:30:00',
    alert: true,
  },
  {
    id: 'evt_002',
    sector: 'Entrada principal',
    density_level: 'medium',
    detected_people: 22,
    created_at: '2026-06-27T18:42:00',
    alert: false,
  },
  {
    id: 'evt_003',
    sector: 'Zona lateral',
    density_level: 'low',
    detected_people: 8,
    created_at: '2026-06-27T18:15:00',
    alert: false,
  },
  {
    id: 'evt_004',
    sector: 'Patio central',
    density_level: 'high',
    detected_people: 45,
    created_at: '2026-06-27T17:58:00',
    alert: true,
  },
  {
    id: 'evt_005',
    sector: 'Salida',
    density_level: 'medium',
    detected_people: 19,
    created_at: '2026-06-27T17:30:00',
    alert: false,
  },
];

export const MOCK_HEATMAP: HeatmapPoint[] = [
  { x: 20, y: 25, intensity: 0.85 },
  { x: 35, y: 30, intensity: 0.92 },
  { x: 50, y: 28, intensity: 0.78 },
  { x: 65, y: 35, intensity: 0.65 },
  { x: 80, y: 40, intensity: 0.45 },
  { x: 25, y: 50, intensity: 0.70 },
  { x: 45, y: 55, intensity: 0.88 },
  { x: 60, y: 60, intensity: 0.95 },
  { x: 75, y: 55, intensity: 0.72 },
  { x: 30, y: 70, intensity: 0.55 },
  { x: 55, y: 75, intensity: 0.80 },
  { x: 70, y: 70, intensity: 0.68 },
];

export const SECTORS = [
  'Pasillo principal',
  'Entrada',
  'Salida',
  'Zona lateral',
  'Patio central',
];

export const SECTOR_PROFILES: Record<string, { people: [number, number]; density: 'low' | 'medium' | 'high'; alert: boolean }> = {
  'Pasillo principal': { people: [28, 48], density: 'high', alert: true },
  'Entrada': { people: [15, 30], density: 'medium', alert: false },
  'Salida': { people: [10, 25], density: 'medium', alert: false },
  'Zona lateral': { people: [4, 14], density: 'low', alert: false },
  'Patio central': { people: [30, 55], density: 'high', alert: true },
};
