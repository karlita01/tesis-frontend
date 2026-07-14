export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Privacidad', href: '#privacidad' },
];

export const PROBLEM_CARDS = [
  {
    id: 'manual',
    icon: '👁️',
    title: 'Monitoreo manual limitado',
    description:
      'El personal de seguridad no puede supervisar simultáneamente todas las cámaras con la misma atención. Las zonas de alta afluencia pueden quedar sin cobertura efectiva durante picos de afluencia.',
  },
  {
    id: 'fatigue',
    icon: '😓',
    title: 'Fatiga visual del operador',
    description:
      'Horas de observación continua de múltiples monitores generan fatiga que reduce la capacidad de detección oportuna de situaciones de riesgo.',
  },
  {
    id: 'angles',
    icon: '📷',
    title: 'Ángulos oblicuos de cámara',
    description:
      'Las cámaras instaladas en pasillos comerciales suelen capturar escenas en perspectiva, lo que dificulta la interpretación visual de la densidad real de personas.',
  },
  {
    id: 'occlusion',
    icon: '🫂',
    title: 'Oclusión entre personas',
    description:
      'En zonas congestionadas, las personas se solapan entre sí dentro del encuadre, haciendo difícil estimar cuántas personas hay realmente en la zona.',
  },
  {
    id: 'reactive',
    icon: '⏱️',
    title: 'Respuesta reactiva, no preventiva',
    description:
      'La alerta suele llegar cuando el operador ya observa visualmente la congestión. Esto reduce el tiempo disponible para una respuesta operativa organizada.',
  },
  {
    id: 'evacuation',
    icon: '🚨',
    title: 'Riesgo en rutas de evacuación',
    description:
      'Las aglomeraciones no detectadas a tiempo pueden obstruir pasillos y salidas de emergencia, afectando la capacidad de evacuación del establecimiento.',
  },
];

export const SOLUTION_STEPS = [
  {
    step: 1,
    title: 'Captura o carga de video',
    description:
      'El sistema procesa grabaciones existentes o video proveniente de cámaras preparadas para integración. Compatible con formatos estándar de CCTV.',
    icon: '🎥',
  },
  {
    step: 2,
    title: 'Detección de personas',
    description:
      'Un modelo de visión artificial localiza y delimita a cada persona visible en la escena mediante cajas de detección. No realiza reconocimiento facial.',
    icon: '🔍',
  },
  {
    step: 3,
    title: 'Clasificación de densidad',
    description:
      'El sistema evalúa la cantidad de personas detectadas en una zona y la clasifica como nivel bajo, medio o alto, según umbrales configurables.',
    icon: '📊',
  },
  {
    step: 4,
    title: 'Alertas y registro',
    description:
      'Cuando se supera un umbral, el sistema emite una alerta y genera evidencia visual. Registra todos los eventos para análisis posterior.',
    icon: '🚨',
  },
];

// Usado por TechnologySection.tsx (componente existente pero no montado en App.tsx).
export const TECH_STACK = [
  { layer: 'Frontend', items: ['React + Vite', 'TypeScript', 'Tailwind CSS'], icon: '🖥️' },
  { layer: 'API', items: ['FastAPI', 'Python', 'REST + WebSocket'], icon: '⚙️' },
  { layer: 'Visión Artificial', items: ['Modelos tipo YOLO', 'OpenCV', 'Procesamiento de frames'], icon: '🤖' },
  { layer: 'Análisis', items: ['Clasificación de densidad', 'Seguimiento anónimo'], icon: '📊' },
  { layer: 'Almacenamiento', items: ['Base de datos', 'Logs de eventos', 'Evidencia visual'], icon: '💾' },
];

export const FOOTER_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Privacidad', href: '#privacidad' },
];
