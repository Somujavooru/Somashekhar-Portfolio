export type ProjectCategory = 
  | 'embedded'
  | 'iot'
  | 'software-ai'
  | 'android-web';

export interface ProjectArchitectureItem {
  layer: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  isPrimaryEmbedded: boolean;
  problemStatement: string;
  implementationSummary: string;
  verifiedDetails: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  hardwareSpecs?: string[];
  protocols?: string[];
  githubUrl: string;
  liveDemoUrl?: string | null;
  isForked?: boolean;
  forkNote?: string;
  image?: string;
  imageAlt?: string;
  hasVerifiedScreenshot: boolean;
  architectureDiagram?: ProjectArchitectureItem[];
}

export type SkillCategory = 
  | 'firmware'
  | 'systems'
  | 'networking'
  | 'software'
  | 'mobile-ai';

export interface SkillItem {
  name: string;
  level?: string;
  tags?: string[];
  hardwareOrStandard?: string;
  highlight?: boolean;
}

export interface SkillGroup {
  id: SkillCategory;
  title: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
  protocolsOrTools: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  roleType: 'embedded' | 'software';
  location: string;
  period: string;
  statusNotice?: string; // For TODO or unresolved date/title notes
  responsibilities: string[];
  technologies: string[];
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  coursework: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  date?: string;
  description: string;
  badgeText: string;
  type: 'hackathon' | 'recognition' | 'certification';
}
