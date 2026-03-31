import { useLanguage } from "@/context/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-primary/10 bg-card/50 backdrop-blur-sm text-xs font-semibold transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
      title={lang === "en" ? "Passer en Français" : "Switch to English"}
    >
      <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
      <span className="text-muted-foreground/40">/</span>
      <span className={lang === "fr" ? "text-primary" : "text-muted-foreground"}>FR</span>
    </button>
  );
};

export default LanguageToggle;
