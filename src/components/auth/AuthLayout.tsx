import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header mínimo */}
      <header className="border-b border-slate-200 bg-white px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
            <span className="text-[#0F172A] font-bold text-lg tracking-tight">
              Crowd<span className="text-gradient-cyan">Sense</span> AI
            </span>
            <span className="text-slate-500 text-[10px] tracking-widest uppercase">Monitoreo inteligente</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-600 hover:text-[#0F172A] transition-colors flex items-center gap-1.5"
          >
            <span aria-hidden="true">←</span>
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Contenido centrado */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="border-t border-slate-200 py-4 px-4 text-center">
        <p className="text-xs text-slate-400">
          © 2026 CrowdSense AI · Sin reconocimiento facial · Sin identificación de visitantes
        </p>
      </footer>
    </div>
  );
}
