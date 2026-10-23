import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { EXPERIENCES } from '../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2, Cpu } from 'lucide-react';
import { TechBadge } from '../components/common/TechBadge';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-[#06090f] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 04 // FIELD EXPERIENCE"
          title="Engineering Internships &"
          highlightText="Industry Contributions"
          description="Hands-on embedded engineering, FreeRTOS task scheduling, Over-The-Air deployment pipelines, and continuous data telemetry."
        />

        <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCES.map((exp) => {
            return (
              <div key={exp.id} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#070d18] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Experience Card */}
                <div className="rounded-2xl bg-[#090f1d] border border-slate-800/90 hover:border-cyan-500/30 p-6 sm:p-8 transition-all duration-300 shadow-lg shadow-black/40">
                  {/* Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono-tech text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                          {exp.company}
                        </span>
                        {exp.statusNotice && (
                          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                            {exp.statusNotice}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="my-5 flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono-tech font-semibold flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Responsibilities list */}
                  <div className="space-y-3 mb-6">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider mr-1">
                      Stack:
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <TechBadge key={tIdx} label={tech} size="sm" variant="slate" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centralized config note */}
        <div className="mt-12 p-4 rounded-xl bg-[#0b1324] border border-slate-800 text-xs font-mono-tech text-slate-400 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            CENTRALIZED CONFIG: All internship titles and dates are structured in{' '}
            <code className="text-cyan-300">src/data/experience.ts</code> for rapid client updates.
          </span>
        </div>
      </div>
    </section>
  );
};
