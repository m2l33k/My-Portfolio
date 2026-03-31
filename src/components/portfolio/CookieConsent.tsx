import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const COOKIE_KEY = "cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  const text = lang === "en"
    ? "This site uses cookies and local storage for analytics, session management, and language preferences."
    : "Ce site utilise des cookies et le stockage local pour les analyses, la gestion de session et les preferences de langue.";

  const acceptLabel = lang === "en" ? "Accept" : "Accepter";
  const declineLabel = lang === "en" ? "Decline" : "Refuser";

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-slide-up">
      <div className="relative rounded-xl border border-primary/20 bg-card/95 backdrop-blur-md p-4 shadow-lg shadow-primary/5">
        <button
          onClick={decline}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 pr-4">
          <Cookie className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
        </div>

        <div className="flex gap-2 mt-3 ml-8">
          <Button
            size="sm"
            variant="outline"
            onClick={decline}
            className="border-primary/20 text-muted-foreground hover:text-foreground"
          >
            {declineLabel}
          </Button>
          <Button
            size="sm"
            onClick={accept}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
