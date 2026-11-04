import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { EDUCATION_LIST, ACHIEVEMENTS } from '../data/education';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, Trophy, BookOpen } from 'lucide-react';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';

export const EducationSection: React.FC = () => {
  return (
    <ScrollSectionWrapper
      id="education"
      className="pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-18 relative bg-[#FAFAF7] border-t border-[#E5E9E6]"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          moduleCode="// 07"
          title="Education, Certifications &"
          highlightText="Engineering Honours"
          description="Formal academic grounding in Electronics and Communication Engineering, complemented by hackathon achievements and industry awards."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Formal Education */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-xs uppercase tracking-wider flex items-center gap-2 mb-4 font-bold text-[#126B5B]">
              <GraduationCap className="w-4 h-4 text-[#126B5B]" />
              Academic Degrees & Foundation
            </div>

            {EDUCATION_LIST.map((edu, idx) => (
              <motion.div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl space-y-4 card-shadow bg-white border border-[#E5E9E6] hover:shadow-xl transition-all break-inside-avoid"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: idx * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E9E6]">
                  <div>
                    <h4 className="text-lg font-bold font-display leading-snug text-[#15252B]">
                      {edu.degree}
                    </h4>
                    <p className="text-sm sm:text-[14.5px] font-mono mt-0.5 text-[#126B5B] font-semibold">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 bg-[#E8F4F0] text-[#126B5B] border border-[#126B5B]/30">
                    {edu.grade}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-[13px] font-mono text-[#556368]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C99543]" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#126B5B]" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Coursework list */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div>
                    <span className="text-xs sm:text-[12.5px] font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[#556368] font-semibold">
                      <BookOpen className="w-3.5 h-3.5 text-[#556368]" />
                      Key Disciplines & Coursework
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-xs sm:text-[12.5px] px-2.5 py-1 rounded-lg border font-mono bg-[#FAFAF7] border-[#E5E9E6] text-[#1E293B] font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Column: Achievements & Awards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-xs uppercase tracking-wider flex items-center gap-2 mb-4 font-bold text-[#C99543]">
              <Trophy className="w-4 h-4 text-[#C99543]" />
              Verified Honours & Certifications
            </div>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl space-y-3 card-shadow bg-white border border-[#E5E9E6] hover:shadow-xl transition-all break-inside-avoid"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: idx * 0.1 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl border shrink-0 mt-0.5 bg-[#FDF6EB] border-[#C99543]/30 text-[#C99543]">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold font-display text-base sm:text-[17px] text-[#15252B]">
                          {item.title}
                        </h4>
                        <div className="text-xs sm:text-[12.5px] font-mono mt-0.5 text-[#556368]">
                          {item.organization} {item.date && `• ${item.date}`}
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono border shrink-0 bg-[#E8F4F0] border-[#126B5B]/20 text-[#126B5B] font-semibold">
                      {item.badgeText}
                    </span>
                  </div>

                  <p className="text-sm sm:text-[14.5px] pl-11 leading-relaxed text-[#374151]">
                    {item.description}
                  </p>

                  <div className="pl-11 pt-1 flex items-center gap-1.5 text-xs font-mono text-[#126B5B]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#126B5B]" />
                    <span>Verified in Official Curriculum Vitae</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollSectionWrapper>
  );
};
