import { Suspense, lazy } from 'react';
import { Github, Shield } from "lucide-react";
import ErrorBoundary from "../ErrorBoundary";
import CustomGitHubCalendar from "./CustomGitHubCalendar";
import GitHubAchievements from "./GitHubAchievements";
import TryHackMeStats from "./TryHackMeStats";

const CodingActivitySection = () => {
  return (
    <section id="activity" className="py-24 bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Github className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Open Source & Security</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Activity & Achievements</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tracking my contributions to open source and progress in cybersecurity training.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <ErrorBoundary>
             <CustomGitHubCalendar />
          </ErrorBoundary>
          
          <ErrorBoundary>
             <GitHubAchievements />
          </ErrorBoundary>

          <div className="w-full max-w-5xl">
            <div className="flex items-center gap-2 mb-4 mt-8">
                <Shield className="h-5 w-5 text-[#88cc14]" />
                <h3 className="text-2xl font-bold text-foreground">TryHackMe Progress</h3>
            </div>
            <ErrorBoundary>
                <TryHackMeStats />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingActivitySection;
