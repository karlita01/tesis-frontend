import type { Alerta, AlertaSSEEvent } from '../types/api';
import { apiFetch } from './apiClient';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

interface AlertasResponse {
  alertas: Alerta[];
}

export const getAlertas = async (atendida?: boolean): Promise<Alerta[]> => {
  const query = atendida !== undefined ? `?atendida=${String(atendida)}` : '';
  const data = await apiFetch<AlertasResponse>(`/api/alertas${query}`);
  return data.alertas;
};

export const atenderAlerta = (id: number): Promise<Alerta> =>
  apiFetch(`/api/alertas/${id}/atender`, { method: 'PATCH' });

/**
 * Abre el stream SSE de alertas en tiempo real.
 * Se reconecta automáticamente si la conexión cae (3 s de espera).
 * Devuelve una función cancel() para cerrar definitivamente.
 */
export function streamAlertas(
  onEvent: (ev: AlertaSSEEvent) => void,
  onError?: (msg: string) => void,
): () => void {
  let cancelled = false;
  let currentController: AbortController | null = null;

  async function connect() {
    if (cancelled) return;

    currentController = new AbortController();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/api/alertas/stream`, {
        headers: { Authorization: `Bearer ${token ?? ''}` },
        signal: currentController.signal,
      });

      if (!response.ok) {
        if (response.status === 401) return; // no reconectar si el token expiró
        onError?.(`Error ${response.status}`);
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
              const ev = JSON.parse(line.slice(6)) as AlertaSSEEvent;
              onEvent(ev);
            } catch { /* ignorar línea malformada */ }
          }
          // Las líneas de keepalive (": keepalive") se ignoran automáticamente
        }
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
    }

    // Reconexión automática si no fue cancelado explícitamente
    if (!cancelled) {
      await new Promise<void>((r) => setTimeout(r, 3000));
      void connect();
    }
  }

  void connect();

  return () => {
    cancelled = true;
    currentController?.abort();
  };
}
