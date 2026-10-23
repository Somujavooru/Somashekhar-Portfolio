import type { ExperienceItem } from '../types';

/**
 * Centralized, editable experience configuration.
 * Note: Resumes present two tracks (Embedded focus vs Software focus).
 * As instructed, unresolved variations have visible TODO notices in this file
 * and clear, recruiter-friendly descriptions that reflect verified responsibilities.
 */
export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'dextris-internship',
    company: 'Dextris Infoservices Pvt Ltd',
    // TODO [ROLE TITLE VERIFICATION]: Listed as 'Embedded Engineer Intern' on Embedded Resume (1)
    // and 'Software Engineering Intern' on Software Resume. Configured for primary embedded track.
    role: 'Embedded Engineer Intern',
    roleType: 'embedded',
    location: 'Bengaluru, Karnataka, India',
    // TODO [DATES VERIFICATION]: Listed as 'Jun 2026 – Present' on Embedded Resume and 'Jun 2026 – Sep 2026' on Software Resume.
    period: 'Jun 2026 – Present',
    statusNotice: 'Primary Embedded Track (Software Engineering Intern variant available in Software Resume)',
    responsibilities: [
      'Optimized concurrent task execution and thread scheduling using FreeRTOS, reducing CPU idle time by 20% to improve overall resource efficiency.',
      'Led root-cause analysis and hardware-software debugging during system bring-up and integration, reducing application boot-up latency by 1.5 seconds (a 35% performance gain).',
      'Engineered modular C/C++ applications applying OOP principles, refining execution algorithms to decrease software response time by 25% for high-speed data telemetry.',
      'Designed and built an HTTP-based video streaming subsystem utilizing Python and C++, achieving a stable 30 FPS transmission rate across wireless networks for real-time monitoring.',
      'Delivered software releases using Git version control and coordinated remote Over-The-Air (OTA) firmware deployment pipelines, pushing 20+ updates to active devices.'
    ],
    technologies: ['C/C++', 'FreeRTOS', 'Python', 'HTTP Streaming', 'Over-The-Air (OTA)', 'Git', 'Root-Cause Debugging'],
    highlights: ['30 FPS Video Streaming', '20% CPU Idle Reduction', '1.5s Boot Latency Improvement', '20+ OTA Firmware Releases']
  },
  {
    id: 'echobrains-internship',
    company: 'EchoBrains',
    // TODO [ROLE TITLE VERIFICATION]: Listed as 'Embedded Systems Intern' on Embedded Resume
    // and 'Software Intern' on Software Resume.
    role: 'Embedded Systems Intern',
    roleType: 'embedded',
    location: 'Bengaluru, Karnataka, India',
    period: 'Jan 2026 – May 2026',
    statusNotice: 'Primary Embedded Systems Track',
    responsibilities: [
      'Developed and optimized C/C++ control algorithms for microcontroller targets, achieving <1ms execution latency for time-critical software applications.',
      'Conducted rigorous unit testing and verification on continuous data streams, ensuring 0% packet loss across concurrent communication buses (I2C, SPI, UART).',
      'Wrote optimized logic algorithms for time-critical features handling continuous data requests with strict timing constraints.'
    ],
    technologies: ['C/C++', 'I2C / SPI / UART', 'Microcontroller Control', 'Unit Testing', 'Timing Verification'],
    highlights: ['<1ms Control Execution Latency', '0% Packet Loss Across Buses', 'Rigorous Stream Verification']
  }
];
