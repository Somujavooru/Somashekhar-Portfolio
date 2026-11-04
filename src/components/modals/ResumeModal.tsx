import React from 'react';
import { X, Download, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { PROFILE_CONFIG } from '../../data/profile';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'embedded' | 'software';
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  initialType = 'embedded',
}) => {
  const [selectedResume, setSelectedResume] = React.useState<'embedded' | 'software'>(initialType);

  React.useEffect(() => {
    setSelectedResume(initialType);
  }, [initialType]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const current = selectedResume === 'embedded' ? PROFILE_CONFIG.resumes.embedded : PROFILE_CONFIG.resumes.software;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      data-lenis-prevent="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-white border border-[#E5E9E6] rounded-2xl shadow-2xl overflow-hidden text-[#15252B]"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Stationary Header (Pinned - never moves when content scrolls) */}
        <div className="flex items-start justify-between p-6 sm:p-8 pb-4 border-b border-[#E5E9E6] bg-white shrink-0 z-20">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#E8F4F0] border border-[#126B5B]/30 text-[#126B5B] mb-2 font-medium">
              <span>OFFICIAL RESUME REPOSITORIES</span>
            </div>
            <h3 id="resume-modal-title" className="text-2xl font-bold font-display text-[#15252B]">
              Engineering Resume Download
            </h3>
            <p className="text-[#556368] text-xs sm:text-sm mt-1">
              Select between the specialized Embedded Firmware or Software Engineering resume versions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#FAFAF7] hover:bg-[#F0F2F0] border border-[#E5E9E6] text-[#68757A] hover:text-[#15252B] transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 pt-4 space-y-6" data-lenis-prevent="true">
          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <button
            onClick={() => setSelectedResume('embedded')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedResume === 'embedded'
                ? 'bg-[#E8F4F0] border-2 border-[#126B5B] text-[#15252B] shadow-sm'
                : 'bg-[#FAFAF7] border-[#E5E9E6] text-[#68757A] hover:border-[#126B5B]/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs text-[#126B5B] uppercase tracking-wider font-bold">
                Primary Identity
              </span>
              <FileText className="w-4 h-4 text-[#126B5B]" />
            </div>
            <div className="font-bold text-[#15252B] text-sm sm:text-base">
              Embedded & Firmware
            </div>
            <p className="text-xs sm:text-[12.5px] text-[#556368] mt-1 line-clamp-2">
              FreeRTOS, C/C++, Peripheral Drivers, Systems Bring-up
            </p>
          </button>

          <button
            onClick={() => setSelectedResume('software')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedResume === 'software'
                ? 'bg-[#FDF6EB] border-2 border-[#C99543] text-[#15252B] shadow-sm'
                : 'bg-[#FAFAF7] border-[#E5E9E6] text-[#68757A] hover:border-[#C99543]/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs text-[#C99543] uppercase tracking-wider font-bold">
                Secondary Identity
              </span>
              <FileText className="w-4 h-4 text-[#C99543]" />
            </div>
            <div className="font-bold text-[#15252B] text-sm sm:text-base">
              Software & Systems
            </div>
            <p className="text-xs sm:text-[12.5px] text-[#556368] mt-1 line-clamp-2">
              C++, Python, OOP/DSA, Concurrency, Flutter & Web
            </p>
          </button>
        </div>

        {/* Selected Details */}
        <div className="p-5 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6] space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#556368]">TARGET PATH:</span>
              <div className="font-mono text-xs text-[#126B5B] font-bold">{current.path}</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#E8F4F0] border border-[#126B5B]/30 text-[#126B5B] text-xs font-mono flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#126B5B]" />
              <span>VERIFIED PDF</span>
            </span>
          </div>

          <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#475569]">
            {current.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={current.path}
              download={current.filename}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#126B5B] hover:bg-[#0e5246] text-white font-bold text-sm transition-all shadow-md shadow-[#126B5B]/20"
            >
              <Download className="w-4 h-4" />
              <span>{current.title}</span>
            </a>
            <a
              href={current.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#FAFAF7] text-[#15252B] text-sm font-medium border border-[#E5E9E6] transition-colors"
            >
              <span>Preview in New Tab</span>
              <ExternalLink className="w-4 h-4 text-[#68757A]" />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs font-mono text-[#68757A]">
          LOCATION: Bengaluru, KA • CGPA: 8.75/10.0 • Graduating June 2026
        </div>
        </div>
      </div>
    </div>
  );
};
