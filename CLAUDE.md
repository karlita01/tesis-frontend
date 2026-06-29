# CLAUDE.md — CrowdSense AI Frontend

Guía de referencia para Claude Code. Léela completa antes de modificar cualquier archivo.

---

## 1. Descripción general del proyecto

**CrowdSense AI** es un sistema de monitoreo inteligente para detección de aglomeraciones en centros comerciales.

- Landing page profesional + panel de control (dashboard) con autenticación JWT real conectada a FastAPI.
- El sistema detecta personas, densidad peatonal y aglomeraciones. **No realiza reconocimiento facial. No identifica visitantes.**
- Dos roles de usuario: `vigilante` y `administrador`. El registro público siempre crea `vigilante`. Los administradores se crean manualmente en backend.
- Estado actual: **prototipo funcional**. La detección YOLO y la conexión real a cámaras IP se integrarán en una fase posterior.

---

## 2. Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI declarativa |
| Vite | 8 | Bundler y dev server |
| TypeScript | 6 | Tipado estático |
| Tailwind CSS | 4 | Estilos (plugin Vite, sin `tailwind.config.js`) |
| react-router-dom | 7 | Enrutamiento SPA |
| oxlint | 1.x | Linter (no ESLint) |

---

## 3. Estructura de carpetas

```
frontend/
├── src/
│   ├── App.tsx                        # Router raíz: BrowserRouter + AuthProvider + Routes.
│   ├── main.tsx                       # Punto de entrada. Monta <App /> en el DOM.
│   ├── index.css                      # Estilos globales: paleta, bg-glass, utilidades Tailwind.
│   ├── App.css                        # Estilos auxiliares mínimos (preferir index.css).
│   ├── assets/                        # Imágenes estáticas (hero.png, logos).
│   │
│   ├── components/
│   │   ├── Navbar.tsx                 # Navbar de la landing con estado auth (sesión/rol/logout).
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionFlow.tsx
│   │   ├── ModulesGrid.tsx
│   │   ├── KpiDashboard.tsx
│   │   ├── PrivacySection.tsx
│   │   ├── UseCasesSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── Footer.tsx
│   │   ├── TechnologySection.tsx      # ⚠️ Existe pero NO está montado en App.tsx.
│   │   ├── DemoPreview.tsx            # ⚠️ Existe pero NO está montado en App.tsx.
│   │   ├── FinalCTA.tsx               # ⚠️ Existe pero NO está montado en App.tsx.
│   │   │
│   │   ├── auth/
│   │   │   ├── AuthLayout.tsx         # Layout de páginas auth (logo, "← Volver al inicio").
│   │   │   ├── AuthCard.tsx           # Card blanca con borde para formularios.
│   │   │   ├── AuthInput.tsx          # Input con label, error y toggle de contraseña.
│   │   │   └── ProtectedRoute.tsx     # Guard de ruta: redirige a /login si no hay sesión.
│   │   │                              # Acepta prop requireAdmin para restringir a admins.
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardLayout.tsx    # Layout del dashboard: sidebar oscuro + <Outlet />.
│   │   │                              # Sidebar muestra nav según rol (admin ve Cámaras y Zonas).
│   │   │
│   │   ├── zones/
│   │   │   └── ZoneEditor.tsx         # Editor interactivo de zonas de exclusión sobre imagen SVG.
│   │   │                              # Permite dibujar, seleccionar y eliminar rectángulos normalizados.
│   │   │
│   │   └── ui/
│   │       ├── AlertCard.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── MetricCard.tsx
│   │       ├── SectionHeader.tsx
│   │       └── StatusBadge.tsx        # DensityBadge + StatusBadge con colores semánticos.
│   │
│   ├── context/
│   │   └── AuthContext.tsx            # AuthProvider + hook useAuth.
│   │                                  # Expone: user, token, isLoading, isAuthenticated,
│   │                                  # isAdmin, isVigilante, login, register, logout,
│   │                                  # validateSession, hasRole.
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx              # Ruta /login — email + contraseña + validación.
│   │   ├── RegisterPage.tsx           # Ruta /register — siempre crea rol vigilante, sin selector.
│   │   └── dashboard/
│   │       ├── DashboardHome.tsx      # Ruta /dashboard — bienvenida + acceso rápido a secciones.
│   │       ├── MonitoreoPage.tsx      # Ruta /dashboard/monitoreo — selección de fuente + sesión.
│   │       ├── GrabacionesPage.tsx    # Ruta /dashboard/grabaciones — subir y listar videos.
│   │       ├── CamarasPage.tsx        # Ruta /dashboard/camaras — CRUD cámaras IP (solo admin).
│   │       └── ZonasExclusionPage.tsx # Ruta /dashboard/zonas-exclusion — CRUD zonas (solo admin).
│   │
│   ├── services/
│   │   ├── apiClient.ts               # Fetch wrapper central con Bearer token y manejo 401/403.
│   │   ├── authService.ts             # loginRequest, registerRequest, getMeRequest → FastAPI real.
│   │   ├── cameraService.ts           # getCameras, createCamera, updateCameraStatus, deleteCamera.
│   │   ├── exclusionZoneService.ts    # CRUD zonas de exclusión (multipart/form-data).
│   │   ├── monitoringService.ts       # startMonitoring, stopMonitoring.
│   │   ├── recordingService.ts        # uploadRecording, getRecordings.
│   │   ├── videoSourceService.ts      # getVideoSources, selectVideoSource.
│   │   └── api.ts                     # Servicios legacy de dominio (video, análisis, eventos,
│   │                                  # zonas, heatmaps). Aún con mocks; separado del nuevo layer.
│   │
│   └── types/
│       ├── auth.ts                    # UserRole, User, LoginRequest, RegisterRequest, AuthResponse.
│       ├── api.ts                     # CameraIP, VideoSource, Recording, MonitoringSession, etc.
│       ├── zones.ts                   # ExclusionRect, ExclusionZoneConfig.
│       └── index.ts                   # Tipos legacy de dominio (CrowdEvent, Alert, HeatmapPoint…).
│
├── index.html
├── .env.example                       # VITE_API_URL y VITE_WS_URL
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 4. Rutas de la aplicación

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | `LandingPage` (inline en App.tsx) | Público |
| `/login` | `LoginPage` | Público |
| `/register` | `RegisterPage` | Público |
| `/dashboard` | `DashboardLayout > DashboardHome` | Autenticado |
| `/dashboard/monitoreo` | `DashboardLayout > MonitoreoPage` | Autenticado |
| `/dashboard/grabaciones` | `DashboardLayout > GrabacionesPage` | Autenticado |
| `/dashboard/camaras` | `DashboardLayout > CamarasPage` | Solo administrador |
| `/dashboard/zonas-exclusion` | `DashboardLayout > ZonasExclusionPage` | Solo administrador |

`ProtectedRoute` con `requireAdmin` muestra pantalla de "acceso restringido" (no redirige) si el usuario es vigilante.

---

## 5. Componentes principales del dashboard

| Componente/Página | Función |
|---|---|
| `DashboardLayout` | Shell del dashboard: sidebar fijo en desktop, overlay en mobile. Nav según rol. |
| `DashboardHome` | Bienvenida con tarjetas de acceso rápido. Admin ve "Cámaras IP" extra. |
| `MonitoreoPage` | 3 tipos de fuente: `webcam`, `grabacion_previa`, `camara_ip`. Flujo: seleccionar → confirmar → iniciar → detener. |
| `GrabacionesPage` | Drag & drop file, subida multipart, lista de grabaciones del backend. |
| `CamarasPage` | CRUD completo de cámaras IP (nombre, IP, ubicación, descripción, activa). |
| `ZonasExclusionPage` | CRUD de configuraciones de zonas con editor visual. Soporta imagen directa o extracción de frame de video (sin subir el video completo). |
| `ZoneEditor` | Dibuja rectángulos normalizados (0–1) sobre imagen SVG. Selección y borrado individual. |

---

## 6. Capa de servicios

Todos los servicios del dashboard usan `apiClient.ts` como base:
- Añade automáticamente `Authorization: Bearer <token>` desde localStorage.
- En 401: limpia localStorage y redirige a `/login`.
- En 403: lanza error de permisos.
- Soporta JSON y multipart/form-data.

**Endpoints conectados al backend FastAPI real:**

| Servicio | Endpoints |
|---|---|
| `authService` | `POST /auth/login`, `POST /auth/registro`, `GET /auth/me` |
| `cameraService` | `GET /api/camaras`, `POST /api/camaras`, `PATCH /api/camaras/{id}/estado`, `DELETE /api/camaras/{id}` |
| `recordingService` | `POST /api/grabaciones`, `GET /api/grabaciones` |
| `videoSourceService` | `GET /api/fuentes-video`, `POST /api/fuentes-video/seleccionar` |
| `monitoringService` | `POST /api/monitoreo/iniciar`, `POST /api/monitoreo/{id}/detener` |
| `exclusionZoneService` | `GET/POST /api/zonas-exclusion`, `GET/PUT/DELETE /api/zonas-exclusion/{id}` |

`api.ts` (legacy) aún tiene funciones mock para video, análisis y heatmaps. No se usa en el dashboard actual.

---

## 7. Variables de entorno

```
VITE_API_URL=http://localhost:8000   # URL base del backend FastAPI (requerida)
VITE_WS_URL=ws://localhost:8000      # URL WebSocket (futuro, no usado aún)
```

Si `VITE_API_URL` no está configurada, los servicios apuntan a `http://localhost:8000` por defecto.

---

## 8. Autenticación y roles

- Token guardado en `localStorage` con key `token`. Usuario con key `usuario`.
- `AuthContext` valida la sesión al montar llamando a `GET /auth/me`.
- Si `/auth/me` responde 401, se limpia la sesión automáticamente.
- **No se guarda la contraseña en ningún lugar.**
- **El registro nunca envía ni permite seleccionar rol.** El backend asigna `vigilante` por defecto.
- El rol `administrador` solo puede existir si fue creado directamente en la base de datos o mediante un script seed del backend.

---

## 9. Notas de diseño

### Landing (`/`)
| Elemento | Valor |
|---|---|
| Fondo base | `#F8FAFC` (secciones alternas entre `#F8FAFC` y `white`) |
| Texto principal | `#0F172A` |
| Acento / CTA | `#2563EB` (azul cobalto) |
| Alerta / error | `#EF4444` |
| Éxito / activo | `#22C55E` |
| Advertencia | `#F59E0B` |
| Cards | Clase `bg-glass` → `bg-white` con `border-slate-200` y sombra sutil |
| Footer | Fondo oscuro `#0F172A` sobre landing clara |

### Dashboard (`/dashboard/*`)
| Elemento | Valor |
|---|---|
| Sidebar | `bg-[#0F172A]` (oscuro) |
| Fondo principal | `bg-slate-50` |
| Cards y paneles | `bg-white` con `border-slate-200` |
| Item activo en nav | `bg-[#2563EB] text-white` |
| Badge admin | Azul (`bg-blue-500/20 text-blue-300`) |
| Badge vigilante | Gris (`bg-slate-600/60 text-slate-300`) |

---

## 10. Reglas para futuras modificaciones

- **No eliminar componentes existentes** sin justificación explícita, aunque no estén montados.
- **No cambiar el orden de secciones de la landing** sin avisar al usuario.
- **El registro nunca debe tener selector de rol.** Es una regla de seguridad del sistema.
- **Mantener TypeScript sin errores.** Ejecutar `npm run build` antes de dar por terminado cualquier cambio.
- **Usar Tailwind CSS** para estilos. No crear archivos `.css` nuevos salvo necesidad extrema.
- **El contenido estático de la landing** vive en `src/data/landingContent.ts`. No hardcodear en componentes.
- **Nuevos servicios de API** deben usar `apiClient.ts` como base, no `fetch` directo.
- **No inventar métricas finales del sistema.** Los KPIs se completarán tras validación experimental.
- **No presentar el sistema como reconocimiento facial.**
- **El copy va en español latinoamericano.** Sin Lorem ipsum.
- **Mantener responsive** en landing y dashboard (mobile y desktop).

---

## 11. Flujo recomendado para agregar nuevas funciones

1. **Tipos** → agregar en el archivo de `src/types/` correspondiente.
2. **Servicio** → crear función en `src/services/` usando `apiFetch` de `apiClient.ts`.
3. **Página o componente** → crear en `src/pages/dashboard/` o `src/components/`.
4. **Ruta** → registrar en `App.tsx` dentro del bloque `<Route path="/dashboard">`.
5. **Navegación** → añadir el link en `DashboardLayout.tsx` (condicionado a `isAdmin` si aplica).
6. **Build** → ejecutar `npm run build` y verificar 0 errores.

---

## 12. Comandos útiles

```bash
npm install          # Instalar dependencias
npm run dev          # Dev server en http://localhost:5173
npm run build        # Build de producción (tsc + vite build)
npm run lint         # Linter con oxlint
npm run preview      # Preview del build de producción
```

> El linter es **oxlint**, configurado en `.oxlintrc.json`. No usar ESLint.

---

## 13. Checklist antes de terminar cualquier cambio

- [ ] `npm run build` termina sin errores TypeScript ni de Vite.
- [ ] Responsive verificado en mobile (≤ 640px) y desktop (≥ 1024px).
- [ ] Rutas protegidas probadas con usuario autenticado y sin autenticar.
- [ ] Rutas `requireAdmin` probadas con rol vigilante (debe ver "Acceso restringido").
- [ ] La landing (`/`) no fue afectada si el cambio es del dashboard.
- [ ] El navbar de la landing refleja correctamente el estado de sesión.
- [ ] No se eliminaron mocks de `src/data/` que otros componentes aún usan.
- [ ] Copy en español latinoamericano, sin placeholders.
- [ ] El sistema sigue presentado como detección de personas/densidad, nunca reconocimiento facial.
