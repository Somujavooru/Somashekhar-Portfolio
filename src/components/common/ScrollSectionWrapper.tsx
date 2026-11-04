import React from 'react';
import { motion } from 'framer-motion';

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  isFirstCard?: boolean;
}

export const ScrollSectionWrapper: React.FC<ScrollSectionWrapperProps> = ({
  children,
  id,
  className = '',
  isFirstCard = false,
}) => {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-[#FAFAF7] border-t border-[#E5E9E6] ${
        isFirstCard
          ? 'rounded-t-[36px] sm:rounded-t-[50px] shadow-[0_-30px_70px_rgba(21,37,43,0.16)] mt-0'
          : 'rounded-t-[32px] sm:rounded-t-[44px] shadow-[0_-20px_50px_rgba(21,37,43,0.07)] -mt-8 sm:-mt-12'
      } ${className}`}
    >
      {/* ── Expanding High-Tech Circuit Laser Beam on Curved Top Edge ── */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none z-20">
        <motion.div
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #126B5B 25%, #C99543 50%, #126B5B 75%, transparent 100%)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>


      {/* ── 3D Perspective Elevation & Content Unfold Container ── */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};
