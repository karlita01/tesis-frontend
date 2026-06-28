import { FOOTER_LINKS } from '../data/landingContent';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="bg-[#0F172A] border-t border-white/5 py-12" aria-label="Pie de página">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Branding */}
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-white font-bold text-xl">
                Crowd<span className="text-gradient-cyan">Sense</span> AI
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Sistema de monitoreo inteligente basado en visión artificial.
              </p>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              Proyecto tecnológico orientado a optimizar la detección de aglomeraciones
              en espacios comerciales mediante análisis automático de video.
            </p>
          </div>

          {/* Links de navegación */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Navegación
            </p>
            <nav aria-label="Navegación del pie de página">
              <ul className="grid grid-cols-2 gap-2" role="list">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-blue-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Info técnica */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Stack tecnológico
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'YOLO', 'OpenCV'].map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-5 text-xs text-slate-500 leading-relaxed">
              Declaración de privacidad: el sistema no realiza reconocimiento facial
              ni almacena datos biométricos de los visitantes.
            </p>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} CrowdSense AI · Todos los derechos reservados</p>
          <p>Tesis: Sistema de monitoreo inteligente para centros comerciales · Trujillo, Perú</p>
        </div>
      </div>
    </footer>
  );
}
