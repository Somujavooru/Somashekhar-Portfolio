import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { SKILL_GROUPS } from '../data/skills';
import { 
  Cpu, 
  Code2, 
  Check, 
  Layers,
  Wrench,
  Trophy
} from 'lucide-react';
import type { SkillCategory, SkillGroup } from '../types';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';

const TEAL = '#126B5B';
const GOLD = '#C99543';
const CHARCOAL = '#15252B';
const MUTED = '#68757A';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Concise, readable technical tags exactly matching the reference specification.
 */
const SHORT_TAGS: Record<string, string> = {
  // 1. Embedded Software & Firmware
  'C': 'C99 / C11',
  'C++': 'Modern C++',
  'Embedded C': 'Bare-metal',
  'FreeRTOS': 'Tasks',
  'Microcontroller Programming': 'ESP32 / AVR',
  'Peripheral Interfaces': 'UART / SPI',
  'Hardware-Software Integration': 'Bring-up',
  'Interrupt Service Routines (ISRs)': 'Time-Critical',
  'Analog-to-Digital Conversion (ADC)': 'Sampling',
  'Pulse Width Modulation (PWM)': 'Motors',
  'Hardware Debugging': 'Logic Analyzer',

  // 2. Embedded Linux & Systems
  'Linux Fundamentals': 'Shell, CLI',
  'Operating Systems Principles': 'Process, IPC',
  'Linux System Programming': 'Sockets, Signals',
  'Linux Kernel Fundamentals': 'Kernel, Syscalls',
  'Concurrency & Multithreading': 'Pthreads, Mutex',
  'Memory Management': 'Heap, Stack',
  'Systematic Root-Cause Debugging': 'GDB, Core Dump',

  // 3. Networking & IoT Systems
  'MQTT Protocol': 'Pub/Sub',
  'TCP/IP & Networking Concepts': 'L2/L3, Sockets',
  'HTTP Client/Server Streaming': 'REST APIs',
  'Over-The-Air (OTA) Updates': 'Dual-Partition',
  'ESP32 Wi-Fi Subsystem': 'Station, AP',
  'ESP8266 IoT Integration': 'Cloud, Telemetry',
  'Connected Sensor Networks': 'Sensor Streams',

  // 4. Software Development & Fundamentals
  'Data Structures & Algorithms': 'Trees, Graphs',
  'Object-Oriented Programming (OOP)': 'OOP, Design',
  'Python': 'Automation, OpenCV',
  'Java': 'Core Java, Collections',
  'Git & Version Control': 'Branch, Release',
  'Unit Testing & Verification': 'Test Suites',
  'Relational Databases & SQL': 'Queries, Schema',

  // 5. Mobile, Web & Edge AI (Supporting)
  'Flutter & Dart': 'Cross-platform',
  'TensorFlow Lite (TFLite)': 'MobileNetV3',
  'Android Studio': 'Kotlin / Java',
  'SQLite': 'Embedded DB',
  'Web Development': 'HTML, CSS, JS',
  'REST APIs & Webhooks': 'JSON, Postman',
};

/**
 * Visual illustration banners matching the themes in the reference image
 */
const CATEGORY_VISUALS: Record<string, { image: string; caption: string }> = {
  firmware: {
    image: '/images/projects/esp32-cam-system.jpg',
    caption: 'MCU & Hardware Bring-Up Architecture',
  },
  systems: {
    image: '/images/projects/esp32-ota-system.jpg',
    caption: 'Linux Workstation & System Internals',
  },
  networking: {
    image: '/images/projects/smart-irrigation-system.jpg',
    caption: 'Connected IoT & Wireless Telemetry',
  },
  software: {
    image: '/images/projects/skill-assessment-agent.jpg',
    caption: 'Software Architecture & Algorithm Design',
  },
  'mobile-ai': {
    image: '/images/projects/food-health-app.jpg',
    caption: 'Mobile Applications & Edge AI Inference',
  },
};

/**
 * Authentic Microcontroller Chip Package Component
 */
const MicrochipCardIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 shrink-0' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    {/* Metallic Pins */}
    <path d="M10 2v4M16 2v4M22 2v4M10 26v4M16 26v4M22 26v4M2 10h4M2 16h4M2 22h4M26 10h4M26 16h4M26 22h4" stroke="#126B5B" strokeWidth="2.2" strokeLinecap="round" />
    {/* Chip Body */}
    <rect x="5.5" y="5.5" width="21" height="21" rx="4" fill="#0E4A3E" stroke="#126B5B" strokeWidth="2" />
    {/* Silicon Die */}
    <rect x="10" y="10" width="12" height="12" rx="2.5" fill="#126B5B" />
    {/* Center Gold Pin / Die Marker */}
    <circle cx="16" cy="16" r="2.5" fill="#C99543" />
    <circle cx="12" cy="12" r="1" fill="#FFFFFF" fillOpacity="0.8" />
  </svg>
);

/**
 * Authentic Tux Linux Penguin SVG Component
 */
const TuxPenguinIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 shrink-0' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="94" rx="34" ry="5" fill="#000000" fillOpacity="0.15" />
    <path d="M20 86 C16 86 14 91 20 93 C26 95 38 94 44 89 C45 88 43 85 38 85 C34 85 28 86 20 86 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <path d="M80 86 C84 86 86 91 80 93 C74 95 62 94 56 89 C55 88 57 85 62 85 C66 85 72 86 80 86 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <path d="M50 8 C36 8 30 18 30 32 C30 42 20 56 16 72 C12 86 26 90 50 90 C74 90 88 86 84 72 C80 56 70 42 70 32 C70 18 64 8 50 8 Z" fill="#18181B" />
    <path d="M22 50 C14 56 8 68 12 76 C15 82 22 78 26 70 C28 66 26 56 22 50 Z" fill="#18181B" />
    <path d="M78 50 C86 56 92 68 88 76 C85 82 78 78 74 70 C72 66 74 56 78 50 Z" fill="#18181B" />
    <path d="M50 36 C38 36 32 46 32 62 C32 78 38 86 50 86 C62 86 68 78 68 62 C68 46 62 36 50 36 Z" fill="#FFFFFF" />
    <ellipse cx="43" cy="24" rx="6.5" ry="9" fill="#FFFFFF" />
    <ellipse cx="57" cy="24" rx="6.5" ry="9" fill="#FFFFFF" />
    <ellipse cx="45" cy="25" rx="3.2" ry="4.5" fill="#18181B" />
    <ellipse cx="55" cy="25" rx="3.2" ry="4.5" fill="#18181B" />
    <circle cx="44" cy="23" r="1.3" fill="#FFFFFF" />
    <circle cx="54" cy="23" r="1.3" fill="#FFFFFF" />
    <path d="M39 30 C45 28 55 28 61 30 C65 36 56 42 50 42 C44 42 35 36 39 30 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
    <path d="M43 32 C47 31 53 31 57 32 C58 35 53 38 50 38 C47 38 42 35 43 32 Z" fill="#FBBF24" />
  </svg>
);

/**
 * Authentic Wireless Telemetry & IoT Signal Component
 */
const WirelessTelemetryCardIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 shrink-0' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <path d="M4 9.5C7.8 5.7 12.8 3.5 16 3.5s8.2 2.2 12 6" stroke="#126B5B" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M7.5 14C10 11.5 13 10 16 10s6 1.5 8.5 4" stroke="#126B5B" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M11 18.5C12.5 17 14.2 16 16 16s3.5 1 5 2.5" stroke="#126B5B" strokeWidth="2.8" strokeLinecap="round" />
    <circle cx="16" cy="24.5" r="3.5" fill="#126B5B" />
    <circle cx="16" cy="24.5" r="1.5" fill="#C99543" />
  </svg>
);

/**
 * Authentic Software Development & Code Syntax Component
 */
const SoftwareCodeCardIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 shrink-0' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <path d="M9 10L3 16L9 22" stroke="#126B5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 10L29 16L23 22" stroke="#126B5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 7L13.5 25" stroke="#C99543" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/**
 * Authentic Mobile & Edge AI Inference Component
 */
const MobileEdgeCardIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 shrink-0' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <rect x="7" y="3" width="18" height="26" rx="4.5" fill="#0E4A3E" stroke="#126B5B" strokeWidth="2" />
    <rect x="9.5" y="6" width="13" height="19" rx="2" fill="#EBF6F3" />
    <rect x="13" y="4.5" width="6" height="1" rx="0.5" fill="#CBD5E1" />
    <circle cx="16" cy="15.5" r="3.5" fill="#126B5B" />
    <path d="M16 10v2M16 19v2M10.5 15.5h2M19.5 15.5h2" stroke="#126B5B" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="13.5" y1="27" x2="18.5" y2="27" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Genuine tools from Somashekhar's engineering portfolio with authentic logos
 */
const TOOLS_AND_PLATFORMS = [
  {
    name: 'Arduino',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="7.5" cy="12" r="5" stroke="#00979D" strokeWidth="2.2" />
        <circle cx="16.5" cy="12" r="5" stroke="#00979D" strokeWidth="2.2" />
        <path d="M5.5 12h4M14.5 12h4M16.5 10v4" stroke="#00979D" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'ESP32',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#E7352C" />
        <path d="M12 6a6 6 0 106 6h-2a4 4 0 11-4-4v-2z" fill="#FFFFFF" />
        <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'VS Code',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="#007ACC">
        <path d="M17.5 2.5L7.5 10.2L3.2 6.8L1.5 7.8L5.5 12L1.5 16.2L3.2 17.2L7.5 13.8L17.5 21.5L22.5 19.5V4.5L17.5 2.5ZM17.5 16.8L10.8 12L17.5 7.2V16.8Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="#181717">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Proteus',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3.2" fill="#004F9F" />
        <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="#004F9F" strokeWidth="1.8" transform="rotate(-30 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="#004F9F" strokeWidth="1.8" transform="rotate(30 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M11.8 3C7.5 3 7.8 4.9 7.8 4.9L7.8 6.9H12.2V7.5H6.1C4 7.5 3 8.7 3 11.2C3 13.8 4.3 14.1 4.3 14.1H6.1V12.1C6.1 9.9 7.8 9.9 7.8 9.9H12.2C14.4 9.9 14.4 8.2 14.4 8.2V4.9C14.4 4.9 14.7 3 11.8 3ZM9.8 4.3C10.3 4.3 10.7 4.7 10.7 5.2C10.7 5.7 10.3 6.1 9.8 6.1C9.3 6.1 8.9 5.7 8.9 5.2C8.9 4.7 9.3 4.3 9.8 4.3Z" fill="#3776AB" />
        <path d="M12.2 21C16.5 21 16.2 19.1 16.2 19.1L16.2 17.1H11.8V16.5H17.9C20 16.5 21 15.3 21 12.8C21 10.2 19.7 9.9 19.7 9.9H17.9V11.9C17.9 14.1 16.2 14.1 16.2 14.1H11.8C9.6 14.1 9.6 15.8 9.6 15.8V19.1C9.6 19.1 9.3 21 12.2 21ZM14.2 19.7C13.7 19.7 13.3 19.3 13.3 18.8C13.3 18.3 13.7 17.9 14.2 17.9C14.7 17.9 15.1 18.3 15.1 18.8C15.1 19.3 14.7 19.7 14.2 19.7Z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: 'Java',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M8.5 18.5c-2.4-.1-4.2-.6-4.2-1.2 0-.6 1.8-1.1 4.2-1.2.6 0 1.2 0 1.8.1-.5.3-.8.7-.8 1.1 0 .4.3.8.8 1.1-.6.1-1.2.1-1.8.1zm6.9-3.9c-.8.5-1.9.8-3.1.9-.3-.5-.7-.9-1.2-1.3 1.5-.1 2.8-.5 3.8-1 .4.5.5.9.5 1.4zm-1.8 4.9c-1.3.3-2.8.4-4.2.4-3.5 0-6.1-.9-6.1-2 0-.8 1.4-1.5 3.5-1.8-.3.4-.4.8-.4 1.3 0 1 1 1.8 2.6 2.1h4.6z" fill="#5382A1" />
        <path d="M12.5 5.5c1 1.2 1 2.4-.2 3.6-1.1 1.2-.8 2.2.4 3.4-1.5-.2-2.5-1.4-2.2-2.8.3-1.4 1.6-2.1 2-4.2zm3 2c.7.9.6 1.8-.1 2.7-.8.9-.6 1.7.3 2.6-1.1-.2-1.9-1.1-1.7-2.1.2-1 1.2-1.6 1.5-3.2z" fill="#E76F00" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3.2" fill="#336791" fillOpacity="0.25" stroke="#336791" strokeWidth="2" />
        <path d="M4 6v5c0 1.77 3.58 3.2 8 3.2s8-1.43 8-3.2V6" stroke="#336791" strokeWidth="2" />
        <path d="M4 11v5c0 1.77 3.58 3.2 8 3.2s8-1.43 8-3.2v-5" stroke="#336791" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    icon: <TuxPenguinIcon className="w-7 h-7 shrink-0" />,
  },
  {
    name: 'Azure',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="#0078D4">
        <path d="M5.5 19h13L15 14H9z" opacity="0.3" />
        <path d="M12 3L2 19h7l3-5 3.5 5H22L12 3z" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M4.5 16.5L6.8 2.8c.1-.4.6-.6.9-.3l3.8 7.1-7 6.9z" fill="#FFA611" />
        <path d="M19.5 16.5l-2.2-12.7c-.1-.5-.7-.7-1-.3L11.5 9.7l3.8 6.8h4.2z" fill="#F57C00" />
        <path d="M12 22c4.7 0 8.5-3.8 8.5-8.5 0-.8-.1-1.6-.4-2.3L12 22z" fill="#FFCA28" />
      </svg>
    ),
  },
];

/**
 * Microcontroller & PCB Artwork component for the header matching the reference image
 */
const HeaderMicrocontrollerArt: React.FC = () => (
  <div className="relative w-52 h-36 hidden xl:block pointer-events-none select-none shrink-0 overflow-visible">
    <div className="absolute inset-0 bg-radial from-[#126B5B]/20 via-[#126B5B]/5 to-transparent blur-2xl" />
    <svg className="w-full h-full" viewBox="0 0 240 150" fill="none">
      {/* PCB Circuit Traces */}
      <g stroke="#126B5B" strokeWidth="1.4" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="M150 75 L105 40 L50 40" />
        <path d="M160 68 L120 24 L70 24" />
        <path d="M170 60 L145 12 L100 12" />
        <path d="M180 80 L205 50 L235 50" />
        <path d="M185 88 L215 75 L238 75" />
        <path d="M140 90 L110 115 L40 115" />
        <path d="M155 102 L135 135 L75 135" />
        <path d="M170 106 L192 136 L215 136" />
        <path d="M180 96 L218 118 L238 118" />
      </g>

      {/* Glowing Neon Cyan Traces */}
      <g stroke="#00D2A0" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round">
        <path d="M145 78 L100 35 L60 35" />
        <path d="M175 72 L200 30 L225 30" />
        <path d="M145 96 L118 130 L85 130" />
      </g>

      {/* Solder Connection Pads */}
      <circle cx="50" cy="40" r="2.8" fill="#C99543" />
      <circle cx="60" cy="35" r="2.2" fill="#00D2A0" />
      <circle cx="70" cy="24" r="2.2" fill="#126B5B" />
      <circle cx="100" cy="12" r="2.2" fill="#126B5B" />
      <circle cx="235" cy="50" r="2.8" fill="#C99543" />
      <circle cx="225" cy="30" r="2.2" fill="#00D2A0" />
      <circle cx="238" cy="75" r="2.2" fill="#126B5B" />
      <circle cx="40" cy="115" r="2.2" fill="#126B5B" />
      <circle cx="75" cy="135" r="2.8" fill="#C99543" />
      <circle cx="85" cy="130" r="2.2" fill="#00D2A0" />
      <circle cx="215" cy="136" r="2.2" fill="#126B5B" />
      <circle cx="238" cy="118" r="2.2" fill="#00D2A0" />

      {/* Isometric Microcontroller Chip Package */}
      <g transform="translate(126, 52)">
        {/* Silver Metallic Pins */}
        <line x1="12" y1="18" x2="4" y2="13" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="20" y1="14" x2="12" y2="9" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="28" y1="10" x2="20" y2="5" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="36" y1="6" x2="28" y2="1" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />

        <line x1="44" y1="53" x2="52" y2="58" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="52" y1="49" x2="60" y2="54" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="60" y1="45" x2="68" y2="50" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="68" y1="41" x2="76" y2="46" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />

        <line x1="4" y1="36" x2="-4" y2="41" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="12" y1="40" x2="4" y2="45" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="20" y1="44" x2="12" y2="49" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="28" y1="48" x2="20" y2="53" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />

        <line x1="52" y1="1" x2="60" y2="-4" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="60" y1="5" x2="68" y2="0" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="68" y1="9" x2="76" y2="4" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="76" y1="13" x2="84" y2="8" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />

        {/* Chip Body */}
        <polygon points="40,0 84,24 40,48 -4,24" fill="#0A1215" opacity="0.95" />
        <polygon points="-4,24 40,48 40,54 -4,30" fill="#060C0E" />
        <polygon points="84,24 40,48 40,54 84,30" fill="#111B20" />
        {/* Top surface */}
        <polygon points="40,2 82,25 40,46 -2,25" fill="#15252B" stroke="#126B5B" strokeWidth="1.5" />
        {/* Silicon Die Accent */}
        <polygon points="40,12 64,25 40,36 16,25" fill="#0F1D22" stroke="#00D2A0" strokeWidth="1.2" opacity="0.9" />
        <circle cx="10" cy="25" r="2" fill="#C99543" />
        <circle cx="40" cy="25" r="7" fill="#00D2A0" opacity="0.35" />
      </g>
    </svg>
  </div>
);

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory | 'all'>('all');

  const totalSkills = SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0);

  const getCardIcon = (_iconName: string, _isFirmware: boolean, groupId?: string) => {
    switch (groupId) {
      case 'firmware':
        return <MicrochipCardIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 shrink-0" />;
      case 'systems':
        return <TuxPenguinIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 shrink-0" />;
      case 'networking':
        return <WirelessTelemetryCardIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 shrink-0" />;
      case 'software':
        return <SoftwareCodeCardIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 shrink-0" />;
      case 'mobile-ai':
        return <MobileEdgeCardIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 shrink-0" />;
      default:
        return <MicrochipCardIcon className="w-7 h-7 shrink-0" />;
    }
  };

  const getTabIcon = (_iconName: string, isActive: boolean, groupId?: string) => {
    const iconClass = "w-4 h-4 shrink-0";
    switch (groupId) {
      case 'firmware':
        return <MicrochipCardIcon className={iconClass} />;
      case 'systems':
        return <TuxPenguinIcon className={iconClass} />;
      case 'networking':
        return <WirelessTelemetryCardIcon className={iconClass} />;
      case 'software':
        return <SoftwareCodeCardIcon className={iconClass} />;
      case 'mobile-ai':
        return <MobileEdgeCardIcon className={iconClass} />;
      default:
        return <Layers className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#126B5B]'}`} />;
    }
  };

  // 3 + 2 Split for the Exact Layout Specification
  const row1Groups = SKILL_GROUPS.slice(0, 3); // firmware, systems, networking
  const row2Groups = SKILL_GROUPS.slice(3, 5); // software, mobile-ai

  const renderCard = (group: SkillGroup, isRow2: boolean = false) => {
    const isFirmware = group.id === 'firmware';
    const visual = CATEGORY_VISUALS[group.id] || CATEGORY_VISUALS.firmware;

    // Distribute skills evenly into two columns (Column-first matching reference)
    const mid = Math.ceil(group.skills.length / 2);
    const col1Skills = group.skills.slice(0, mid);
    const col2Skills = group.skills.slice(mid);

    const renderSkillItem = (skill: typeof group.skills[0], sIdx: number) => {
      const tag = SHORT_TAGS[skill.name] || skill.hardwareOrStandard;
      return (
        <div
          key={sIdx}
          className="group/row flex items-center justify-between gap-1 py-1.5 px-2 rounded-xl bg-[#FAFAF8] border border-[#E8ECE9] hover:bg-white hover:border-[#126B5B]/35 hover:shadow-2xs transition-all duration-150 min-h-[32px]"
        >
          {/* Left: Solid Circled Green/Teal Checkmark + Full Skill Name */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div className="w-3.5 h-3.5 rounded-full bg-[#126B5B] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Check className="w-2 h-2 stroke-[3]" />
            </div>
            <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] font-semibold text-[#15252B] leading-tight">
              {skill.name}
            </span>
          </div>

          {/* Right: Technical Tag Pill (Aligned Right, Readable) */}
          {tag && (
            <span className="text-[8.5px] font-sans font-medium px-1.5 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#475569] shadow-2xs text-right leading-none shrink-0 whitespace-nowrap ml-0.5 tracking-tight">
              {tag}
            </span>
          )}
        </div>
      );
    };

    const imageElement = (extraClass: string) => (
      <div className={`relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-2xs group/img ${extraClass}`}>
        <img 
          src={visual.image} 
          alt={group.title}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Subtle Engineering Corner Circuit Marks */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C99543]/80 rounded-tl-xs pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#126B5B]/80 rounded-tr-xs pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#126B5B]/80 rounded-bl-xs pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C99543]/80 rounded-br-xs pointer-events-none" />

        {/* Subtle Gradient & Technical Caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
          <span className="text-[10.5px] font-mono text-white/95 font-medium leading-tight tracking-tight drop-shadow-xs">
            {visual.caption}
          </span>
        </div>
      </div>
    );

    return (
      <motion.div
        key={group.id}
        variants={cardVariant}
        className={`rounded-3xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between bg-white border card-shadow hover:shadow-lg hover:-translate-y-1 ${
          isFirmware 
            ? 'border-[#126B5B]/40 hover:border-[#126B5B]/70' 
            : 'border-[#E2E8F0] hover:border-[#126B5B]/35'
        }`}
      >
        {/* Top Header & Content */}
        <div>
          {/* Header Row: Category Icon + Title + Skill Count Pill */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs ${
                  isFirmware
                    ? 'bg-[#EBF6F3] border-[#D0EBE3]'
                    : group.id === 'systems'
                    ? 'bg-[#FFFBEB] border-[#FEF3C7]'
                    : 'bg-[#F4F9F7] border-[#E0EFEA]'
                }`}
              >
                {getCardIcon(group.iconName, isFirmware, group.id)}
              </div>
              <div>
                <h3 className="font-display font-bold text-[16px] sm:text-[17px] text-[#0F172A] leading-snug">
                  {group.title}
                </h3>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#F0F5F2] border border-[#D8E6E0] text-[#126B5B] shrink-0 whitespace-nowrap shadow-2xs">
              {group.skills.length} Skills
            </span>
          </div>

          {/* Description */}
          <p className="text-[12.5px] leading-relaxed text-[#64748B] mt-1 mb-2.5">
            {group.description}
          </p>

          {/* Signature Accent Line */}
          <div 
            className="w-10 h-1 rounded-full mb-3.5"
            style={{ backgroundColor: isFirmware ? TEAL : group.id === 'systems' || group.id === 'software' ? GOLD : TEAL }}
          />

          {/* Row 2 vs Row 1 Layout Structure */}
          {isRow2 ? (
            /* ROW 2 CARDS: Skills in 2 columns on the left, Image on the right (matching reference!) */
            <div className="flex flex-col md:flex-row gap-3.5 sm:gap-4 items-stretch mt-1">
              {/* Left side: 2 Columns of skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 items-stretch">
                <div className="flex flex-col gap-1.5">
                  {col1Skills.map((skill, sIdx) => renderSkillItem(skill, sIdx))}
                </div>
                <div className={`flex flex-col ${col2Skills.length < col1Skills.length ? 'justify-between' : 'gap-1.5'}`}>
                  {col2Skills.map((skill, sIdx) => renderSkillItem(skill, sIdx + mid))}
                </div>
              </div>
              {/* Right side: Image beside skills */}
              <div className="w-full md:w-44 lg:w-48 xl:w-56 shrink-0 h-44 md:h-auto">
                {imageElement('w-full h-full min-h-[160px]')}
              </div>
            </div>
          ) : (
            /* ROW 1 CARDS: 2 Columns of skills across card */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-stretch">
              <div className="flex flex-col gap-1.5">
                {col1Skills.map((skill, sIdx) => renderSkillItem(skill, sIdx))}
              </div>
              <div className={`flex flex-col ${col2Skills.length < col1Skills.length ? 'justify-between' : 'gap-1.5'}`}>
                {col2Skills.map((skill, sIdx) => renderSkillItem(skill, sIdx + mid))}
              </div>
            </div>
          )}
        </div>

        {/* For Row 1 Cards: Full-Width Image at Bottom */}
        {!isRow2 && (
          <div className="relative mt-4 pt-1">
            {imageElement('h-32 sm:h-36 xl:h-32 w-full')}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <ScrollSectionWrapper
      id="skills"
      className="pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-18 lg:pb-20 relative bg-[#FAFAF7] border-t border-[#E5E9E6]"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* ========================================================
            1. HEADER AREA: TITLE + VERIFIED STATS + MICROCONTROLLER ART
           ======================================================== */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 sm:mb-10">
          {/* Left: Code Icon + Large Heading + Intro + Accent Line */}
          <div className="flex items-start gap-3.5 sm:gap-4.5 max-w-3xl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#126B5B] to-[#0A4A3E] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#126B5B]/20">
              <Code2 className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight" style={{ color: CHARCOAL }}>
                Skills & <span style={{ color: TEAL }}>Technologies</span>
              </h2>
              <p className="text-xs sm:text-sm font-medium leading-relaxed mt-1.5" style={{ color: MUTED }}>
                A disciplined foundation in embedded systems, firmware engineering, Linux environments, and connected telemetry systems.
              </p>
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#126B5B] to-[#C99543] mt-2.5" />
            </div>
          </div>

          {/* Right: 4 Compact Statistics Cards + Microcontroller Art */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 self-start xl:self-center shrink-0">
            {/* Stat 1: 5 Domains */}
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white border border-[#E5E9E6] shadow-2xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF6F3] text-[#126B5B] flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold font-display text-[#15252B] leading-none">
                  {SKILL_GROUPS.length}
                </div>
                <div className="text-[10px] font-mono text-[#68757A] uppercase tracking-wider font-semibold mt-1">
                  Domains
                </div>
              </div>
            </div>

            {/* Stat 2: 38+ Technologies */}
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white border border-[#E5E9E6] shadow-2xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF6F3] text-[#126B5B] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold font-display text-[#126B5B] leading-none">
                  {totalSkills}+
                </div>
                <div className="text-[10px] font-mono text-[#68757A] uppercase tracking-wider font-semibold mt-1">
                  Technologies
                </div>
              </div>
            </div>

            {/* Stat 3: 11 Tools & Platforms */}
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white border border-[#E5E9E6] shadow-2xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF6F3] text-[#126B5B] flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold font-display text-[#15252B] leading-none">
                  {TOOLS_AND_PLATFORMS.length}
                </div>
                <div className="text-[10px] font-mono text-[#68757A] uppercase tracking-wider font-semibold mt-1">
                  Tools & Platforms
                </div>
              </div>
            </div>

            {/* Stat 4: 5+ Major Projects */}
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white border border-[#E5E9E6] shadow-2xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] text-[#C99543] flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold font-display text-[#15252B] leading-none">
                  5+
                </div>
                <div className="text-[10px] font-mono text-[#68757A] uppercase tracking-wider font-semibold mt-1">
                  Major Projects
                </div>
              </div>
            </div>

            {/* Microcontroller & PCB Artwork matching the reference image */}
            <HeaderMicrocontrollerArt />
          </div>
        </div>

        {/* ========================================================
            2. CATEGORY NAVIGATION (HORIZONTAL PILL BAR)
           ======================================================== */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 pb-4 border-b border-[#E5E9E6]">
          {/* All Capabilities Button */}
          <div className="relative inline-flex flex-col items-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#126B5B] text-white shadow-xs'
                  : 'bg-white text-[#556368] border border-[#E5E9E6] hover:border-[#126B5B] hover:text-[#15252B]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>All Capabilities ({SKILL_GROUPS.length})</span>
            </button>
            {activeTab === 'all' && (
              <span className="w-8 h-1 rounded-full bg-[#126B5B] mt-1.5 hidden sm:block" />
            )}
          </div>

          {/* 5 Specific Category Tabs */}
          {SKILL_GROUPS.map((group) => {
            const isActive = activeTab === group.id;
            return (
              <div key={group.id} className="relative inline-flex flex-col items-center">
                <button
                  onClick={() => setActiveTab(group.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#126B5B] text-white shadow-xs'
                      : 'bg-white text-[#556368] border border-[#E5E9E6] hover:border-[#126B5B] hover:text-[#15252B]'
                  }`}
                >
                  {getTabIcon(group.iconName, isActive, group.id)}
                  <span>{group.title}</span>
                </button>
                {isActive && (
                  <span className="w-8 h-1 rounded-full bg-[#126B5B] mt-1.5 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================
            3. MAIN CATEGORY CARDS — EXACT 3 + 2 ROW ARRANGEMENT
           ======================================================== */}
        {activeTab === 'all' ? (
          <div className="space-y-5 lg:space-y-6">
            {/* FIRST ROW: 3 Equal-Width Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
              initial="visible"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {row1Groups.map((group) => renderCard(group, false))}
            </motion.div>

            {/* SECOND ROW: 2 Equal-Width Wider Cards Centered Beneath */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch"
              initial="visible"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {row2Groups.map((group) => renderCard(group, true))}
            </motion.div>
          </div>
        ) : (
          /* Filtered Single Category View */
          <motion.div
            className="max-w-3xl mx-auto"
            initial="visible"
            animate="visible"
          >
            {SKILL_GROUPS.filter(g => g.id === activeTab).map((group) => 
              renderCard(group, false)
            )}
          </motion.div>
        )}

        {/* ========================================================
            4. TOOLS & PLATFORMS STRIP + MOTIVATIONAL LEARNING CARD
           ======================================================== */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-3xl bg-white border border-[#E5E9E6] card-shadow flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Left: Title & Subtitle */}
          <div className="flex items-center gap-3.5 shrink-0 xl:pr-6 xl:border-r xl:border-[#E5E9E6]">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF6F3] border border-[#D0EBE3] text-[#126B5B] flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-[#15252B] leading-tight">
                Tools & Platforms
              </h4>
              <p className="text-xs text-[#68757A] mt-0.5">
                Tools I use to build, debug, develop, and deploy systems.
              </p>
            </div>
          </div>

          {/* Center: Brand Tool Badges (Vertical Icon Button + Label) */}
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-between gap-2 sm:gap-2.5 xl:gap-1.5 2xl:gap-3 flex-1">
            {TOOLS_AND_PLATFORMS.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center group cursor-pointer transition-transform duration-150 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F8FAF9] border border-[#E2E8F0] shadow-2xs flex items-center justify-center group-hover:bg-white group-hover:border-[#126B5B]/40 group-hover:shadow-sm transition-all">
                  {tool.icon}
                </div>
                <span className="text-[10.5px] font-semibold text-[#334155] mt-1 text-center group-hover:text-[#126B5B] transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Motivational Learning Card matching Reference Image */}
          <div className="shrink-0 rounded-2xl bg-gradient-to-br from-[#0F3831] via-[#0D2E28] to-[#0A221E] text-white p-3.5 sm:p-4 border border-[#1E5247] shadow-sm flex items-center gap-3 self-stretch xl:self-auto justify-center sm:justify-start">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <span className="text-lg sm:text-xl select-none" role="img" aria-label="Rocket">
                🚀
              </span>
            </div>
            <div className="flex flex-col justify-center pr-1">
              <span className="text-[12px] sm:text-[12.5px] font-semibold text-white/95 leading-tight tracking-wide">
                Always learning,
              </span>
              <div className="relative mt-0.5">
                <span className="text-[12.5px] sm:text-[13px] font-display font-bold text-[#F5B942] leading-tight">
                  always building...
                </span>
                {/* Curved golden underline accent */}
                <svg className="w-full h-1.5 text-[#F5B942] mt-0.5" viewBox="0 0 100 6" fill="none">
                  <path d="M2 4C30 1 70 1 98 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ScrollSectionWrapper>
  );
};
