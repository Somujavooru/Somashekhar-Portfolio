import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const SECTIONS = [
  { id: 'hero', code: '01', label: 'CORE' },
  { id: 'about', code: '02', label: 'ABOUT' },
  { id: 'skills', code: '03', label: 'SKILLS' },
  { id: 'projects', code: '04', label: 'PROJECTS' },
  { id: 'startup', code: '05', label: 'FREELANCE' },
  { id: 'experience', code: '06', label: 'EXPERIENCE' },
  { id: 'education', code: '07', label: 'EDUCATION' },
  { id: 'resume', code: '08', label: 'RESUME' },
  { id: 'contact', code: '09', label: 'CONTACT' },
];

const HUD_SECTION_IDS = SECTIONS.map((s) => s.id);

export const FloatingScrollHUD: React.FC = () => {
  const activeId = useScrollSpy(HUD_SECTION_IDS, 160);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = (window.scrollY / totalScroll) * 100;
        setScrollPercent(Math.min(100, Math.max(0, Math.round(current))));
      }
      // Only display after user leaves Hero section (keeps Hero 100% pure)
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (id === 'hero') {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        const topOffset = 70;
        const elemPos = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
        window.scrollTo({ top: elemPos, behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-3 xl:right-5 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-end pointer-events-auto select-none"
          aria-label="Section telemetry navigation"
        >
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl border border-[#E5E9E6] shadow-sm flex flex-col items-end gap-2">
            {/* Telemetry Header */}
            <div className="flex items-center gap-1.5 px-1 pt-0.5 text-[9px] font-mono-tech text-[#8E999E] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#126B5B] animate-pulse" />
              <span>SYS // NAV</span>
            </div>

            {/* Section Dots List */}
            <div className="flex flex-col items-end gap-2 py-0.5 relative">
              {/* Vertical Connecting Circuit Line */}
              <div className="absolute right-[4px] top-1.5 bottom-1.5 w-[1px] bg-[#E5E9E6] -z-10" />

              {SECTIONS.map((sec) => {
                const isActive = activeId === sec.id;
                const isHovered = hoveredId === sec.id;

                return (
                  <div
                    key={sec.id}
                    className="relative flex items-center justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredId(sec.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleNavClick(sec.id)}
                  >
                    {/* Expanded Label on Hover or Active */}
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 4 }}
                          transition={{ duration: 0.15 }}
                          className={`mr-2.5 px-2 py-0.5 rounded text-[10px] font-mono-tech font-semibold tracking-wider whitespace-nowrap shadow-xs ${
                            isActive
                              ? 'bg-[#126B5B] text-white'
                              : 'bg-[#F5F6F3] text-[#15252B] border border-[#E5E9E6]'
                          }`}
                        >
                          <span className="text-[#C99543] mr-1">{sec.code}</span>
                          <span>{sec.label}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Circular Pin Node */}
                    <div className="w-2.5 h-2.5 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.3 : isHovered ? 1.15 : 1,
                          backgroundColor: isActive ? '#126B5B' : isHovered ? '#C99543' : '#D5DAD7',
                        }}
                        transition={{ duration: 0.2 }}
                        className="w-2 h-2 rounded-full"
                        style={{
                          boxShadow: isActive ? '0 0 6px rgba(18, 107, 91, 0.5)' : 'none',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Scroll Percentage Readout */}
            <div className="border-t border-[#EEF1EF] pt-1 px-1 w-full text-right font-mono-tech text-[9px] text-[#68757A]">
              <span className="text-[#126B5B] font-bold">{scrollPercent}%</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
