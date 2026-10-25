import { useEffect, useState } from 'react';
import { apiFetch, apiFetchBlob } from './apiClient';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

/**
 * Las fotos y los clips de evidencia ya no son archivos públicos: se piden a
 * /api/media/evidencia/* con el header Authorization y se muestran como blob
 * local. `path` es lo que devuelve la API (p. ej. "api/media/evidencia/alerta/12").
 */
export function useEvidencia(path: string | null | undefined): { url: string | null; error: string | null } {
  const [estado, setEstado] = useState<{ path: string | null; url: string | null; error: string | null }>(
    { path: null, url: null, error: null },
  );

  useEffect(() => {
    if (!path) return;
    let cancelado = false;
    let objectUrl: string | null = null;
    apiFetchBlob(`/${path}`)
      .then((blob) => {
        if (cancelado) return;
        objectUrl = URL.createObjectURL(blob);
        setEstado({ path, url: objectUrl, error: null });
      })
      .catch((e: unknown) => {
        if (!cancelado) setEstado({ path, url: null, error: e instanceof Error ? e.message : 'No se pudo cargar la evidencia.' });
      });
    return () => {
      cancelado = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [path]);

  if (!path || estado.path !== path) return { url: null, error: null };
  return { url: estado.url, error: estado.error };
}

/**
 * <img> y <video> no pueden mandar el header Authorization. En vez de poner el
 * JWT de sesión en la URL, se pide un ticket que vale solo para ese recurso y
 * por poco tiempo.
 */
async function pedirTicket(recurso: 'mjpeg' | 'grabacion', id: number): Promise<string> {
  const r = await apiFetch<{ ticket: string }>('/api/media/ticket', {
    method: 'POST',
    body: JSON.stringify({ recurso, id }),
  });
  return encodeURIComponent(r.ticket);
}

export async function urlMjpegCamara(sesionId: number, intento: number): Promise<string> {
  const ticket = await pedirTicket('mjpeg', sesionId);
  return `${API_URL}/api/analisis/camara/${sesionId}/mjpeg?ticket=${ticket}&r=${intento}`;
}

export async function urlArchivoGrabacion(grabacionId: number): Promise<string> {
  const ticket = await pedirTicket('grabacion', grabacionId);
  return `${API_URL}/api/grabaciones/${grabacionId}/file?ticket=${ticket}`;
}
