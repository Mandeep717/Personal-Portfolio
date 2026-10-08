import { useEffect, useState } from 'react';
import { getProfile } from './api/profile';
import { getPortfolios } from './api/portfolio';
import { getResume } from './api/resume';
import type { Profile, PortfolioItem, Resume } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { CodingProfiles } from './components/CodingProfiles';
import { ResumeCTA } from './components/ResumeCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { SkeletonHero, SkeletonSection } from './components/SkeletonLoader';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function AppContent() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatQuery, setExternalChatQuery] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Parallel initial fetch of viewer endpoints
      const [profileData, portfolioData, resumeResult] = await Promise.allSettled([
        getProfile(),
        getPortfolios(),
        getResume(),
      ]);

      if (profileData.status === 'fulfilled') {
        setProfile(profileData.value);
      } else {
        throw new Error('Unable to load portfolio profile.');
      }

      if (portfolioData.status === 'fulfilled') {
        setPortfolios(portfolioData.value || []);
      }

      if (resumeResult.status === 'fulfilled') {
        setResume(resumeResult.value);
      } else if (profileData.value?.resume?.url) {
        // Fallback to resume embedded in profile object if dedicated endpoint failed
        setResume(profileData.value.resume);
      }
    } catch {
      setError(
        'Unable to load portfolio data. Please make sure the backend server is running and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAskAboutProject = (projectTitle: string) => {
    setExternalChatQuery(`Tell me more about the project: ${projectTitle}`);
    setIsChatOpen(true);
  };

  const hasExperience = portfolios.some((item) => item.type === 'experience');
  const resumeUrl = resume?.url || profile?.resume?.url;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        resumeUrl={resumeUrl}
        onOpenChat={() => setIsChatOpen(true)}
        hasExperience={hasExperience}
      />

      {/* Main Content Area */}
      <main>
        {/* Error Notification Banner with Retry */}
        {error && (
          <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <button
                onClick={fetchData}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="space-y-12">
            <SkeletonHero />
            <SkeletonSection cards={3} />
            <SkeletonSection cards={2} />
          </div>
        )}

        {/* Loaded Profile Content */}
        {!isLoading && profile && (
          <>
            {/* Hero Section */}
            <Hero
              profile={profile}
              resumeUrl={resumeUrl}
              onOpenChat={() => setIsChatOpen(true)}
            />

            {/* About Section */}
            <About profile={profile} />

            {/* Technical Skills Section */}
            <Skills skills={profile.skills} />

            {/* Education Section */}
            <Education items={portfolios} />

            {/* Projects Section */}
            <Projects
              items={portfolios}
              onAskAboutProject={handleAskAboutProject}
            />

            {/* Experience Section (Only rendered if items exist) */}
            <Experience items={portfolios} />

            {/* Achievements Section */}
            <Achievements items={portfolios} />

            {/* Coding Profiles Section */}
            <CodingProfiles profiles={profile.codingProfiles} />

            {/* Resume CTA Section */}
            <ResumeCTA resume={resume || profile.resume} />

            {/* Contact Section */}
            <Contact contact={profile.contact} socialLinks={profile.socialLinks} />
          </>
        )}
      </main>

      {/* Footer */}
      {profile && <Footer profile={profile} />}

      {/* Floating AI Chatbot Assistant */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
        externalQuery={externalChatQuery}
        onClearExternalQuery={() => setExternalChatQuery(undefined)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
