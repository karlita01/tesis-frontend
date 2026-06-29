import type { MonitoringSession, VideoSourceType } from '../types/api';
import { apiFetch } from './apiClient';

export interface StartMonitoringPayload {
  tipo_fuente: VideoSourceType;
  camara_id?: number;
  grabacion_id?: number;
}

export const startMonitoring = (data: StartMonitoringPayload): Promise<MonitoringSession> =>
  apiFetch('/api/monitoreo/iniciar', { method: 'POST', body: JSON.stringify(data) });

export const stopMonitoring = (sessionId: number): Promise<MonitoringSession> =>
  apiFetch(`/api/monitoreo/${sessionId}/detener`, { method: 'POST' });
