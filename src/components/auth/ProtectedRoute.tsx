import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Acceso restringido</h2>
        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
          Solo los administradores pueden acceder a esta sección.
          Contacta al administrador si necesitas acceso.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
