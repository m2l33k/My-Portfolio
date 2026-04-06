import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, Shield, User, Award, Briefcase, GraduationCap,
  Languages, Heart, Users, PenLine, UserCheck, FolderGit2,
} from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const sectionItems = [
    { icon: User, label: t("nav.about"), href: "#about" },
    { icon: Award, label: t("nav.certifications"), href: "#certifications" },
    { icon: FolderGit2, label: t("nav.projects"), href: "#projects" },
    { icon: Briefcase, label: t("nav.experience"), href: "#internships" },
    { icon: GraduationCap, label: t("nav.education"), href: "#education" },
    { icon: Languages, label: t("nav.skills"), href: "#languages" },
    { icon: Heart, label: t("nav.motivation"), href: "#motivation" },
  ];

  const pageItems = [
    { icon: Users, label: t("nav.volunteering"), href: "/volunteering" },
    { icon: PenLine, label: t("nav.blog"), href: "/blog" },
  ];

  const allItems = [...sectionItems, ...pageItems];

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const ids = sectionItems.map((item) => item.href.replace("#", ""));
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
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNav = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
        {/* Scroll progress */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-primary/60 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => handleNav("#about")}
              className="flex items-center gap-2 group shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/30 transition-all duration-300" />
                <Shield className="relative h-6 w-6 text-primary group-hover:drop-shadow-[0_0_8px_hsl(120,100%,50%,0.5)] transition-all duration-300" />
              </div>
              <span className="text-base font-bold bg-gradient-cyber bg-clip-text text-transparent hidden sm:block">
                RootKeeper
              </span>
            </button>

            {/* Desktop Nav — icon-only pills with tooltip-style active label */}
            <div className="hidden xl:flex items-center gap-0.5 rounded-full border border-primary/10 bg-card/50 backdrop-blur-sm px-1 py-0.5">
              {sectionItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    title={item.label}
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/15"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5 shrink-0" />
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.span
                          key={item.href}
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}

              {/* Divider dot */}
              <span className="w-1 h-1 rounded-full bg-primary/20 mx-1" />

              {pageItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  title={item.label}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate("/recruiter")}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-primary/10 bg-card/50 backdrop-blur-sm text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                title="Recruiter View"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Recruiter</span>
              </button>
              <ThemeToggle />
              <LanguageToggle />
              <button
                className="xl:hidden relative p-2 rounded-full border border-primary/10 bg-card/50 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile / Tablet overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-background/95 backdrop-blur-xl border-l border-primary/10 xl:hidden overflow-y-auto will-change-transform"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
                <span className="text-sm font-bold bg-gradient-cyber bg-clip-text text-transparent">
                  RootKeeper
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Section links */}
              <div className="px-3 py-4 space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2">
                  Sections
                </p>
                {sectionItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNav(item.href)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5 active:bg-primary/10"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Page links */}
              <div className="px-3 pb-4 space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2">
                  Pages
                </p>
                {[...pageItems, { icon: UserCheck, label: "Recruiter", href: "/recruiter" }].map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors duration-150"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Bottom controls in mobile */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-primary/10 bg-background/80 backdrop-blur-sm flex items-center justify-between">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
