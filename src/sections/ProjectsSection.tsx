import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import { ProjectModal } from '../components/modals/ProjectModal';
import type { Project } from '../types';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';

const TEAL = '#126B5B';
const GOLD = '#C99543';
const CHARCOAL = '#15252B';
const MUTED = '#68757A';
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Staggered sequential reveal: cards enter one by one as user scrolls into the section
const projectContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// 5 Featured Projects - Embedded & Firmware Track
const EMBEDDED_FEATURED_CONFIGS = [
  {
    id: 'solar-agri-robot',
    displayName: 'AI-Powered Solar Agriculture Robot',
    badge: 'Embedded + AI',
    tags: ['ESP32', 'Python', 'AI/ML', 'Solar'],
    image: '/images/projects/solar-agri-field.jpg',
  },
  {
    id: 'esp32-cam-face-display',
    displayName: 'ESP32-CAM Face Recognition System',
    badge: 'Computer Vision',
    tags: ['ESP32', 'OpenCV', 'TFT', 'IoT'],
    image: '/images/projects/esp32-cam-system.jpg',
  },
  {
    id: 'lpg-gas-leakage-system',
    displayName: 'LPG Gas Leakage Detection System',
    badge: 'Safety System',
    tags: ['ESP32', 'MQ-2', 'MQTT', 'Safety'],
    image: '/images/projects/lpg-gas-system.jpg',
  },
  {
    id: 'plant-watering-system',
    displayName: 'Smart Irrigation System',
    badge: 'IoT System',
    tags: ['IoT', 'Sensors', 'Automation', 'Blynk'],
    image: '/images/projects/smart-irrigation-system.jpg',
  },
  {
    id: 'esp32-ota-system',
    displayName: 'ESP32 OTA Firmware Deployment',
    badge: 'Fail-Safe Bootloader',
    tags: ['ESP32', 'OTA', 'Dual-Flash', 'C/C++'],
    image: '/images/projects/esp32-ota-system.jpg',
  },
];

// 6 Featured Projects - Full-Stack Web & AI Software Track (Social Media Publisher as 1st Priority)
const FULLSTACK_FEATURED_CONFIGS = [
  {
    id: 'social-media-publisher',
    displayName: 'Unified Social Media Publishing SaaS',
    badge: 'Distributed Cloud SaaS',
    tags: ['Cloudflare Workers', 'Hono', 'React', 'Queues'],
    image: '/images/projects/social-media-publisher.jpg',
  },
  {
    id: 'skill-assessment-agent',
    displayName: 'AI-Powered Skill Assessment Agent',
    badge: 'Generative AI',
    tags: ['LangChain', 'Gemini AI', 'Streamlit', 'Python'],
    image: '/images/projects/skill-assessment-agent.jpg',
  },
  {
    id: 'food-health-app',
    displayName: 'Food & Health Contextual Nutrition App',
    badge: 'Full-Stack Web',
    tags: ['React 19', 'Python Flask', 'REST API', 'Tailwind'],
    image: '/images/projects/food-health-app.jpg',
  },
  {
    id: 'hospital-appointment-system',
    displayName: 'Government Hospital Appointment System',
    badge: 'Full-Stack MERN',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    image: '/images/projects/hospital-appointment-system.jpg',
  },
  {
    id: 'farmer-assistant-ai',
    displayName: 'Farmer Assistant AI Mobile App',
    badge: 'Mobile + Edge AI',
    tags: ['Flutter', 'TFLite', 'Dart', 'Android'],
    image: '/images/projects/farmer-assistant-home.png',
  },
  {
    id: 'edunova-platform',
    displayName: 'EduNova Student Project Platform',
    badge: 'Web Platform',
    tags: ['Next.js', 'TypeScript', 'SQL', 'React'],
    image: '/images/projects/edunova-platform.jpg',
  },
];

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);



  const scrollRow = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 280;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -(cardWidth + 20) : (cardWidth + 20),
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  const renderCard = (feat: typeof EMBEDDED_FEATURED_CONFIGS[0]) => {
    const projectData = PROJECTS.find((p) => p.id === feat.id) || PROJECTS[0];

    return (
      <motion.div
        key={feat.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        whileHover={{ y: -4 }}
        className="group rounded-2xl bg-white border border-[#E5E9E6] card-shadow card-shadow-hover flex flex-col justify-between overflow-hidden cursor-pointer h-full"
        onClick={() => setSelectedProject(projectData)}
      >
        {/* Image Container with Top-Left Badge & Bottom-Right Teal Action Button */}
        <div className="relative aspect-[16/11] overflow-hidden bg-[#F0F2F0]">
          <img
            src={feat.image}
            alt={feat.displayName}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlaid Category Badge (Top-Left) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E9E6] text-xs font-semibold text-[#15252B] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TEAL }} />
              <span>{feat.badge}</span>
            </span>
            {projectData.liveDemoUrl && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600/95 backdrop-blur-md text-white text-[10.5px] font-mono-tech font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                <span>LIVE DEMO</span>
              </span>
            )}
          </div>

          {/* Circular Teal Action Button (Bottom-Right) */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(projectData);
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-sm"
              style={{ backgroundColor: TEAL }}
              aria-label={`Open details for ${feat.displayName}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card Text & Tags */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="font-display font-bold text-[15px] sm:text-base leading-snug line-clamp-2 transition-colors group-hover:text-[#126B5B]"
              style={{ color: CHARCOAL }}
            >
              {feat.displayName}
            </h3>
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#EEF1EF]">
            {feat.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-mono-tech px-2.5 py-0.5 rounded-md border font-medium text-[#475569]"
                style={{
                  backgroundColor: '#F7F8F6',
                  borderColor: '#E5E9E6',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <ScrollSectionWrapper
      id="projects"
      className="pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-18 relative bg-[#FAFAF7] border-t border-[#E5E9E6]"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* ========================================================
            SECTION HEADER
           ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="font-mono-tech text-xs tracking-widest font-semibold mb-2" style={{ color: GOLD }}>
              // 04
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight" style={{ color: CHARCOAL }}>
              Featured <span style={{ color: TEAL }}>Projects</span>
            </h2>
          </div>

          <div className="lg:max-w-xl">
            <p className="text-sm font-medium leading-relaxed" style={{ color: MUTED }}>
              A collection of my embedded firmware, IoT hardware, and full-stack software applications built to solve real-world problems.
            </p>
          </div>
        </div>

        {/* ========================================================
            ROW 1: FIRMWARE & EMBEDDED SYSTEMS
           ======================================================== */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C99543]" />
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#15252B]">
                Firmware & Embedded Systems
              </h3>
              <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded-full bg-[#F0F2F0] text-[#556368] font-semibold border border-[#E5E9E6]">
                5 Projects
              </span>
            </div>
            <span className="text-xs font-mono-tech text-[#68757A] hidden sm:inline-block">
              // HARDWARE & TELEMETRY
            </span>
          </div>

          <motion.div
            variants={projectContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {EMBEDDED_FEATURED_CONFIGS.map(renderCard)}
          </motion.div>
        </div>

        {/* ========================================================
            ROW 2: FULL-STACK WEB & AI SOFTWARE (MATCHING CARD SIZE WITH HORIZONTAL SCROLL)
           ======================================================== */}
        <div className="pt-8 border-t border-[#E5E9E6]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#126B5B]" />
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#15252B]">
                Full-Stack Web & AI Software
              </h3>
              <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded-full bg-[#E8F4F0] text-[#126B5B] font-semibold border border-[#126B5B]/20">
                6 Projects
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech text-[#68757A] hidden sm:inline-block">
                // WEB, CLOUD & AGENTIC AI
              </span>

              {/* Carousel navigation controls & hint */}
              <div className="flex items-center gap-2.5 pl-3 sm:border-l sm:border-[#E5E9E6]">
                <span className="text-[11px] font-mono-tech text-[#126B5B] font-medium hidden md:inline-flex items-center gap-1">
                  {canScrollRight ? (
                    <>
                      <span>5 of 6 shown</span>
                      <span className="text-[#8E999E]">·</span>
                      <span className="font-semibold">Scroll for 6th ➔</span>
                    </>
                  ) : (
                    <span>All 6 Projects in View</span>
                  )}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollRow('left')}
                    disabled={!canScrollLeft}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#E5E9E6] text-[#15252B] hover:bg-[#F0F2F0] hover:border-[#126B5B] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                    aria-label="Scroll left to previous project"
                    title="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollRow('right')}
                    disabled={!canScrollRight}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#E5E9E6] text-[#15252B] hover:bg-[#F0F2F0] hover:border-[#126B5B] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                    aria-label="Scroll right to next project"
                    title="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">

            {/* Scrollable track: card width matches Row 1 (5 visible on lg) and 6th comes in from right */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 -mx-1"
            >
              {FULLSTACK_FEATURED_CONFIGS.map((feat) => (
                <div
                  key={feat.id}
                  className="shrink-0 snap-start w-[85vw] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-4*1.25rem)/5)] flex flex-col"
                >
                  {renderCard(feat)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for In-depth Architecture and Specs */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </ScrollSectionWrapper>
  );
};
