export interface StartupService {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export interface StartupConfig {
  name: string;
  category: string;
  role: string;
  tagline: string;
  description: string;
  missionQuote: string;
  websiteUrl: string | null;
  repositoryUrl: string | null;
  heroImage: string;
  logoImage: string;
  coreServices: {
    readyMade: StartupService;
    customSupport: StartupService;
  };
}

export const EDUNOVA_STARTUP: StartupConfig = {
  name: 'EduNova Forge',
  category: 'EdTech Startup',
  role: 'Founder & Developer',
  tagline: 'Discover • Build • Bring Ideas to Life.',
  description: 'An educational technology platform helping engineering students discover academic project resources and request personalized project-development support.',
  missionQuote: 'Your project deadline is not the time to start from scratch. EduNova Forge delivers ready-to-submit engineering projects — IoT, ML, web, mobile, hardware — built for actual college requirements.',
  // Official EduNova Forge live website URL
  websiteUrl: 'https://edunova-forge.edunovaforge.workers.dev',
  repositoryUrl: 'https://github.com/Somujavooru/EduNova_Tech',
  heroImage: '/images/startup/edunova-forge-hero.png',
  logoImage: '/images/startup/edunova-forge-logo-tight.png',
  coreServices: {
    readyMade: {
      title: 'Explore Ready-Made Project Resources',
      badge: 'Core Service 01',
      tagline: 'Curated, Tested & University-Ready Project Blueprints',
      description: 'A verified catalog enabling engineering students to discover structured project architectures, complete circuit schematics, bill of materials (BOM), and validated codebases across embedded systems, IoT, robotics, and full-stack software.',
      highlights: [
        'Curated hardware circuit schematics & pinout mappings',
        'Vetted firmware & application source code repositories',
        'Comprehensive documentation, viva guides & presentation blueprints'
      ]
    },
    customSupport: {
      title: 'Request a Custom Project',
      badge: 'Core Service 02',
      tagline: 'Bespoke 1-on-1 Personalized Technical Mentoring',
      description: 'Dedicated 1-on-1 engineering support for students with unique problem statements, assisting with custom hardware design, sensor interfacing, firmware debugging, and final-year project realization.',
      highlights: [
        'Tailored component feasibility analysis & architectural design',
        'Hardware bring-up, communication bus (I2C/SPI/UART) & firmware troubleshooting',
        'End-to-end guidance from conceptualization to functional prototype demonstration'
      ]
    }
  }
};

export interface FreelancePricing {
  startingPrice: string;
  amount: number;
  formattedPrice: string;
  currency: string;
}

/**
 * Freelance Development Services Starting Prices
 * Easily configurable starting prices for the 3 service cards.
 */
export const FREELANCE_PRICING: Record<'engineering' | 'ecommerce' | 'automation', FreelancePricing> = {
  engineering: {
    startingPrice: 'Starting at ₹499',
    amount: 499,
    formattedPrice: '₹499',
    currency: '₹',
  },
  ecommerce: {
    startingPrice: 'Starting at ₹999',
    amount: 999,
    formattedPrice: '₹999',
    currency: '₹',
  },
  automation: {
    startingPrice: 'Starting at ₹999',
    amount: 999,
    formattedPrice: '₹999',
    currency: '₹',
  },
};

