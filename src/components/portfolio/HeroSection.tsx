import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Download, Mail, Github, Linkedin, Shield, Terminal, Phone, Award, Bot, Database, ChevronDown, BarChart3 } from "lucide-react";
import { CyberParticles } from "@/components/ui/CyberParticles";
import ContactForm from './ContactForm';
import CvDownloadModal from './CvDownloadModal';
import SkillsMatrixModal from './SkillsMatrixModal';
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

// Stagger animation variants
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [isCvModalOpen, setCvModalOpen] = useState(false);
  const [isSkillsMatrixOpen, setSkillsMatrixOpen] = useState(false);

  const handleOpenContactForm = () => setContactFormOpen(true);
  const handleCloseContactForm = () => setContactFormOpen(false);

  const handleOpenCvModal = () => setCvModalOpen(true);
  const handleCloseCvModal = () => setCvModalOpen(false);

  const handleOpenSkillsMatrix = () => setSkillsMatrixOpen(true);
  const handleCloseSkillsMatrix = () => setSkillsMatrixOpen(false);

  const socialLinks = [
    { href: "https://github.com/m2l33k", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/malek-hassayoun", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.kaggle.com/malek11azizhassayoun", icon: Database, label: "Kaggle" },
    { href: "https://www.credly.com/users/malek-aziz-hassayoun", icon: Award, label: "Credly" },
    { href: "https://tryhackme.com/p/RootKeeper", icon: Shield, label: "TryHackMe" },
    { href: "mailto:malekaziz.hassayoun@esprit.tn", icon: Mail, label: "Email" },
    { href: "tel:+21653117541", icon: Phone, label: "Phone" },
  ];

  const stats = [
    { icon: Shield, label: t("hero.stat1"), color: "from-emerald-500/20 to-emerald-500/5", glow: "shadow-emerald-500/20" },
    { icon: Bot, label: t("hero.stat2"), color: "from-cyan-500/20 to-cyan-500/5", glow: "shadow-cyan-500/20" },
    { icon: Award, label: t("hero.stat3"), color: "from-amber-500/20 to-amber-500/5", glow: "shadow-amber-500/20" },
  ];

  return (
    <>
      <section id="about" className="min-h-screen flex items-center justify-center pt-16 pb-12 matrix-bg relative">
        <CyberParticles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Image — scale-in animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="relative lg:justify-self-start flex items-center justify-center"
            >
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
            </motion.div>

            {/* Text Content — staggered children */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={container}
              className="space-y-7"
            >
              {/* 1. Subtitle badge + status indicator */}
              <motion.div variants={fadeUp} className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      <Typewriter text={t("hero.subtitle")} />
                    </span>
                  </div>
                  {/* 4. Glowing status indicator */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-emerald-400">
                      {lang === "en" ? "Available for hire" : "Disponible"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 2. Name */}
              <motion.div variants={fadeUp}>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">{t("hero.greeting")}</span>{" "}
                  <span className="bg-gradient-cyber bg-clip-text text-transparent drop-shadow-[0_0_25px_hsl(120,100%,50%,0.3)]">
                    Hassayoun Malek Aziz
                  </span>
                </h1>
              </motion.div>

              {/* 3. Bio Card */}
              <motion.div variants={fadeUp} className="relative max-w-xl">
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/40 via-cyan-500/20 to-primary/10 blur-sm"></div>
                <div className="relative rounded-xl border border-primary/20 bg-card/80 backdrop-blur-md p-5 space-y-3">
                  <p className="text-base leading-relaxed text-foreground/90">
                    {t("hero.bio")} <span className="text-primary font-semibold">{t("hero.bio.highlight")}</span> {t("hero.bio.rest")}
                  </p>

                  {/* 5. Redesigned stat pills with glow */}
                  <div className="flex flex-wrap gap-2.5">
                    {stats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${stat.color} border border-white/5 shadow-md ${stat.glow} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                        >
                          <Icon className="h-3.5 w-3.5 text-primary group-hover:drop-shadow-[0_0_6px_hsl(120,100%,50%,0.6)] transition-all duration-300" />
                          <span className="text-xs font-semibold text-foreground/90">{stat.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("hero.bio2")}
                  </p>
                </div>
              </motion.div>

              {/* 4. Action Buttons — primary row + secondary row */}
              <motion.div variants={fadeUp} className="space-y-3">
                {/* Primary CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(120,100%,50%,0.25)] hover:shadow-[0_0_30px_hsl(120,100%,50%,0.4)] font-semibold transition-all duration-300"
                    onClick={handleOpenCvModal}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t("hero.downloadCv")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm transition-all duration-300"
                    onClick={handleOpenContactForm}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {t("hero.contact")}
                  </Button>
                </div>

                {/* Secondary actions — smaller, subtler */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    onClick={handleOpenSkillsMatrix}
                  >
                    <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                    {t("hero.skillsMatrix")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    onClick={() => navigate('/chat')}
                  >
                    <Bot className="mr-1.5 h-3.5 w-3.5" />
                    {t("hero.askAi")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    onClick={() => navigate('/activity')}
                  >
                    <Github className="mr-1.5 h-3.5 w-3.5" />
                    {t("hero.activity")}
                  </Button>
                </div>
              </motion.div>

              {/* 5. Social Links with tooltips */}
              <motion.div variants={fadeUp} className="flex items-center gap-1">
                {socialLinks.map((link) => (
                  <Tooltip key={link.label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_12px_hsl(120,100%,50%,0.15)] transition-all duration-300"
                        asChild
                      >
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          <link.icon className="h-5 w-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="border-primary/20 bg-card/95 backdrop-blur-md text-xs">
                      {link.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>

              {/* 6. TryHackMe Badge in styled card */}
              <motion.div variants={fadeUp}>
                <div className="relative inline-block">
                  <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-emerald-500/20 blur-sm"></div>
                  <div className="relative rounded-lg border border-primary/15 bg-card/60 backdrop-blur-sm p-2 overflow-hidden">
                    <iframe
                      src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3036625"
                      style={{ border: "none" }}
                      width="350"
                      height="100"
                      title="TryHackMe Badge"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 7. Scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <button
            onClick={() => document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-primary/70 transition-colors duration-300 group"
            aria-label="Scroll down"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              {lang === "en" ? "Scroll" : "Defiler"}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {isContactFormOpen && <ContactForm onClose={handleCloseContactForm} />}
      {isCvModalOpen && <CvDownloadModal onClose={handleCloseCvModal} />}
      {isSkillsMatrixOpen && <SkillsMatrixModal onClose={handleCloseSkillsMatrix} />}
    </>
  );
};

export default HeroSection;
