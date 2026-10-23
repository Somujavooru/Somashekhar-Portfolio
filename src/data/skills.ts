import type { SkillGroup } from '../types';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'firmware',
    title: 'Embedded Software & Firmware',
    iconName: 'Cpu',
    description: 'Low-level microcontrollers, peripheral drivers, hardware-software integration, deterministic execution, and real-time scheduling.',
    protocolsOrTools: ['FreeRTOS', 'UART', 'SPI', 'I2C', 'GPIO / ADC / PWM', 'ISRs'],
    skills: [
      { name: 'C', hardwareOrStandard: 'C99 / C11', highlight: true },
      { name: 'C++', hardwareOrStandard: 'Modern C++ / Embedded C++', highlight: true },
      { name: 'Embedded C', hardwareOrStandard: 'Bare-metal & HAL', highlight: true },
      { name: 'FreeRTOS', hardwareOrStandard: 'Task scheduling, queues & semaphores', highlight: true },
      { name: 'Microcontroller Programming', hardwareOrStandard: 'ESP32, ESP8266, AVR / Arduino' },
      { name: 'Peripheral Interfaces', hardwareOrStandard: 'UART, SPI, I2C bus transactions' },
      { name: 'Hardware-Software Integration', hardwareOrStandard: 'Bring-up, sensors & actuators' },
      { name: 'Interrupt Service Routines (ISRs)', hardwareOrStandard: 'Time-critical event handling' },
      { name: 'Analog-to-Digital Conversion (ADC)', hardwareOrStandard: 'Sensor calibration & sampling' },
      { name: 'Pulse Width Modulation (PWM)', hardwareOrStandard: 'Motor control & servo steering' },
      { name: 'Hardware Debugging', hardwareOrStandard: 'Logic analysis, oscilloscope & UART telemetry' }
    ]
  },
  {
    id: 'systems',
    title: 'Embedded Linux & Systems',
    iconName: 'Terminal',
    description: 'Operating systems principles, POSIX environment, concurrent execution, memory management, and systematic debugging.',
    protocolsOrTools: ['Linux CLI', 'POSIX', 'Concurrency', 'Valgrind / GDB', 'Memory Management'],
    skills: [
      { name: 'Linux Fundamentals', hardwareOrStandard: 'Shell scripting, process lifecycle & file I/O', highlight: true },
      { name: 'Operating Systems Principles', hardwareOrStandard: 'Process scheduling, virtual memory & IPC', highlight: true },
      { name: 'Linux System Programming', hardwareOrStandard: 'Sockets, signals, file descriptors' },
      { name: 'Linux Kernel Fundamentals', hardwareOrStandard: 'Kernel architecture, system calls & user-kernel boundary' },
      { name: 'Concurrency & Multithreading', hardwareOrStandard: 'Pthreads, race conditions & mutex synchronization' },
      { name: 'Memory Management', hardwareOrStandard: 'Dynamic allocation, leak detection & stack/heap analysis' },
      { name: 'Systematic Root-Cause Debugging', hardwareOrStandard: 'Core dump analysis, logging & telemetry' }
    ]
  },
  {
    id: 'networking',
    title: 'Networking & IoT Systems',
    iconName: 'Wifi',
    description: 'Connected telemetry protocols, wireless transmission, remote Over-The-Air updates, and distributed sensor nodes.',
    protocolsOrTools: ['MQTT', 'TCP/IP', 'HTTP/REST', 'Wi-Fi 802.11', 'OTA Firmware'],
    skills: [
      { name: 'MQTT Protocol', hardwareOrStandard: 'Pub/Sub telemetry & broker integration', highlight: true },
      { name: 'TCP/IP & Networking Concepts', hardwareOrStandard: 'L2/L3 fundamentals, socket connections', highlight: true },
      { name: 'HTTP Client/Server Streaming', hardwareOrStandard: 'RESTful endpoints & multipart video streams' },
      { name: 'Over-The-Air (OTA) Updates', hardwareOrStandard: 'Dual-partition flash, rollbacks & verification' },
      { name: 'ESP32 Wi-Fi Subsystem', hardwareOrStandard: 'Station & AP modes, reconnect logic' },
      { name: 'ESP8266 IoT Integration', hardwareOrStandard: 'Cloud telemetry & Firebase IoT bridge' },
      { name: 'Connected Sensor Networks', hardwareOrStandard: 'Telemetry streaming & event-driven alerts' }
    ]
  },
  {
    id: 'software',
    title: 'Software Development & Fundamentals',
    iconName: 'Code2',
    description: 'Disciplined software engineering, algorithmic efficiency, structured object-oriented design, and automated testing.',
    protocolsOrTools: ['Git', 'Python 3', 'Java', 'DSA', 'Unit Testing', 'SQL'],
    skills: [
      { name: 'Data Structures & Algorithms', hardwareOrStandard: 'Trees, graphs, heaps, complexity optimization', highlight: true },
      { name: 'Object-Oriented Programming (OOP)', hardwareOrStandard: 'Modularity, encapsulation & design patterns', highlight: true },
      { name: 'Python', hardwareOrStandard: 'Automation, data processing & OpenCV/telemetry' },
      { name: 'Java', hardwareOrStandard: 'Core Java, collections & concurrency' },
      { name: 'Git & Version Control', hardwareOrStandard: 'Branching, code reviews & release management' },
      { name: 'Unit Testing & Verification', hardwareOrStandard: 'Test suites, edge-case analysis & test coverage' },
      { name: 'Relational Databases & SQL', hardwareOrStandard: 'Schema design, indexes & optimized queries' }
    ]
  },
  {
    id: 'mobile-ai',
    title: 'Mobile, Web & Edge AI (Supporting)',
    iconName: 'Smartphone',
    description: 'Cross-platform mobile applications, full-stack client-server interfaces, and on-device neural network deployment.',
    protocolsOrTools: ['Flutter/Dart', 'TensorFlow Lite', 'SQLite', 'Next.js/React', 'REST APIs'],
    skills: [
      { name: 'Flutter & Dart', hardwareOrStandard: 'Cross-platform Android development & state management' },
      { name: 'TensorFlow Lite (TFLite)', hardwareOrStandard: 'On-device edge inference (MobileNetV3)' },
      { name: 'Android Studio', hardwareOrStandard: 'Native tooling, APK generation & device debugging' },
      { name: 'SQLite', hardwareOrStandard: 'Offline-first embedded mobile storage' },
      { name: 'Web Development', hardwareOrStandard: 'React, TypeScript, Next.js client-server apps' },
      { name: 'REST APIs & Webhooks', hardwareOrStandard: 'JSON payload serialization & network states' }
    ]
  }
];
