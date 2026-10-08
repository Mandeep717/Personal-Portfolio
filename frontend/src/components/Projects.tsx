import React from 'react';
import { ExternalLink, Sparkles, FolderGit2, Bot } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { PortfolioItem } from '../types';

interface ProjectsProps {
  items: PortfolioItem[];
  onAskAboutProject?: (projectTitle: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ items, onAskAboutProject }) => {
  const projectItems = items
    .filter((item) => item.type === 'project')
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <span>Portfolio Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Production-grade systems, AI assistants, and automated intelligence engines built to solve real-world problems.
          </p>
        </div>

        {/* Empty State */}
        {projectItems.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <FolderGit2 className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <p className="text-slate-600 dark:text-slate-400 font-medium">Projects will be added soon.</p>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectItems.map((project) => {
              const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
              const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);

              return (
                <div
                  key={project._id}
                  className={`flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/80 border transition-all duration-300 p-6 sm:p-8 relative group ${
                    project.featured
                      ? 'border-indigo-500/50 shadow-md shadow-indigo-500/5 dark:border-indigo-500/40'
                      : 'border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Top Bar: Organization & Featured Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {project.organization ? (
                        <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-cyan-400">
                          {project.organization}
                        </span>
                      ) : (
                        <span />
                      )}

                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Detailed Highlights */}
                    {project.details && project.details.length > 0 && (
                      <div className="mb-6 space-y-2">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Key Capabilities:
                        </span>
                        <ul className="space-y-1.5">
                          {project.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Technologies & Actions */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80">
                    {/* Technologies Tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-3">
                        {hasGithub && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        )}

                        {hasLive && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>

                      {/* Ask AI Context Shortcut */}
                      {onAskAboutProject && (
                        <button
                          onClick={() => onAskAboutProject(project.title)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                          title="Ask the AI chatbot for more details on this project"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Ask AI about this</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
