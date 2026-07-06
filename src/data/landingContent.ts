export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'Privacidad', href: '#privacidad' },
  { label: 'Comparativa', href: '#comparacion' },
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
    title: 'Alertas, mapas de calor y registro',
    description:
      'Cuando se supera un umbral, el sistema emite una alerta y genera evidencia visual. Registra todos los eventos para análisis posterior.',
    icon: '🗺️',
  },
];

export const MODULES = [
  {
    id: 'video',
    icon: '🎞️',
    title: 'Monitoreo de video',
    description:
      'Analiza videos pregrabados o fuentes de cámara preparadas para integración. Compatible con los formatos de captura más comunes en CCTV.',
    color: 'cyan',
  },
  {
    id: 'detection',
    icon: '🔎',
    title: 'Detección de personas',
    description:
      'Ubica personas en la escena mediante modelos de visión artificial, dibujando cajas de detección sobre cada individuo visible.',
    color: 'blue',
  },
  {
    id: 'counting',
    icon: '🔢',
    title: 'Conteo aproximado',
    description:
      'Estima la cantidad de personas visibles por sector o frame, considerando factores como oclusión parcial y ángulo de cámara.',
    color: 'cyan',
  },
  {
    id: 'classification',
    icon: '📶',
    title: 'Clasificación de aglomeración',
    description:
      'Clasifica el nivel de concentración como bajo, medio o alto en función de la densidad detectada en cada zona definida.',
    color: 'orange',
  },
  {
    id: 'alerts',
    icon: '🔔',
    title: 'Alertas automáticas',
    description:
      'Notifica cuando una zona supera un umbral de riesgo configurado, permitiendo una respuesta operativa más rápida.',
    color: 'red',
  },
  {
    id: 'heatmap',
    icon: '🌡️',
    title: 'Mapas de calor',
    description:
      'Visualiza los sectores con mayor concentración peatonal mediante mapas de calor generados a partir de las detecciones acumuladas.',
    color: 'orange',
  },
  {
    id: 'zones',
    icon: '📐',
    title: 'Configuración de zonas',
    description:
      'Permite delimitar sectores críticos, pasillos, entradas y salidas dentro del encuadre de la cámara para un análisis más preciso.',
    color: 'blue',
  },
  {
    id: 'logs',
    icon: '📋',
    title: 'Registro de eventos',
    description:
      'Guarda logs estructurados, capturas de evidencia y datos temporales para evaluación, auditoría y mejora continua del sistema.',
    color: 'green',
  },
  {
    id: 'reports',
    icon: '📈',
    title: 'Reportes operativos',
    description:
      'Resume eventos, horarios críticos, niveles de riesgo y zonas más frecuentes para apoyar la toma de decisiones del equipo de seguridad.',
    color: 'green',
  },
];

export const TECH_STACK = [
  { layer: 'Frontend', items: ['React + Vite', 'TypeScript', 'Tailwind CSS'], icon: '🖥️' },
  { layer: 'API', items: ['FastAPI', 'Python', 'REST + WebSocket'], icon: '⚙️' },
  { layer: 'Visión Artificial', items: ['Modelos tipo YOLO', 'OpenCV', 'Procesamiento de frames'], icon: '🤖' },
  { layer: 'Análisis', items: ['Clasificación de densidad', 'Mapas de calor', 'Seguimiento anónimo'], icon: '📊' },
  { layer: 'Almacenamiento', items: ['Base de datos', 'Logs de eventos', 'Evidencia visual'], icon: '💾' },
];

export const USE_CASES = [
  {
    id: 'mall',
    icon: '🏪',
    title: 'Centros comerciales',
    description:
      'Monitoreo de pasillos, zonas de acceso y áreas de alta afluencia. Apoya la respuesta ante aglomeraciones durante horas pico y temporadas de alta demanda.',
  },
  {
    id: 'gallery',
    icon: '🏬',
    title: 'Galerías comerciales',
    description:
      'Espacios de pasillo estrecho donde la densidad peatonal puede escalar rápidamente. El sistema ayuda a identificar zonas de riesgo antes de que se saturen.',
  },
  {
    id: 'terminal',
    icon: '🚌',
    title: 'Terminales terrestres',
    description:
      'Áreas de espera y acceso a plataformas con alta rotación de personas. Permite detectar congestión en zonas de salida, boletería y acceso principal.',
  },
  {
    id: 'university',
    icon: '🎓',
    title: 'Universidades',
    description:
      'Pasillos académicos, cafeterías y zonas de acceso con picos de afluencia entre clases. Apoya la gestión de flujo y seguridad del campus.',
  },
  {
    id: 'events',
    icon: '🎪',
    title: 'Eventos con alta afluencia',
    description:
      'Ferias, exposiciones, conciertos o eventos institucionales donde la concentración de personas puede variar rápidamente y es difícil de controlar manualmente.',
  },
  {
    id: 'institutional',
    icon: '🏛️',
    title: 'Edificios institucionales',
    description:
      'Entidades públicas, municipalidades, entidades de salud y sedes administrativas con atención al público, donde la gestión del aforo es crítica.',
  },
];

export const COMPARISON_ROWS = [
  {
    feature: 'Observación de video',
    traditional: 'Manual, depende del operador',
    crowdsense: 'Análisis automático de video frame a frame',
  },
  {
    feature: 'Tipo de respuesta',
    traditional: 'Reactiva: actúa cuando el operador detecta el problema',
    crowdsense: 'Alerta temprana: detecta antes de que la congestión escale',
  },
  {
    feature: 'Conteo de personas',
    traditional: 'Estimación subjetiva visual',
    crowdsense: 'Conteo asistido por modelos de visión artificial',
  },
  {
    feature: 'Evidencia de eventos',
    traditional: 'Sin registro estructurado de incidentes',
    crowdsense: 'Logs, capturas y datos exportables por evento',
  },
  {
    feature: 'Identificación de zonas críticas',
    traditional: 'Difícil sin análisis posterior de grabaciones',
    crowdsense: 'Mapas de calor acumulados por sector y horario',
  },
  {
    feature: 'Dependencia del personal',
    traditional: 'Total: sin operador activo no hay monitoreo efectivo',
    crowdsense: 'Apoyo inteligente que libera al operador de vigilancia pasiva',
  },
  {
    feature: 'Reportes operativos',
    traditional: 'Manuales, inconsistentes y difíciles de escalar',
    crowdsense: 'Indicadores automáticos, comparables y exportables',
  },
];

export const FOOTER_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'Privacidad', href: '#privacidad' },
];
