import React from 'react';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/SocialIcons';
import { PROFILE_CONFIG } from '../data/profile';
import { ThreeSceneContainer } from '../components/3d/ThreeSceneContainer';

interface HeroSectionProps {
  onOpenResumeModal: (type: 'embedded' | 'software') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const topOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-tech-grid"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-160px)]">
          {/* Left Column: Technical Positioning & Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Engineering Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono-tech text-xs tracking-wide shadow-sm shadow-cyan-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>{PROFILE_CONFIG.primaryRole.toUpperCase()}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">ECE GRADUATE 2026</span>
            </div>

            {/* Engineer Name & Editorial Headline */}
            <div className="space-y-3">
              <div className="font-mono-tech text-slate-400 text-sm tracking-wider uppercase">
                Hello, I am <span className="text-white font-semibold">{PROFILE_CONFIG.name}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Engineering Intelligence.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  Connecting Hardware
                </span>{' '}
                and Software.
              </h1>
            </div>

            {/* Supporting Statement */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed">
              {PROFILE_CONFIG.heroStatement}
            </p>

            {/* Hardware & Systems Telemetry Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="p-3 rounded-lg bg-[#0b1324]/80 border border-slate-800 text-xs font-mono-tech">
                <div className="text-slate-500 text-[10px] uppercase">Microcontrollers</div>
                <div className="text-cyan-300 font-bold mt-0.5">ESP32 / AVR / FreeRTOS</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0b1324]/80 border border-slate-800 text-xs font-mono-tech">
                <div className="text-slate-500 text-[10px] uppercase">Protocols</div>
                <div className="text-sky-300 font-bold mt-0.5">I2C / SPI / UART / MQTT</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0b1324]/80 border border-slate-800 text-xs font-mono-tech col-span-2 sm:col-span-1">
                <div className="text-slate-500 text-[10px] uppercase">Academic CGPA</div>
                <div className="text-indigo-300 font-bold mt-0.5">{PROFILE_CONFIG.education.cgpa}</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenResumeModal('embedded')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0c162c] hover:bg-[#111f3d] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono-tech text-xs font-semibold tracking-wider transition-all hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Embedded Resume</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-300 font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-4 text-slate-400">
              <span className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider">
                Find Me:
              </span>
              <a
                href={PROFILE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono-tech hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={PROFILE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono-tech hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <span className="text-xs font-mono-tech text-slate-500">
                Bengaluru, KA
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Semiconductor Centerpiece */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full aspect-square max-w-[480px] lg:max-w-none rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-[#0a1224]/80 to-[#050810]/90 backdrop-blur-sm p-2 shadow-2xl shadow-cyan-500/10 overflow-hidden relative">
              {/* Corner Engineering Reticles */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-10" />

              {/* Hardware Spec Top Bar */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono-tech text-cyan-400/70 pointer-events-none z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  DIE_TEMP :: 38.4°C
                </span>
                <span>XTAL :: 40.000 MHz</span>
              </div>

              {/* Three.js Scene */}
              <ThreeSceneContainer className="w-full h-full min-h-[360px] sm:min-h-[440px]" />
            </div>

            <div className="text-center mt-3 text-[11px] font-mono-tech text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              <span>INTERACTIVE CORE — DRAG & MOVE POINTER TO ROTATE 3D DIE</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors font-mono-tech text-[11px] tracking-widest uppercase focus:outline-none"
            aria-label="Scroll to About section"
          >
            <span>SCROLL_EXPLORE</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
