import React, { useState, useEffect } from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE_CONFIG } from '../../data/profile';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [bengaluruTime, setBengaluruTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  const NAV_COL_1 = [
    { num: '01', label: 'Home & 3D Core', href: '#hero' },
    { num: '02', label: 'Engineering Profile', href: '#about' },
    { num: '03', label: 'Technical Skills', href: '#skills' },
    { num: '04', label: 'Verified Projects', href: '#projects' },
    { num: '05', label: 'Freelance Services', href: '#startup' },
  ];

  const NAV_COL_2 = [
    { num: '06', label: 'Experience Timeline', href: '#experience' },
    { num: '07', label: 'Education & Awards', href: '#education' },
    { num: '08', label: 'Dual Resume Downloads', href: '#resume' },
    { num: '09', label: 'Recruiter Dispatch', href: '#contact' },
    { num: '10', label: 'Contact', href: '#contact' },
  ];

  const CONTACT_ITEMS = [
    {
      label: 'GitHub Profile',
      desc: 'View repositories',
      href: 'https://github.com/Somujavooru',
      isExternal: true,
      icon: GithubIcon,
    },
    {
      label: 'LinkedIn Profile',
      desc: 'View professional profile',
      href: 'https://www.linkedin.com/in/somashekhar-javooru-34b70725a/',
      isExternal: true,
      icon: LinkedinIcon,
    },
    {
      label: 'Email Address',
      desc: PROFILE_CONFIG.email,
      href: `mailto:${PROFILE_CONFIG.email}`,
      isExternal: false,
      icon: Mail,
    },
  ];

  return (
    <footer className="relative bg-[#FAFAF7] border-t border-[#E5E9E6] pt-14 pb-10 overflow-hidden text-[#68757A]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-10 border-b border-[#E5E9E6]">
          {/* Col 1: Identity & Role */}
          <div className="md:col-span-12 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {/* Existing SJ monogram logo used in portfolio branding */}
              <span
                className="font-editorial-serif italic text-2xl sm:text-[28px] font-semibold leading-none select-none tracking-tight text-[#C99543] shrink-0"
                aria-label="Sj Monogram"
              >
                Sj
              </span>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-[#15252B] tracking-wider text-base leading-tight">
                  {PROFILE_CONFIG.name}
                </span>
                <span className="text-xs text-[#556368] font-mono leading-tight mt-0.5">
                  Embedded Software Engineer
                </span>
              </div>
            </div>

            <p className="text-[13px] sm:text-sm text-[#475569] max-w-md leading-relaxed">
              {PROFILE_CONFIG.tagline} Focused on low-level firmware, FreeRTOS scheduling,
              microcontroller systems, and reliable hardware–software telemetry.
            </p>

            {/* Live Telemetry / Local Time Box */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5E9E6] text-xs sm:text-[12.5px] font-mono card-shadow">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#126B5B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#126B5B]"></span>
              </span>
              <span className="text-[#556368]">Bengaluru, IN (IST):</span>
              <span className="text-[#126B5B] font-bold">{bengaluruTime || '12:00:00 PM'}</span>
            </div>
          </div>

          {/* Col 2: Navigation in TWO columns */}
          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#15252B] mb-3.5 font-bold">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2">
              <ul className="space-y-2.5 text-[13px] sm:text-sm">
                {NAV_COL_1.map((item) => (
                  <li key={item.num}>
                    <a
                      href={item.href}
                      className="group flex items-start sm:items-center hover:text-[#126B5B] transition-colors leading-snug"
                    >
                      <span className="font-mono text-[#126B5B] font-semibold mr-1.5 shrink-0">
                        {item.num}.
                      </span>
                      <span className="text-[#404D53] group-hover:text-[#126B5B] transition-colors">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5 text-[13px] sm:text-sm">
                {NAV_COL_2.map((item) => (
                  <li key={item.num}>
                    <a
                      href={item.href}
                      className="group flex items-start sm:items-center hover:text-[#126B5B] transition-colors leading-snug"
                    >
                      <span className="font-mono text-[#126B5B] font-semibold mr-1.5 shrink-0">
                        {item.num}.
                      </span>
                      <span className="text-[#404D53] group-hover:text-[#126B5B] transition-colors">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3: Verified Connect Links (3 equal-width contact cards) */}
          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#15252B] mb-3.5 font-bold">
              Verified Connect
            </h4>
            <div className="space-y-2.5">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E9E6] hover:border-[#126B5B]/30 hover:bg-[#F4F9F6] transition-all card-shadow"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#E8F4F0] text-[#126B5B] flex items-center justify-center shrink-0 group-hover:bg-[#126B5B] group-hover:text-white transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <div className="text-[13px] sm:text-sm font-semibold text-[#15252B] group-hover:text-[#126B5B] transition-colors truncate">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#556368] truncate mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[12.5px] font-mono text-[#556368]">
          <div>
            © {CURRENT_YEAR} {PROFILE_CONFIG.name}. Built with React, TypeScript, Three.js & Tailwind CSS.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#E8F4F0] border border-[#E5E9E6] hover:border-[#126B5B]/40 text-[#15252B] hover:text-[#126B5B] transition-all card-shadow cursor-pointer"
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
