import React from 'react';
import {
  ArrowDown,
  Bot,
  FileText,
  Mail,
  Sparkles,
  MapPin,
} from 'lucide-react';
import profilePhoto from '../assets/me_1.jpeg';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
  resumeUrl?: string;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  resumeUrl,
  onOpenChat,
}) => {
  const introParagraph = profile.bio
    ? profile.bio.split('\n\n')[0]
    : '';

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* Profile status */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              <span>
                AI / ML Student
              </span>

              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-indigo-300 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            {/* Actual backend profile title */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-700 dark:text-slate-300 mb-6">
              {profile.title}
            </h2>

            {/* Location */}
            {profile.contact?.location && (
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{profile.contact.location}</span>
              </div>
            )}

            {/* Introduction */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {introParagraph || profile.bio}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 w-full sm:w-auto">

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-sm active:scale-95"
                >
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>View Resume</span>
                </a>
              )}

              <button
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all active:scale-95 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect:
              </span>

              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}

              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5 text-blue-500" />
                </a>
              )}

              {profile.contact?.email && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  aria-label="Email Mandeep"
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-indigo-500" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT: Profile Photo */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group">

              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-700/60 dark:border-slate-800 shadow-2xl">
                <img
                  src={profilePhoto}
                  alt="Mandeep Boddu"
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 py-2 px-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/50 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-semibold">
                    Mandeep Boddu
                  </span>

                  <span className="font-mono text-[11px] text-cyan-400">
                    AI / ML
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};