# Frontend — CrowdSense AI

SPA de monitoreo inteligente para detección de aglomeraciones en centros comerciales.
Construida con React 19 + Vite + TypeScript + Tailwind CSS v4, conectada a un backend FastAPI mediante JWT.

---

## Stack

| Tecnología | Versión |
|---|---|
| React | 19 |
| Vite | 8 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| react-router-dom | 7 |
| oxlint | 1.x |

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env y configurar VITE_API_URL

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

El servidor de desarrollo corre en `http://localhost:5173`.

---

## Variables de entorno

```env
VITE_API_URL=http://localhost:8000
```

`VITE_API_URL`: URL base del backend FastAPI. Si no se configura, apunta a `http://localhost:8000` por defecto.

---

## Rutas

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Landing page | Público |
| `/login` | Inicio de sesión | Público |
| `/register` | Registro de cuenta | Público |
| `/dashboard` | Panel principal con accesos rápidos | Autenticado |
| `/dashboard/monitoreo` | Análisis en tiempo real (webcam o grabación) | Autenticado |
| `/dashboard/grabaciones` | Subida y listado de grabaciones de video | Autenticado |
| `/dashboard/historial` | Historial de sesiones y resumen por zonas | Autenticado |
| `/dashboard/alertas` | Historial de alertas con filtros | Autenticado |
| `/dashboard/camaras` | Gestión de cámaras IP | Solo administrador |
| `/dashboard/zonas-exclusion` | Configuración de zonas de exclusión | Solo administrador |

---

## Autenticación y roles

- **Registro público**: siempre crea usuarios con rol `vigilante`. No existe selector de rol.
- **Rol administrador**: se crea exclusivamente desde el backend (script seed o insert directo).
- Token JWT en `localStorage`. Al iniciar, `AuthContext` valida contra `GET /auth/me`; si expira, cierra sesión automáticamente.
- Rutas de administrador muestran "Acceso restringido" al usuario `vigilante` sin redirigir.

---

## Funcionalidades principales

### Monitoreo
Tres modos de fuente: **webcam** (captura en tiempo real desde el navegador), **grabación previa** (video previamente subido, análisis via SSE), **cámara IP** (integración futura). Muestra detecciones sobre canvas overlay, nivel de concentración, FPS y latencia del backend.

### Historial
Lista de sesiones analizadas con zona del sector, tipo de día (laborable/fin de semana), nivel máximo, número de personas y thumbnail del frame con mayor concentración. Tab adicional con resumen agregado por zona (tasa de alerta, promedio de personas, criticidad).

### Alertas
Historial de alertas con filtros (todas / pendientes / atendidas). Toast flotante para alertas en tiempo real con sonido. Marcar como atendida actualiza el contador del sidebar.

### Zonas de exclusión (admin)
Editor visual interactivo: dibuja rectángulos normalizados sobre una imagen de referencia (extraída de video o subida directamente). Configura umbrales de detección por zona.

---

## Conexión con el backend

Todos los servicios usan `apiClient.ts` como base:
- Agrega automáticamente `Authorization: Bearer <token>`.
- En 401: limpia localStorage y redirige a `/login`.
- En 403: lanza error de permisos.

---

## Notas

- El sistema detecta **personas y densidad peatonal**. No realiza reconocimiento facial ni identificación de visitantes.
- El copy de la interfaz está en español latinoamericano.
