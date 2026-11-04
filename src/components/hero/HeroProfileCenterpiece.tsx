import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Settings, Cpu, Layers, Terminal, Code2 } from 'lucide-react';

interface HeroProfileCenterpieceProps {
  onToggle3D?: () => void;
  show3DToggle?: boolean;
}

const PROFILE_CANDIDATE_PATHS = [
  '/photos/profile.png',
  '/photos/profile_teal.png',
  '/photos/profile.jpg',
  '/photos/profile.jpeg',
  '/photos/profile.webp',
  '/Photos/profile.png',
  '/Photos/profile_teal.png',
  '/Photos/profile.jpg',
  '/Photos/profile.jpeg',
];

export const HeroProfileCenterpiece: React.FC<HeroProfileCenterpieceProps> = () => {
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (currentPathIndex < PROFILE_CANDIDATE_PATHS.length - 1) {
      setCurrentPathIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const imageSrc = PROFILE_CANDIDATE_PATHS[currentPathIndex];

  return (
    <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[480px] lg:max-w-[510px] xl:max-w-[550px] flex items-center justify-center select-none mx-auto">
      {/* ========================================================
          1. DYNAMIC ORBITAL CONSTELLATION RINGS (SVG)
         ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
      >
        <defs>
          <radialGradient id="ringGlowGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5BE58" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#C99543" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C99543" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ringGlowTeal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#126B5B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#126B5B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#126B5B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flareGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF4DC" stopOpacity="1" />
            <stop offset="30%" stopColor="#F5BE58" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#C99543" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C99543" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A047" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#F7C86A" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#F5BA4E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D4A047" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Ring 1: Prominent Concentric Gold Circular Contour (Immediately Surrounding Photo) ── */}
        <circle
          cx="300"
          cy="300"
          r="184"
          stroke="#C99543"
          strokeWidth="1.4"
          strokeOpacity="0.75"
          fill="none"
        />

        {/* ── Ring 2: Secondary Concentric Delicate Circuit Contour ── */}
        <circle
          cx="300"
          cy="300"
          r="194"
          stroke="#529E8D"
          strokeWidth="1"
          strokeDasharray="3 6"
          strokeOpacity="0.45"
          fill="none"
        />

        {/* ── Ring 3: Primary Champagne Gold Ellipse (Counter-clockwise tilt) ── */}
        <motion.ellipse
          cx="300"
          cy="300"
          rx="265"
          ry="196"
          transform="rotate(-26 300 300)"
          stroke="#D4A047"
          strokeWidth="1.4"
          strokeOpacity="0.75"
          fill="none"
          animate={{ strokeOpacity: [0.65, 0.85, 0.65] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Ring 4: Radiant Golden Luminous Glow Arc (Lower-Right & Bottom Flare Arc) ── */}
        <ellipse
          cx="300"
          cy="300"
          rx="264"
          ry="195"
          transform="rotate(-26 300 300)"
          stroke="url(#goldBeamGradient)"
          strokeWidth="2.4"
          filter="url(#glowFilter)"
          fill="none"
        />

        {/* ── Ring 5: Primary Forest Teal Ellipse (Clockwise tilt) ── */}
        <motion.ellipse
          cx="300"
          cy="300"
          rx="260"
          ry="190"
          transform="rotate(38 300 300)"
          stroke="#126B5B"
          strokeWidth="1.4"
          strokeOpacity="0.75"
          fill="none"
          animate={{ strokeOpacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* ── Ring 6: Outer Hairline Circuit Loop ── */}
        <ellipse
          cx="300"
          cy="300"
          rx="282"
          ry="214"
          transform="rotate(82 300 300)"
          stroke="#529E8D"
          strokeWidth="1"
          strokeDasharray="2 6"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* ── Circuit Leads connecting outward to badges ── */}
        {/* Lead to MCU (top-right) */}
        <path
          d="M 464 144 L 490 144 L 512 156"
          stroke="#126B5B"
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
        />
        <circle cx="512" cy="156" r="2.5" fill="#126B5B" opacity="0.8" />

        {/* Lead to Embedded Systems (right) */}
        <path
          d="M 515 270 L 534 280"
          stroke="#126B5B"
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
        />
        <circle cx="534" cy="280" r="2.5" fill="#126B5B" opacity="0.8" />

        {/* Lead near RTOS (bottom-left) */}
        <path
          d="M 136 450 L 118 458"
          stroke="#C99543"
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
        />
        <circle cx="118" cy="458" r="2.5" fill="#C99543" opacity="0.8" />

        {/* ── ORBITAL NODES & RADIANT FLARES ── */}
        {/* Starburst Flare at ~3:30 o'clock (near Embedded Systems) */}
        <circle cx="496" cy="320" r="14" fill="url(#flareGlow)" />
        <circle cx="496" cy="320" r="5" fill="#FFF4DC" />
        <line x1="476" y1="320" x2="516" y2="320" stroke="#FCE4A6" strokeWidth="1.2" strokeOpacity="0.85" />
        <line x1="496" y1="300" x2="496" y2="340" stroke="#FCE4A6" strokeWidth="1.2" strokeOpacity="0.85" />

        {/* Node 1: Top-Right Gold (~1:30 o'clock) */}
        <circle cx="465" cy="142" r="5" fill="#D4A047" />
        <circle cx="465" cy="142" r="11" fill="url(#ringGlowGold)" stroke="#C99543" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Node 2: Bottom-Left Gold (~7:30 o'clock) */}
        <circle cx="136" cy="450" r="5" fill="#D4A047" />
        <circle cx="136" cy="450" r="11" fill="url(#ringGlowGold)" stroke="#C99543" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Node 3: Bottom-Center Gold (~6:00 o'clock) */}
        <circle cx="282" cy="494" r="4.5" fill="#D4A047" />
        <circle cx="282" cy="494" r="9" fill="url(#ringGlowGold)" />

        {/* Node 4: Top-Left Teal (~11:00 o'clock) */}
        <circle cx="158" cy="164" r="4" fill="#126B5B" />
        <circle cx="158" cy="164" r="9" fill="url(#ringGlowTeal)" stroke="#126B5B" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Node 5: Bottom-Center Teal (~5:00 o'clock) */}
        <circle cx="376" cy="485" r="4" fill="#126B5B" />
        <circle cx="376" cy="485" r="8" fill="url(#ringGlowTeal)" />

        {/* Node 6: Right Edge Teal (~3:00 o'clock) */}
        <circle cx="522" cy="254" r="4.5" fill="#126B5B" />
        <circle cx="522" cy="254" r="10" fill="url(#ringGlowTeal)" stroke="#126B5B" strokeWidth="0.8" strokeOpacity="0.5" />
      </svg>

      {/* ========================================================
          2. CENTRAL CIRCULAR PORTRAIT FRAME
         ======================================================== */}
      <motion.div
        className="relative z-10 w-[225px] h-[225px] sm:w-[285px] sm:h-[285px] lg:w-[325px] lg:h-[325px] xl:w-[360px] xl:h-[360px] rounded-full p-2 sm:p-2.5"
        style={{
          background: 'linear-gradient(135deg, rgba(201,149,67,0.6) 0%, rgba(255,255,255,0.95) 45%, rgba(18,107,91,0.5) 100%)',
          boxShadow: '0 20px 50px -10px rgba(18,107,91,0.2), 0 10px 24px -6px rgba(201,149,67,0.15)',
        }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Inner border container */}
        <div className="w-full h-full rounded-full overflow-hidden relative border-2 sm:border-3 border-white shadow-inner bg-[#1A473E]">
          {/* Rich Teal Atmosphere Radial Backdrop behind photo */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 38%, #3E8576 0%, #1D584C 50%, #0E332B 100%)',
            }}
          />

          {/* Somashekhar Javooru Genuine Profile Photo */}
          {!imageError ? (
            <img
              src={imageSrc}
              alt="Somashekhar Javooru - Embedded Software Engineer"
              className="w-full h-full object-cover relative z-10 scale-[1.14] transition-transform duration-500 hover:scale-[1.18]"
              style={{ objectPosition: 'center 7%' }}
              onError={handleImageError}
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center relative z-10 text-white">
              <span className="font-display font-bold text-4xl">SJ</span>
              <span className="text-xs font-mono mt-1 opacity-80">Somashekhar Javooru</span>
            </div>
          )}

          {/* Soft Bottom Shadow Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to top, rgba(14,46,39,0.3) 0%, transparent 35%)',
            }}
          />
        </div>
      </motion.div>

      {/* ========================================================
          3. EIGHT FLOATING TECHNICAL BADGES (Circular Perimeter Layout)
         ======================================================== */}

      {/* 1. IoT Badge (Top-Left / ~11:00 o'clock) */}
      <motion.div
        className="absolute top-[12%] left-[10%] sm:left-[8%] lg:left-[6%] xl:left-[6%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] shrink-0">
          <Wifi className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">IoT</span>
      </motion.div>

      {/* 2. MCU Badge (Top-Right / ~1:00 o'clock) */}
      <motion.div
        className="absolute top-[12%] right-[10%] sm:right-[8%] lg:right-[6%] xl:right-[6%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] shrink-0">
          <Cpu className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">MCU</span>
      </motion.div>

      {/* 3. Linux Developer Badge (Upper-Mid-Left / ~9:30 o'clock) */}
      <motion.div
        className="absolute top-[36%] -translate-y-1/2 left-[-8%] sm:left-[-10%] lg:left-[-12%] xl:left-[-13%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] shrink-0">
          <Terminal className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">Linux Developer</span>
      </motion.div>

      {/* 4. Firmware Developer Badge (Upper-Mid-Right / ~2:30 o'clock) */}
      <motion.div
        className="absolute top-[36%] -translate-y-1/2 right-[-8%] sm:right-[-10%] lg:right-[-12%] xl:right-[-13%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] shrink-0">
          <Code2 className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">Firmware Developer</span>
      </motion.div>

      {/* 5. C/C++ Badge (Lower-Mid-Left / ~8:00 o'clock) */}
      <motion.div
        className="absolute top-[58%] -translate-y-1/2 left-[2%] sm:left-[1%] lg:left-[0%] xl:left-[0%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] font-mono font-bold text-xs shrink-0">
          &lt;/&gt;
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">C/C++</span>
      </motion.div>

      {/* 6. Embedded Systems Badge (Lower-Mid-Right / ~4:00 o'clock) */}
      <motion.div
        className="absolute top-[58%] -translate-y-1/2 right-[-6%] sm:right-[-7%] lg:right-[-8%] xl:right-[-9%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] shrink-0">
          <Layers className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">Embedded Systems</span>
      </motion.div>

      {/* 7. RTOS Badge (Lower-Left / ~7:00 o'clock) */}
      <motion.div
        className="absolute bottom-[13%] left-[10%] sm:left-[8%] lg:left-[6%] xl:left-[6%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] shrink-0">
          <Settings className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">RTOS</span>
      </motion.div>

      {/* 8. Python Badge (Lower-Right / ~5:00 o'clock) */}
      <motion.div
        className="absolute bottom-[13%] right-[10%] sm:right-[8%] lg:right-[6%] xl:right-[6%] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#E5E9E6] shadow-[0_4px_16px_rgba(21,37,43,0.06)] flex items-center gap-1.5 sm:gap-2 cursor-default"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        whileHover={{ scale: 1.05, borderColor: '#126B5B' }}
      >
        <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#126B5B] shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M11.914 0C5.833 0 6.207 2.64 6.207 2.64l.007 2.733h5.792v.82H3.978S0 5.742 0 11.838c0 6.094 3.486 5.867 3.486 5.867h2.079v-2.916s-.112-3.486 3.407-3.486h5.856v-.82H9.006s-3.327.186-3.327-3.245c0-3.432 2.996-3.327 2.996-3.327h8.847S21.6 4.025 21.6 9.878c0 5.852-3.364 5.74-3.364 5.74h-2.12v-2.916s.187-3.486-3.327-3.486H6.933" />
          </svg>
        </div>
        <span className="font-bold font-mono text-xs sm:text-[12.5px] text-[#15252B]">Python</span>
      </motion.div>

      {/* ========================================================
          4. HANDWRITTEN SIGNATURE SCRIPT (Bottom-Right)
         ======================================================== */}
      <div className="absolute -bottom-6 sm:-bottom-7 right-2 sm:right-6 xl:right-8 z-20 pointer-events-none select-none font-signature text-[2.5rem] sm:text-[3rem] xl:text-[3.3rem] text-[#224047] -rotate-[8deg] leading-[0.88] opacity-95 drop-shadow-xs text-right">
        <div>Somashekhar</div>
        <div className="translate-x-3 sm:translate-x-4 mt-0.5">Javooru</div>
      </div>
    </div>
  );
};
