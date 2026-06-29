import type { CameraIP } from '../types/api';
import { apiFetch } from './apiClient';

export interface CreateCameraPayload {
  nombre: string;
  direccion_ip: string;
  ubicacion: string;
  descripcion?: string;
  activa: boolean;
}

export const getCameras = (): Promise<CameraIP[]> =>
  apiFetch('/api/camaras');

export const createCamera = (data: CreateCameraPayload): Promise<CameraIP> =>
  apiFetch('/api/camaras', { method: 'POST', body: JSON.stringify(data) });

export const updateCameraStatus = (id: number, activa: boolean): Promise<CameraIP> =>
  apiFetch(`/api/camaras/${id}/estado`, {
    method: 'PATCH',
    body: JSON.stringify({ activa }),
  });

export const deleteCamera = (id: number): Promise<void> =>
  apiFetch(`/api/camaras/${id}`, { method: 'DELETE' });
