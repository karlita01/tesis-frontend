const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string> | undefined ?? {}) },
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
    throw new Error('UNAUTHORIZED');
  }

  if (res.status === 403) {
    throw new Error('No tienes permisos para realizar esta acción.');
  }

  if (!res.ok) {
    let detail = `Error ${res.status}`;
    try {
      const body = await res.json() as { detail?: string };
      if (body.detail) detail = body.detail;
    } catch { /* keep default */ }
    throw new Error(detail);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
