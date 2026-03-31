import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Shield, User, Award, Briefcase, GraduationCap, Languages, Heart, Users, PenLine } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { icon: User, label: t("nav.about"), href: "#about" },
    { icon: Award, label: t("nav.certifications"), href: "#certifications" },
    { icon: Briefcase, label: t("nav.projects"), href: "#projects" },
    { icon: Briefcase, label: t("nav.experience"), href: "#internships" },
    { icon: GraduationCap, label: t("nav.education"), href: "#education" },
    { icon: Languages, label: t("nav.skills"), href: "#languages" },
    { icon: Heart, label: t("nav.motivation"), href: "#motivation" },
    { icon: Users, label: t("nav.volunteering"), href: "/volunteering" },
    { icon: PenLine, label: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const sectionIds = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(topmost.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      setIsOpen(false);
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_1px_20px_hsl(120,100%,50%,0.05)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#about")}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/30 transition-all duration-300"></div>
              <Shield className="relative h-7 w-7 text-primary group-hover:drop-shadow-[0_0_8px_hsl(120,100%,50%,0.5)] transition-all duration-300" />
            </div>
            <span className="text-lg font-bold bg-gradient-cyber bg-clip-text text-transparent">
              RootKeeper
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 rounded-full border border-primary/10 bg-card/50 backdrop-blur-sm px-1.5 py-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/15 shadow-[0_0_10px_hsl(120,100%,50%,0.15)]"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right side: language toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              className="lg:hidden relative p-2 rounded-lg border border-primary/10 bg-card/50 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-primary/10 bg-card/50 backdrop-blur-xl -mx-4 px-4">
            <div className="py-3 space-y-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 border-l-2 border-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;