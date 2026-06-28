# CLAUDE.md — CrowdSense AI Frontend

Guía de referencia para Claude Code. Léela completa antes de modificar cualquier archivo.

---

## 1. Descripción general del proyecto

Este frontend corresponde a **CrowdSense AI**, una landing page profesional para un sistema de monitoreo inteligente orientado a la **detección de aglomeraciones en centros comerciales**.

- Estética profesional y corporativa con paleta 60-30-10 (fondo `#F8FAFC`, textos `#0F172A`, acento `#2563EB`).
- Landing con datos mock, preparada para futura integración con un backend FastAPI.
- SPA con react-router-dom. Rutas actuales: `/` (landing), `/login`, `/register`.
- El sistema detecta personas y densidad. **No realiza reconocimiento facial. No identifica visitantes.**
- Autenticación con JWT preparada para FastAPI. Hoy usa mocks. Roles: `vigilante` y `administrador`.
- **El registro público siempre crea usuarios `vigilante`. El rol `administrador` solo se crea en backend.**

---

## 2. Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI declarativa |
| Vite | 8 | Bundler y dev server |
| TypeScript | 6 | Tipado estático |
| Tailwind CSS | 4 | Estilos utilitarios (vía plugin Vite) |
| oxlint | 1.x | Linter (reemplaza ESLint) |

Tailwind v4 se integra directamente como plugin de Vite (`@tailwindcss/vite`), sin archivo `tailwind.config.js` separado. Los estilos globales están en `src/index.css`.

---

## 3. Estructura de carpetas

```
frontend/
├── src/
│   ├── App.tsx               # Router raíz: BrowserRouter + AuthProvider + Routes.
│   ├── main.tsx              # Punto de entrada. Monta <App /> en el DOM.
│   ├── index.css             # Estilos globales: paleta, bg-glass, utilidades Tailwind.
│   ├── App.css               # Estilos auxiliares (mínimos, preferir index.css).
│   ├── assets/               # Imágenes y SVGs estáticos.
│   ├── components/
│   │   ├── Navbar.tsx              # Navbar con estado auth: muestra sesión/rol o links login/register.
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionFlow.tsx
│   │   ├── ModulesGrid.tsx
│   │   ├── KpiDashboard.tsx
│   │   ├── PrivacySection.tsx
│   │   ├── UseCasesSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── RoadmapSection.tsx
│   │   ├── Footer.tsx
│   │   ├── TechnologySection.tsx   # ⚠️ Existe pero NO está montado todavía.
│   │   ├── DemoPreview.tsx         # ⚠️ Existe pero NO está montado todavía.
│   │   ├── FinalCTA.tsx            # ⚠️ Existe pero NO está montado todavía.
│   │   ├── auth/                   # Componentes UI exclusivos de autenticación.
│   │   │   ├── AuthLayout.tsx      # Layout centrado con logo y link "← Volver al inicio".
│   │   │   ├── AuthCard.tsx        # Card blanca con borde y sombra para formularios.
│   │   │   └── AuthInput.tsx       # Input accesible con label, error y toggle contraseña.
│   │   └── ui/
│   │       ├── AlertCard.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── MetricCard.tsx
│   │       ├── SectionHeader.tsx
│   │       └── StatusBadge.tsx
│   ├── context/
│   │   └── AuthContext.tsx         # AuthProvider + useAuth hook. Gestiona user, token, roles.
│   ├── data/
│   │   ├── landingContent.ts
│   │   └── mockEvents.ts
│   ├── pages/
│   │   ├── LoginPage.tsx           # Ruta /login — email + contraseña, validación, mock login.
│   │   └── RegisterPage.tsx        # Ruta /register — siempre crea rol vigilante, sin selector.
│   ├── services/
│   │   ├── api.ts                  # Servicios de dominio (video, análisis, eventos, etc.).
│   │   └── authService.ts          # Auth mock + bloques REAL comentados para FastAPI.
│   └── types/
│       ├── index.ts                # Tipos de dominio (CrowdEvent, Alert, Zone, etc.).
│       └── auth.ts                 # Tipos auth: User, UserRole, LoginRequest, AuthResponse.
├── index.html
├── .env.example
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 4. Componentes principales

### Secciones montadas en App.tsx (en orden de aparición)

| Componente | Función |
|---|---|
| `Navbar` | Barra de navegación fija con links a anclas de la página. |
| `HeroSection` | Primera pantalla: propuesta de valor principal de CrowdSense AI. |
| `ProblemSection` | Cards con los 6 problemas que el sistema resuelve (monitoreo manual, fatiga, oclusión, etc.). |
| `SolutionFlow` | Flujo de 4 pasos: captura → detección → clasificación → alertas. |
| `ModulesGrid` | Grilla de los 9 módulos del sistema (video, detección, conteo, alertas, heatmaps, etc.). |
| `KpiDashboard` | 8 indicadores de rendimiento con estado `ready`, `validating` o `mock`. |
| `PrivacySection` | Sección que aclara que el sistema no realiza reconocimiento facial. |
| `UseCasesSection` | 6 casos de uso: malls, galerías, terminales, universidades, eventos, edificios. |
| `ComparisonSection` | Tabla comparativa: monitoreo tradicional vs CrowdSense AI (7 criterios). |
| `RoadmapSection` | Hoja de ruta con 8 ítems futuros (etiquetados: Próxima versión / En desarrollo / Futuro módulo). |
| `Footer` | Pie de página con links de navegación. |

### Secciones existentes pero aún no montadas en App.tsx

| Componente | Estado | Notas |
|---|---|---|
| `TechnologySection` | Desmontado | Muestra el stack tecnológico por capas. |
| `DemoPreview` | Desmontado | Demo interactivo simulado del sistema. |
| `FinalCTA` | Desmontado | Llamada a la acción final antes del footer. |

> Antes de montarlos, verificar que tienen contenido completo y no rompen el flujo visual.

### Componentes UI reutilizables (`src/components/ui/`)

| Componente | Props clave | Uso |
|---|---|---|
| `MetricCard` | `metric: Metric` | Card de KPI con valor, unidad y estado. |
| `AlertCard` | — | Card de alerta con severidad visual. |
| `FeatureCard` | — | Card de módulo o característica. |
| `SectionHeader` | — | Título y subtítulo de sección, centrado. |
| `StatusBadge` | — | Badge de estado con color semántico. |

---

## 5. Reglas para futuras modificaciones

- **No eliminar componentes existentes** sin justificación explícita del usuario, aunque no estén montados en App.tsx.
- **No cambiar el orden de secciones en App.tsx** sin avisar al usuario.
- **Mantener diseño responsive** en todo momento. Verificar en mobile y desktop.
- **Mantener TypeScript sin errores.** Ejecutar `npm run build` antes de dar por terminado cualquier cambio.
- **Usar Tailwind CSS para todos los estilos.** No escribir CSS en línea ni crear archivos `.css` nuevos salvo necesidad extrema.
- **Reutilizar componentes UI** de `src/components/ui/` antes de crear nuevos.
- **El copy debe estar en español latinoamericano.** Sin Lorem ipsum, sin placeholders genéricos.
- **No inventar métricas finales del sistema.** Los KPIs reales se completarán tras validación; usar los estados `ready` / `validating` / `mock` según corresponda.
- **No presentar el sistema como reconocimiento facial.** No decir que identifica visitantes, residentes ni personas específicas.
- **El enfoque es:** detección de personas, conteo, densidad, aglomeraciones, alertas, mapas de calor y apoyo operativo.
- **El contenido estático** (textos, listas, módulos, roadmap) vive en `src/data/landingContent.ts`. Editar ahí, no hardcodearlo en los componentes.

---

## 6. Integración futura con backend FastAPI

El archivo `src/services/api.ts` ya está estructurado para conectarse con el backend. Cada función tiene el bloque real comentado con la etiqueta `/* REAL: ... */`.

**Variables de entorno necesarias** (ver `.env.example`):

```
VITE_API_URL=http://localhost:8000   # URL base del backend FastAPI
VITE_WS_URL=ws://localhost:8000      # URL base para WebSocket (tiempo real)
```

**Para activar la integración real en cualquier función de `api.ts`:**
1. Configurar `.env` con la URL correcta.
2. Descomentar el bloque `/* REAL: ... */`.
3. Eliminar el bloque mock correspondiente.
4. Verificar tipos de respuesta contra `src/types/index.ts`.

**Endpoints ya mapeados en `api.ts`:**

| Función | Endpoint |
|---|---|
| `uploadVideo` | `POST /api/videos/upload` |
| `startAnalysis` | `POST /api/analysis/start` |
| `getAnalysisStatus` | `GET /api/analysis/{id}/status` |
| `getAnalysisResults` | `GET /api/analysis/{id}/results` |
| `getEvents` | `GET /api/events` |
| `getZones` | `GET /api/zones` |
| `saveZone` | `POST /api/zones` |
| `getHeatmapData` | `GET /api/heatmaps/{sector_id}` |
| `getSummaryReport` | `GET /api/reports/summary` |

---

## 7. Flujo recomendado para agregar nuevas funciones

1. **Tipos TypeScript** → agregar o extender interfaces en `src/types/index.ts`.
2. **Mock o servicio API** → agregar función en `src/services/api.ts` con el patrón existente (mock comentado + bloque real).
3. **Datos estáticos** → si la sección tiene contenido fijo (textos, listas), agregarlo en `src/data/landingContent.ts`.
4. **Componente UI** → si se necesita un bloque reutilizable, crearlo en `src/components/ui/`.
5. **Componente de sección** → crear el componente en `src/components/`.
6. **Montarlo en App.tsx** → agregarlo en la posición correcta del flujo visual.
7. **Verificar** → `npm run build` sin errores, responsive en mobile y desktop.

---

## 8. Comandos útiles

```bash
npm install          # Instalar dependencias
npm run dev          # Dev server en http://localhost:5173
npm run build        # Build de producción (tsc + vite build)
npm run lint         # Linter con oxlint
npm run preview      # Preview del build de producción
```

> El linter es **oxlint**, no ESLint. La configuración está en `.oxlintrc.json`.

---

## 9. Notas de diseño

| Elemento | Estilo |
|---|---|
| Fondo base | `#0a0f1e` — azul noche oscuro |
| Acentos principales | Cian tecnológico (`cyan-400`, `cyan-500`) |
| Alertas / riesgo alto | Rojo / naranja (`red-500`, `orange-400`) |
| Estado seguro / bajo | Verde (`green-400`, `green-500`) |
| Texto principal | `white` / `slate-100` |
| Texto secundario | `slate-400` / `slate-500` |
| Cards | Clase custom `bg-glass` (definida en `index.css`) — fondo semitransparente con borde sutil |
| Tipografía | Sistema sans-serif, limpia e institucional |

El diseño es limpio, oscuro y tecnológico. Evitar colores pastel, gradientes excesivos o estilos "startup colorido". La identidad visual es operativa y profesional.

---

## 10. Checklist antes de terminar cualquier cambio

- [ ] El componente/sección se ve bien en mobile (≤ 640px) y desktop (≥ 1024px).
- [ ] `npm run build` termina sin errores de TypeScript ni de Vite.
- [ ] `npm run lint` no reporta errores nuevos.
- [ ] La navegación por anclas (`#seccion`) sigue funcionando.
- [ ] No se eliminaron mocks de `src/data/` que otros componentes aún usan.
- [ ] El copy nuevo está en español latinoamericano y no contiene placeholders.
- [ ] No se agregaron métricas de rendimiento inventadas sin respaldo de datos reales.
- [ ] El sistema sigue presentado como detección de personas/densidad, nunca como reconocimiento facial.
- [ ] Los componentes UI nuevos usan los colores y clases del sistema de diseño existente.
