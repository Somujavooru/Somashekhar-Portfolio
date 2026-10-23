import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { EDUCATION_LIST, ACHIEVEMENTS } from '../data/education';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, Trophy, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-[#070b14] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 05 // ACADEMICS & RECOGNITION"
          title="Education, Certifications &"
          highlightText="Engineering Honours"
          description="Formal academic grounding in Electronics and Communication Engineering, complemented by hackathon achievements and industry awards."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Formal Education */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-mono-tech text-sm uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Academic Degrees & Foundation
            </h3>

            {EDUCATION_LIST.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#090f1d] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-lg font-bold text-white leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-cyan-300 font-mono-tech mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono-tech font-bold shrink-0">
                    {edu.grade}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Coursework list */}
                <div>
                  <span className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    Key Disciplines & Coursework
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-xs px-2.5 py-1 rounded bg-[#060b16] border border-slate-700/60 text-slate-300 font-mono-tech"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Achievements & Awards */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-mono-tech text-sm uppercase tracking-wider text-sky-400 flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-sky-400" />
              Verified Honours & Certifications
            </h3>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#090f1d] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">
                          {item.title}
                        </h4>
                        <div className="text-xs font-mono-tech text-slate-400 mt-0.5">
                          {item.organization} {item.date && `• ${item.date}`}
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech bg-slate-800 text-cyan-300 border border-cyan-500/20 shrink-0">
                      {item.badgeText}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 pl-11 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pl-11 pt-1 flex items-center gap-1.5 text-xs font-mono-tech text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified in Official Curriculum Vitae</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
