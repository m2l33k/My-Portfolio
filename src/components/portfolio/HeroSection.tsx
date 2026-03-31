import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, Github, Linkedin, Shield, Terminal, Phone, Award, Bot, Database } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CyberParticles } from "@/components/ui/CyberParticles";
import ContactForm from './ContactForm';
import CvDownloadModal from './CvDownloadModal';
import SkillsMatrixModal from './SkillsMatrixModal';
import PortfolioStats from './PortfolioStats';
import { useLanguage } from '@/context/LanguageContext';

const Typewriter = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [isCvModalOpen, setCvModalOpen] = useState(false);
  const [isSkillsMatrixOpen, setSkillsMatrixOpen] = useState(false);

  const handleOpenContactForm = () => setContactFormOpen(true);
  const handleCloseContactForm = () => setContactFormOpen(false);

  const handleOpenCvModal = () => setCvModalOpen(true);
  const handleCloseCvModal = () => setCvModalOpen(false);

  const handleOpenSkillsMatrix = () => setSkillsMatrixOpen(true);
  const handleCloseSkillsMatrix = () => setSkillsMatrixOpen(false);

  return (
    <>
      <section id="about" className="min-h-screen flex items-center justify-center pt-16 matrix-bg relative">
        <CyberParticles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Content - Now on the left */}
            <ScrollReveal direction="right">
              <div className="relative lg:justify-self-start flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/15 blur-[80px] rounded-full"></div>
                <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full translate-x-8 -translate-y-4"></div>
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-cyan-500/20 to-primary/10 blur-md"></div>
                  <img
                    src="/3d4febb1-a352-4c43-b67f-919a19b6554a-removebg-preview.png"
                    alt="Hassayoun Malek Aziz"
                    className="relative w-full max-w-md mx-auto rounded-full shadow-2xl ring-1 ring-primary/20"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Text Content - Now on the right */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="space-y-8">
                {/* Name & Title */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      <Typewriter text={t("hero.subtitle")} />
                    </span>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    <span className="text-foreground">{t("hero.greeting")}</span>{" "}
                    <span className="bg-gradient-cyber bg-clip-text text-transparent drop-shadow-[0_0_25px_hsl(120,100%,50%,0.3)]">
                      Hassayoun Malek Aziz
                    </span>
                  </h1>
                </div>

                {/* Bio Card */}
                <div className="relative max-w-xl">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/40 via-cyan-500/20 to-primary/10 blur-sm"></div>
                  <div className="relative rounded-xl border border-primary/20 bg-card/80 backdrop-blur-md p-5 space-y-3">
                    <p className="text-base leading-relaxed text-foreground/90">
                      {t("hero.bio")} <span className="text-primary font-semibold">{t("hero.bio.highlight")}</span> {t("hero.bio.rest")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                        <Shield className="h-3 w-3" />
                        {t("hero.stat1")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                        <Bot className="h-3 w-3" />
                        {t("hero.stat2")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                        <Award className="h-3 w-3" />
                        {t("hero.stat3")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("hero.bio2")}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow font-semibold" onClick={handleOpenCvModal}>
                    <Download className="mr-2 h-4 w-4" />
                    {t("hero.downloadCv")}
                  </Button>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm" onClick={handleOpenContactForm}>
                    <Mail className="mr-2 h-4 w-4" />
                    {t("hero.contact")}
                  </Button>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm" onClick={handleOpenSkillsMatrix}>
                    <Shield className="mr-2 h-4 w-4" />
                    {t("hero.skillsMatrix")}
                  </Button>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm" onClick={() => navigate('/chat')}>
                    <Bot className="mr-2 h-4 w-4" />
                    {t("hero.askAi")}
                  </Button>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm" onClick={() => navigate('/activity')}>
                    <Github className="mr-2 h-4 w-4" />
                    {t("hero.activity")}
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-1">
                  {[
                    { href: "https://github.com/m2l33k", icon: Github, label: "GitHub" },
                    { href: "https://linkedin.com/in/malek-hassayoun", icon: Linkedin, label: "LinkedIn" },
                    { href: "https://www.kaggle.com/malek11azizhassayoun", icon: Database, label: "Kaggle" },
                    { href: "https://www.credly.com/users/malek-aziz-hassayoun", icon: Award, label: "Credly" },
                    { href: "https://tryhackme.com/p/RootKeeper", icon: Shield, label: "TryHackMe" },
                    { href: "mailto:malekaziz.hassayoun@esprit.tn", icon: Mail, label: "Email" },
                    { href: "tel:+21653117541", icon: Phone, label: "Phone" },
                  ].map((link) => (
                    <Button key={link.label} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" asChild>
                      <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        <link.icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                </div>

                {/* Stats & Badge */}
                <div className="space-y-4">
                  <iframe src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3036625" style={{border:"none"}} width="350" height="100"></iframe>
                  <PortfolioStats />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      {isContactFormOpen && <ContactForm onClose={handleCloseContactForm} />}
      {isCvModalOpen && <CvDownloadModal onClose={handleCloseCvModal} />}
      {isSkillsMatrixOpen && <SkillsMatrixModal onClose={handleCloseSkillsMatrix} />}
    </>
  );
};

export default HeroSection;