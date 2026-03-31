import { useEffect, useState } from "react";
import { X, Keyboard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HINT_DISMISSED_KEY = "shortcuts-hint-dismissed";

const KeyboardShortcutsModal = () => {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { lang } = useLanguage();

  // Show the tooltip hint for first-time visitors
  useEffect(() => {
    const dismissed = localStorage.getItem(HINT_DISMISSED_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setShowHint(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => {
      setShowHint(false);
      localStorage.setItem(HINT_DISMISSED_KEY, "true");
    }, 8000);
    return () => clearTimeout(timer);
  }, [showHint]);

  // Listen for ? key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setShowHint(false);
        localStorage.setItem(HINT_DISMISSED_KEY, "true");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleButtonClick = () => {
    setOpen(true);
    setShowHint(false);
    localStorage.setItem(HINT_DISMISSED_KEY, "true");
  };

  const i = (en: string, fr: string, ar: string) => ({ en, fr, ar }[lang]);

  const title = i("Keyboard Shortcuts", "Raccourcis Clavier", "Ø§Ø®ØªØµØ§Ø±Ø§Øª Ù„ÙˆØ­Ø© Ø§Ù„Ù…ÙØ§ØªÙŠØ­");

  const groups = [
    {
      title: i("Navigation", "Navigation", "Ø§Ù„ØªÙ†Ù‚Ù„"),
      shortcuts: [
        { keys: ["Ctrl", "K"], desc: i("Open command palette", "Ouvrir la palette de commandes", "ÙØªØ­ Ù„ÙˆØ­Ø© Ø§Ù„Ø£ÙˆØ§Ù…Ø±") },
        { keys: ["Esc"], desc: i("Go home / scroll to top", "Accueil / retour en haut", "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ© / Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø£Ø¹Ù„Ù‰") },
        { keys: ["?"], desc: i("Toggle this modal", "Afficher/masquer ce modal", "Ø¥Ø¸Ù‡Ø§Ø±/Ø¥Ø®ÙØ§Ø¡ Ù‡Ø°Ù‡ Ø§Ù„Ù†Ø§ÙØ°Ø©") },
      ],
    },
    {
      title: i("Sections", "Sections", "Ø§Ù„Ø£Ù‚Ø³Ø§Ù…"),
      shortcuts: [
        { keys: ["1"], desc: i("About", "A propos", "Ù†Ø¨Ø°Ø© Ø¹Ù†ÙŠ") },
        { keys: ["2"], desc: i("Certifications", "Certifications", "Ø§Ù„Ø´Ù‡Ø§Ø¯Ø§Øª") },
        { keys: ["3"], desc: i("Projects", "Projets", "Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹") },
        { keys: ["4"], desc: i("Experience", "Stages/Experience", "\u0627\u0644\u062A\u062F\u0631\u064A\u0628/\u0627\u0644\u062E\u0628\u0631\u0629") },
        { keys: ["5"], desc: i("Education", "Formation", "Ø§Ù„ØªØ¹Ù„ÙŠÙ…") },
        { keys: ["6"], desc: i("Skills", "Competences", "Ø§Ù„Ù…Ù‡Ø§Ø±Ø§Øª") },
        { keys: ["7"], desc: i("Motivation", "Motivation", "Ø§Ù„Ø¯Ø§ÙØ¹") },
      ],
    },
  ];

  return (
    <>
      {/* Floating keyboard button */}
      <div className="fixed left-4 bottom-24 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={handleButtonClick}
          aria-label={i("Keyboard shortcuts", "Raccourcis clavier", "Ø§Ø®ØªØµØ§Ø±Ø§Øª Ù„ÙˆØ­Ø© Ø§Ù„Ù…ÙØ§ØªÙŠØ­")}
          className="group relative rounded-full border border-primary/30 bg-card/85 p-3 text-primary shadow-[0_10px_24px_hsl(120,100%,50%,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:shadow-[0_12px_30px_hsl(120,100%,50%,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Keyboard className="h-4 w-4" />
          {/* Pulse ring for first-time visitors */}
          {showHint && (
            <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping pointer-events-none" />
          )}
        </button>

        {/* Tooltip for new users */}
        {showHint && (
          <div className="animate-fade-in rounded-lg border border-primary/20 bg-card/95 backdrop-blur-md px-3 py-2 shadow-lg shadow-primary/5 max-w-[200px]">
            <p className="text-xs text-muted-foreground">
              {{ en: "Try keyboard shortcuts! Press ", fr: "Essayez les raccourcis ! Appuyez sur ", ar: "Ø¬Ø±Ù‘Ø¨ Ø§Ù„Ø§Ø®ØªØµØ§Ø±Ø§Øª! Ø§Ø¶ØºØ· " }[lang]}
              <kbd className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded border border-primary/20 bg-primary/5 text-[10px] font-mono font-medium text-foreground">
                ?
              </kbd>
              {{ en: " to see all", fr: " pour tout voir", ar: " Ù„Ø±Ø¤ÙŠØ© Ø§Ù„ÙƒÙ„" }[lang]}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="relative w-full max-w-md mx-4 rounded-xl border border-primary/20 bg-card/95 backdrop-blur-md p-6 shadow-lg shadow-primary/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Shortcut groups */}
            <div className="space-y-5">
              {groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-3">
                    {group.title}
                  </h3>
                  <div className="space-y-2">
                    {group.shortcuts.map((shortcut) => (
                      <div key={shortcut.desc} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{shortcut.desc}</span>
                        <div className="flex items-center gap-1">
                          {shortcut.keys.map((key, i) => (
                            <span key={i}>
                              <kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-6 px-1.5 rounded border border-primary/20 bg-primary/5 text-xs font-mono font-medium text-foreground">
                                {key}
                              </kbd>
                              {i < shortcut.keys.length - 1 && (
                                <span className="text-muted-foreground mx-0.5 text-xs">+</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer hint */}
            <div className="mt-5 pt-4 border-t border-primary/10 text-center">
              <p className="text-xs text-muted-foreground">
                {{ en: "Press ? to close", fr: "Appuyez sur ? pour fermer", ar: "Ø§Ø¶ØºØ· ? Ù„Ù„Ø¥ØºÙ„Ø§Ù‚" }[lang]}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardShortcutsModal;



