import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { FloatingScrollHUD } from './components/common/FloatingScrollHUD';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { StartupSection } from './sections/StartupSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { ResumeSection } from './sections/ResumeSection';
import { ContactSection } from './sections/ContactSection';
import { ResumeModal } from './components/modals/ResumeModal';

export const App: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeType, setResumeType] = useState<'embedded' | 'software'>('embedded');

  useEffect(() => {
    // Initialize Lenis smooth inertial scrolling physics
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  const handleOpenResume = (type: 'embedded' | 'software') => {
    setResumeType(type);
    setResumeModalOpen(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans bg-[#FAFAF7] text-[#15252B]"
      style={{
        backgroundColor: '#FAFAF7',
        color: '#15252B',
        // Refined teal selection highlight
        '--tw-selection-bg': 'rgba(18,107,91,0.15)',
        '--tw-selection-color': '#15252B',
      } as React.CSSProperties}
    >
      {/* Cinematic scroll progress indicator */}
      <ScrollProgressBar />

      {/* Floating Tactical Telemetry HUD Rail */}
      <FloatingScrollHUD />

      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 relative">
        {/* Sticky Pinned Hero Chamber — Stays fixed at viewport top while card deck slides over */}
        <div className="sticky top-0 z-0 h-screen min-h-screen w-full overflow-hidden">
          <HeroSection onOpenResumeModal={handleOpenResume} />
        </div>

        {/* Card Deck Layer — Physically slides UP and OVER the Hero chamber like a card opening */}
        <div className="relative z-10 bg-[#FAFAF7]">
          {/* 2. About — Engineering Philosophy & Academic Grounding */}
          <AboutSection />

          {/* 3. Skills — Core Technical Competency Matrix */}
          <SkillsSection />

          {/* 4. Projects — Embedded Systems & Application Case Studies */}
          <ProjectsSection />

          {/* 5. Freelance Development Services — EduNova Venture */}
          <StartupSection />

          {/* 6. Experience — Field Internship Timeline */}
          <ExperienceSection />

          {/* 6. Education — Credentials & Achievements */}
          <EducationSection />

          {/* 7. Resume — Dual Role-Tailored Downloads */}
          <ResumeSection onOpenResumeModal={handleOpenResume} />

          {/* 8. Contact — Recruiter Dispatch */}
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        initialType={resumeType}
      />
    </div>
  );
};

export default App;
