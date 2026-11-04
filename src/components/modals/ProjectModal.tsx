import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, Layers, AlertCircle, Wrench, Globe } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';
import type { Project } from '../../types';
import { TechBadge } from '../common/TechBadge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent background scroll and stop Lenis inertial scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      data-lenis-prevent="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-white border border-[#E5E9E6] rounded-2xl shadow-2xl overflow-hidden text-[#15252B]"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Stationary Modal Header (Pinned - never moves when content scrolls) */}
        <div className="flex items-start justify-between p-6 sm:p-8 pb-5 border-b border-[#E5E9E6] bg-white gap-4 shrink-0 z-20">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#E8F4F0] border border-[#126B5B]/20 text-[#126B5B] font-medium">
                {project.categoryLabel}
              </span>
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
                  title="Visit hosted live application"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE APP ONLINE</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
              {project.isPrimaryEmbedded && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#FDF6EB] border border-[#C99543]/30 text-[#C99543] font-medium">
                  CORE EMBEDDED
                </span>
              )}
              {project.isForked && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                  FORK NOTE
                </span>
              )}
            </div>
            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-bold font-display text-[#15252B]">
              {project.title}
            </h3>
            <p className="text-[#68757A] text-sm mt-1">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#FAFAF7] hover:bg-[#F0F2F0] border border-[#E5E9E6] text-[#68757A] hover:text-[#15252B] transition-colors shrink-0"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 pt-6 space-y-8" data-lenis-prevent="true">
          {/* Fork Notice if applicable */}
          {project.isForked && project.forkNote && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-sm text-[#15252B]">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-amber-800">Repository Ownership & Contribution:</strong>
                <p className="text-[#404D53] mt-0.5">{project.forkNote}</p>
              </div>
            </div>
          )}

          {/* Problem Statement & Implementation Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#126B5B] mb-2 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#126B5B]" />
                The Engineering Problem
              </h4>
              <p className="text-[#475569] text-sm sm:text-[14.5px] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#C99543] mb-2 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99543]" />
                Implementation Approach
              </h4>
              <p className="text-[#475569] text-sm sm:text-[14.5px] leading-relaxed">
                {project.implementationSummary}
              </p>
            </div>
          </div>

          {/* Key Metrics if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#556368] mb-3 font-bold">
                Key Performance & Hardware Benchmarks
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#FAFAF7] border border-[#E5E9E6]">
                    <div className="text-xs sm:text-[12.5px] text-[#556368]">{metric.label}</div>
                    <div className="text-lg font-bold font-mono text-[#126B5B] mt-0.5">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Breakdown Layers */}
          {project.architectureDiagram && project.architectureDiagram.length > 0 && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#15252B] mb-3 flex items-center gap-2 font-bold">
                <Layers className="w-4 h-4 text-[#126B5B]" />
                Technical Architecture Layers
              </h4>
              <div className="space-y-3">
                {project.architectureDiagram.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6] hover:border-[#126B5B]/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#15252B] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#E8F4F0] border border-[#126B5B]/30 flex items-center justify-center text-[10.5px] text-[#126B5B] font-bold">
                          {idx + 1}
                        </span>
                        {layer.layer}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {layer.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-2 py-0.5 rounded bg-white text-[#556368] border border-[#E5E9E6] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm sm:text-[14px] text-[#475569] pl-7 leading-relaxed">{layer.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hardware Specs & Protocols */}
          {(project.hardwareSpecs || project.protocols) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.hardwareSpecs && (
                <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6]">
                  <h5 className="font-mono text-xs uppercase text-[#15252B] mb-2 flex items-center gap-1.5 font-bold">
                    <Cpu className="w-3.5 h-3.5 text-[#C99543]" />
                    Hardware Components
                  </h5>
                  <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#475569]">
                    {project.hardwareSpecs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-[#C99543] mt-0.5">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.protocols && (
                <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6]">
                  <h5 className="font-mono text-xs uppercase text-[#15252B] mb-2 flex items-center gap-1.5 font-bold">
                    <Wrench className="w-3.5 h-3.5 text-[#126B5B]" />
                    Buses & Protocols
                  </h5>
                  <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#475569]">
                    {project.protocols.map((proto, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <span className="text-[#126B5B] mt-0.5">•</span>
                        <span>{proto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Verified Engineering Deliverables Checklist */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#15252B] mb-3 font-bold">
              Verified Engineering Deliverables
            </h4>
            <div className="space-y-2">
              {project.verifiedDetails.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-sm sm:text-[14.5px] text-[#475569] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#126B5B] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#556368] mb-2.5 font-bold">
              Technologies & Tooling
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <TechBadge key={idx} label={tech} variant="teal" />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar (Pinned cleanly at bottom with generous padding & matching aesthetic) */}
        <div className="px-6 sm:px-8 py-4 sm:py-4.5 bg-[#FAFAF7] border-t border-[#E5E9E6] flex flex-wrap items-center justify-between gap-3 shrink-0 z-20 rounded-b-2xl">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#556368]">
            <span
              className={`w-2 h-2 rounded-full ${
                project.liveDemoUrl ? 'bg-emerald-500 animate-pulse' : 'bg-[#126B5B] animate-pulse'
              }`}
            />
            <span className="font-semibold uppercase tracking-wider text-xs text-[#15252B]">
              {project.liveDemoUrl ? 'LIVE PRODUCTION APP' : 'OPEN SOURCE REPO'}
            </span>
            <span className="text-[#8E999E]">|</span>
            <span className="text-xs text-[#556368]">
              {project.liveDemoUrl ? 'Interactive Hosted Web Service' : 'Verified Implementation'}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-[#F0F2F0] border border-[#E5E9E6] hover:border-[#15252B] text-[#15252B] text-xs sm:text-[13px] font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              Close
            </button>

            {project.liveDemoUrl ? (
              <>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-[#F0F2F0] border border-[#E5E9E6] hover:border-[#15252B] text-[#15252B] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Code</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#68757A]" />
                </a>

                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#126B5B] hover:bg-[#0E5548] text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md transition-all group"
                >
                  <Globe className="w-4 h-4 text-emerald-300" />
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#126B5B] hover:bg-[#0E5548] text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Inspect Code Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
