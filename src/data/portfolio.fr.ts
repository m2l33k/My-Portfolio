import {
  onlineCourses as onlineCoursesEn,
  education as educationEn,
  projects as projectsEn,
  internships as internshipsEn,
  certifications as certificationsEn,
} from "./portfolio";

const onlineCourseNameFr: Record<string, string> = {
  "CyberSecurity 101 ": "Cybersecurite 101",
  "Global Education Program Focused on AI": "Programme de formation global axe sur l'IA",
};

const educationFr: Record<
  string,
  {
    degree?: string;
    institution?: string;
    description?: string;
    coursework?: string[];
    achievements?: string[];
  }
> = {
  "B.S. Software Engineering": {
    degree: "Licence en genie logiciel",
    institution: "Ecole Superieure Privee d'Ingenierie et de Technologies (ESPRIT)",
    description:
      "Formation complete en genie logiciel avec un focus sur la cybersecurite, l'IA et les technologies blockchain.",
    coursework: ["Architecture logicielle", "Cybersecurite", "IA & Machine Learning", "Technologie Blockchain", "DevSecOps"],
    achievements: ["Plusieurs stages en pentesting", "Actif dans des projets IEEE"],
  },
  "Preparatory Studies for Engineering": {
    degree: "Etudes preparatoires en ingenierie",
    institution: "Faculte des Sciences de Monastir",
    description:
      "Etudes d'ingenierie fondamentales preparant a une specialisation avancee en informatique et cybersecurite.",
    coursework: ["Mathematiques", "Physique", "Fondamentaux informatique", "Principes d'ingenierie", "Resolution de problemes"],
    achievements: ["Base solide en disciplines STEM"],
  },
};

const projectFr: Record<
  string,
  {
    title?: string;
    company?: string;
    description?: string;
    highlights?: string[];
  }
> = {
  Cognicare: {
    description:
      "Plateforme de sante numerique qui relie l'evaluation clinique du developpement a la therapie a domicile via une IA multimodale.",
    highlights: ["Detection IA des troubles du developpement", "Integration de therapie gamifiee", "Suivi en temps reel"],
  },
  "ZenFlow Sanctuary": {
    description:
      "Application web moderne pour ameliorer la concentration et la productivite grace au mixage de sons d'ambiance et a la methode Pomodoro.",
    highlights: ["Mixeur avance avec 20+ sons d'ambiance", "Minuteur Pomodoro personnalisable", "Sauvegarde de scenes et UI glassmorphism"],
  },
  "Code Arena AI: Multi-Agent Coding Tournament": {
    description:
      "Systeme multi-agents ou des modeles IA s'affrontent sur des problemes algorithmiques avec architecture Human-in-the-Loop et interface web temps reel.",
    highlights: ["Systeme multi-agents hybride", "UI de battle gamifiee en temps reel", "Architecture Human-in-the-Loop"],
  },
  "Decentralized Swarm Logistics Simulation": {
    description:
      "Simulation Python d'une flotte decentralisee de vehicules autonomes avec intelligence en essaim, blockchain PoA et LLM local pour l'orchestration.",
    highlights: ["Modele d'intelligence a 3 niveaux", "Protocole d'encheres decentralise", "Blockchain PoA sobre en energie"],
  },
  "Offensive Message Filter System": {
    description:
      "Systeme intelligent de filtrage de messages offensants pour applications de chat, base sur le machine learning.",
    highlights: ["Filtrage temps reel", "Classification ML", "Integration API REST"],
  },
  "Cyber Sentinel - Advanced Security Analysis Tool": {
    description:
      "Plateforme d'analyse securite combinant scan de code, reconnaissance reseau et evaluation de vulnerabilites assistee par IA.",
    highlights: ["Evaluation de vulnerabilites par IA", "Scan automatise du code (Semgrep)", "Reconnaissance reseau et fuzzing"],
  },
  "ERP SYSTEM FOR ISO 9001 PROCESS AUTOMATION": {
    title: "SYSTEME ERP POUR L'AUTOMATISATION ISO 9001",
    description:
      "Integration d'un ERP pour automatiser la conformite ISO 9001, reduire de 60% le travail manuel et ameliorer le pilotage qualite en temps reel.",
    highlights: ["60% de reduction du travail manuel", "Reporting de conformite en temps reel", "Automatisation de la gestion qualite"],
  },
  "AI-DRIVEN CYBERSECURITY INCIDENT RESPONSE PLATFORM": {
    title: "PLATEFORME DE REPONSE AUX INCIDENTS CYBER PILOTEE PAR IA",
    description:
      "Conception d'une plateforme IA/ML d'analyse de menaces integree a Snort/Suricata pour accelerer la reponse aux incidents de 35%.",
    highlights: ["35% de reponse plus rapide", "Analyse automatisee des menaces", "Detection basee ML"],
  },
  TechPioneers: {
    description:
      "Plateforme e-learning orientee ingenierie logicielle moderne et apprentissage interactif.",
    highlights: ["Plateforme educative e-learning", "Focus sur l'ingenierie logicielle moderne"],
  },
  "BASIC NETWORK SNIFFER": {
    title: "SNIFFER RESEAU BASIQUE",
    description:
      "Phase initiale de supervision du trafic reseau pour detecter des activites suspectes en cybersecurite.",
    highlights: ["Supervision du trafic reseau", "Detection d'activites suspectes"],
  },
  "Phishing Awareness Training": {
    title: "Formation de sensibilisation au phishing",
    description:
      "Programme de sensibilisation pour prevenir les attaques de phishing via des sessions interactives.",
    highlights: ["Sessions interactives", "Prevention des attaques de phishing"],
  },
  NextJEEL: {
    description:
      "Projet web pour creer une plateforme moderne et responsive d'apprentissage interactif.",
    highlights: ["Plateforme moderne et responsive", "Orientation apprentissage interactif"],
  },
  "Luducatio - Robot �ducatif pour l'apprentissage des �checs": {
    description:
      "Projet educatif integrant une plateforme robotique pour l'apprentissage et la progression aux echecs.",
    highlights: ["Integration d'une plateforme robotique", "Application d'apprentissage des echecs"],
  },
};

const internshipFr: Record<
  string,
  {
    role?: string;
    description?: string;
  }
> = {
  "FREELANCE SECURITY & ARCHITECTURE CONSULTANT": {
    role: "Consultant freelance sécurité & architecture",
    description:
      "Évaluation des risques de sécurité, conception d'architectures réseau et cloud sécurisées, recommandations de meilleures pratiques pour la résilience des infrastructures, et accompagnement dans la mise en œuvre de solutions évolutives et hautement disponibles.",
  },
  "CLOUD CORE NETWORK INTERN": {
    role: "Stagiaire réseau cœur cloud",
    description:
      "Intégration dans le pipeline R&D mondial de Huawei avec contribution à 2 flux de travail actifs en ingénierie IA dès le premier mois. Maîtrise de la stack cloud-native propriétaire en moins de 2 semaines, avec livraison autonome des tâches avant le calendrier prévu.",
  },
  "PROFESSIONAL INSTRUCTOR AI": {
    role: "Formateur professionnel IA",
    description:
      "Animation de formations pratiques en IA, LLM et automatisation cybersecurite. Conception d'ateliers sur RAG, prompt engineering, agents IA, ML et Python applique, avec mentorat sur projets reels.",
  },
  "JUNIOR CAREER CENTER ASSISTANT - PROFESSIONAL ENGAGEMENT (BENEVOLAT)": {
    role: "Assistant junior Career Center - engagement professionnel (benevolat)",
    description:
      "Contribution a l'organisation d'evenements carriere: job fairs, forums entreprises, workshops et sessions de coaching.",
  },
  "INTERN IN AI-POWERED WEB APPLICATION PENTESTING": {
    role: "Stagiaire pentesting web assiste par IA",
    description:
      "Developpement d'un agent de pentest IA pour automatiser l'evaluation securite des applications web avec de meilleures detections et moins de tests manuels.",
  },
  "BLOCKCHAIN & AI RESEARCH INTERN � SMART GRID SECURITY": {
    role: "Stagiaire recherche blockchain & IA - securite smart grid",
    description:
      "Developpement d'une solution blockchain pour la securite smart grid, avec analyse de performance, fiabilite et latence (49.5 ms pour la detection d'anomalies).",
  },
  "PENTESTING WEB APPLICATION INTERN": {
    role: "Stagiaire pentesting applications web",
    description:
      "Amelioration du pentesting base sur OWASP ZAP via automatisation et scripts personnalises pour accelerer l'evaluation des vulnerabilites.",
  },
  "PENTESTING WIFI/BLUETOOTH INTERN": {
    role: "Stagiaire pentesting WiFi/Bluetooth",
    description:
      "Simulation d'attaques sans fil, identification de vulnerabilites et mise en place de contre-mesures, avec reduction de 40% de la surface d'attaque.",
  },
};

const certDescriptionFr: Record<string, string> = {
  "Fundamentals of Deep Learning": "Fondamentaux du deep learning et implementation pratique en Python.",
  "Evaluation and Light Customization of Large Language Models": "Evaluation et personnalisation legere des grands modeles de langage.",
  "Building RAG Agents with LLMs": "Construction d'agents RAG avec des LLM.",
  "Getting Started with AI on Jetson Nano": "Fondamentaux de l'IA et du deep learning sur Jetson Nano.",
  "AppSec (CAP)": "Fondamentaux de la securite applicative et pratiques de developpement securise.",
  "Scrum Foundation": "Fondamentaux de la gestion de projet agile et de Scrum.",
  "Hashgraph Developer": "Developpement et implementation sur Hashgraph.",
  "Oracle AI Vector Search Certified Professional": "Implementation et optimisation de la recherche vectorielle IA.",
  "Cisco Cybersecurity": "Fondamentaux reseau de cybersecurite et technologies Cisco.",
  "Github Foundation": "Controle de version et collaboration avec Git et GitHub.",
  "TryHackMe Pre Security": "Fondamentaux de cybersecurite et bases du hacking ethique.",
  "IBM Data Visualization": "Techniques de visualisation de donnees et business intelligence.",
  "DevSecOps Learning": "Integration de la securite dans les pipelines DevOps.",
  "Python Essentials 1": "Concepts fondamentaux de programmation avec Python.",
  "AI for Anomaly Detection": "Implementation de modeles IA pour la detection d'anomalies.",
  "Generative AI with Diffusion Models": "Approfondissement de l'IA generative et des modeles de diffusion.",
  "AI for Predictive Maintenance": "Utilisation de l'IA pour anticiper les pannes et optimiser la maintenance.",
  "Ethical Hacker": "Maitrise des methodes de pentest et de hacking ethique.",
  "AWS Training Badge": "Comprendre les concepts et services de base AWS Cloud.",
  "Networking Basics": "Connaissances fondamentales des protocoles et operations reseau.",
  "Natural Language Processing": "Techniques modernes de NLP avec deep learning et transformers.",
  "Junior Cybersecurity Analyst": "Operations cyber de niveau junior et reponse aux incidents.",
  "Lifelong Learning 2025": "Engagement fort dans l'apprentissage continu et le developpement professionnel.",
};

export const onlineCourses = onlineCoursesEn.map((course) => ({
  ...course,
  name: onlineCourseNameFr[course.name] ?? course.name,
}));

export const education = educationEn.map((item) => {
  const tr = educationFr[item.degree];
  return {
    ...item,
    degree: tr?.degree ?? item.degree,
    institution: tr?.institution ?? item.institution,
    description: tr?.description ?? item.description,
    coursework: tr?.coursework ?? item.coursework,
    achievements: tr?.achievements ?? item.achievements,
  };
});

export const projects = projectsEn.map((item) => {
  const tr = projectFr[item.title];
  return {
    ...item,
    title: tr?.title ?? item.title,
    company: tr?.company ?? item.company,
    description: tr?.description ?? item.description,
    highlights: tr?.highlights ?? item.highlights,
  };
});

export const internships = internshipsEn.map((item) => {
  const tr = internshipFr[item.role];
  return {
    ...item,
    role: tr?.role ?? item.role,
    description: tr?.description ?? item.description,
  };
});

export const certifications = certificationsEn.map((item) => ({
  ...item,
  description: certDescriptionFr[item.name] ?? item.description,
}));
