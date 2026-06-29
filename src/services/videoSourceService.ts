import type { VideoSourceType, VideoSourcesResponse } from '../types/api';
import { apiFetch } from './apiClient';

export interface SelectSourcePayload {
  tipo: VideoSourceType;
  camara_id?: number;
  grabacion_id?: number;
}

export interface SelectSourceResponse {
  tipo: string;
  mensaje: string;
  camara_id?: number | null;
  grabacion_id?: number | null;
}

export const getVideoSources = (): Promise<VideoSourcesResponse> =>
  apiFetch('/api/fuentes-video');

export const selectVideoSource = (data: SelectSourcePayload): Promise<SelectSourceResponse> =>
  apiFetch('/api/fuentes-video/seleccionar', {
    method: 'POST',
    body: JSON.stringify(data),
  });
