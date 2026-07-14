import type { Recording, RecordingsListResponse } from '../types/api';
import { apiFetch } from './apiClient';

export const uploadRecording = (file: File, fechaGrabacion?: string | null): Promise<Recording> => {
  const form = new FormData();
  form.append('file', file);
  if (fechaGrabacion) form.append('fecha_grabacion', fechaGrabacion);
  return apiFetch('/api/grabaciones', { method: 'POST', body: form });
};

export const getRecordings = async (): Promise<Recording[]> => {
  const data = await apiFetch<RecordingsListResponse>('/api/grabaciones');
  return data.grabaciones;
};

export const deleteRecording = (id: number): Promise<void> =>
  apiFetch(`/api/grabaciones/${id}`, { method: 'DELETE' });
