import React from 'react';

interface TechBadgeProps {
  label: string;
  variant?: 'cyan' | 'blue' | 'violet' | 'slate' | 'emerald';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  label,
  variant = 'cyan',
  size = 'sm',
  icon,
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30 hover:border-cyan-400',
    blue: 'bg-sky-950/40 text-sky-300 border-sky-500/30 hover:border-sky-400',
    violet: 'bg-indigo-950/40 text-indigo-300 border-indigo-500/30 hover:border-indigo-400',
    slate: 'bg-slate-900/60 text-slate-300 border-slate-700/50 hover:border-slate-500',
    emerald: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:border-emerald-400',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-xs md:text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-mono-tech font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
