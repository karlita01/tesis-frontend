export default function FinalCTA() {
  return (
    <section
      id="contacto"
      className="py-28 bg-[#0d1526] relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent 70%)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-4">
          Próximo paso
        </span>

        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
        >
          Moderniza la seguridad de tu centro comercial con{' '}
          <span className="text-gradient-cyan">monitoreo inteligente</span>
        </h2>

        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Detecta, mide y responde a las aglomeraciones con apoyo de visión artificial,
          alertas automáticas y evidencia operativa. Diseñado para entornos comerciales reales.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="mailto:johanfv4@gmail.com?subject=Solicitud%20de%20demo%20CrowdSense%20AI"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1e] font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 glow-cyan"
            aria-label="Solicitar una demostración de CrowdSense AI"
          >
            <span>Solicitar demostración</span>
            <span aria-hidden="true">→</span>
          </a>
          <a
            href="#tecnologia"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/6 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            aria-label="Ver la arquitectura técnica del sistema"
          >
            Ver arquitectura técnica
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="text-green-500" aria-hidden="true">✓</span>
            Sin reconocimiento facial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500" aria-hidden="true">✓</span>
            Enfocado en seguridad operativa
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500" aria-hidden="true">✓</span>
            Compatible con CCTV existente
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500" aria-hidden="true">✓</span>
            Preparado para integración con FastAPI
          </span>
        </div>
      </div>
    </section>
  );
}
