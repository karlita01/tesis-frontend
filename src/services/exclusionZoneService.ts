import type { ExclusionRect, ExclusionZoneConfig } from '../types/zones';
import { apiFetch } from './apiClient';

interface ZonesListResponse {
  configuraciones: ExclusionZoneConfig[];
}

export const getExclusionZones = async (): Promise<ExclusionZoneConfig[]> => {
  const data = await apiFetch<ZonesListResponse>('/api/zonas-exclusion');
  return data.configuraciones;
};

export const getExclusionZone = (id: number): Promise<ExclusionZoneConfig> =>
  apiFetch(`/api/zonas-exclusion/${id}`);

export interface ZonaThresholds {
  umbral_medio?: number;
  umbral_alto?: number;
  ventana_segundos?: number;
  cooldown_segundos?: number;
}

export const createExclusionZone = (
  nombre: string,
  frame: File,
  zonas: ExclusionRect[],
  thresholds?: ZonaThresholds,
): Promise<ExclusionZoneConfig> => {
  const form = new FormData();
  form.append('nombre', nombre);
  form.append('frame', frame);
  form.append('zonas', JSON.stringify(zonas));
  if (thresholds?.umbral_medio != null) form.append('umbral_medio', String(thresholds.umbral_medio));
  if (thresholds?.umbral_alto != null) form.append('umbral_alto', String(thresholds.umbral_alto));
  if (thresholds?.ventana_segundos != null) form.append('ventana_segundos', String(thresholds.ventana_segundos));
  if (thresholds?.cooldown_segundos != null) form.append('cooldown_segundos', String(thresholds.cooldown_segundos));
  return apiFetch('/api/zonas-exclusion', { method: 'POST', body: form });
};

export const updateExclusionZone = (
  id: number,
  updates: { nombre?: string; frame?: File; zonas?: ExclusionRect[] } & ZonaThresholds,
): Promise<ExclusionZoneConfig> => {
  const form = new FormData();
  if (updates.nombre !== undefined) form.append('nombre', updates.nombre);
  if (updates.frame) form.append('frame', updates.frame);
  if (updates.zonas !== undefined) form.append('zonas', JSON.stringify(updates.zonas));
  if (updates.umbral_medio != null) form.append('umbral_medio', String(updates.umbral_medio));
  if (updates.umbral_alto != null) form.append('umbral_alto', String(updates.umbral_alto));
  if (updates.ventana_segundos != null) form.append('ventana_segundos', String(updates.ventana_segundos));
  if (updates.cooldown_segundos != null) form.append('cooldown_segundos', String(updates.cooldown_segundos));
  return apiFetch(`/api/zonas-exclusion/${id}`, { method: 'PUT', body: form });
};

export const deleteExclusionZone = (id: number): Promise<{ message: string }> =>
  apiFetch(`/api/zonas-exclusion/${id}`, { method: 'DELETE' });
