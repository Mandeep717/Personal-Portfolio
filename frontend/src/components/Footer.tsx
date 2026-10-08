import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import type { Profile } from '../types';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/80 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
              {profile.name}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {profile.title}
            </p>
          </div>

          {/* Social Icons & Scroll Top */}
          <div className="flex items-center gap-4">
            {profile.socialLinks?.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {profile.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}

            {profile.contact?.email && (
              <a
                href={`mailto:${profile.contact.email}`}
                aria-label="Email"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-2 cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright & Stack */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {currentYear} {profile.name}. All rights reserved.
          </div>
          <div className="font-mono text-[11px]">
            Engineered with React, TypeScript & Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};
