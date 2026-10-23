import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROFILE_CONFIG } from '../data/profile';
import { Cpu, Terminal, Zap, ShieldCheck, GraduationCap, MapPin, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-[#070b14] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 01 // PROFILE"
          title="Bridging Silicon Hardware &"
          highlightText="Deterministic Software"
          description="A specialized Electronics and Communication Engineering graduate engineering low-level firmware, real-time operating systems, and connected device architectures."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Natural Recruiter Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            <div className="p-6 rounded-2xl bg-[#0b1325]/80 border border-cyan-500/20 backdrop-blur-sm space-y-4 shadow-lg shadow-cyan-500/5">
              <h3 className="text-xl font-bold text-white font-mono-tech flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Engineering Philosophy & Core Focus
              </h3>
              <p>
                {PROFILE_CONFIG.about.summary}
              </p>
              <p className="text-slate-400 text-base">
                {PROFILE_CONFIG.about.coreFocus}
              </p>
              <p className="text-slate-400 text-base">
                {PROFILE_CONFIG.about.supportingFocus}
              </p>
            </div>

            {/* Core Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#091020] border border-slate-800 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Deterministic Execution</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    FreeRTOS priority scheduling, non-blocking ISRs, and microsecond-level timing control.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#091020] border border-slate-800 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/80 border border-sky-500/30 text-sky-400 shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Linux & Systems</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    POSIX environments, concurrency, file descriptors, and systematic root-cause debugging.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#091020] border border-slate-800 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Hardware Bring-Up</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Sensor interfacing, bus transactions (SPI/I2C/UART), and oscilloscope/logic telemetry.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#091020] border border-slate-800 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono-tech font-bold text-sm text-white">Production Reliability</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    OTA rollback safety, 0% packet loss verification, and comprehensive unit test coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Credentials & Academic Spec */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c162c] to-[#080e1c] border border-cyan-500/25 p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-mono-tech text-xs text-cyan-400 tracking-wider uppercase">
                  Academic Credentials
                </span>
                <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono-tech text-xs">
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
                    <p className="text-slate-300 text-sm mt-0.5">
                      {PROFILE_CONFIG.education.institution}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1 font-mono-tech">
                      <MapPin className="w-3.5 h-3.5" />
                      {PROFILE_CONFIG.education.location}
                    </p>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="p-4 rounded-xl bg-[#060a14] border border-cyan-500/30 flex items-center justify-between mt-4">
                  <div>
                    <div className="text-xs text-slate-400 font-mono-tech">ACADEMIC STANDING</div>
                    <div className="text-2xl font-black font-mono-tech text-cyan-300">
                      {PROFILE_CONFIG.education.cgpa}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-mono-tech">GRADUATION</div>
                    <div className="text-sm font-semibold text-white font-mono-tech">
                      {PROFILE_CONFIG.education.graduation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Coursework Badges */}
              <div>
                <h5 className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider mb-2.5">
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
                      className="text-xs px-2.5 py-1 rounded bg-[#070d1a] border border-slate-700/60 text-slate-300 font-mono-tech"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Honours */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Smart India Hackathon Finalist</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Dextris Engineering Recognition Award</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>HackerRank Java (Basic) Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
