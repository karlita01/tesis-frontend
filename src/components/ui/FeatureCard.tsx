interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color?: 'cyan' | 'blue' | 'orange' | 'red' | 'green';
}

const COLOR_MAP: Record<string, string> = {
  cyan:   'border-blue-200  hover:border-blue-400  hover:bg-blue-50',
  blue:   'border-blue-200  hover:border-blue-400  hover:bg-blue-50',
  orange: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
  red:    'border-red-200   hover:border-red-400   hover:bg-red-50',
  green:  'border-green-200 hover:border-green-400 hover:bg-green-50',
};

export default function FeatureCard({ icon, title, description, color = 'cyan' }: FeatureCardProps) {
  return (
    <article
      className={`bg-glass rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 border ${COLOR_MAP[color]}`}
    >
      <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>
      <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </article>
  );
}
