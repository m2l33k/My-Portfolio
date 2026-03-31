import { useState } from "react";
import { Sparkles, X, Mail, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HireMeBanner = () => {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();

  if (!visible) return null;

  const handleVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Hassayoun Malek Aziz
N:Hassayoun;Malek Aziz;;;
EMAIL;TYPE=INTERNET:malekaziz.hassayoun@esprit.tn
TEL;TYPE=CELL:+21653117541
URL:https://malekportfolio.vercel.app
TITLE:Security Engineer & AI Developer
ORG:ESPRIT
NOTE:Engineering student building LLM-powered security automation systems.
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Hassayoun_Malek_Aziz.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="relative bg-background/90 backdrop-blur-xl border-t border-primary/15 shadow-[0_-4px_30px_hsl(120,100%,50%,0.06)]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary/50 animate-ping" />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="h-4 w-4 text-primary shrink-0 hidden sm:block" />
                <p className="text-sm font-medium text-foreground truncate">
                  <span className="text-primary">{t("hire.status")}</span>
                  <span className="text-muted-foreground hidden sm:inline"> {t("hire.detail")}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleVCard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Download className="h-3 w-3" />
                <span className="hidden sm:inline">{t("hire.vcard")}</span>
              </button>
              <a
                href="mailto:malekaziz.hassayoun@esprit.tn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-[0_0_15px_hsl(120,100%,50%,0.2)]"
              >
                <Mail className="h-3 w-3" />
                <span className="hidden sm:inline">{t("hire.cta")}</span>
              </a>
              <button
                onClick={() => setVisible(false)}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-card/80 transition-all duration-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMeBanner;
