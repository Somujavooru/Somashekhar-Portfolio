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

  if (!isOpen) return null;

  const current = selectedResume === 'embedded' ? PROFILE_CONFIG.resumes.embedded : PROFILE_CONFIG.resumes.software;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#090f1d] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono-tech bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-2">
              <span>OFFICIAL RESUME REPOSITORIES</span>
            </div>
            <h3 id="resume-modal-title" className="text-2xl font-bold text-white">
              Engineering Resume Download
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Select between the specialized Embedded Firmware or Software Engineering resume versions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <button
            onClick={() => setSelectedResume('embedded')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedResume === 'embedded'
                ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                : 'bg-[#0c1426] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-wider">
                Primary Identity
              </span>
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="font-bold text-slate-100 text-sm sm:text-base">
              Embedded & Firmware
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              FreeRTOS, C/C++, Peripheral Drivers, Systems Bring-up
            </p>
          </button>

          <button
            onClick={() => setSelectedResume('software')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedResume === 'software'
                ? 'bg-sky-950/40 border-sky-500 text-white shadow-md shadow-sky-500/10'
                : 'bg-[#0c1426] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono-tech text-xs text-sky-400 uppercase tracking-wider">
                Secondary Identity
              </span>
              <FileText className="w-4 h-4 text-sky-400" />
            </div>
            <div className="font-bold text-slate-100 text-sm sm:text-base">
              Software & Systems
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              C++, Python, OOP/DSA, Concurrency, Flutter & Web
            </p>
          </button>
        </div>

        {/* Selected Details */}
        <div className="p-5 rounded-xl bg-[#0b1324] border border-slate-800 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono-tech text-slate-400">TARGET PATH:</span>
              <div className="font-mono-tech text-xs text-cyan-300 font-semibold">{current.path}</div>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>VERIFIED PDF</span>
            </span>
          </div>

          <p className="text-sm text-slate-300">
            {current.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={current.path}
              download={current.filename}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>{current.title}</span>
            </a>
            <a
              href={current.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors"
            >
              <span>Preview in New Tab</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs font-mono-tech text-slate-500">
          LOCATION: Bengaluru, KA • CGPA: 8.75/10.0 • Graduating June 2026
        </div>
      </div>
    </div>
  );
};
