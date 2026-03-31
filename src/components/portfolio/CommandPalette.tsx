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
  Sun,
  Moon,
  UserCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { track } from "@vercel/analytics";

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
  const { theme, setTheme } = useTheme();
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
    { label: { en: "Recruiter View", fr: "Vue Recruteur", ar: "عرض المجند" }[language] ?? "Recruiter View", icon: UserCheck, action: () => goTo("/recruiter"), group: "navigation" },
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
      label: theme === "dark"
        ? ({ en: "Switch to Light Mode", fr: "Passer en mode clair", ar: "التبديل للوضع الفاتح" }[language])
        : ({ en: "Switch to Dark Mode", fr: "Passer en mode sombre", ar: "التبديل للوضع الداكن" }[language]),
      icon: theme === "dark" ? Sun : Moon,
      action: () => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); },
      group: "actions",
    },
    {
      label: { en: "Switch Language", fr: "Changer de langue", ar: "تغيير اللغة" }[language],
      icon: Globe,
      action: () => {
        const langs: Array<"en" | "fr" | "ar"> = ["en", "fr", "ar"];
        const idx = langs.indexOf(lang);
        setLang(langs[(idx + 1) % langs.length]);
        setOpen(false);
      },
      group: "actions",
    },
    {
      label: t("hero.downloadCv") || "Download CV",
      icon: Download,
      action: () => {
        setOpen(false);
        track("cv_download", { file: "/Malek_Aziz_hassayoun_English.pdf", source: "command_palette" });
        window.open("/Malek_Aziz_hassayoun_English.pdf", "_blank");
      },
      group: "actions",
    },
    {
      label: { en: "Back to Top", fr: "Retour en haut", ar: "العودة للأعلى" }[language],
      icon: ArrowUp,
      action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); },
      group: "actions",
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={{ en: "Type a command or search...", fr: "Tapez une commande...", ar: "اكتب أمراً أو ابحث..." }[language]} />
      <CommandList>
        <CommandEmpty>{{ en: "No results found.", fr: "Aucun resultat.", ar: "لا توجد نتائج." }[language]}</CommandEmpty>

        <CommandGroup heading={{ en: "Pages", fr: "Pages", ar: "الصفحات" }[language]}>
          {pages.map((item) => (
            <CommandItem key={item.label} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
              {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={{ en: "Sections", fr: "Sections", ar: "الأقسام" }[language]}>
          {sections.map((item) => (
            <CommandItem key={item.label} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
              {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={{ en: "Actions", fr: "Actions", ar: "الإجراءات" }[language]}>
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
