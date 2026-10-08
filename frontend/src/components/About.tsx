import React from 'react';
import {
  HeartHandshake,
  Compass,
  Trophy,
  Gamepad2,
  BookOpen,
  Film,
  Flame,
  Brain,
} from 'lucide-react';
import type { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

const personalInterests = [
  {
    name: 'Cricket',
    icon: Trophy,
    desc: 'Strategy & Sportsmanship',
  },
  {
    name: 'Football',
    icon: Flame,
    desc: 'Pace & High Energy',
  },
  {
    name: 'Formula 1',
    icon: Compass,
    desc: 'Engineering & Precision',
  },
  {
    name: 'Reading Novels',
    icon: BookOpen,
    desc: 'Curiosity & Storytelling',
  },
  {
    name: 'Watching Movies',
    icon: Film,
    desc: 'Narratives & Cinematography',
  },
];

export const About: React.FC<AboutProps> = ({ profile }) => {
  const paragraphs = (profile.bio || '')
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  /*
   * Derive the technical focus from the actual profile skills
   * instead of maintaining a separate hard-coded technical list.
   */
  const technicalFocus = profile.skills
    ?.filter((category) =>
      [
        'AI & Machine Learning',
        'Generative AI',
      ].includes(category.category)
    )
    .flatMap((category) => category.items)
    .slice(0, 8) || [];

  return (
    <section
      id="about"
      className="py-20 lg:py-28 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <span>Get To Know Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            About Me
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Learning through hands-on projects, collaboration,
            experimentation, and continuous growth.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Bio */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Supporting information */}
          <div className="lg:col-span-5 space-y-6">

            {/* Values */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-slate-900/40 dark:bg-slate-900/60 border border-indigo-200/60 dark:border-slate-800 backdrop-blur-xs">

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <HeartHandshake className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Values & Collaboration
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                I value teamwork, communication, mutual respect,
                and taking responsibility while working toward
                shared goals.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  'Team Player',
                  'Leadership',
                  'Mutual Respect',
                  'Communication',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Focus */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Technical Focus
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                My current interests focus on machine learning,
                generative AI, RAG systems, AI agents, and
                building practical software solutions.
              </p>

              {technicalFocus.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {technicalFocus.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Beyond Code */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Gamepad2 className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Beyond Code
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Interests that keep me balanced, curious, and
                energized.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {personalInterests.map((interest) => {
                  const Icon = interest.icon;

                  return (
                    <div
                      key={interest.name}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs"
                    >
                      <Icon className="w-4 h-4 text-indigo-500 dark:text-cyan-400 shrink-0" />

                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {interest.name}
                        </div>

                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {interest.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};