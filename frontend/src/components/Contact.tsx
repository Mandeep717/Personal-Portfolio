import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import type { Contact as ContactType, SocialLinks } from '../types';

interface ContactProps {
  contact?: ContactType;
  socialLinks?: SocialLinks;
}

export const Contact: React.FC<ContactProps> = ({ contact, socialLinks }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Contact & Connect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Have a project in mind, an opportunity to discuss, or just want to talk AI and engineering? I'd love to connect.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* Email Card */}
          {contact?.email && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between group hover:border-indigo-500/40 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Email
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-bold text-slate-900 dark:text-white text-base hover:text-indigo-600 dark:hover:text-indigo-400 break-all transition-colors block mb-2"
                >
                  {contact.email}
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:underline"
                >
                  <span>Compose</span>
                  <Send className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleCopy(contact.email!, 'email')}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Phone Card */}
          {contact?.phone && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between group hover:border-indigo-500/40 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Phone
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="font-bold text-slate-900 dark:text-white text-base hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block mb-2"
                >
                  {contact.phone}
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <span>Call Directly</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleCopy(contact.phone!, 'phone')}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title="Copy phone to clipboard"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Location Card */}
          {contact?.location && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between group hover:border-indigo-500/40 transition-colors">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Location
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  {contact.location}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                Open to in-person & remote collaborations
              </div>
            </div>
          )}

        </div>

        {/* Social Links Banner */}
        {(socialLinks?.github || socialLinks?.linkedin) && (
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Social Profiles:
            </span>

            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:border-slate-400 dark:hover:bg-slate-700 transition-colors shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:border-slate-400 dark:hover:bg-slate-700 transition-colors shadow-xs"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-500" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
