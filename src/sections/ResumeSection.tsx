import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROFILE_CONFIG } from '../data/profile';
import { Download, CheckCircle2, Cpu, Code2, ExternalLink } from 'lucide-react';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';

interface ResumeSectionProps {
  onOpenResumeModal: (type: 'embedded' | 'software') => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const { embedded, software } = PROFILE_CONFIG.resumes;

  return (
    <ScrollSectionWrapper
      id="resume"
      className="pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-18 relative bg-[#FAFAF7] border-t border-[#E5E9E6]"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          moduleCode="// 08"
          title="Role-Tailored Dual"
          highlightText="Engineering Resumes"
          description="Download distinct, verified curriculum vitae tailored specifically for Embedded Firmware roles or Systems & Software Engineering positions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card A: Embedded Resume (Primary Track) */}
          <motion.div
            className="rounded-2xl p-8 bg-white border-2 border-[#126B5B] card-shadow hover:shadow-2xl flex flex-col justify-between relative overflow-hidden break-inside-avoid transition-all"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -4 }}
          >
            {/* Top Badge */}
            <div className="absolute top-0 right-0 font-mono text-xs font-bold px-3.5 py-1 rounded-bl-lg uppercase tracking-wider bg-[#126B5B] text-white">
              Primary Role Target
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#E8F4F0] border border-[#126B5B]/30 text-[#126B5B]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider block text-[#126B5B]">
                    {embedded.label}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-[#15252B]">
                    Embedded Software Resume
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-[14.5px] leading-relaxed mb-6 text-[#374151]">
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
                  'Hardware oscilloscope & logic analyzer verification',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#374151]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#126B5B]" />
                    <span className="font-medium text-[#15252B]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl border border-[#E5E9E6] text-xs font-mono mb-6 flex items-center justify-between bg-[#FAFAF7] text-[#556368]">
                <span>CONFIG PATH:</span>
                <span className="font-semibold text-[#126B5B]">{embedded.path}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E5E9E6]">
              <a
                href={embedded.path}
                download={embedded.filename}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md bg-[#126B5B] hover:bg-[#0e5246] text-white"
                style={{
                  boxShadow: '0 6px 20px -4px rgba(18,107,91,0.3)',
                }}
              >
                <Download className="w-4 h-4" />
                <span>{embedded.title}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenResumeModal('embedded')}
                  className="w-full py-2.5 px-3 rounded-lg border border-[#E5E9E6] text-xs sm:text-[13px] font-mono font-semibold transition-colors bg-[#FAFAF7] hover:bg-[#E8F4F0] text-[#15252B] hover:text-[#126B5B]"
                >
                  Quick Details
                </button>
                <a
                  href={embedded.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg border border-[#E5E9E6] text-xs sm:text-[13px] font-mono font-semibold transition-colors flex items-center justify-center gap-1 bg-[#FAFAF7] hover:bg-[#E8F4F0] text-[#15252B] hover:text-[#126B5B]"
                >
                  <span>Preview Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#68757A]" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card B: Software Resume */}
          <motion.div
            className="rounded-2xl p-8 bg-white border border-[#E5E9E6] card-shadow hover:shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 break-inside-avoid"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
            whileHover={{ y: -4 }}
          >
            {/* Top Badge */}
            <div className="absolute top-0 right-0 border-b border-l border-[#E5E9E6] font-mono text-xs font-bold px-3.5 py-1 rounded-bl-lg uppercase tracking-wider bg-[#FAFAF7] text-[#556368]">
              Secondary Track
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#FDF6EB] border border-[#C99543]/30 text-[#C99543]">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider block text-[#C99543]">
                    {software.label}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-[#15252B]">
                    Software & Systems Resume
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-[14.5px] leading-relaxed mb-6 text-[#374151]">
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
                  'Unit testing, CI/CD, and client-server root cause analysis',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#374151]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#C99543]" />
                    <span className="font-medium text-[#15252B]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl border border-[#E5E9E6] text-xs font-mono mb-6 flex items-center justify-between bg-[#FAFAF7] text-[#556368]">
                <span>CONFIG PATH:</span>
                <span className="font-semibold text-[#C99543]">{software.path}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E5E9E6]">
              <a
                href={software.path}
                download={software.filename}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#126B5B] font-bold text-sm tracking-wide transition-all bg-white hover:bg-[#E8F4F0] text-[#126B5B]"
              >
                <Download className="w-4 h-4 text-[#126B5B]" />
                <span>{software.title}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenResumeModal('software')}
                  className="w-full py-2.5 px-3 rounded-lg border border-[#E5E9E6] text-xs sm:text-[13px] font-mono font-semibold transition-colors bg-[#FAFAF7] hover:bg-[#E8F4F0] text-[#15252B] hover:text-[#126B5B]"
                >
                  Quick Details
                </button>
                <a
                  href={software.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg border border-[#E5E9E6] text-xs sm:text-[13px] font-mono font-semibold transition-colors flex items-center justify-center gap-1 bg-[#FAFAF7] hover:bg-[#E8F4F0] text-[#15252B] hover:text-[#126B5B]"
                >
                  <span>Preview Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#68757A]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSectionWrapper>
  );
};
