import * as portfolioEn from "./portfolio";
import * as portfolioFr from "./portfolio.fr";

export type PortfolioData = {
  onlineCourses: typeof portfolioEn.onlineCourses;
  education: typeof portfolioEn.education;
  projects: typeof portfolioEn.projects;
  internships: typeof portfolioEn.internships;
  certifications: typeof portfolioEn.certifications;
};

export const getPortfolioData = (lang: "en" | "fr"): PortfolioData => {
  return lang === "fr"
    ? {
        onlineCourses: portfolioFr.onlineCourses,
        education: portfolioFr.education,
        projects: portfolioFr.projects,
        internships: portfolioFr.internships,
        certifications: portfolioFr.certifications,
      }
    : {
        onlineCourses: portfolioEn.onlineCourses,
        education: portfolioEn.education,
        projects: portfolioEn.projects,
        internships: portfolioEn.internships,
        certifications: portfolioEn.certifications,
      };
};
