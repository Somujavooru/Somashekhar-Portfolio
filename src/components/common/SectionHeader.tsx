import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface SectionHeaderProps {
  moduleCode: string;
  title: string;
  highlightText?: string;
  description: string;
  align?: 'left' | 'center';
  className?: string;
}

const TEAL = '#126B5B';
const CHARCOAL = '#15252B';
const MUTED = '#68757A';
const BORDER = '#E5E9E6';

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  moduleCode,
  title,
  highlightText,
  description,
  align = 'left',
  className,
}) => {
  const isCenter = align === 'center';

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <motion.div
      className={`${className || 'mb-8 sm:mb-10'} ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {/* Module Breadcrumb Chip */}
      <motion.div
        variants={item}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border text-xs font-mono-tech tracking-wider mb-4 shadow-2xs ${isCenter ? 'mx-auto' : ''}`}
        style={{ borderColor: BORDER, color: MUTED }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: TEAL }}
        />
        <span>{moduleCode}</span>
      </motion.div>

      {/* Main Section Heading */}
      <motion.h2
        variants={item}
        className="text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.12]"
        style={{ color: CHARCOAL }}
      >
        {title}{' '}
        {highlightText && (
          <span style={{ color: TEAL }}>
            {highlightText}
          </span>
        )}
      </motion.h2>

      {/* Animated thin teal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-4 mb-4 h-0.5 max-w-[80px] rounded-full origin-left ${isCenter ? 'mx-auto origin-center' : ''}`}
        style={{ background: `linear-gradient(to right, ${TEAL}, transparent)` }}
      />

      {/* Supporting Description */}
      <motion.p
        variants={item}
        className="text-sm md:text-base leading-relaxed text-[#475569]"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
