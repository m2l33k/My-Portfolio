import { useLanguage } from "@/context/LanguageContext";

type Lang = "en" | "fr" | "ar";

const langs: Lang[] = ["en", "fr", "ar"];
const labels: Record<Lang, string> = { en: "EN", fr: "FR", ar: "ع" };

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  const next = () => {
    const idx = langs.indexOf(lang);
    setLang(langs[(idx + 1) % langs.length]);
  };

  return (
    <button
      onClick={next}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-primary/10 bg-card/50 backdrop-blur-sm text-xs font-semibold transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
      title={`Language: ${lang.toUpperCase()}`}
    >
      {langs.map((l, i) => (
        <span key={l}>
          {i > 0 && <span className="text-muted-foreground/40">/</span>}
          <span className={lang === l ? "text-primary" : "text-muted-foreground"}>
            {labels[l]}
          </span>
        </span>
      ))}
    </button>
  );
};

export default LanguageToggle;
