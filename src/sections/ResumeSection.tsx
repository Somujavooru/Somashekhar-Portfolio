import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROFILE_CONFIG } from '../data/profile';
import { Download, FileText, CheckCircle2, Cpu, Code2, ExternalLink } from 'lucide-react';

interface ResumeSectionProps {
  onOpenResumeModal: (type: 'embedded' | 'software') => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const { embedded, software } = PROFILE_CONFIG.resumes;

  return (
    <section id="resume" className="py-24 relative bg-[#06090f] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 06 // CURRICULUM VITAE REPOSITORY"
          title="Role-Tailored Dual"
          highlightText="Engineering Resumes"
          description="Download distinct, verified curriculum vitae tailored specifically for Embedded Firmware roles or Systems & Software Engineering positions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card A: Embedded Resume */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0c1832] to-[#070e1c] border-2 border-cyan-500/40 p-8 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between relative overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 font-mono-tech text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Primary Role Target
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono-tech text-xs text-cyan-400 font-semibold uppercase tracking-wider block">
                    {embedded.label}
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Embedded Software Resume
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Specialized for Microcontroller Firmware, Real-Time Operating Systems (FreeRTOS),
                Peripheral Drivers (I2C/SPI/UART), Interrupt Routines, and Hardware-Software Bring-up.
              </p>

              {/* Verified Highlights */}
              <div className="space-y-2.5 mb-8">
                {[
                  'C & Modern C++ low-level systems programming',
                  'FreeRTOS task scheduling, queues, and concurrency',
                  'ESP32, ESP8266 & AVR bare-metal bring-up',
                  'Over-The-Air (OTA) firmware pipeline releases',
                  'Hardware oscilloscope & logic analyzer verification'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-[#050b16] border border-cyan-500/20 text-xs font-mono-tech text-slate-400 mb-6 flex items-center justify-between">
                <span>CONFIG PATH:</span>
                <span className="text-cyan-300">{embedded.path}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <a
                href={embedded.path}
                download={embedded.filename}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Download className="w-4 h-4" />
                <span>{embedded.title}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenResumeModal('embedded')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono-tech text-slate-300 hover:text-white transition-colors"
                >
                  Quick Details
                </button>
                <a
                  href={embedded.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono-tech text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1"
                >
                  <span>Preview Tab</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Card B: Software Resume */}
          <div className="rounded-2xl bg-[#090f1e] border border-slate-800/90 hover:border-sky-500/40 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-slate-800 text-sky-300 font-mono-tech text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Secondary Track
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono-tech text-xs text-sky-400 font-semibold uppercase tracking-wider block">
                    {software.label}
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Software & Systems Resume
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Tailored for Software Engineering roles highlighting Data Structures & Algorithms,
                Object-Oriented Programming, Python, Java, Flutter cross-platform apps, and SQL databases.
              </p>

              {/* Verified Highlights */}
              <div className="space-y-2.5 mb-8">
                {[
                  'DSA & Object-Oriented software engineering in C++ & Java',
                  'Python automation, data pipelines & ML integrations',
                  'Cross-platform Flutter mobile development with SQLite',
                  'Full-stack Next.js/React web platforms with REST APIs',
                  'Unit testing, CI/CD, and client-server root cause analysis'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-[#050b16] border border-slate-800 text-xs font-mono-tech text-slate-400 mb-6 flex items-center justify-between">
                <span>CONFIG PATH:</span>
                <span className="text-sky-300">{software.path}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <a
                href={software.path}
                download={software.filename}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0c1b33] hover:bg-[#12284c] border border-sky-500/40 text-sky-300 font-bold text-sm tracking-wide transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{software.title}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenResumeModal('software')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono-tech text-slate-300 hover:text-white transition-colors"
                >
                  Quick Details
                </button>
                <a
                  href={software.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono-tech text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1"
                >
                  <span>Preview Tab</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recruiter instructions box */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-xl bg-[#0b1324] border border-cyan-500/20 text-xs font-mono-tech text-slate-400 flex items-start gap-3">
          <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">Configuration Notice:</strong> Both resumes are hosted
            at the configurable endpoints <code className="text-cyan-300">/resumes/embedded-resume.pdf</code> and{' '}
            <code className="text-sky-300">/resumes/software-resume.pdf</code>. To update the underlying documents,
            simply replace the respective PDF files in the public directory without touching application code.
          </p>
        </div>
      </div>
    </section>
  );
};
