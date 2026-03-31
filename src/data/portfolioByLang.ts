import * as portfolioEn from "./portfolio";
import * as portfolioFr from "./portfolio.fr";
import * as portfolioAr from "./portfolio.ar";

export type PortfolioData = {
  onlineCourses: typeof portfolioEn.onlineCourses;
  education: typeof portfolioEn.education;
  projects: typeof portfolioEn.projects;
  internships: typeof portfolioEn.internships;
  certifications: typeof portfolioEn.certifications;
};

export const getPortfolioData = (lang: "en" | "fr" | "ar"): PortfolioData => {
  if (lang === "fr") {
    return {
      onlineCourses: portfolioFr.onlineCourses,
      education: portfolioFr.education,
      projects: portfolioFr.projects,
      internships: portfolioFr.internships,
      certifications: portfolioFr.certifications,
    };
  }

  if (lang === "ar") {
    return {
      onlineCourses: portfolioAr.onlineCourses,
      education: portfolioAr.education,
      projects: portfolioAr.projects,
      internships: portfolioAr.internships,
      certifications: portfolioAr.certifications,
    };
  }

  return {
    onlineCourses: portfolioEn.onlineCourses,
    education: portfolioEn.education,
    projects: portfolioEn.projects,
    internships: portfolioEn.internships,
    certifications: portfolioEn.certifications,
  };
};
