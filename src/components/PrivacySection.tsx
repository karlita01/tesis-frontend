const PRIVACY_CARDS = [
  {
    icon: '🚫',
    title: 'Sin reconocimiento facial',
    description:
      'El sistema detecta personas como entidades en el espacio, no identifica ni relaciona características biométricas con identidades reales. No tiene acceso a bases de datos de rostros ni genera perfiles personales.',
    accent: 'green',
  },
  {
    icon: '🔒',
    title: 'IDs temporales y anónimos',
    description:
      'Si se activa el seguimiento multiobjeto, el sistema asigna identificadores numéricos temporales únicamente para rastrear el movimiento durante la duración del análisis. Estos IDs se descartan al finalizar la sesión.',
    accent: 'blue',
  },
  {
    icon: '🛡️',
    title: 'Enfoque en seguridad operativa',
    description:
      'El objetivo del sistema es la detección de aglomeraciones, estimación de densidad peatonal y apoyo a la respuesta operativa del personal de seguridad. No almacena datos biométricos ni información personal de los visitantes.',
    accent: 'blue',
  },
];

const ACCENT_CLASSES: Record<string, string> = {
  green: 'border-green-200 bg-green-50',
  blue:  'border-blue-200  bg-blue-50',
};

const ICON_CLASSES: Record<string, string> = {
  green: 'bg-green-50 border-green-200',
  blue:  'bg-blue-50  border-blue-200',
};

export default function PrivacySection() {
  return (
    <section
      id="privacidad"
      className="py-24 bg-white"
      aria-labelledby="privacy-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-700">
            Uso responsable de IA
          </span>
        </div>
        <h2
          id="privacy-heading"
          className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center mb-6 max-w-3xl mx-auto"
        >
          IA para seguridad operativa,{' '}
          <span className="text-gradient-cyan">no para vigilancia invasiva</span>
        </h2>
        <p className="text-center text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          El sistema analiza presencia humana, densidad y patrones de aglomeración. No realiza
          reconocimiento facial, no determina la identidad real de los visitantes y no almacena
          datos biométricos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRIVACY_CARDS.map((card) => (
            <article
              key={card.title}
              className={`rounded-xl p-6 flex flex-col gap-4 border transition-all ${ACCENT_CLASSES[card.accent]}`}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl ${ICON_CLASSES[card.accent]}`}
              >
                <span aria-hidden="true">{card.icon}</span>
              </div>
              <h3 className="text-base font-semibold text-[#0F172A]">{card.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
            </article>
          ))}
        </div>

        {/* Declaración formal */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-3xl mx-auto text-center">
          <p className="text-sm text-slate-700 leading-relaxed italic">
            "El sistema detecta personas y patrones de aglomeración, pero no realiza
            reconocimiento facial ni determina la identidad real de los visitantes."
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Declaración de uso responsable — CrowdSense AI
          </p>
        </div>
      </div>
    </section>
  );
}
