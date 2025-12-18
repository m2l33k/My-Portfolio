import { Suspense, lazy } from 'react';
import { Github } from "lucide-react";
import ErrorBoundary from "../ErrorBoundary";
import CustomGitHubCalendar from "./CustomGitHubCalendar";

const CodingActivitySection = () => {
  return (
    <section id="activity" className="py-24 bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Github className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Open Source</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Coding Activity</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A visual representation of my contributions and coding consistency on GitHub.
          </p>
        </div>

        <div className="flex justify-center">
          <ErrorBoundary>
             <CustomGitHubCalendar />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default CodingActivitySection;
