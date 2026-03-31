import { useEffect, useState } from "react";
import { X, Keyboard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const KeyboardShortcutsModal = () => {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  const title = lang === "en" ? "Keyboard Shortcuts" : "Raccourcis Clavier";

  const groups = [
    {
      title: lang === "en" ? "Navigation" : "Navigation",
      shortcuts: [
        { keys: ["Ctrl", "K"], desc: lang === "en" ? "Open command palette" : "Ouvrir la palette de commandes" },
        { keys: ["Esc"], desc: lang === "en" ? "Go home / scroll to top" : "Accueil / retour en haut" },
        { keys: ["?"], desc: lang === "en" ? "Toggle this modal" : "Afficher/masquer ce modal" },
      ],
    },
    {
      title: lang === "en" ? "Sections" : "Sections",
      shortcuts: [
        { keys: ["1"], desc: lang === "en" ? "About" : "A propos" },
        { keys: ["2"], desc: lang === "en" ? "Certifications" : "Certifications" },
        { keys: ["3"], desc: lang === "en" ? "Projects" : "Projets" },
        { keys: ["4"], desc: lang === "en" ? "Experience" : "Stages/Experience" },
        { keys: ["5"], desc: lang === "en" ? "Education" : "Formation" },
        { keys: ["6"], desc: lang === "en" ? "Skills" : "Competences" },
        { keys: ["7"], desc: lang === "en" ? "Motivation" : "Motivation" },
      ],
    },
  ];

  return (
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
            {lang === "en"
              ? "Press ? to close"
              : "Appuyez sur ? pour fermer"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
