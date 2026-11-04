import React from 'react';
import { motion, type Variants, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Mail, Cpu, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/SocialIcons';
import { PROFILE_CONFIG } from '../data/profile';
import { HeroProfileCenterpiece } from '../components/hero/HeroProfileCenterpiece';

interface HeroSectionProps {
  onOpenResumeModal: (type: 'embedded' | 'software') => void;
}

const TEAL = '#126B5B';
const GOLD = '#C99543';
const CHARCOAL = '#15252B';
const MUTED = '#68757A';
const BORDER = '#E5E9E6';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const { scrollY } = useScroll();

  // At scroll = 0, these values are 0, 0, 1, 1 (exact initial state)
  const leftColY = useTransform(scrollY, [0, 600], [0, -35]);
  const rightColY = useTransform(scrollY, [0, 600], [0, -55]);
  const heroOpacity = useTransform(scrollY, [0, 450, 750], [1, 0.7, 0.2]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.94]);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(elem, { offset: -70, duration: 1.2 });
      } else {
        const topOffset = 80;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-full min-h-screen flex items-center pt-16 sm:pt-20 lg:pt-20 xl:pt-22 pb-6 lg:pb-8 overflow-hidden bg-[#FAFAF7]"
    >
      {/* Precision Laboratory Architectural Vertical Guidelines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(21, 37, 43, 0.035) 0px, rgba(21, 37, 43, 0.035) 1px, transparent 1px, transparent 136px)',
        }}
      />

      {/* Subtle Atmospheric Light Radial Glows */}
      <div
        className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(18,107,91,0.035) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,149,67,0.035) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Precision Grid Crosshairs and Accent Dots */}
      <div className="hidden lg:block absolute left-9 top-[48%] w-1.5 h-1.5 rounded-full bg-[#C99543]/70 pointer-events-none z-0" />
      <div className="hidden lg:block absolute left-9 top-[54%] w-1.5 h-1.5 rounded-full bg-[#C99543]/70 pointer-events-none z-0" />
      
      {/* Center-Bottom Precision Crosshair */}
      <div className="hidden lg:flex items-center justify-center absolute left-[60.5%] bottom-7 pointer-events-none z-0 text-[#126B5B]/50">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Bottom-Left Precision Crosshair */}
      <div className="hidden lg:flex items-center justify-center absolute left-14 bottom-6 pointer-events-none z-0 text-[#126B5B]/50">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1" />
          <circle cx="6" cy="6" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Top-Right Precision Dot */}
      <div className="hidden lg:block absolute right-12 top-[22%] w-1.5 h-1.5 rounded-full bg-[#126B5B]/60 pointer-events-none z-0" />

      {/* Decorative Botanical Foliage Accents (Soft Blur) */}
      {/* Top-Left Foliage Silhouette */}
      <div
        className="hidden md:block absolute -top-14 -left-14 w-60 h-60 pointer-events-none z-0 opacity-45 select-none"
        style={{ filter: 'blur(4px)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path
            d="M20 20 C60 40, 100 90, 90 150 C70 120, 40 80, 20 20 Z"
            fill="#234E43"
          />
          <path
            d="M30 40 C90 60, 140 120, 130 180 C110 140, 70 90, 30 40 Z"
            fill="#184238"
          />
          <path
            d="M0 60 C50 70, 90 120, 70 170 C50 140, 20 100, 0 60 Z"
            fill="#2E5C50"
          />
        </svg>
      </div>

      {/* Bottom-Right Foliage Silhouette */}
      <div
        className="hidden md:block absolute -bottom-14 -right-14 w-72 h-72 pointer-events-none z-0 opacity-55 select-none"
        style={{ filter: 'blur(4px)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 240 240" fill="none" className="w-full h-full">
          <path
            d="M220 220 C160 190, 110 130, 120 60 C145 95, 185 145, 220 220 Z"
            fill="#1E473D"
          />
          <path
            d="M200 200 C130 170, 80 100, 95 30 C120 75, 165 130, 200 200 Z"
            fill="#143A30"
          />
          <path
            d="M240 180 C180 155, 130 95, 150 40 C175 80, 210 125, 240 180 Z"
            fill="#26574B"
          />
        </svg>
      </div>

      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 w-full relative z-10 my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">

          {/* ── Left Column: Editorial & Information Panels ── */}
          <motion.div
            style={{ y: leftColY }}
            className="lg:col-span-6 xl:col-span-6 space-y-3.5 xl:space-y-4 text-left -translate-y-2 lg:-translate-y-5 xl:-translate-y-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono-tech tracking-wide bg-white shadow-xs"
              style={{ borderColor: BORDER, color: CHARCOAL }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
              <span className="font-bold text-xs tracking-wider" style={{ color: TEAL }}>
                ECE GRADUATE 2026
              </span>
              <span className="text-[#8E999E]">|</span>
              <span className="text-xs font-semibold tracking-wider" style={{ color: MUTED }}>
                EMBEDDED SOFTWARE ENGINEER
              </span>
            </motion.div>

            {/* Name Intro */}
            <motion.div
              variants={item}
              className="font-mono-tech text-xs sm:text-[13px] tracking-widest uppercase font-semibold"
              style={{ color: MUTED }}
            >
              HELLO, I AM{' '}
              <span className="font-bold tracking-wider" style={{ color: CHARCOAL }}>
                {PROFILE_CONFIG.name}
              </span>
            </motion.div>

            {/* Editorial Headline matching exact four-line composition */}
            <motion.h1
              variants={item}
              className="text-3xl sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.8rem] font-display font-extrabold tracking-tight leading-[1.05]"
              style={{ color: CHARCOAL }}
            >
              <span>Engineering</span>
              <span className="block" style={{ color: TEAL }}>
                Intelligence.
              </span>
              <span className="block mt-0.5 sm:mt-1">
                Connecting Hardware
              </span>
              <span className="block">
                and <span style={{ color: GOLD }}>Software.</span>
              </span>
            </motion.h1>

            {/* Supporting Statement */}
            <motion.p
              variants={item}
              className="text-sm sm:text-[15px] leading-relaxed max-w-xl font-normal text-[#475569]"
            >
              {PROFILE_CONFIG.heroStatement}
            </motion.p>

            {/* Mobile Hero Centerpiece */}
            <motion.div variants={item} className="block lg:hidden my-4">
              <HeroProfileCenterpiece />
            </motion.div>

            {/* 3 Compact Information Panels */}
            <motion.div
              variants={item}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-xl pt-0.5"
            >
              {/* Panel 1: Embedded Systems */}
              <div
                className="p-2.5 sm:p-3 rounded-2xl bg-white border border-[#E5E9E6] shadow-xs flex items-center gap-2.5 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#FDF6EB', color: GOLD }}
                >
                  <Cpu className="w-5 h-5 text-[#C99543]" />
                </div>
                <div>
                  <div className="text-[13px] sm:text-sm font-bold leading-tight" style={{ color: CHARCOAL }}>
                    Embedded Systems
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono-tech mt-0.5 leading-snug" style={{ color: MUTED }}>
                    ESP32 / STM32 / AVR<br />FreeRTOS
                  </div>
                </div>
              </div>

              {/* Panel 2: Protocols */}
              <div
                className="p-2.5 sm:p-3 rounded-2xl bg-white border border-[#E5E9E6] shadow-xs flex items-center gap-2.5 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-xs"
                  style={{ backgroundColor: '#FDF6EB', color: GOLD }}
                >
                  &lt;/&gt;
                </div>
                <div>
                  <div className="text-[13px] sm:text-sm font-bold leading-tight" style={{ color: CHARCOAL }}>
                    Protocols
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono-tech mt-0.5 leading-snug" style={{ color: MUTED }}>
                    I2C / SPI / UART<br />MQTT
                  </div>
                </div>
              </div>

              {/* Panel 3: Academic CGPA */}
              <div
                className="p-2.5 sm:p-3 rounded-2xl bg-white border border-[#E5E9E6] shadow-xs flex items-center gap-2.5 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#FDF6EB', color: GOLD }}
                >
                  <svg className="w-5 h-5 text-[#C99543]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <line x1="12" y1="20" x2="12" y2="8" />
                    <line x1="18" y1="20" x2="18" y2="4" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] sm:text-sm font-bold leading-tight" style={{ color: CHARCOAL }}>
                    Academic CGPA
                  </div>
                  <div className="text-xs sm:text-[13px] font-mono-tech font-bold mt-0.5" style={{ color: GOLD }}>
                    8.75 / 10.0
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={item} className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Primary Teal CTA */}
              <motion.button
                onClick={() => scrollTo('projects')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  backgroundColor: TEAL,
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0E5548')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Secondary Download Button */}
              <motion.button
                onClick={() => onOpenResumeModal('embedded')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white border border-[#E5E9E6] font-semibold text-xs sm:text-[13px] text-[#15252B] tracking-wide shadow-xs hover:border-[#126B5B] hover:text-[#126B5B] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#126B5B]" />
                <span>Download Resume</span>
              </motion.button>

              {/* Tertiary Contact Button */}
              <motion.button
                onClick={() => scrollTo('contact')}
                whileHover={{ y: -1 }}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white border border-[#E5E9E6] font-semibold text-xs sm:text-[13px] text-[#15252B] tracking-wide shadow-xs hover:border-[#15252B] hover:text-[#15252B] transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#C99543]" />
                <span>Contact Me</span>
              </motion.button>
            </motion.div>

            {/* Bottom Status Details */}
            <motion.div variants={item} className="pt-0.5 flex flex-wrap items-center gap-3 text-xs font-mono-tech" style={{ color: MUTED }}>
              <span className="font-semibold uppercase tracking-wider text-[11px]" style={{ color: CHARCOAL }}>
                FIND ME ON
              </span>
              <a
                href={PROFILE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-[#15252B] hover:text-[#126B5B] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-[#15252B] hover:text-[#126B5B] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <span className="text-[#8E999E]">|</span>
              <span className="flex items-center gap-1.5 text-[11px]" style={{ color: MUTED }}>
                <MapPin className="w-3.5 h-3.5 text-[#126B5B]" />
                <span>Bengaluru, KA</span>
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Photo Constellation Centerpiece ── */}
          <motion.div
            style={{ y: rightColY }}
            className="hidden lg:flex lg:col-span-6 xl:col-span-6 flex-col items-center justify-center relative lg:-translate-y-4 xl:-translate-y-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          >
            <HeroProfileCenterpiece />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
