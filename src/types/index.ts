export type DensityLevel = 'low' | 'medium' | 'high';

export type ProcessingStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'alert'
  | 'completed'
  | 'error';

export interface CrowdEvent {
  id: string;
  sector: string;
  density_level: DensityLevel;
  detected_people: number;
  created_at: string;
  alert?: boolean;
}

export interface Metric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  status: 'ready' | 'validating' | 'mock';
  description?: string;
}

export interface Zone {
  id: string;
  name: string;
  points: { x: number; y: number }[];
  threshold?: number;
}

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

export interface Alert {
  id: string;
  sector: string;
  severity: DensityLevel;
  message: string;
  created_at: string;
}

export interface AnalysisResult {
  analysis_id: string;
  sector: string;
  detected_people: number;
  density_level: DensityLevel;
  detection_time_seconds: number;
  alerts: Alert[];
}

export interface AnalysisStatus {
  analysis_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
}

export interface SummaryReport {
  date: string;
  total_alerts: number;
  critical_zones: number;
  average_detection_time: number;
  most_crowded_sector: string;
}

export interface DemoState {
  selectedSector: string;
  detectedPeople: number;
  densityLevel: DensityLevel;
  processingStatus: ProcessingStatus;
  activeAlert: boolean;
  detectionTime: number;
  recentEvents: CrowdEvent[];
  heatmapIntensity: number[][];
}
