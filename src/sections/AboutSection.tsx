import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROFILE_CONFIG } from '../data/profile';
import { Cpu, Terminal, Zap, ShieldCheck, GraduationCap, MapPin, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-[#070b14] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 01 // PROFESSIONAL POSITIONING"
          title="Bridging Silicon Hardware &"
          highlightText="Deterministic Software"
          description="A specialized Electronics and Communication Engineering graduate engineering low-level firmware, real-time operating systems, and connected device architectures."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Natural Recruiter Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-200 leading-relaxed text-base sm:text-lg">
            <div className="p-7 rounded-2xl bg-[#0b1428] border border-cyan-500/25 backdrop-blur-sm space-y-4 shadow-xl shadow-cyan-500/5">
              <h3 className="text-xl font-bold text-white font-mono-tech flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Engineering Philosophy & Core Focus
              </h3>
              <p className="text-slate-200 font-medium leading-relaxed">
                {PROFILE_CONFIG.about.summary}
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                {PROFILE_CONFIG.about.coreFocus}
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                {PROFILE_CONFIG.about.supportingFocus}
              </p>
            </div>

            {/* Core Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0a1224] border border-cyan-500/20 flex items-start gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/35 text-cyan-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Deterministic Execution</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    FreeRTOS priority scheduling, non-blocking ISRs, and microsecond-level timing control.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0a1224] border border-sky-500/20 flex items-start gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-sky-950 border border-sky-500/35 text-sky-400 shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Linux & Systems</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    POSIX environments, concurrency, file descriptors, and systematic root-cause debugging.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0a1224] border border-indigo-500/20 flex items-start gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-indigo-950 border border-indigo-500/35 text-indigo-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Hardware Bring-Up</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Sensor interfacing, bus transactions (SPI/I2C/UART), and oscilloscope/logic telemetry.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0a1224] border border-emerald-500/20 flex items-start gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-500/35 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Production Reliability</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    OTA rollback safety, 0% packet loss verification, and comprehensive unit test coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Credentials & Academic Spec */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-7 rounded-2xl bg-gradient-to-b from-[#0c1834] to-[#070e1c] border border-cyan-500/30 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
                <span className="font-mono-tech text-xs text-cyan-300 tracking-wider uppercase font-bold">
                  Academic Credentials
                </span>
                <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono-tech text-xs font-semibold">
                  {PROFILE_CONFIG.education.status}
                </span>
              </div>

              {/* Institution & Degree */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-base leading-snug">
                      {PROFILE_CONFIG.education.degree}
                    </h4>
                    <p className="text-cyan-200 text-sm mt-0.5 font-medium">
                      {PROFILE_CONFIG.education.institution}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 flex items-center gap-1 font-mono-tech">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {PROFILE_CONFIG.education.location}
                    </p>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="p-4 rounded-xl bg-[#060a14] border border-cyan-500/30 flex items-center justify-between mt-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono-tech uppercase">Cumulative CGPA</div>
                    <div className="text-3xl font-black font-mono-tech text-cyan-300 mt-0.5">
                      {PROFILE_CONFIG.education.cgpa}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400 font-mono-tech uppercase">Target Graduation</div>
                    <div className="text-sm font-bold text-white font-mono-tech mt-1">
                      {PROFILE_CONFIG.education.graduation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Coursework Badges */}
              <div>
                <h5 className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider mb-2.5 font-semibold">
                  Verified Academic Coursework
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Operating Systems',
                    'Linux Internals',
                    'Kernel Fundamentals',
                    'Microcontrollers',
                    'Networking Protocols',
                    'Data Structures & Algorithms',
                    'Object-Oriented Programming'
                  ].map((course, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded bg-[#070e1c] border border-slate-700/80 text-slate-200 font-mono-tech"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Honours */}
              <div className="pt-3 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs font-mono-tech text-slate-200">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-medium">Smart India Hackathon Finalist</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono-tech text-slate-200">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-medium">Dextris Engineering Recognition Award</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono-tech text-slate-200">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-medium">HackerRank Java (Basic) Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
