import React, { useState, useEffect } from 'react';
import { Cpu, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE_CONFIG } from '../../data/profile';

export const Footer: React.FC = () => {
  const [bengaluruTime, setBengaluruTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setBengaluruTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060a] border-t border-cyan-500/15 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Identity & Role */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-mono-tech font-bold text-white tracking-wider text-base">
                {PROFILE_CONFIG.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {PROFILE_CONFIG.tagline} Focused on low-level firmware, FreeRTOS scheduling,
              microcontroller systems, and reliable hardware–software telemetry.
            </p>

            {/* Live Telemetry / Local Time Box */}
            <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-[#0b1324] border border-cyan-500/20 text-xs font-mono-tech">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">Bengaluru, IN (IST):</span>
              <span className="text-cyan-400 font-semibold">{bengaluruTime || '12:00:00 PM'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Quicklinks */}
          <div>
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-slate-300 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">01. Home & 3D Core</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">02. Engineering Profile</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">03. Technical Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">04. Verified Projects</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-400 transition-colors">05. Experience Timeline</a>
              </li>
              <li>
                <a href="#education" className="hover:text-cyan-400 transition-colors">06. Education & Awards</a>
              </li>
              <li>
                <a href="#resume" className="hover:text-cyan-400 transition-colors">07. Dual Resume Downloads</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Connect Links */}
          <div>
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-slate-300 mb-3">
              Verified Connect
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href={PROFILE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
              >
                <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                <span>github.com/Somujavooru</span>
              </a>
              <a
                href={PROFILE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
              >
                <LinkedinIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                <span>Dispatch Message</span>
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-500 font-mono-tech">
              STATUS: {PROFILE_CONFIG.availability}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-500">
          <div>
            © {new Date().getFullYear()} {PROFILE_CONFIG.name}. Built with React, TypeScript, Three.js & Tailwind CSS.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-300 transition-all"
            aria-label="Scroll back to top"
          >
            <span>TOP_OF_PAGE</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
