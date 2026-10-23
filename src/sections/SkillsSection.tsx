import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SKILL_GROUPS } from '../data/skills';
import { Cpu, Terminal, Wifi, Code2, Smartphone, Check, Layers } from 'lucide-react';
import type { SkillCategory } from '../types';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory | 'all'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-sky-400" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-indigo-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  const displayedGroups = activeTab === 'all'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter(g => g.id === activeTab);

  return (
    <section id="skills" className="py-24 relative bg-[#06090f] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 02 // TECHNICAL MATRIX"
          title="Verified Engineering"
          highlightText="Competency Matrix"
          description="Disciplined taxonomy of hardware-software integration, low-level firmware engineering, Linux environments, and connected telemetry systems."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono-tech transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20 font-bold'
                : 'bg-[#0a1020] text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            ALL CAPABILITIES ({SKILL_GROUPS.length})
          </button>

          {SKILL_GROUPS.map((group) => {
            const isActive = activeTab === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20 font-bold'
                    : 'bg-[#0a1020] text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{group.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGroups.map((group) => {
            const isFirmware = group.id === 'firmware';
            return (
              <div
                key={group.id}
                className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isFirmware
                    ? 'bg-gradient-to-b from-[#0c1832] to-[#070e1c] border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/10 md:col-span-2 lg:col-span-1'
                    : 'bg-[#090f1d] border border-slate-800/80 hover:border-cyan-500/30'
                }`}
              >
                <div>
                  {/* Group Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-[#0e1b34] border border-cyan-500/20">
                        {getIcon(group.iconName)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-tight">
                          {group.title}
                        </h3>
                        {isFirmware && (
                          <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-widest">
                            Primary Focus Area
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Skills List with Standards / Application */}
                  <div className="space-y-2.5 mb-6">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-lg bg-[#060b16] border border-slate-800/80 hover:border-cyan-500/20 transition-colors flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="font-medium text-slate-200 truncate">
                            {skill.name}
                          </span>
                        </div>
                        {skill.hardwareOrStandard && (
                          <span className="font-mono-tech text-[10px] text-slate-400 shrink-0 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {skill.hardwareOrStandard}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Protocols & Standards Bar */}
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider block mb-2">
                    Core Standards & Interfaces
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.protocolsOrTools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/25 font-mono-tech"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification & Transparency Banner */}
        <div className="mt-12 p-4 rounded-xl bg-[#091122] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-400">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>ACCURACY COMMITMENT: No fabricated percentages or unverified claims.</span>
          </div>
          <div className="text-slate-500">
            Embedded engineering remains the primary discipline; applications serve as supporting implementations.
          </div>
        </div>
      </div>
    </section>
  );
};
