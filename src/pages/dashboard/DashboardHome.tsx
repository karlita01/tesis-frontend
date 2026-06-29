import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHome() {
  const { user, isAdmin } = useAuth();

  const sections = [
    {
      to: '/dashboard/monitoreo',
      icon: '▶',
      title: 'Monitoreo',
      description: 'Selecciona una fuente de video, inicia y detén sesiones de monitoreo.',
      accent: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-50',
    },
    {
      to: '/dashboard/grabaciones',
      icon: '▣',
      title: 'Grabaciones',
      description: 'Sube y gestiona videos previos para usarlos en sesiones de monitoreo.',
      accent: 'border-slate-200 hover:border-slate-400 hover:shadow-slate-50',
    },
    ...(isAdmin
      ? [
          {
            to: '/dashboard/camaras',
            icon: '⊕',
            title: 'Cámaras IP',
            description: 'Registra y gestiona cámaras IP de la red interna.',
            accent: 'border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-50',
          },
          {
            to: '/dashboard/zonas-exclusion',
            icon: '◧',
            title: 'Zonas de exclusión',
            description: 'Define áreas que el sistema debe ignorar: vitrinas, maniquíes, mobiliario fijo.',
            accent: 'border-violet-200 hover:border-violet-400 hover:shadow-violet-50',
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Bienvenido, {user?.nombre?.split(' ')[0] ?? 'usuario'}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Panel de control · CrowdSense AI</p>
      </div>

      <div className="mb-8 rounded-xl bg-[#0F172A] text-white px-6 py-5 flex items-start gap-4">
        <span className="text-2xl mt-0.5 shrink-0" aria-hidden="true">🛡</span>
        <div>
          <p className="font-semibold text-base">Sistema en modo prototipo</p>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
            La detección con YOLO y la conexión real a cámaras IP se integrarán en una fase
            posterior. Por ahora puedes registrar configuraciones, cargar grabaciones e iniciar
            sesiones de monitoreo.
          </p>
        </div>
      </div>

      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
        Acceso rápido
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className={`group block bg-white rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-md ${s.accent}`}
          >
            <span className="text-2xl mb-3 block" aria-hidden="true">{s.icon}</span>
            <h3 className="font-semibold text-[#0F172A] text-sm mb-1">{s.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
