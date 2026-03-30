import { useState } from "react";
import { Menu, X, Shield, User, Award, Briefcase, GraduationCap, Languages, Heart } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: User, label: "About", href: "#about" },
    { icon: Award, label: "Certifications", href: "#certifications" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Briefcase, label: "Intern/Experience", href: "#internships" },
    { icon: GraduationCap, label: "Education", href: "#education" },
    { icon: Languages, label: "Skills", href: "#languages" },
    { icon: Heart, label: "Motivation", href: "#motivation" },
  ];

  const scrollToSection = (href: string) => {
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
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative p-2 rounded-lg border border-primary/10 bg-card/50 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-primary/10 bg-card/50 backdrop-blur-xl -mx-4 px-4">
            <div className="py-3 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;