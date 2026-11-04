import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Cpu, Terminal, Zap, ShieldCheck, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';

const TEAL = '#126B5B';
const GOLD = '#C99543';
const CHARCOAL = '#15252B';
const MUTED = '#68757A';

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const pillars = [
  {
    icon: <Zap className="w-5 h-5" />,
    color: TEAL,
    bg: '#EBF6F3',
    title: 'Deterministic Execution',
    desc: 'FreeRTOS priority scheduling, non-blocking ISRs, and microsecond-level timing control.',
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    color: GOLD,
    bg: '#FDF6EB',
    title: 'Linux & Systems',
    desc: 'POSIX environments, concurrency, file descriptors, and systematic root-cause debugging.',
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    color: TEAL,
    bg: '#EBF6F3',
    title: 'Hardware Bring-Up',
    desc: 'Sensor interfacing, bus transactions (SPI/I2C/UART), and oscilloscope/logic telemetry.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    color: GOLD,
    bg: '#FDF6EB',
    title: 'Production Reliability',
    desc: 'OTA rollback safety, verified packet integrity, and comprehensive unit test coverage.',
  },
];

const coursework = [
  'Operating Systems', 'Linux Internals', 'Kernel Fundamentals',
  'Microcontrollers', 'Networking Protocols', 'Data Structures & Algorithms',
  'Object-Oriented Programming',
];

export const AboutSection: React.FC = () => {
  return (
    <ScrollSectionWrapper
      id="about"
      className="pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-18 relative bg-[#FAFAF7]"
      isFirstCard={true}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono-tech text-xs tracking-widest font-semibold mb-2" style={{ color: GOLD }}>
              // 02
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight" style={{ color: CHARCOAL }}>
              About <span style={{ color: TEAL }}>Me</span>
            </h2>
          </div>
          <p className="text-base font-semibold font-display" style={{ color: MUTED }}>
            Always curious. Always building.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & Pillars */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Engineering Philosophy Card */}
            <motion.div
              variants={revealItem}
              className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E5E9E6] card-shadow space-y-4"
            >
              <h3
                className="text-xl font-bold font-display flex items-center gap-2.5"
                style={{ color: CHARCOAL }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: TEAL }}
                />
                Engineering Philosophy & Core Focus
              </h3>
              <p className="font-semibold text-base leading-relaxed" style={{ color: CHARCOAL }}>
                I am a 2026 Electronics and Communication Engineering graduate from{' '}
                <strong className="text-[#126B5B]">Bapuji Institute of Engineering and Technology (BIET)</strong>, specializing in{' '}
                <strong className="text-[#C99543]">Embedded Software, Firmware Engineering, and Connected Systems</strong>. I combine low-level hardware comprehension with rigorous software engineering practices to engineer reliable, deterministic devices.
              </p>
              <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#475569]">
                My primary technical focus is C and C++ development for microcontrollers, RTOS (FreeRTOS) task scheduling, peripheral interfacing (I2C, SPI, UART), interrupt service routines (ISRs), and Linux fundamentals. I care deeply about deterministic execution, resource optimization, and root-cause hardware-software debugging.
              </p>
              <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#475569]">
                Beyond bare-metal and RTOS systems, I possess solid experience building connected IoT telemetry pipelines, client-server networking bridges, and software applications utilizing Python, Java, Flutter, SQLite, and lightweight on-device AI pipelines.
              </p>
            </motion.div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  variants={revealItem}
                  className="p-5 rounded-2xl bg-white border border-[#E5E9E6] card-shadow card-shadow-hover space-y-2.5"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: pillar.bg, color: pillar.color }}
                  >
                    {pillar.icon}
                  </div>
                  <h4 className="font-bold text-[15px] sm:text-base font-display text-[#15252B]">
                    {pillar.title}
                  </h4>
                  <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#556368]">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Academic Credentials & Coursework */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          >
            {/* Academic Credentials Card */}
            <motion.div
              variants={revealItem}
              className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E5E9E6] card-shadow space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs uppercase font-bold tracking-wider" style={{ color: GOLD }}>
                  Academic Credentials
                </span>
                <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded-full bg-[#EBF6F3] text-[#126B5B] font-semibold border border-[#DCEFE9]">
                  Graduating June 2026
                </span>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: '#EBF6F3', color: TEAL }}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base sm:text-[17px] leading-snug text-[#15252B]">
                      Bachelor of Engineering in Electronics and Communication Engineering
                    </h4>
                    <p className="text-[13px] sm:text-sm font-mono-tech mt-1 text-[#126B5B] font-semibold">
                      Bapuji Institute of Engineering and Technology
                    </p>
                    <p className="text-xs sm:text-[13px] flex items-center gap-1 mt-0.5 text-[#556368]">
                      <MapPin className="w-3.5 h-3.5 text-[#126B5B]" />
                      <span>Davangere, Karnataka</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CGPA Display */}
              <div
                className="p-4 rounded-xl border flex items-center justify-between"
                style={{ backgroundColor: '#FDF6EB', borderColor: '#F2ECE1' }}
              >
                <div>
                  <div className="text-xs font-mono-tech uppercase font-bold text-[#556368]">
                    Cumulative CGPA
                  </div>
                  <div className="text-2xl font-bold font-mono-tech mt-0.5" style={{ color: GOLD }}>
                    8.75 <span className="text-sm font-normal text-[#8E999E]">/ 10.0</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono-tech uppercase font-bold text-[#556368]">
                    Target Graduation
                  </div>
                  <div className="text-xs font-bold font-mono-tech mt-0.5" style={{ color: CHARCOAL }}>
                    June 2026
                  </div>
                </div>
              </div>

              {/* Verified Coursework */}
              <div className="pt-2">
                <span className="text-xs font-mono-tech uppercase tracking-wider block mb-2.5 font-bold text-[#556368]">
                  Verified Academic Coursework
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {coursework.map((c, i) => (
                    <span
                      key={i}
                      className="text-xs sm:text-[12.5px] font-mono-tech px-2.5 py-1 rounded-lg bg-[#F7F8F6] border border-[#E5E9E6] text-[#15252B] font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Badge */}
              <div className="pt-3 border-t border-[#EEF1EF] flex items-center gap-1.5 text-xs font-mono-tech text-emerald-700 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Verified by Visvesvaraya Technological University (VTU)</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ScrollSectionWrapper>
  );
};
