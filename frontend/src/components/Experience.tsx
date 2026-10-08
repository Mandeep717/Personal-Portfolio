import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import type { PortfolioItem } from '../types';
import { formatDateRange } from '../utils/date';

interface ExperienceProps {
  items: PortfolioItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ items }) => {
  const experienceItems = items
    .filter((item) => item.type === 'experience')
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  // Only render if experience items exist; otherwise hide completely!
  if (experienceItems.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Professional roles, internships, and engineering contributions.
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-8">
          {experienceItems.map((item) => {
            const dateStr = formatDateRange(item.startDate, item.endDate);

            return (
              <div
                key={item._id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    <span>{item.title}</span>
                  </h3>

                  {dateStr && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{dateStr}</span>
                    </div>
                  )}
                </div>

                {item.organization && (
                  <div className="text-sm font-semibold text-indigo-600 dark:text-cyan-400 mb-4 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.organization}</span>
                  </div>
                )}

                {item.description && (
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {item.details && item.details.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
