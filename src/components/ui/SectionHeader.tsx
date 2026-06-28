interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  titleHighlight?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  titleHighlight,
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!titleHighlight) return title;
    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-gradient-cyan">{titleHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2563EB] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-base md:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
