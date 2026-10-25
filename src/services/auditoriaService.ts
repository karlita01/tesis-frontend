import { apiFetch } from './apiClient';

export interface RegistroAuditoria {
  id: number;
  fecha: string;
  usuario_id: number | null;
  usuario_nombre: string | null;
  accion: string;
  recurso: string | null;
  recurso_id: number | null;
  detalle: string | null;
  ip: string | null;
}

// Solo administrador: quién vio evidencias y quién cambió cuentas, cámaras o zonas.
export const getAuditoria = (accion?: string): Promise<RegistroAuditoria[]> =>
  apiFetch(`/api/auditoria${accion ? `?accion=${encodeURIComponent(accion)}` : ''}`);
