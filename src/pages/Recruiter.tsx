import { useNavigate } from "react-router-dom";
import { Download, Mail, Phone, Github, Linkedin, Shield, ExternalLink, ArrowLeft, MapPin, Printer, Award, Database } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useLanguage } from "@/context/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { track } from "@vercel/analytics";

const Recruiter = () => {
  usePageTitle("Recruiter View");
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { projects, internships, certifications } = usePortfolioData();

  const i = (en: string, fr: string, ar: string) => ({ en, fr, ar }[lang] ?? en);

  // Top 3 projects by impact
  const topProjects = projects.filter(p =>
    ["Cognicare", "Cyber Sentinel", "ERP SYSTEM FOR ISO 9001 PROCESS AUTOMATION", "AI-DRIVEN CYBERSECURITY INCIDENT RESPONSE PLATFORM"].includes(p.title)
  ).slice(0, 3);

  // Key internships (most recent/relevant)
  const keyInternships = internships.slice(0, 4);

  // High-value certs grouped
  const topCerts = certifications.filter(c =>
    ["AppSec (CAP)", "Ethical Hacker", "Junior Cybersecurity Analyst", "Cisco Cybersecurity", "Fundamentals of Deep Learning", "Building RAG Agents with LLMs"].includes(c.name)
  );

  const skills = {
    [i("Security", "Securite", "الأمان")]: ["Pentesting", "OWASP ZAP", "Nmap", "Snort/Suricata", "Burp Suite", "Scapy", "Semgrep"],
    [i("AI / ML", "IA / ML", "ذكاء اصطناعي")]: ["LLMs", "RAG", "PyTorch", "Scikit-learn", "OpenCV", "NLP", "Prompt Engineering"],
    [i("Development", "Developpement", "تطوير")]: ["React", "TypeScript", "Python", "Spring Boot", "Angular", "Next.js", "FastAPI"],
    [i("DevOps / Cloud", "DevOps / Cloud", "DevOps / سحابة")]: ["Docker", "Kubernetes", "Jenkins", "AWS", "Git", "PostgreSQL", "Linux"],
  };

  const impactBullets = [
    i("Built AI-powered pentesting agent reducing manual testing by 60%", "Agent de pentesting IA reduisant les tests manuels de 60%", "بناء وكيل اختبار اختراق ذكي يقلل الاختبارات اليدوية بنسبة 60%"),
    i("Achieved 85% OWASP vulnerability detection rate with automated scanning", "Taux de detection OWASP de 85% avec scan automatise", "حقق معدل كشف ثغرات OWASP بنسبة 85% بالمسح الآلي"),
    i("Accelerated incident response by 35% with AI/ML threat analysis", "Acceleration de la reponse aux incidents de 35% avec analyse IA/ML", "تسريع الاستجابة للحوادث بنسبة 35% بتحليل التهديدات بالذكاء الاصطناعي"),
    i("Reduced attack surface by 40% through wireless security hardening", "Reduction de la surface d'attaque de 40% via renforcement securite sans fil", "تقليص سطح الهجوم بنسبة 40% عبر تعزيز أمان الشبكات اللاسلكية"),
    i("Top 5% globally on TryHackMe with 20+ certifications", "Top 5% mondial sur TryHackMe avec 20+ certifications", "أفضل 5% عالمياً على TryHackMe مع 20+ شهادة"),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:text-black">
      {/* Nav bar - hidden on print */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10 print:hidden">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{i("Back to Portfolio", "Retour au Portfolio", "العودة إلى المحفظة")}</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              {i("Print / PDF", "Imprimer / PDF", "طباعة / PDF")}
            </button>
          </div>
        </div>
      </div>

      <main className="pt-20 pb-16 print:pt-0 print:pb-0">
        <div className="container mx-auto px-4 max-w-4xl space-y-8 print:space-y-4">

          {/* ========== HEADER ========== */}
          <header className="text-center space-y-4 print:space-y-2">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img
                src="/3d4febb1-a352-4c43-b67f-919a19b6554a-removebg-preview.png"
                alt="Malek Aziz Hassayoun"
                className="w-20 h-20 rounded-full ring-2 ring-primary/30 object-cover print:w-16 print:h-16"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight print:text-2xl">
              {lang === "ar" ? "مالك عزيز حسيون" : "Malek Aziz Hassayoun"}
            </h1>
            <p className="text-lg font-medium text-primary print:text-base">
              {i("Cybersecurity Engineer & AI Developer", "Ingenieur Cybersecurite & Developpeur IA", "مهندس أمن سيبراني ومطور ذكاء اصطناعي")}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {i("Tunisia", "Tunisie", "تونس")}</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {i("Open to opportunities", "Ouvert aux opportunites", "مفتوح للفرص")}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-2 print:hidden">
              <a
                href="/Cvs/malek_Hassayoun_Cv_EN.pdf"
                target="_blank"
                onClick={() => track("cv_download", { source: "recruiter_page" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                <Download className="h-4 w-4" />
                {i("Download CV", "Telecharger CV", "تحميل السيرة الذاتية")}
              </a>
              <a
                href="mailto:malekaziz.hassayoun@esprit.tn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/30 bg-primary/5 font-semibold text-sm text-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="h-4 w-4" />
                {i("Email Me", "M'envoyer un email", "راسلني")}
              </a>
              <a
                href="tel:+21653117541"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/30 bg-primary/5 font-semibold text-sm text-primary hover:bg-primary/10 transition-all"
              >
                <Phone className="h-4 w-4" />
                {i("Call", "Appeler", "اتصل")}
              </a>
            </div>
          </header>

          {/* ========== IMPACT SNAPSHOT ========== */}
          <section>
            <SectionTitle>{i("Impact Snapshot", "Resultats Cles", "لمحة عن التأثير")}</SectionTitle>
            <ul className="space-y-2">
              {impactBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-foreground/90">{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ========== CORE SKILLS ========== */}
          <section>
            <SectionTitle>{i("Core Skills", "Competences Cles", "المهارات الأساسية")}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="rounded-lg border border-primary/10 bg-card/50 p-4 print:border-gray-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">{category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-xs font-medium bg-muted/50 text-foreground/80 border border-primary/5 print:border-gray-200 print:bg-gray-50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========== TOP PROJECTS ========== */}
          <section>
            <SectionTitle>{i("Key Projects", "Projets Cles", "المشاريع الرئيسية")}</SectionTitle>
            <div className="space-y-3">
              {topProjects.map((project) => (
                <div key={project.title} className="rounded-lg border border-primary/10 bg-card/50 p-4 print:border-gray-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-foreground">{project.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{project.description.slice(0, 120)}...</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/5 text-primary border border-primary/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.highlights && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1.5">
                          {project.highlights[0]}
                        </p>
                      )}
                    </div>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-foreground hover:text-primary transition-colors print:hidden">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========== EXPERIENCE TIMELINE ========== */}
          <section>
            <SectionTitle>{i("Experience", "Experience", "الخبرة")}</SectionTitle>
            <div className="space-y-3">
              {keyInternships.map((intern) => (
                <div key={intern.role} className="flex gap-4 rounded-lg border border-primary/10 bg-card/50 p-4 print:border-gray-200">
                  <div className="shrink-0 mt-0.5">
                    <img
                      src={intern.logoUrl}
                      alt={intern.company}
                      className="w-10 h-10 rounded-lg object-contain bg-background/50 border border-primary/10 p-1"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground">{intern.role}</h4>
                    <p className="text-xs text-primary font-medium">{intern.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{intern.period} &middot; {intern.location}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {intern.technologies.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted/50 text-foreground/70 border border-primary/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========== CERTIFICATIONS ========== */}
          <section>
            <SectionTitle>{i("Key Certifications", "Certifications Cles", "الشهادات الرئيسية")}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topCerts.map((cert) => (
                <div key={cert.name} className="flex items-center gap-3 rounded-lg border border-primary/10 bg-card/50 p-3 print:border-gray-200">
                  {cert.issuerLogoUrl && (
                    <img src={cert.issuerLogoUrl} alt={cert.issuer} className="w-8 h-8 object-contain shrink-0" loading="lazy" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{cert.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{cert.issuer} &middot; {cert.date}</p>
                  </div>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-foreground hover:text-primary transition-colors print:hidden">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {i(`+ ${certifications.length - topCerts.length} more certifications`, `+ ${certifications.length - topCerts.length} autres certifications`, `+ ${certifications.length - topCerts.length} شهادة أخرى`)}
            </p>
          </section>

          {/* ========== QUICK CONTACT FOOTER ========== */}
          <footer className="rounded-xl border border-primary/10 bg-card/50 p-6 text-center space-y-4 print:border-gray-200">
            <h3 className="text-sm font-bold text-foreground">
              {i("Let's Connect", "Prenons Contact", "لنتواصل")}
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="mailto:malekaziz.hassayoun@esprit.tn" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> malekaziz.hassayoun@esprit.tn
              </a>
              <a href="tel:+21653117541" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> +216 53 117 541
              </a>
            </div>
            <div className="flex justify-center gap-3">
              {[
                { href: "https://github.com/m2l33k", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/malek-hassayoun", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.credly.com/users/malek-aziz-hassayoun", icon: Award, label: "Credly" },
                { href: "https://tryhackme.com/p/RootKeeper", icon: Shield, label: "TryHackMe" },
                { href: "https://www.kaggle.com/malek11azizhassayoun", icon: Database, label: "Kaggle" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-primary/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  title={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4 flex items-center gap-2 print:text-black">
    <span className="h-px flex-1 bg-primary/15 print:bg-gray-200" />
    {children}
    <span className="h-px flex-1 bg-primary/15 print:bg-gray-200" />
  </h3>
);

export default Recruiter;
