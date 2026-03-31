import { Github, Linkedin, Mail, Shield, Phone, Award, Database, ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { href: "https://github.com/m2l33k", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/malek-hassayoun", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.kaggle.com/malek11azizhassayoun", icon: Database, label: "Kaggle" },
    { href: "https://www.credly.com/users/malek-aziz-hassayoun", icon: Award, label: "Credly" },
    { href: "https://tryhackme.com/p/RootKeeper", icon: Shield, label: "TryHackMe" },
    { href: "mailto:malekaziz.hassayoun@esprit.tn", icon: Mail, label: "Email" },
    { href: "tel:+21653117541", icon: Phone, label: "Phone" },
  ];

  return (
    <footer className="relative border-t border-primary/10 bg-card/30 backdrop-blur-sm">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-cyber bg-clip-text text-transparent">
                RootKeeper
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.bio")}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2.5 rounded-lg border border-primary/10 bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <div className="flex md:justify-end justify-center">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/20 bg-card/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
              {t("footer.backToTop")}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Hassayoun Malek Aziz. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground/40">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
