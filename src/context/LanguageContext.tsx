import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "fr";

const translations = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.certifications": "Certifications",
    "nav.projects": "Projects",
    "nav.experience": "Intern/Experience",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.motivation": "Motivation",
    "nav.volunteering": "Volunteering",
    // Hero
    "hero.subtitle": "Computer Engineering Student",
    "hero.greeting": "Hi, I'm",
    "hero.bio": "Engineering student building",
    "hero.bio.highlight": "LLM-powered security automation",
    "hero.bio.rest": "systems.",
    "hero.stat1": "60% less manual testing",
    "hero.stat2": "85% OWASP detection",
    "hero.stat3": "Top 5% TryHackMe",
    "hero.bio2": "Strong background in AI, DevSecOps, and blockchain-based security architectures.",
    "hero.downloadCv": "Download CV",
    "hero.contact": "Contact Me",
    "hero.skillsMatrix": "Skills Matrix",
    "hero.askAi": "Ask AI",
    "hero.activity": "Activity",
    // Sections
    "skills.title": "Skills & Tools",
    "skills.subtitle": "Technologies and methodologies I utilize for secure development and analysis",
    "skills.label": "Technical Skills",
    "certifications.title": "Certifications",
    "projects.title": "Projects",
    "education.title": "Education",
    "motivation.title": "Motivation",
    "experience.title": "Intern/Experience",
    // Footer
    "footer.bio": "Engineering student building LLM-powered security automation systems.",
    "footer.backToTop": "Back to top",
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with React, TypeScript & Tailwind CSS",
    // Hire Me
    "hire.status": "Open to opportunities",
    "hire.detail": "— Available for internships & collaborations",
    "hire.vcard": "vCard",
    "hire.cta": "Hire Me",
    // Blog
    "blog.title": "Blog & Write-ups",
    "blog.subtitle": "CTF write-ups, security research, and AI tutorials",
    "blog.back": "Back to Portfolio",
    "blog.readMore": "Read more",
    "blog.comingSoon": "More articles coming soon...",
    // Achievements
    "achievements.title": "Achievements at a Glance",
    // 404
    "404.title": "ACCESS DENIED",
    "404.subtitle": "The page you're looking for doesn't exist or has been moved.",
    "404.home": "Return to Base",
    // CV Modal
    "cv.title": "Curriculum Vitae",
    "cv.english": "English Version",
    "cv.french": "French Version",
    "cv.preview": "Preview",
    "cv.download": "Download",
  },
  fr: {
    // Nav
    "nav.about": "A propos",
    "nav.certifications": "Certifications",
    "nav.projects": "Projets",
    "nav.experience": "Stage/Experience",
    "nav.education": "Formation",
    "nav.skills": "Competences",
    "nav.motivation": "Motivation",
    "nav.volunteering": "Benevolat",
    // Hero
    "hero.subtitle": "Etudiant en Genie Informatique",
    "hero.greeting": "Bonjour, je suis",
    "hero.bio": "Etudiant en ingenierie developpant des",
    "hero.bio.highlight": "systemes d'automatisation de securite par LLM",
    "hero.bio.rest": ".",
    "hero.stat1": "60% moins de tests manuels",
    "hero.stat2": "85% detection OWASP",
    "hero.stat3": "Top 5% TryHackMe",
    "hero.bio2": "Solide experience en IA, DevSecOps et architectures de securite basees sur la blockchain.",
    "hero.downloadCv": "Telecharger CV",
    "hero.contact": "Me Contacter",
    "hero.skillsMatrix": "Matrice Competences",
    "hero.askAi": "Demander IA",
    "hero.activity": "Activite",
    // Sections
    "skills.title": "Competences & Outils",
    "skills.subtitle": "Technologies et methodologies pour le developpement securise et l'analyse",
    "skills.label": "Competences Techniques",
    "certifications.title": "Certifications",
    "projects.title": "Projets",
    "education.title": "Formation",
    "motivation.title": "Motivation",
    "experience.title": "Stage/Experience",
    // Footer
    "footer.bio": "Etudiant en ingenierie developpant des systemes d'automatisation de securite par LLM.",
    "footer.backToTop": "Haut de page",
    "footer.rights": "Tous droits reserves.",
    "footer.builtWith": "Construit avec React, TypeScript & Tailwind CSS",
    // Hire Me
    "hire.status": "Ouvert aux opportunites",
    "hire.detail": "— Disponible pour stages & collaborations",
    "hire.vcard": "vCard",
    "hire.cta": "Recrutez-moi",
    // Blog
    "blog.title": "Blog & Articles",
    "blog.subtitle": "Write-ups CTF, recherche en securite et tutoriels IA",
    "blog.back": "Retour au Portfolio",
    "blog.readMore": "Lire la suite",
    "blog.comingSoon": "Plus d'articles a venir...",
    // Achievements
    "achievements.title": "Realisations en un coup d'oeil",
    // 404
    "404.title": "ACCES REFUSE",
    "404.subtitle": "La page que vous cherchez n'existe pas ou a ete deplacee.",
    "404.home": "Retour a l'accueil",
    // CV Modal
    "cv.title": "Curriculum Vitae",
    "cv.english": "Version Anglaise",
    "cv.french": "Version Francaise",
    "cv.preview": "Apercu",
    "cv.download": "Telecharger",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("portfolio-lang");
    return (saved === "fr" ? "fr" : "en") as Lang;
  });

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("portfolio-lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
