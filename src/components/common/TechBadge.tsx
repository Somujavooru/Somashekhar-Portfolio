import React from 'react';

interface TechBadgeProps {
  label: string;
  variant?: 'teal' | 'amber' | 'cyan' | 'blue' | 'violet' | 'slate' | 'emerald';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  label,
  variant = 'teal',
  size = 'sm',
  icon,
}) => {
  const variantStyles = {
    teal: 'bg-[#E8F4F0] text-[#126B5B] border-[#126B5B]/30 hover:border-[#126B5B]',
    amber: 'bg-[#FDF6EB] text-[#C99543] border-[#C99543]/30 hover:border-[#C99543]',
    cyan: 'bg-[#E8F4F0] text-[#126B5B] border-[#126B5B]/30 hover:border-[#126B5B]',
    blue: 'bg-[#FAFAF7] text-[#15252B] border-[#E5E9E6] hover:border-[#126B5B]/30',
    violet: 'bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-300',
    slate: 'bg-[#FAFAF7] text-[#68757A] border-[#E5E9E6] hover:border-[#68757A]',
    emerald: 'bg-[#E8F4F0] text-[#126B5B] border-[#126B5B]/30 hover:border-[#126B5B]',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-xs md:text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-mono font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
