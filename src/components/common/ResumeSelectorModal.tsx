import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink, Cpu, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { PROFILE_CONFIG } from '../../data/profile';

interface ResumeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRect?: DOMRect | null;
}

export const ResumeSelectorModal: React.FC<ResumeSelectorModalProps> = ({
  isOpen,
  onClose,
  anchorRect,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkingType, setCheckingType] = useState<'embedded' | 'software' | null>(null);
  const [activeAction, setActiveAction] = useState<'download' | 'preview' | null>(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 640 : false
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor window resize to switch between anchored desktop dropdown and centered mobile modal
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle escape key and focus management
  useEffect(() => {
    if (!isOpen) {
      setErrorMessage(null);
      setCheckingType(null);
      setActiveAction(null);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectResume = async (type: 'embedded' | 'software', action: 'download' | 'preview') => {
    setErrorMessage(null);
    setCheckingType(type);
    setActiveAction(action);

    const resume = PROFILE_CONFIG.resumes[type];
    if (!resume || !resume.path) {
      setErrorMessage(
        `Configuration error: The path for ${
          type === 'embedded' ? 'Embedded Software Engineer' : 'General Software Engineer'
        } resume is not configured.`
      );
      setCheckingType(null);
      setActiveAction(null);
      return;
    }

    try {
      // Verify that the PDF actually exists on the server
      const response = await fetch(resume.path, { method: 'HEAD' });
      if (!response.ok) {
        setErrorMessage(
          `Resume file not found: "${resume.filename}" is currently unavailable (HTTP ${response.status}).`
        );
        setCheckingType(null);
        setActiveAction(null);
        return;
      }

      if (action === 'download') {
        const link = document.createElement('a');
        link.href = resume.path;
        link.download = resume.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(resume.path, '_blank', 'noopener,noreferrer');
      }

      // Close modal on successful action
      setCheckingType(null);
      setActiveAction(null);
      onClose();
    } catch (err: any) {
      setErrorMessage(`Unable to access resume file: ${err?.message || 'Network error'}.`);
      setCheckingType(null);
      setActiveAction(null);
    }
  };

  // Determine desktop positioning anchored to the Resume button
  const desktopStyle: React.CSSProperties = isDesktop && anchorRect
    ? {
        position: 'fixed',
        top: `${Math.round(anchorRect.bottom + 8)}px`,
        right: `${Math.max(16, Math.round(window.innerWidth - anchorRect.right))}px`,
        width: '440px',
        maxWidth: 'calc(100vw - 32px)',
      }
    : {};

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center sm:block"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-selector-title"
    >
      {/* Dimmed backdrop - clicking outside closes modal/dropdown */}
      <div
        className="fixed inset-0 bg-slate-900/35 backdrop-blur-xs transition-opacity animate-in fade-in duration-150 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dropdown / Modal Content Container */}
      <div
        ref={containerRef}
        style={desktopStyle}
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-[440px] mx-4 sm:mx-0 bg-white border border-[#E5E9E6] rounded-2xl shadow-2xl p-5 sm:p-6 text-[#15252B] animate-in zoom-in-95 duration-150 focus:outline-none`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-[#E5E9E6]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E8F4F0] text-[#126B5B] border border-[#126B5B]/30 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#126B5B]" />
              SELECT RESUME SPECIFICATION
            </span>
            <h3 id="resume-selector-title" className="text-base sm:text-lg font-bold font-display text-[#15252B] mt-1.5">
              Choose Resume Version
            </h3>
            <p className="text-xs sm:text-[13px] text-[#556368] mt-0.5">
              Select the role-tailored PDF specification to download or inspect.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#68757A] hover:text-[#15252B] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message if file is missing or network failed */}
        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Option 1: Embedded Software Engineer Resume */}
        <div className="mt-4 space-y-3">
          <div className="p-3.5 sm:p-4 rounded-xl border border-[#E5E9E6] bg-[#FAFAF7] hover:border-[#126B5B]/40 hover:bg-[#E8F4F0]/30 transition-all group">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-[#E5E9E6] text-[#126B5B] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-[#15252B] leading-snug">
                    Embedded Software Engineer Resume
                  </h4>
                  <span className="text-[10.5px] font-mono font-bold text-[#126B5B] bg-[#E8F4F0] px-2 py-0.5 rounded-md shrink-0">
                    EMBEDDED
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] text-[#556368] mt-1 line-clamp-2 leading-relaxed">
                  C/C++, FreeRTOS, Peripheral Drivers (I2C/SPI/UART), Linux Bring-up & Deterministic Systems
                </p>
              </div>
            </div>

            {/* Actions for Option 1 */}
            <div className="mt-3 pt-3 border-t border-[#E5E9E6] flex items-center gap-2">
              <button
                type="button"
                disabled={checkingType === 'embedded'}
                onClick={() => handleSelectResume('embedded', 'download')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#126B5B] hover:bg-[#0e5246] text-white text-xs sm:text-[12.5px] font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-70"
                aria-label="Download Embedded Software Engineer Resume"
              >
                {checkingType === 'embedded' && activeAction === 'download' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Download PDF</span>
              </button>
              <button
                type="button"
                disabled={checkingType === 'embedded'}
                onClick={() => handleSelectResume('embedded', 'preview')}
                className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-white border border-[#E5E9E6] hover:bg-[#FAFAF7] text-[#15252B] text-xs sm:text-[12.5px] font-semibold transition-colors cursor-pointer disabled:opacity-70"
                title="Preview in new browser tab"
                aria-label="Preview Embedded Software Engineer Resume in new tab"
              >
                {checkingType === 'embedded' && activeAction === 'preview' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 text-[#68757A]" />
                )}
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Option 2: General Software Engineer Resume */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-[#E5E9E6] bg-[#FAFAF7] hover:border-[#C99543]/40 hover:bg-[#FDF6EB]/30 transition-all group">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-[#E5E9E6] text-[#C99543] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-[#15252B] leading-snug">
                    General Software Engineer Resume
                  </h4>
                  <span className="text-[10.5px] font-mono font-bold text-[#C99543] bg-[#FDF6EB] px-2 py-0.5 rounded-md shrink-0">
                    SOFTWARE
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] text-[#556368] mt-1 line-clamp-2 leading-relaxed">
                  C++, Python, OOP/DSA, Concurrency, Networking APIs, Flutter & Full-Stack Systems
                </p>
              </div>
            </div>

            {/* Actions for Option 2 */}
            <div className="mt-3 pt-3 border-t border-[#E5E9E6] flex items-center gap-2">
              <button
                type="button"
                disabled={checkingType === 'software'}
                onClick={() => handleSelectResume('software', 'download')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C99543] hover:bg-[#b08035] text-white text-xs sm:text-[12.5px] font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-70"
                aria-label="Download General Software Engineer Resume"
              >
                {checkingType === 'software' && activeAction === 'download' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Download PDF</span>
              </button>
              <button
                type="button"
                disabled={checkingType === 'software'}
                onClick={() => handleSelectResume('software', 'preview')}
                className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-white border border-[#E5E9E6] hover:bg-[#FAFAF7] text-[#15252B] text-xs sm:text-[12.5px] font-semibold transition-colors cursor-pointer disabled:opacity-70"
                title="Preview in new browser tab"
                aria-label="Preview General Software Engineer Resume in new tab"
              >
                {checkingType === 'software' && activeAction === 'preview' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 text-[#68757A]" />
                )}
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-3.5 pt-2.5 border-t border-[#E5E9E6] flex items-center justify-between text-xs font-mono text-[#556368]">
          <span>Verified BIET Davangere 2026</span>
          <span>PDF Format • ~65 KB</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
