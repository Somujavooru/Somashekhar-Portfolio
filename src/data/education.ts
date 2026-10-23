import type { EducationItem, AchievementItem } from '../types';

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering in Electronics & Communication Engineering',
    institution: 'Bapuji Institute of Engineering and Technology (BIET)',
    location: 'Davangere, Karnataka, India',
    period: 'Aug 2022 – Jun 2026',
    grade: 'CGPA: 8.75 / 10.0',
    coursework: [
      'Operating Systems & Kernel Fundamentals',
      'Linux Internals & System Concepts',
      'Microcontrollers & Embedded Hardware',
      'Data Structures & Algorithms (DSA)',
      'Object-Oriented Programming (OOP)',
      'Computer Networking & Communication Protocols'
    ]
  },
  {
    degree: 'Pre-University Course (PUC Science - PCMB)',
    institution: 'Spandana PU Science College',
    location: 'Kulkarnipet, Ilkal, Karnataka',
    period: 'Jun 2020 – May 2022',
    grade: 'Score: 86.6%',
    coursework: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biology'
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Smart India Hackathon Finalist / Team Engineer',
    organization: 'Ministry of Education & AICTE',
    date: 'National Level',
    description: 'Engineered hardware-accelerated IoT and networking solutions with a 4-member cross-functional engineering team, bridging sensor telemetry and real-time cloud interfaces.',
    badgeText: 'National Hackathon',
    type: 'hackathon'
  },
  {
    title: 'Dextris Engineering Recognition Award',
    organization: 'Dextris Infoservices Pvt Ltd',
    date: 'Internship 2026',
    description: 'Recognized for standout core contributions to embedded software architecture, automated Over-The-Air (OTA) firmware deployment pipelines, and system bring-up.',
    badgeText: 'Industry Award',
    type: 'recognition'
  },
  {
    title: 'HackerRank Java (Basic) Certified',
    organization: 'HackerRank',
    date: 'Verified Certification',
    description: 'Certified in core programming fundamentals, data structures, algorithms, exception handling, and object-oriented design logic.',
    badgeText: 'Technical Certification',
    type: 'certification'
  }
];
