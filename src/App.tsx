import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { ResumeSection } from './sections/ResumeSection';
import { ContactSection } from './sections/ContactSection';
import { ResumeModal } from './components/modals/ResumeModal';

export const App: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeType, setResumeType] = useState<'embedded' | 'software'>('embedded');

  const handleOpenResume = (type: 'embedded' | 'software') => {
    setResumeType(type);
    setResumeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive 3D Semiconductor Core */}
        <HeroSection onOpenResumeModal={handleOpenResume} />

        {/* 2. About Me: Engineering Philosophy & Academic Grounding */}
        <AboutSection />

        {/* 3. Core Technical Skills Matrix */}
        <SkillsSection />

        {/* 4. Featured Embedded Projects, IoT Systems & Applications */}
        <ProjectsSection />

        {/* 5. Field Experience & Internship Timeline */}
        <ExperienceSection />

        {/* 6. Education, Certifications & Achievements */}
        <EducationSection />

        {/* 7. Dual Resume Downloads */}
        <ResumeSection onOpenResumeModal={handleOpenResume} />

        {/* 8. Recruiter Dispatch & Contact */}
        <ContactSection />
      </main>

      {/* Comprehensive Engineering Footer */}
      <Footer />

      {/* Quick Resume Inspection & Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        initialType={resumeType}
      />
    </div>
  );
};

export default App;
