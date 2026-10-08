import React from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
import type { CodingProfile } from '../types';

interface CodingProfilesProps {
  profiles?: CodingProfile[];
}

export const CodingProfiles: React.FC<CodingProfilesProps> = ({ profiles = [] }) => {
  if (!profiles || profiles.length === 0) {
    return null;
  }

  const getPlatformDetails = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('leetcode')) {
      return {
        badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        brandAccent: 'hover:border-amber-500/40',
        desc: 'Algorithmic problem solving & data structures',
      };
    }
    if (lower.includes('codechef')) {
      return {
        badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-700/10 border-amber-700/20',
        brandAccent: 'hover:border-amber-600/40',
        desc: 'Competitive programming & rated contests',
      };
    }
    if (lower.includes('codeforces')) {
      return {
        badgeColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        brandAccent: 'hover:border-blue-500/40',
        desc: 'Speed, accuracy & complex algorithmic rounds',
      };
    }
    return {
      badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      brandAccent: 'hover:border-indigo-500/40',
      desc: 'Coding & challenge platform',
    };
  };

  return (
    <section id="coding-profiles" className="py-20 lg:py-28 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <span>Competitive Programming</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Coding Profiles
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Continuous practice, algorithmic challenges, and competitive problem solving across global platforms.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map((profile) => {
            const styling = getPlatformDetails(profile.platform);

            return (
              <a
                key={profile._id || profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-xs ${styling.brandAccent} hover:shadow-lg transition-all duration-300 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform">
                      <Terminal className="w-6 h-6 text-indigo-500" />
                    </div>

                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${styling.badgeColor}`}>
                      {profile.platform}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {profile.platform}
                  </h3>

                  {profile.username && (
                    <div className="font-mono text-sm text-slate-500 dark:text-slate-400 mb-3">
                      @{profile.username}
                    </div>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {styling.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  <span>View Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
