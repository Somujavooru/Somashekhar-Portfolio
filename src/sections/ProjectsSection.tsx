import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROJECTS } from '../data/projects';
import { TechBadge } from '../components/common/TechBadge';
import { GithubIcon } from '../components/common/SocialIcons';
import { ProjectIllustration } from '../components/common/ProjectIllustrations';
import { ProjectModal } from '../components/modals/ProjectModal';
import type { Project, ProjectCategory } from '../types';
import { Layers, ArrowUpRight, CheckCircle, Image as ImageIcon, GitFork, Cpu } from 'lucide-react';

type FilterType = 'all' | ProjectCategory;

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'embedded', label: 'Embedded & Firmware' },
  { id: 'iot', label: 'IoT Systems' },
  { id: 'software-ai', label: 'Software & AI' },
  { id: 'android-web', label: 'Android & Web' },
];

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter logic ensuring that multi-discipline projects match appropriately
  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'embedded') {
      return proj.category === 'embedded';
    }
    if (activeFilter === 'iot') {
      return proj.category === 'iot' || proj.id === 'solar-agri-robot' || proj.id === 'lpg-gas-leakage-system' || proj.id === 'esp32-ota-system';
    }
    if (activeFilter === 'software-ai') {
      return proj.category === 'software-ai' || proj.id === 'farmer-assistant-ai';
    }
    if (activeFilter === 'android-web') {
      return proj.category === 'android-web';
    }
    return proj.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 relative bg-[#070b14] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 03 // VERIFIED IMPLEMENTATIONS"
          title="Engineering Case Studies &"
          highlightText="Hardware Systems"
          description="Verified open-source repositories, physical hardware builds, and edge telemetry applications. Priority emphasis on embedded firmware and IoT architectures."
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            const count = PROJECTS.filter((p) => {
              if (filter.id === 'all') return true;
              if (filter.id === 'embedded') return p.category === 'embedded';
              if (filter.id === 'iot') return p.category === 'iot' || p.id === 'solar-agri-robot' || p.id === 'lpg-gas-leakage-system' || p.id === 'esp32-ota-system';
              if (filter.id === 'software-ai') return p.category === 'software-ai' || p.id === 'farmer-assistant-ai';
              if (filter.id === 'android-web') return p.category === 'android-web';
              return p.category === filter.id;
            }).length;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                    : 'bg-[#0b1324] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 ${
                  project.isPrimaryEmbedded
                    ? 'bg-gradient-to-b from-[#0b1428] to-[#070d1a] border-cyan-500/30 hover:border-cyan-400/60'
                    : 'bg-[#090f1e] border-slate-800/80 hover:border-sky-500/40'
                }`}
              >
                {/* Visual Header: Verified Image or Technical CAD Blueprint */}
                <div className="relative overflow-hidden bg-[#050810]">
                  {project.hasVerifiedScreenshot && project.image ? (
                    <div className="w-full h-52 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={project.image}
                        alt={project.imageAlt || project.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090f1e] via-transparent to-transparent opacity-80" />
                    </div>
                  ) : (
                    <div>
                      <ProjectIllustration projectId={project.id} />
                    </div>
                  )}

                  {/* Top Overlay Badge Bar - Flex container with wrap prevents collisions */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
                    {project.hasVerifiedScreenshot && project.image ? (
                      <div className="px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-mono-tech text-[10px] flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                        <ImageIcon className="w-3 h-3 text-emerald-400" />
                        <span>VERIFIED HARDWARE PHOTO</span>
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-mono-tech text-[10px] flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                        <Layers className="w-3 h-3 text-cyan-400" />
                        <span>SCHEMATIC BLUEPRINT</span>
                      </div>
                    )}

                    {project.isForked && (
                      <div className="px-2 py-0.5 rounded-md bg-amber-950/90 border border-amber-500/40 text-amber-300 font-mono-tech text-[10px] flex items-center gap-1 backdrop-blur-md shrink-0 shadow-sm">
                        <GitFork className="w-3 h-3 text-amber-400" />
                        <span>CUSTOM FORK</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label & Hardware Flag */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-wider">
                        {project.categoryLabel}
                      </span>
                      {project.isPrimaryEmbedded && (
                        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold flex items-center gap-1">
                          <Cpu className="w-3 h-3" />
                          <span>PRIMARY EMBEDDED</span>
                        </span>
                      )}
                    </div>

                    {/* Full Title (2 Lines allowed without cutoff) */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 min-h-[3.5rem] leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono-tech mt-1 mb-3 line-clamp-1">
                      {project.subtitle}
                    </p>

                    {/* Problem Statement */}
                    <p className="text-sm text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                      {project.problemStatement}
                    </p>

                    {/* Verified Implementation Summary */}
                    <div className="p-3 rounded-xl bg-[#060b16] border border-slate-800/80 mb-4">
                      <div className="text-[10px] font-mono-tech text-cyan-400 uppercase mb-1 flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3 h-3 text-cyan-400" />
                        <span>Verified Implementation</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {project.implementationSummary}
                      </p>
                    </div>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <TechBadge key={idx} label={tech} size="sm" variant={project.isPrimaryEmbedded ? 'cyan' : 'slate'} />
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono-tech self-center">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-cyan-400 hover:text-cyan-300 transition-colors py-1.5 font-bold tracking-wider"
                    >
                      <span>INSPECT_ARCHITECTURE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                      aria-label={`View ${project.title} GitHub repository`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for In-depth Architecture and Specs */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
