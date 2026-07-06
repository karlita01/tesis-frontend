export interface ExclusionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface HeatmapZona {
  zona_config_id: number;
  zona_nombre: string;
  frame_referencia: string;
  grid: number[][];
  grid_ancho: number;
  grid_alto: number;
  total_detecciones: number;
  actualizado_en: string | null;
}

export interface ExclusionZoneConfig {
  id: number;
  nombre: string;
  frame_referencia: string;
  zonas: ExclusionRect[];
  umbral_medio: number;
  umbral_alto: number;
  ventana_segundos: number;
  cooldown_segundos: number;
  creado_por: number | null;
  activa: boolean;
  fecha_creacion: string | null;
  fecha_actualizacion: string | null;
}
