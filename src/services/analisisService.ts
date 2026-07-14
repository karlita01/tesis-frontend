import type { AnalysisResult, FrameAnalysisResult, VideoSSEEvent, ZonaCritica } from '../types/api';
import { apiFetch } from './apiClient';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

interface HistorialResponse {
  resultados: AnalysisResult[];
}

export const analyzeFrame = (
  sesionId: number,
  frameBlob: Blob,
  zonaConfigId?: number | null,
): Promise<FrameAnalysisResult> => {
  const form = new FormData();
  form.append('sesion_id', String(sesionId));
  form.append('frame', frameBlob, 'frame.jpg');
  if (zonaConfigId != null) form.append('zona_config_id', String(zonaConfigId));
  return apiFetch('/api/analisis/frame', { method: 'POST', body: form });
};

export const getHistorial = async (): Promise<AnalysisResult[]> => {
  const data = await apiFetch<HistorialResponse>('/api/analisis/historial');
  return data.resultados;
};

export const getResultadoSesion = (sesionId: number): Promise<AnalysisResult> =>
  apiFetch(`/api/analisis/resultado/${sesionId}`);

export const deleteResultado = (resultadoId: number): Promise<void> =>
  apiFetch(`/api/analisis/resultado/${resultadoId}`, { method: 'DELETE' });

export const getZonasCriticas = async (): Promise<ZonaCritica[]> => {
  const data = await apiFetch<{ zonas: ZonaCritica[] }>('/api/analisis/zonas-criticas');
  return data.zonas;
};

/**
 * Inicia el stream SSE de análisis de video (grabacion_previa).
 * Llama a onEvent() por cada evento recibido.
 * Devuelve una función cancel() para abortar el stream.
 */
export function streamVideoAnalisis(
  sesionId: number,
  onEvent: (ev: VideoSSEEvent) => void,
  onDone?: () => void,
  onError?: (msg: string) => void,
): () => void {
  const token = localStorage.getItem('token') ?? '';
  const controller = new AbortController();

  (async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/analisis/video/${sesionId}/stream`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        onError?.(`Error ${response.status}: ${response.statusText}`);
        return;
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const ev: VideoSSEEvent = JSON.parse(line.slice(6));
              onEvent(ev);
              if (ev.tipo === 'fin') onDone?.();
              if (ev.tipo === 'error') onError?.(ev.mensaje ?? 'Error en análisis.');
            } catch {
              // ignore malformed line
            }
          }
        }
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        onError?.((e as Error).message ?? 'Error de conexión.');
      }
    }
  })();

  return () => controller.abort();
}
