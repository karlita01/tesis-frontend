import { useState, useEffect, useRef } from 'react';
import type { Recording } from '../../types/api';
import { uploadRecording, getRecordings } from '../../services/recordingService';

const ALLOWED_EXTS = ['.mp4', '.avi', '.mov', '.mkv'];

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' });
  } catch { return dateStr; }
}

export default function GrabacionesPage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fechaGrabacion, setFechaGrabacion] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      setLoading(true);
      setRecordings(await getRecordings());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar grabaciones.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFileError(null);
    if (!file) { setSelectedFile(null); return; }
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    if (!ALLOWED_EXTS.includes(ext)) {
      setFileError(`Formato no permitido. Usa: ${ALLOWED_EXTS.join(', ')}`);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    setError(null);
    try {
      await uploadRecording(selectedFile, fechaGrabacion || null);
      setSelectedFile(null);
      setFechaGrabacion('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSuccess('Grabación subida correctamente.');
      setTimeout(() => setSuccess(null), 3500);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al subir grabación.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">Grabaciones</h1>
        <p className="text-slate-500 text-sm mt-1">RF-1.5 · Videos para análisis con YOLO</p>
      </div>

      {success && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex justify-between items-start">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* Upload card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-[#0F172A] mb-4 text-base">Subir grabación</h2>

        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors">
          <span className="text-4xl block mb-3" aria-hidden="true">📁</span>
          <p className="text-sm font-medium text-[#0F172A] mb-1">
            {selectedFile ? selectedFile.name : 'Selecciona un archivo de video'}
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Formatos admitidos: {ALLOWED_EXTS.join(', ')}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_EXTS.join(',')}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium"
          >
            {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
          </label>
        </div>

        {fileError && <p className="mt-2 text-xs text-red-600">{fileError}</p>}

        {selectedFile && !fileError && (
          <div className="mt-4 flex flex-col gap-3">
            {/* Fecha de grabación opcional */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">
                Fecha y hora de filmación
                <span className="ml-1 text-[10px] font-normal text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                  opcional
                </span>
              </label>
              <input
                type="datetime-local"
                value={fechaGrabacion}
                onChange={(e) => setFechaGrabacion(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Indica cuándo fue filmado el video para el registro histórico.
              </p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#0F172A] truncate">{selectedFile.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{formatBytes(selectedFile.size)}</p>
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="shrink-0 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {uploading ? 'Subiendo…' : 'Subir'}
              </button>
            </div>
          </div>
        )}

        <p className="mt-3 text-xs text-slate-400">
          El video se guarda en el servidor. Desde Monitoreo podrás seleccionarlo como fuente
          y ejecutar el análisis con YOLO.
        </p>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0F172A] text-base">Grabaciones cargadas</h2>
          <button
            onClick={load}
            disabled={loading}
            className="text-xs text-slate-400 hover:text-[#2563EB] transition-colors disabled:opacity-50"
          >
            Actualizar
          </button>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-400 text-sm">Cargando grabaciones…</p>
          </div>
        ) : recordings.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-3xl mb-2" aria-hidden="true">🎞</p>
            <p className="text-slate-500 text-sm font-medium">Sin grabaciones</p>
            <p className="text-slate-400 text-xs mt-1">Sube un video para verlo aquí.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recordings.map((rec) => (
              <li key={rec.id} className="px-6 py-4 flex items-start gap-3">
                <span className="text-slate-400 text-lg mt-0.5 shrink-0" aria-hidden="true">🎞</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{rec.nombre_archivo}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                    {rec.tipo_contenido && <span className="text-xs text-slate-400">{rec.tipo_contenido}</span>}
                    <span className="text-xs text-slate-400">{formatBytes(rec.tamanio_bytes)}</span>
                    <span className="text-xs text-slate-400">Subido: {formatDate(rec.fecha_carga)}</span>
                    {rec.fecha_grabacion && (
                      <span className="text-xs text-cyan-600 font-medium">
                        Filmado: {formatDate(rec.fecha_grabacion)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 shrink-0 mt-1">
                  #{rec.id}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
