import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, Layers, AlertCircle, Wrench } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';
import type { Project } from '../../types';
import { TechBadge } from '../common/TechBadge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#090f1d] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-tech bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                {project.categoryLabel}
              </span>
              {project.isPrimaryEmbedded && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-tech bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  CORE EMBEDDED
                </span>
              )}
              {project.isForked && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-tech bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  FORK NOTE
                </span>
              )}
            </div>
            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mt-1">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="mt-6 space-y-8">
          {/* Fork Notice if applicable */}
          {project.isForked && project.forkNote && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-sm text-amber-200">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-amber-300">Repository Ownership & Contribution:</strong>
                <p className="text-amber-200/90 mt-0.5">{project.forkNote}</p>
              </div>
            </div>
          )}

          {/* Problem Statement & Implementation Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#0c1426] border border-slate-800/80">
              <h4 className="font-mono-tech text-xs uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                The Engineering Problem
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0c1426] border border-slate-800/80">
              <h4 className="font-mono-tech text-xs uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Implementation Approach
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.implementationSummary}
              </p>
            </div>
          </div>

          {/* Key Metrics if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-wider text-slate-400 mb-3">
                Key Performance & Hardware Benchmarks
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#070d18] border border-cyan-500/20">
                    <div className="text-xs text-slate-400">{metric.label}</div>
                    <div className="text-lg font-bold font-mono-tech text-cyan-300 mt-0.5">
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
              <h4 className="font-mono-tech text-xs uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Technical Architecture Layers
              </h4>
              <div className="space-y-3">
                {project.architectureDiagram.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0b1324] border border-slate-800 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono-tech text-xs font-bold text-cyan-300 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-[10px] text-cyan-400">
                          {idx + 1}
                        </span>
                        {layer.layer}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {layer.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700/60 font-mono-tech"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 pl-7">{layer.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hardware Specs & Protocols */}
          {(project.hardwareSpecs || project.protocols) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.hardwareSpecs && (
                <div className="p-4 rounded-xl bg-[#0c1426] border border-slate-800">
                  <h5 className="font-mono-tech text-xs uppercase text-slate-300 mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Hardware Components
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {project.hardwareSpecs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.protocols && (
                <div className="p-4 rounded-xl bg-[#0c1426] border border-slate-800">
                  <h5 className="font-mono-tech text-xs uppercase text-slate-300 mb-2 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                    Buses & Protocols
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {project.protocols.map((proto, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <span className="text-indigo-400 mt-0.5">•</span>
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
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-slate-300 mb-3">
              Verified Engineering Deliverables
            </h4>
            <div className="space-y-2">
              {project.verifiedDetails.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-slate-400 mb-2.5">
              Technologies & Tooling
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <TechBadge key={idx} label={tech} variant="cyan" />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono-tech text-slate-400">
            GITHUB_REPO :: verified public source
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
            >
              Close
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-cyan-500/20"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Code Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
