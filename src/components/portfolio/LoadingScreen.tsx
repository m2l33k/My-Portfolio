import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const { t } = useLanguage();

  const lines = [
    t("hero.loading.line1"),
    t("hero.loading.line2"),
    t("hero.loading.line3"),
    t("hero.loading.line4"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setPhase(0);
    else if (progress < 55) setPhase(1);
    else if (progress < 85) setPhase(2);
    else setPhase(3);

    if (progress >= 100) {
      setTimeout(() => setFadeOut(true), 300);
      setTimeout(() => onComplete(), 800);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(120 100% 50% / 0.08) 1px, transparent 1px), linear-gradient(to bottom, hsl(120 100% 50% / 0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(120,100%,50%,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <Shield className="relative h-16 w-16 text-primary drop-shadow-[0_0_20px_hsl(120,100%,50%,0.4)]" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">RootKeeper</h1>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">{t("hero.loading.systemLabel")}</p>
        </div>

        <div className="w-72 sm:w-80 space-y-1.5 font-mono text-xs">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 transition-all duration-300 ${
                i <= phase ? (i === phase ? "text-primary" : "text-muted-foreground/60") : "text-transparent"
              }`}
            >
              <span className={i < phase ? "text-primary/60" : i === phase ? "text-primary" : ""}>
                {i < phase ? "[done]" : i === phase ? "[....]" : "      "}
              </span>
              <span>{line}</span>
            </div>
          ))}
        </div>

        <div className="w-72 sm:w-80 space-y-2">
          <div className="h-1 rounded-full bg-card overflow-hidden border border-primary/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-cyan-400 transition-all duration-100 ease-linear shadow-[0_0_10px_hsl(120,100%,50%,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-[10px] text-muted-foreground/50 font-mono">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
