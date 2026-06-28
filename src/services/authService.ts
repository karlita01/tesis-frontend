/**
 * CrowdSense AI — Servicio de autenticación
 *
 * Preparado para conectar con FastAPI JWT.
 * Variables de entorno requeridas:
 *   VITE_API_URL → URL base del backend FastAPI
 *
 * Para activar integración real:
 *   1. Configurar .env con VITE_API_URL=http://tu-servidor:8000
 *   2. Descomentar los bloques REAL y eliminar los bloques MOCK
 */

import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

// ─── Mock DB local (simulando usuarios ya existentes en backend) ───────────────
// El usuario "administrador" solo puede existir si fue creado manualmente en la
// base de datos o via script seed del backend. El frontend nunca crea admins.
type MockUser = User & { password: string };

const MOCK_DB: MockUser[] = [
  {
    id: 1,
    nombre: 'Administrador',
    email: 'admin@crowdsense.ai',
    password: 'admin123',
    rol: 'administrador',
  },
  {
    id: 2,
    nombre: 'Vigilante Demo',
    email: 'vigilante@crowdsense.ai',
    password: '123456',
    rol: 'vigilante',
  },
];

let mockNextId = 3;

function generateMockToken(userId: number): string {
  const payload = { sub: userId, iat: Date.now() };
  return `mock.${btoa(JSON.stringify(payload))}.signature`;
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// ─────────────────────────────────────────────
// POST /auth/login
// Payload: { email, password }
// Response: { token, usuario }
// ─────────────────────────────────────────────
export async function loginRequest(req: LoginRequest): Promise<AuthResponse> {
  await delay(700);

  /* REAL — descomentar para conectar con FastAPI:
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (res.status === 401) throw new Error('Credenciales incorrectas.');
  if (!res.ok) throw new Error('Error al iniciar sesión. Intenta de nuevo.');
  return res.json() as Promise<AuthResponse>;
  */

  console.log('[MOCK] loginRequest', { email: req.email, API_URL });
  const found = MOCK_DB.find(
    (u) => u.email === req.email && u.password === req.password
  );
  if (!found) throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.');

  const { password: _pw, ...usuario } = found;
  void _pw;
  return { token: generateMockToken(found.id), usuario };
}

// ─────────────────────────────────────────────
// POST /auth/registro
// Payload: { nombre, email, password }
// Response: { token, usuario }
// El backend asigna rol "vigilante" por defecto.
// El frontend nunca envía ni permite elegir rol.
// ─────────────────────────────────────────────
export async function registerRequest(req: RegisterRequest): Promise<AuthResponse> {
  await delay(900);

  /* REAL — descomentar para conectar con FastAPI:
  const res = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req), // NUNCA enviar rol
  });
  if (res.status === 409) throw new Error('Ya existe una cuenta con ese correo.');
  if (!res.ok) throw new Error('Error al crear la cuenta. Intenta de nuevo.');
  return res.json() as Promise<AuthResponse>;
  */

  console.log('[MOCK] registerRequest', { email: req.email, API_URL });
  const exists = MOCK_DB.find((u) => u.email === req.email);
  if (exists) throw new Error('Ya existe una cuenta con ese correo electrónico.');

  const newUser: MockUser = {
    id: mockNextId++,
    nombre: req.nombre,
    email: req.email,
    password: req.password,
    rol: 'vigilante', // El frontend SIEMPRE registra como vigilante
  };
  MOCK_DB.push(newUser);

  const { password: _pw, ...usuario } = newUser;
  void _pw;
  return { token: generateMockToken(newUser.id), usuario };
}

// ─────────────────────────────────────────────
// GET /auth/me
// Header: Authorization: Bearer <token>
// Response: { usuario } o 401 si token inválido
// ─────────────────────────────────────────────
export async function getMeRequest(token: string): Promise<User> {
  await delay(300);

  /* REAL — descomentar para conectar con FastAPI:
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  if (!res.ok) throw new Error('Error al validar sesión.');
  const data = await res.json();
  return data.usuario as User;
  */

  console.log('[MOCK] getMeRequest', { API_URL });
  // En mock: extraer userId del token y buscar en DB
  try {
    const payloadB64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadB64)) as { sub: number };
    const found = MOCK_DB.find((u) => u.id === payload.sub);
    if (!found) throw new Error('UNAUTHORIZED');
    const { password: _pw, ...usuario } = found;
    void _pw;
    return usuario;
  } catch {
    throw new Error('UNAUTHORIZED');
  }
}
