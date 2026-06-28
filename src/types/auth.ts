export type UserRole = 'vigilante' | 'administrador';

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuario: User;
}
