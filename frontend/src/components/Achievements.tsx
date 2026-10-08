import React from 'react';
import { Trophy, Award, ExternalLink } from 'lucide-react';
import type { PortfolioItem } from '../types';

interface AchievementsProps {
  items: PortfolioItem[];
}

export const Achievements: React.FC<AchievementsProps> = ({ items }) => {
  const achievementItems = items
    .filter((item) => item.type === 'achievement')
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  if (achievementItems.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <span>Honors & Hackathons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Achievements & Awards
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Recognition earned through competitive hackathons, innovation challenges, and agent arenas.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievementItems.map((item) => (
            <div
              key={item._id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-xs group-hover:scale-105 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>

                  {item.organization && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                      {item.organization}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                    {item.description}
                  </p>
                )}

                {/* Details list */}
                {item.details && item.details.length > 0 && (
                  <ul className="space-y-1.5 mb-5">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <Award className="w-3.5 h-3.5 text-amber-500 mt-1 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Technologies & Certificate */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                {item.technologies && item.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div />
                )}

                {item.certificateUrl && item.certificateUrl.trim().length > 0 && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
