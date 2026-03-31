import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  User,
  Award,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Wrench,
  Heart,
  MessageSquare,
  Activity,
  HandHeart,
  BookOpen,
  Globe,
  ArrowUp,
  Download,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CommandItem {
  label: string;
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
  group: "navigation" | "sections" | "actions";
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();
  const language = lang;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollToSection = useCallback(
    (hash: string) => {
      setOpen(false);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [navigate, location.pathname]
  );

  const goTo = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate]
  );

  const pages: CommandItem[] = [
    { label: t("nav.about") || "Home", icon: Home, action: () => goTo("/"), shortcut: "Esc", group: "navigation" },
    { label: t("hero.chatbot") || "AI Chat", icon: MessageSquare, action: () => goTo("/chat"), group: "navigation" },
    { label: t("hero.activity") || "Activity", icon: Activity, action: () => goTo("/activity"), group: "navigation" },
    { label: t("nav.volunteering") || "Volunteering", icon: HandHeart, action: () => goTo("/volunteering"), group: "navigation" },
    { label: t("nav.blog") || "Blog", icon: BookOpen, action: () => goTo("/blog"), group: "navigation" },
  ];

  const sections: CommandItem[] = [
    { label: t("nav.about") || "About", icon: User, action: () => scrollToSection("#about"), shortcut: "1", group: "sections" },
    { label: t("nav.certifications") || "Certifications", icon: Award, action: () => scrollToSection("#certifications"), shortcut: "2", group: "sections" },
    { label: t("nav.projects") || "Projects", icon: FolderGit2, action: () => scrollToSection("#projects"), shortcut: "3", group: "sections" },
    { label: t("nav.experience") || "Experience", icon: Briefcase, action: () => scrollToSection("#internships"), shortcut: "4", group: "sections" },
    { label: t("nav.education") || "Education", icon: GraduationCap, action: () => scrollToSection("#education"), shortcut: "5", group: "sections" },
    { label: t("nav.skills") || "Skills", icon: Wrench, action: () => scrollToSection("#languages"), shortcut: "6", group: "sections" },
    { label: t("nav.motivation") || "Motivation", icon: Heart, action: () => scrollToSection("#motivation"), shortcut: "7", group: "sections" },
  ];

  const actions: CommandItem[] = [
    {
      label: language === "en" ? "Switch to French" : "Passer en Anglais",
      icon: Globe,
      action: () => { setLang(lang === "en" ? "fr" : "en"); setOpen(false); },
      group: "actions",
    },
    {
      label: t("hero.downloadCv") || "Download CV",
      icon: Download,
      action: () => {
        setOpen(false);
        window.open("/Malek_Aziz_hassayoun_English.pdf", "_blank");
      },
      group: "actions",
    },
    {
      label: language === "en" ? "Back to Top" : "Retour en haut",
      icon: ArrowUp,
      action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); },
      group: "actions",
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={language === "en" ? "Type a command or search..." : "Tapez une commande..."} />
      <CommandList>
        <CommandEmpty>{language === "en" ? "No results found." : "Aucun resultat."}</CommandEmpty>

        <CommandGroup heading={language === "en" ? "Pages" : "Pages"}>
          {pages.map((item) => (
            <CommandItem key={item.label} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
              {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={language === "en" ? "Sections" : "Sections"}>
          {sections.map((item) => (
            <CommandItem key={item.label} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
              {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={language === "en" ? "Actions" : "Actions"}>
          {actions.map((item) => (
            <CommandItem key={item.label} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
