import React from 'react';
import {
  Code2,
  Brain,
  Sparkles,
  Server,
  Database,
  Wrench,
  Cpu,
  Layers,
} from 'lucide-react';
import type { SkillCategory } from '../types';

interface SkillsProps {
  skills?: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills = [] }) => {
  // Helper to map dynamic category names to relevant contextual icons
  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('language')) return Code2;
    if (lower.includes('generative') || lower.includes('llm')) return Sparkles;
    if (lower.includes('machine learning') || lower.includes('ai')) return Brain;
    if (lower.includes('backend') || lower.includes('api')) return Server;
    if (lower.includes('database') || lower.includes('data')) return Database;
    if (lower.includes('tool') || lower.includes('dev')) return Wrench;
    if (lower.includes('core') || lower.includes('computer science')) return Cpu;
    return Layers;
  };

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A comprehensive overview of programming languages, AI/ML frameworks, developer tools, and foundational computer science principles.
          </p>
        </div>

        {/* Dynamic Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => {
            const Icon = getCategoryIcon(skillGroup.category);
            return (
              <div
                key={skillGroup._id || `${skillGroup.category}-${index}`}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {skillGroup.category}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {skillGroup.items?.length || 0} skills
                    </span>
                  </div>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items?.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300 dark:hover:border-indigo-800 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
