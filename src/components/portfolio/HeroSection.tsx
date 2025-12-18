import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, Github, Linkedin, Shield, Terminal, Phone, Award, Bot } from "lucide-react";
import ContactForm from './ContactForm';
import CvDownloadModal from './CvDownloadModal';
import SkillsMatrixModal from './SkillsMatrixModal';
import PortfolioStats from './PortfolioStats';

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
      <section id="about" className="min-h-screen flex items-center justify-center pt-16 matrix-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Content - Now on the left */}
            <div className="relative lg:justify-self-start">
              <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
              <img 
                src="/3d4febb1-a352-4c43-b67f-919a19b6554a-removebg-preview.png" 
                alt="Hassayoun Malek Aziz" 
                className="relative w-full max-w-md mx-auto rounded-full shadow-2xl"
              />
            </div>

            {/* Text Content - Now on the right */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Terminal className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-wide">
                    <Typewriter text="Computer Engineering Student" />
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-foreground">Hi, I'm</span>{" "}
                  <span className="bg-gradient-cyber bg-clip-text text-transparent">
                    Hassayoun Malek Aziz
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Computer Engineering student seeking a final-year internship, specializing in 
                  cybersecurity, AI, and blockchain technologies with hands-on pentesting experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow" onClick={handleOpenCvModal}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleOpenContactForm}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleOpenSkillsMatrix}>
                  <Shield className="mr-2 h-4 w-4" />
                  Skills Matrix
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/chat')}>
                  <Bot className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/activity')}>
                  <Github className="mr-2 h-4 w-4" />
                  Activity
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                  <a href="https://github.com/m2l33k" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                  <a href="https://linkedin.com/in/malek-hassayoun" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                  <a href="https://www.credly.com/users/malek-aziz-hassayoun" target="_blank" rel="noopener noreferrer">
                    <Award className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                  <a href="https://tryhackme.com/p/RootKeeper" target="_blank" rel="noopener noreferrer">
                    <Shield className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                  <a href="mailto:malekaziz.hassayoun@esprit.tn">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                  <a href="tel:+21653117541">
                    <Phone className="h-5 w-5" />
                  </a>
                </Button>
              </div>
              <div className="mt-4 space-y-4">
                <iframe src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3036625" style={{border:"none"}} width="350" height="100"></iframe>
                <PortfolioStats />
              </div>
            </div>
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