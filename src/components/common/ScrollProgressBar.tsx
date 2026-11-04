import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollReveal';

/**
 * Thin teal→gold gradient scroll-progress bar fixed to the top of the viewport.
 * Respects prefers-reduced-motion.
 */
export const ScrollProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      id="scroll-progress"
      className="fixed top-0 left-0 h-[3px] z-50 pointer-events-none transition-all duration-75"
      style={{
        width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, #126B5B 0%, #C99543 100%)',
      }}
      aria-hidden="true"
    />
  );
};
