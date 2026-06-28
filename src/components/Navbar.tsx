import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data/landingContent';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';

const ROL_BADGE: Record<UserRole, { label: string; classes: string }> = {
  administrador: {
    label: 'Administrador',
    classes: 'bg-blue-100 text-blue-700 border border-blue-200',
  },
  vigilante: {
    label: 'Vigilante',
    classes: 'bg-slate-100 text-slate-600 border border-slate-200',
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  function handleLogout() {
    logout();
    setMenuOpen(false);
  }

  const rolBadge = user ? ROL_BADGE[user.rol] : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-[#F8FAFC]/90 backdrop-blur-md">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          <span className="text-[#0F172A] font-bold text-lg tracking-tight">
            Crowd<span className="text-gradient-cyan">Sense</span> AI
          </span>
          <span className="text-slate-500 text-[10px] tracking-widest uppercase">Monitoreo inteligente</span>
        </Link>

        {/* Desktop: links de sección */}
        <ul className="hidden lg:flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate-600 hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:text-[#2563EB]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop: zona de autenticación */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoading ? (
            <span className="text-xs text-slate-400">Cargando...</span>
          ) : isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#0F172A] max-w-[140px] truncate">
                  {user.nombre}
                </span>
                {rolBadge && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rolBadge.classes}`}>
                    {rolBadge.label}
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-600 hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:text-[#2563EB]"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`block w-5 h-0.5 bg-[#0F172A] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#0F172A] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#0F172A] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#F8FAFC]/95 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-3" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 text-sm text-slate-600 hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile: zona auth */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isLoading ? null : isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-[#0F172A] truncate">{user.nombre}</span>
                    {rolBadge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit mt-1 ${rolBadge.classes}`}>
                        {rolBadge.label}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm py-2 px-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 text-sm text-slate-600 hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 text-sm text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg text-center font-semibold transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
