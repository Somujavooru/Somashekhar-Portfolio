import React from 'react';

interface SectionHeaderProps {
  moduleCode: string;
  title: string;
  highlightText?: string;
  description: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  moduleCode,
  title,
  highlightText,
  description,
  align = 'left',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      {/* Technical Module Breadcrumb */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono-tech text-xs tracking-wider mb-4 ${isCenter ? 'mx-auto' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{moduleCode}</span>
      </div>

      {/* Main Section Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
            {highlightText}
          </span>
        )}
      </h2>

      {/* Supporting Technical Statement */}
      <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};
