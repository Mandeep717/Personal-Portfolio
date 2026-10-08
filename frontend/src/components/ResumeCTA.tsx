import React from 'react';
import { FileText, ExternalLink, Download, Sparkles } from 'lucide-react';
import type { Resume } from '../types';
const FALLBACK_RESUME_URL =
  "https://drive.google.com/file/d/1od5YDDxdaXuits5ISQZkzVRe3etfRXmM/view?usp=drive_link";

interface ResumeCTAProps {
  resume?: Resume;
}

export const ResumeCTA: React.FC<ResumeCTAProps> = ({ resume }) => {
  const resumeUrl = resume?.url || FALLBACK_RESUME_URL;

  if (!resumeUrl) {
    return null;
  }

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-center shadow-xl">
          
          {/* Ambient background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Curriculum Vitae</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Looking for a Complete Overview?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Explore my comprehensive academic coursework, detailed project architectures, hackathon accomplishments, and technical credentials in my resume.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Main View Resume Button */}
              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 hover:scale-102 transition-all shadow-lg active:scale-95 group w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>View Complete Resume</span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-950 transition-colors" />
              </a>

              {/* File Info Pill */}
              {resume.fileName && (
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{resume.fileName}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
