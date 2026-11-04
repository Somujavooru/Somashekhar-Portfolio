import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { EXPERIENCES } from '../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2, Cpu } from 'lucide-react';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';

export const ExperienceSection: React.FC = () => {
  return (
    <ScrollSectionWrapper
      id="experience"
      className="pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 relative bg-[#FAFAF7] border-t border-[#E5E9E6]"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          moduleCode="// 06"
          title="Engineering Internships &"
          highlightText="Industry Contributions"
          description="Hands-on embedded engineering, FreeRTOS task scheduling, Over-The-Air deployment pipelines, and continuous data telemetry."
        />

        <div className="relative ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10 border-l-2 border-[#E5E9E6]">
          {EXPERIENCES.map((exp, eIdx) => {
            return (
              <motion.div
                key={exp.id}
                className="relative group break-inside-avoid"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: eIdx * 0.1 }}
              >
                {/* Timeline node icon */}
                <div
                  className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white border-2 border-[#126B5B] text-[#126B5B] shadow-md group-hover:scale-110 transition-transform"
                  style={{
                    boxShadow: '0 4px 12px rgba(18,107,91,0.18)',
                  }}
                >
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Experience Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 card-shadow hover:shadow-xl border border-[#E5E9E6]">
                  {/* Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-5 border-b border-[#E5E9E6]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#126B5B]">
                          {exp.company}
                        </span>
                        {exp.statusNotice && (
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E8F4F0] text-[#126B5B] border border-[#126B5B]/20">
                            {exp.statusNotice}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#15252B]">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-[13px] font-mono text-[#556368]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C99543]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#126B5B]" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="my-5 flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-3 py-1 rounded-lg text-xs sm:text-[12.5px] font-mono font-semibold flex items-center gap-1.5 bg-[#F4F6F4] border border-[#E5E9E6] text-[#15252B]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#126B5B]" />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Responsibilities list */}
                  <div className="space-y-3 mb-6">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-3 text-sm sm:text-[14.5px] leading-relaxed text-[#374151]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-1 text-[#126B5B]" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies footer */}
                  <div className="pt-4 border-t border-[#E5E9E6] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#556368] mr-1 font-semibold">
                      Stack:
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#FAFAF7] border border-[#E5E9E6] text-[#374151] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centralized config note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-4 rounded-xl text-xs font-mono flex items-center gap-2 bg-white border border-[#E5E9E6] text-[#68757A] card-shadow"
        >
          <Briefcase className="w-4 h-4 shrink-0 text-[#C99543]" />
          <span>
            VERIFIED INDUSTRY TRACK: All internship credentials and metrics are preserved from official curriculum vitae.
          </span>
        </motion.div>
      </div>
    </ScrollSectionWrapper>
  );
};
