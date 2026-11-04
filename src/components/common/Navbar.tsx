import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { PROFILE_CONFIG } from '../../data/profile';
import { ResumeSelectorModal } from './ResumeSelectorModal';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'startup', label: 'Freelance' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const TEAL = '#126B5B';
const GOLD = '#C99543';
const CHARCOAL = '#15252B';
const MUTED = '#68757A';

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeSelectorOpen, setResumeSelectorOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const desktopResumeBtnRef = React.useRef<HTMLButtonElement>(null);
  const activeSection = useScrollSpy(NAV_SECTION_IDS, 120);

  const handleOpenResumeSelector = (e?: React.MouseEvent<HTMLElement>) => {
    if (e?.currentTarget) {
      setAnchorRect(e.currentTarget.getBoundingClientRect());
    } else if (desktopResumeBtnRef.current) {
      setAnchorRect(desktopResumeBtnRef.current.getBoundingClientRect());
    } else {
      setAnchorRect(null);
    }
    setResumeSelectorOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        const topOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E5E9E6] py-2.5 sm:py-3 shadow-xs'
          : 'bg-[#FAFAF7]/80 backdrop-blur-xs py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between">
          {/* Brand Monogram & Name */}
          <button
            onClick={() => scrollTo('hero')}
            className="group flex items-center gap-3 text-left focus:outline-none rounded-lg p-1"
          >
            {/* Elegant Monogram */}
            <span
              className="font-editorial-serif italic text-3xl font-semibold leading-none select-none tracking-tight transition-transform group-hover:scale-105"
              style={{ color: GOLD }}
            >
              Sj
            </span>
            <div className="leading-tight">
              <div
                className="font-display font-extrabold text-sm sm:text-base tracking-wide transition-colors"
                style={{ color: CHARCOAL }}
              >
                SOMASHEKHAR JAVOORU
              </div>
              <div
                className="text-[11px] font-medium font-sans tracking-tight"
                style={{ color: MUTED }}
              >
                Embedded Software Engineer
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#126B5B]/30 ${
                    isActive
                      ? 'bg-[#F2ECE1] text-[#15252B] shadow-xs'
                      : 'text-[#556368] hover:text-[#15252B] hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Socials */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={PROFILE_CONFIG.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#15252B] hover:text-[#126B5B] hover:bg-black/5 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_CONFIG.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#15252B] hover:text-[#126B5B] hover:bg-black/5 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              ref={desktopResumeBtnRef}
              type="button"
              onClick={handleOpenResumeSelector}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs sm:text-[13px] transition-all shadow-sm hover:shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#126B5B]/40"
              style={{
                backgroundColor: TEAL,
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0E5548')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
              aria-expanded={resumeSelectorOpen}
              aria-haspopup="dialog"
              aria-label="Choose and download resume"
            >
              <span>Resume</span>
              <ArrowDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resumeSelectorOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleOpenResumeSelector}
              className="p-2 rounded-full text-white sm:hidden cursor-pointer"
              style={{ backgroundColor: TEAL }}
              aria-expanded={resumeSelectorOpen}
              aria-haspopup="dialog"
              aria-label="Choose and download resume"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#15252B] hover:bg-black/5 border border-[#E5E9E6] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E5E9E6] px-4 pt-3 pb-6 space-y-3 mt-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E5E9E6]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#F2ECE1] text-[#15252B]'
                      : 'text-[#68757A] hover:text-[#15252B] hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenResumeSelector();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white font-semibold text-sm shadow-sm cursor-pointer"
              style={{ backgroundColor: TEAL }}
              aria-label="Choose and download resume"
            >
              <span>Download Resume (PDF)</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-5 pt-1 text-[#556368]">
              <a
                href={PROFILE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs sm:text-[13px] hover:text-[#126B5B]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-black/15">•</span>
              <a
                href={PROFILE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-[#126B5B]"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Resume Selector Modal/Dropdown */}
      <ResumeSelectorModal
        isOpen={resumeSelectorOpen}
        onClose={() => setResumeSelectorOpen(false)}
        anchorRect={anchorRect}
      />
    </header>
  );
};
