import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';
import { EDUNOVA_STARTUP, FREELANCE_PRICING } from '../data/startup';
import { RequestQuoteModal, type QuoteServiceType } from '../components/modals/RequestQuoteModal';
import { 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  X, 
  AlertCircle,
  Check,
  Cpu,
  Wifi,
  Brain,
  Code2,
  GraduationCap,
  Wrench,
  ShoppingCart,
  FileEdit,
  ChevronLeft,
  ChevronRight,
  Crown,
  Settings
} from 'lucide-react';

const TEAL = '#126B5B';
const GOLD = '#C99543';
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Three distinct service image sets for the independent carousels:
 * 1. Engineering Projects: Robotics Rover, Smart Irrigation IoT, ESP32 Camera Architecture
 * 2. E-commerce Service: Modern Storefront, Product Catalog, Food & Health App Shop
 * 3. Automation Solutions: Smart Farm IoT Telemetry, Social Media Publisher, AI Analytics
 */
const ENGINEERING_SLIDES = [
  {
    title: 'Robotics & Hardware Prototyping',
    image: '/images/startup/service_engineering_rover.jpg',
    alt: 'Robotics and Embedded Hardware Prototyping Rover',
  },
  {
    title: 'IoT & Smart Sensors System',
    image: '/images/projects/smart-irrigation-system.jpg',
    alt: 'Smart IoT Sensors & Automated Irrigation System',
  },
  {
    title: 'Embedded Systems & AI Prototyping',
    image: '/images/projects/esp32-cam-system.jpg',
    alt: 'ESP32 Camera & Embedded AI Hardware Architecture',
  },
];

const ECOMMERCE_SLIDES = [
  {
    title: 'Modern Online Storefront',
    image: '/images/startup/service_ecommerce_store.jpg',
    alt: 'Modern, Secure, and Scalable E-commerce Storefront',
  },
  {
    title: 'Product Catalog & Store Management',
    image: '/images/projects/edunova-platform.jpg',
    alt: 'Comprehensive Product Catalog and Inventory Management',
  },
  {
    title: 'Food & Health Digital Store',
    image: '/images/projects/food-health-app.jpg',
    alt: 'Tailored Digital Shopping and Order Management Application',
  },
];

const AUTOMATION_SLIDES = [
  {
    title: 'Social Media Post Publisher',
    image: '/images/startup/service_automation_social_publisher.png',
    alt: 'Social Media Post Publisher - Multi-Platform Content Scheduler and Analytics Dashboard',
  },
  {
    title: 'IoT Telemetry & Industrial Automation',
    image: '/images/startup/service_automation_smart_farm.jpg',
    alt: 'Smart Farm IoT Telemetry Dashboard and Microcontroller Sensor Prototype',
  },
  {
    title: 'AI Analytics & Workflow Automation',
    image: '/images/projects/skill-assessment-agent.jpg',
    alt: 'AI-driven Workflow Automation and Analytics Platform',
  },
];

interface ServiceCarouselProps {
  slides: {
    title: string;
    image: string;
    alt: string;
  }[];
  autoPlayInterval?: number;
}

/**
 * Independent Image Carousel Component
 * Positioned below the feature lists, matching the approved reference layout.
 * Provides smooth sliding transitions, manual arrows, and pagination dots
 * operating fully independently for each card.
 */
const ServiceCardCarousel: React.FC<ServiceCarouselProps> = ({
  slides,
  autoPlayInterval = 5500,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  useEffect(() => {
    if (isHovered || !isTabVisible) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isHovered, isTabVisible, paginate, autoPlayInterval]);

  return (
    <div 
      className="flex flex-col w-full mb-3.5 sm:mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 16:9 Aspect Ratio Carousel Frame */}
      <div className="w-full relative rounded-xl sm:rounded-2xl border border-[#E2E8F0] bg-slate-50 shadow-xs overflow-hidden aspect-[16/9] flex items-center justify-center group">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={shouldReduceMotion ? {
              enter: { opacity: 0 },
              center: { opacity: 1 },
              exit: { opacity: 0 },
            } : {
              enter: (dir: number) => ({
                x: dir > 0 ? '100%' : '-100%',
                opacity: 0.6,
              }),
              center: {
                x: '0%',
                opacity: 1,
              },
              exit: (dir: number) => ({
                x: dir > 0 ? '-100%' : '100%',
                opacity: 0.6,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.45,
              ease: EASE_OUT,
            }}
            className="w-full h-full absolute inset-0 flex items-center justify-center"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover block select-none"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Previous Navigation Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(-1);
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white text-[#15252B] hover:text-[#126B5B] shadow-md border border-[#E2E8F0] flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Next Navigation Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(1);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white text-[#15252B] hover:text-[#126B5B] shadow-md border border-[#E2E8F0] flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Pagination Indicators Beneath Image */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide
                ? 'w-5 bg-[#126B5B] shadow-2xs'
                : 'w-1.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            title={slide.title}
          />
        ))}
      </div>
    </div>
  );
};

export const StartupSection: React.FC = () => {
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState<QuoteServiceType>('E-commerce Service');

  const handleVisitClick = (e: React.MouseEvent) => {
    if (!EDUNOVA_STARTUP.websiteUrl) {
      e.preventDefault();
      setUrlModalOpen(true);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        const topOffset = 70;
        const elemPos = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
        window.scrollTo({ top: elemPos, behavior: 'smooth' });
      }
    }
  };

  const handleLearnMoreClick = () => {
    scrollToContact();
  };

  const handleExploreProjects = () => {
    if (EDUNOVA_STARTUP.websiteUrl) {
      window.open(EDUNOVA_STARTUP.websiteUrl, '_blank', 'noopener,noreferrer');
    } else {
      setUrlModalOpen(true);
    }
  };

  const handleCustomRequest = () => {
    scrollToContact();
  };

  const handleRequestQuote = (serviceTitle: QuoteServiceType) => {
    setSelectedQuoteService(serviceTitle);
    setQuoteModalOpen(true);
  };

  return (
    <ScrollSectionWrapper
      id="startup"
      className="pt-7 sm:pt-9 lg:pt-11 pb-10 sm:pb-12 lg:pb-14 relative bg-[#FAFAF7] border-t border-[#E5E9E6]"
    >
      <div className="max-w-[1640px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* ========================================================
            1. TOP SECTION HEADER & DESCRIPTION
           ======================================================== */}
        <div className="mb-3.5 sm:mb-4.5">
          {/* Small gold uppercase label with module code */}
          <div 
            className="flex items-center gap-2 font-mono-tech text-xs tracking-widest font-semibold mb-0.5 sm:mb-1"
            style={{ color: GOLD }}
          >
            <span>// 05</span>
            <span>&bull;</span>
            <span className="font-bold uppercase">FREELANCE DEVELOPMENT SERVICES</span>
          </div>

          {/* Heading with "Services" in teal green */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-[#15252B] leading-tight">
            Freelance Development <span style={{ color: TEAL }}>Services</span>
          </h2>

          {/* Short introduction beneath the heading */}
          <p className="text-xs sm:text-sm text-[#68757A] max-w-2xl leading-relaxed mt-0.5 sm:mt-1">
            Professional engineering and development consulting services empowering clients and students with custom hardware architectures, 
            full-stack implementations, and dedicated technical guidance.
          </p>
        </div>

        {/* ========================================================
            2. MAIN SHOWCASE CONTAINER (3 EQUAL SERVICE CARDS)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="rounded-3xl bg-gradient-to-br from-[#F5FAF8] via-[#FFFFFF] to-[#F7FAF9] border border-[#DCEBE5] p-3.5 sm:p-5 lg:p-6 xl:p-7 relative overflow-hidden"
          style={{
            boxShadow: '0 16px 36px -12px rgba(18, 107, 91, 0.06), 0 1px 3px rgba(0,0,0,0.04)'
          }}
        >
          {/* Subtle Ambient Brand Glow Accent */}
          <div 
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(18, 107, 91, 0.18) 0%, rgba(201, 149, 67, 0.10) 60%, transparent 75%)' }}
          />

          {/* ========================================================
              TOP BRANDING ROW: LOGO + FOUNDER BADGE + ACTION BUTTONS
             ======================================================== */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-3.5 sm:pb-5 relative z-10 border-b border-[#EAF2EE] lg:border-b-0">
            {/* Left: Preserved EduNova Forge Logo Container & Founder Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              {/* Preserved EduNova Forge Logo Container */}
              <div 
                className="rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#030712] border border-[#1E293B] shadow-sm shrink-0 inline-flex items-center justify-center overflow-hidden w-fit"
                title="EduNova Forge"
              >
                <img 
                  src={EDUNOVA_STARTUP.logoImage} 
                  alt="EduNova Forge Logo — Discover • Build • Bring Ideas to Life" 
                  className="h-[38px] sm:h-[42px] md:h-[45px] w-auto block select-none object-contain"
                />
              </div>

              {/* Preserved Founder & Developer Badge with Crown */}
              <span className="text-[11px] sm:text-xs font-mono-tech px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#FDF6EB] text-[#C99543] font-semibold border border-[#C99543]/20 shrink-0 shadow-2xs flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#C99543]" />
                <span>{EDUNOVA_STARTUP.role}</span>
              </span>
            </div>

            {/* Right: Visit EduNova Forge + Learn More Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start lg:self-center">
              {EDUNOVA_STARTUP.websiteUrl ? (
                <a
                  href={EDUNOVA_STARTUP.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#126B5B] text-white hover:bg-[#0D4E42] transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Visit EduNova Forge</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              ) : (
                <button
                  onClick={handleVisitClick}
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#126B5B] text-white hover:bg-[#0D4E42] transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer group"
                >
                  <span>Visit EduNova Forge</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}

              <a
                href={EDUNOVA_STARTUP.websiteUrl || 'https://edunova-forge.edunovaforge.workers.dev'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold text-[#15252B] hover:text-[#126B5B] transition-colors cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* ========================================================
              3 EQUAL SERVICE CARDS IN ONE ROW (APPROVED REFERENCE)
             ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5 xl:gap-5.5 items-stretch relative z-10 pt-1 sm:pt-2">
            
            {/* --------------------------------------------------------
                CARD 1: ENGINEERING PROJECTS
               -------------------------------------------------------- */}
            <div className="p-3.5 sm:p-4.5 xl:p-5 rounded-2xl bg-white border border-[#E5EBE8] shadow-2xs hover:border-[#126B5B]/30 hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                {/* Header: Number Badge, Title, Icon */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF8EB] border border-[#FDE6C8] flex items-center justify-center font-bold text-[#D97706] text-sm sm:text-base shrink-0 shadow-2xs font-display">
                      01
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] leading-tight">
                      Engineering Projects
                    </h3>
                  </div>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center shrink-0 text-[#126B5B] shadow-2xs">
                    <Settings className="w-5 h-5" />
                  </div>
                </div>

                {/* Professional Description */}
                <p className="text-[13px] sm:text-[13.5px] text-[#556368] leading-relaxed mb-3 min-h-[44px] sm:min-h-[48px]">
                  Get complete project support from mini projects to final year projects across Embedded Systems, IoT, AI/ML, Software, and Hardware. Explore ready-made projects or request a custom solution with documentation and guidance.
                </p>

                {/* 6 Features Arranged in 2 Columns (Above Carousel) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3.5 sm:mb-4">
                  {[
                    { label: 'Mini Projects', icon: Code2 },
                    { label: 'IoT & Sensors', icon: Wifi },
                    { label: 'Final Year Projects', icon: GraduationCap },
                    { label: 'AI / ML Projects', icon: Brain },
                    { label: 'Embedded Systems', icon: Cpu },
                    { label: 'Hardware & Robotics', icon: Wrench },
                  ].map((item) => (
                    <div 
                      key={item.label}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs min-h-[36px] sm:min-h-[38px]"
                    >
                      <item.icon className="w-3.5 h-3.5 text-[#126B5B] shrink-0" />
                      <span className="text-xs sm:text-[12px] font-medium text-[#1E293B] leading-snug">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dedicated Engineering Image Carousel (Below Features) */}
                <ServiceCardCarousel 
                  slides={ENGINEERING_SLIDES}
                  autoPlayInterval={5000}
                />
              </div>

              {/* Bottom: Price Strip + Two Actions SIDE BY SIDE */}
              <div className="mt-auto pt-1">
                {/* Dedicated Price Strip */}
                <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FFF9F2] to-[#FFF5EA] border border-[#FDE6D2] mb-2 sm:mb-2.5 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    <span className="text-xs font-semibold text-[#8C6D3B] uppercase tracking-wider font-mono-tech">
                      Starting Price
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#C2410C] font-mono-tech font-bold text-xs sm:text-[13px]">
                    <span className="text-[#9A3412] font-semibold text-xs">Starting at</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#EA580C]">{FREELANCE_PRICING.engineering.formattedPrice}</span>
                  </div>
                </div>

                {/* Two Actions SIDE BY SIDE in One Horizontal Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {/* Option 1: Buy Ready-Made Projects */}
                  <button
                    onClick={handleExploreProjects}
                    className="group flex items-center justify-between gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-[#FFF6EE] border border-[#FDE6D2] hover:border-[#EA580C] hover:bg-[#FDF0E2] transition-all text-left cursor-pointer shadow-2xs"
                    title="Buy Ready-Made Projects"
                    aria-label="Buy Ready-Made Projects"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#FEEADB] text-[#EA580C] flex items-center justify-center shrink-0 shadow-2xs">
                        <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] sm:text-xs font-bold text-[#15252B] leading-tight group-hover:text-[#EA580C] transition-colors whitespace-nowrap tracking-tight">
                          Buy Projects
                        </div>
                        <div className="text-[9.5px] sm:text-[10px] text-[#78716C] leading-tight whitespace-nowrap mt-0.5 tracking-tight truncate">
                          Explore catalog
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#334155] group-hover:text-[#EA580C] group-hover:translate-x-0.5 transition-all shrink-0 ml-0.5" />
                  </button>

                  {/* Option 2: Custom Project Request */}
                  <button
                    onClick={handleCustomRequest}
                    className="group flex items-center justify-between gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-[#FFF6EE] border border-[#FDE6D2] hover:border-[#EA580C] hover:bg-[#FDF0E2] transition-all text-left cursor-pointer shadow-2xs"
                    title="Custom Project Request"
                    aria-label="Custom Project Request"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#FEEADB] text-[#EA580C] flex items-center justify-center shrink-0 shadow-2xs">
                        <FileEdit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] sm:text-xs font-bold text-[#15252B] leading-tight group-hover:text-[#EA580C] transition-colors whitespace-nowrap tracking-tight">
                          Custom Request
                        </div>
                        <div className="text-[9.5px] sm:text-[10px] text-[#78716C] leading-tight whitespace-nowrap mt-0.5 tracking-tight truncate">
                          Custom inquiry
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#334155] group-hover:text-[#EA580C] group-hover:translate-x-0.5 transition-all shrink-0 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------
                CARD 2: E-COMMERCE SERVICE
               -------------------------------------------------------- */}
            <div className="p-3.5 sm:p-4.5 xl:p-5 rounded-2xl bg-white border border-[#E5EBE8] shadow-2xs hover:border-[#126B5B]/30 hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                {/* Header: Number Badge, Title, Icon */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF8EB] border border-[#FDE6C8] flex items-center justify-center font-bold text-[#D97706] text-sm sm:text-base shrink-0 shadow-2xs font-display">
                      02
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] leading-tight">
                      E-commerce Service
                    </h3>
                  </div>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center shrink-0 text-[#126B5B] shadow-2xs">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </div>

                {/* Professional Description */}
                <p className="text-[13px] sm:text-[13.5px] text-[#556368] leading-relaxed mb-3 min-h-[44px] sm:min-h-[48px]">
                  Launch a professional online store with responsive design, organized product catalogs, secure payment integration, and streamlined order management. Get a scalable e-commerce solution tailored to your business goals.
                </p>

                {/* 6 Features Arranged in 2 Columns (Above Carousel) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3.5 sm:mb-4">
                  {[
                    'Online Store Development',
                    'Product Catalog & Management',
                    'Payment Gateway Integration',
                    'Order & Inventory Management',
                    'Analytics & Reporting',
                    'Custom Design & Branding',
                  ].map((feat) => (
                    <div 
                      key={feat}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs min-h-[36px] sm:min-h-[38px]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#E59838] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-[12px] font-medium text-[#1E293B] leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dedicated E-commerce Image Carousel (Below Features) */}
                <ServiceCardCarousel 
                  slides={ECOMMERCE_SLIDES}
                  autoPlayInterval={5500}
                />
              </div>

              {/* Bottom: Price Strip + Request a Quote Button */}
              <div className="mt-auto pt-1">
                {/* Dedicated Price Strip */}
                <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FFF9F2] to-[#FFF5EA] border border-[#FDE6D2] mb-2 sm:mb-2.5 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    <span className="text-xs font-semibold text-[#8C6D3B] uppercase tracking-wider font-mono-tech">
                      Starting Price
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#C2410C] font-mono-tech font-bold text-xs sm:text-[13px]">
                    <span className="text-[#9A3412] font-semibold text-xs">Starting at</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#EA580C]">{FREELANCE_PRICING.ecommerce.formattedPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRequestQuote('E-commerce Service')}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#15252B] hover:border-[#126B5B] hover:text-[#126B5B] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* --------------------------------------------------------
                CARD 3: AUTOMATION SOLUTIONS
               -------------------------------------------------------- */}
            <div className="md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto md:w-full lg:max-w-none p-3.5 sm:p-4.5 xl:p-5 rounded-2xl bg-white border border-[#E5EBE8] shadow-2xs hover:border-[#126B5B]/30 hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                {/* Header: Number Badge, Title, Icon */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF8EB] border border-[#FDE6C8] flex items-center justify-center font-bold text-[#D97706] text-sm sm:text-base shrink-0 shadow-2xs font-display">
                      03
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] leading-tight">
                      Automation Solutions
                    </h3>
                  </div>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FEF3EB] flex items-center justify-center shrink-0 shadow-2xs">
                    {/* Distinctive Dual Gears Icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9.5 2.5a1.2 1.2 0 0 1 1.1.8l.3.9a5.5 5.5 0 0 1 1.6.7l.9-.4a1.2 1.2 0 0 1 1.4.3l.9.9a1.2 1.2 0 0 1 .3 1.4l-.4.9c.3.5.5 1.1.7 1.6l.9.3a1.2 1.2 0 0 1 .8 1.1v1.3a1.2 1.2 0 0 1-.8 1.1l-.9.3a5.5 5.5 0 0 1-.7 1.6l.4.9a1.2 1.2 0 0 1-.3 1.4l-.9.9a1.2 1.2 0 0 1-1.4.3l-.9-.4a5.5 5.5 0 0 1-1.6.7l-.3.9a1.2 1.2 0 0 1-1.1.8H8.2a1.2 1.2 0 0 1-1.1-.8l-.3-.9a5.5 5.5 0 0 1-1.6-.7l-.9.4a1.2 1.2 0 0 1-1.4-.3l-.9-.9a1.2 1.2 0 0 1-.3-1.4l.4-.9a5.5 5.5 0 0 1-.7-1.6l-.9-.3A1.2 1.2 0 0 1 0 11.8v-1.3a1.2 1.2 0 0 1 .8-1.1l.9-.3a5.5 5.5 0 0 1 .7-1.6l-.4-.9a1.2 1.2 0 0 1 .3-1.4l.9-.9a1.2 1.2 0 0 1 1.4-.3l.9.4c.5-.3 1.1-.5 1.6-.7l.3-.9a1.2 1.2 0 0 1 1.1-.8h1.3z"
                        stroke="#EA580C"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <circle cx="8.8" cy="11.2" r="2.2" stroke="#EA580C" strokeWidth="1.6" />
                      <path
                        d="M17.5 12a.8.8 0 0 1 .7.5l.2.6c.3.1.6.3.9.5l.6-.3a.8.8 0 0 1 .9.2l.6.6a.8.8 0 0 1 .2.9l-.3.6c.2.3.4.6.5.9l.6.2a.8.8 0 0 1 .5.7v.9a.8.8 0 0 1-.5.7l-.6.2c-.1.3-.3.6-.5.9l.3.6a.8.8 0 0 1-.2.9l-.6.6a.8.8 0 0 1-.9.2l-.6-.3c-.3.2-.6.4-.9.5l-.2.6a.8.8 0 0 1-.7.5h-.9a.8.8 0 0 1-.7-.5l-.2-.6c-.3-.1-.6-.3-.9-.5l-.6.3a.8.8 0 0 1-.9-.2l-.6-.6a.8.8 0 0 1-.2-.9l.3-.6c-.2-.3-.4-.6-.5-.9l-.6-.2a.8.8 0 0 1-.5-.7v-.9a.8.8 0 0 1 .5-.7l.6-.2c.1-.3.3-.6.5-.9l-.3-.6a.8.8 0 0 1 .2-.9l.6-.6a.8.8 0 0 1 .9-.2l.6.3c.3-.2.6-.4.9-.5l.2-.6a.8.8 0 0 1 .7-.5h.9z"
                        stroke="#EA580C"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle cx="17.1" cy="16.5" r="1.5" stroke="#EA580C" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                {/* Professional Description */}
                <p className="text-[13px] sm:text-[13.5px] text-[#556368] leading-relaxed mb-3 min-h-[44px] sm:min-h-[48px]">
                  Reduce repetitive work and improve operational efficiency with intelligent workflow automation, IoT monitoring systems, real-time dashboards, custom hardware integrations, and social media post automation with a post publisher.
                </p>

                {/* 6 Features Arranged in 2 Columns (Above Carousel) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3.5 sm:mb-4">
                  {[
                    'Workflow Automation',
                    'IoT Monitoring Systems',
                    'Dashboards & Analytics',
                    'API Integrations',
                    'Cloud & Data Solutions',
                    'Custom Hardware Integration',
                  ].map((feat) => (
                    <div 
                      key={feat}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs min-h-[36px] sm:min-h-[38px]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#126B5B] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-[12px] font-medium text-[#1E293B] leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dedicated Automation Image Carousel (Below Features) */}
                <ServiceCardCarousel 
                  slides={AUTOMATION_SLIDES}
                  autoPlayInterval={6000}
                />
              </div>

              {/* Bottom: Price Strip + Request a Quote Button */}
              <div className="mt-auto pt-1">
                {/* Dedicated Price Strip */}
                <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FFF9F2] to-[#FFF5EA] border border-[#FDE6D2] mb-2 sm:mb-2.5 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    <span className="text-xs font-semibold text-[#8C6D3B] uppercase tracking-wider font-mono-tech">
                      Starting Price
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#C2410C] font-mono-tech font-bold text-xs sm:text-[13px]">
                    <span className="text-[#9A3412] font-semibold text-xs">Starting at</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#EA580C]">{FREELANCE_PRICING.automation.formattedPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRequestQuote('Automation Solutions')}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#15252B] hover:border-[#126B5B] hover:text-[#126B5B] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </motion.div>

      </div>

      {/* ========================================================
          MODAL: WEBSITE URL CONFIGURATION / FOUNDER CONTACT
         ======================================================== */}
      <AnimatePresence>
        {urlModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUrlModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 card-shadow border border-[#E5E9E6] z-10 space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F4F0] text-[#126B5B] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <button
                  onClick={() => setUrlModalOpen(false)}
                  className="p-1 rounded-full text-[#68757A] hover:text-[#15252B] hover:bg-[#FAFAF7] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#FDF6EB] text-[#C99543] font-bold border border-[#C99543]/20">
                  LIVE URL CONFIGURATION
                </span>
                <h3 className="font-display font-bold text-xl text-[#15252B]">
                  Connect with EduNova Forge
                </h3>
                <p className="text-xs sm:text-sm text-[#68757A] leading-relaxed">
                  The live URL for EduNova Forge is currently being configured. 
                  In the meantime, you can reach out directly to the Founder for project resources or custom development support.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#15252B] font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 text-[#126B5B]" />
                  <span>Founder Contact:</span>
                </div>
                <p className="text-xs font-mono text-[#68757A] select-all">
                  somashekharjavooru@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    setUrlModalOpen(false);
                    handleLearnMoreClick();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#126B5B] text-white text-xs font-bold text-center hover:bg-[#0D4E42] transition-colors shadow-xs cursor-pointer"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setUrlModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-white border border-[#E5E9E6] text-[#15252B] text-xs font-semibold hover:bg-[#FAFAF7] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MODAL: REQUEST A QUOTE POPUP
         ======================================================== */}
      <RequestQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedQuoteService}
      />

    </ScrollSectionWrapper>
  );
};
