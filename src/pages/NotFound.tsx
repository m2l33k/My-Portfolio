import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

const terminalLines = [
  { text: "$ ssh root@portfolio.local", delay: 0 },
  { text: "Connecting to 192.168.1.1...", delay: 400 },
  { text: "Authentication failed.", delay: 900 },
  { text: "", delay: 1200 },
  { text: "$ curl -X GET {path}", delay: 1400 },
  { text: "HTTP/1.1 404 Not Found", delay: 1900, color: "text-red-400" },
  { text: "Content-Type: text/html", delay: 2100 },
  { text: "", delay: 2300 },
  { text: "ERROR: Route not found in server routing table.", delay: 2500, color: "text-amber-400" },
  { text: "Suggestion: Return to authenticated zone.", delay: 2900, color: "text-primary" },
];

const NotFound = () => {
  usePageTitle("404 Not Found");
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        terminalLines[visibleLines]?.delay
          ? terminalLines[visibleLines].delay - (visibleLines > 0 ? terminalLines[visibleLines - 1].delay : 0)
          : 300
      );
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(120 100% 50% / 0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(120 100% 50% / 0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(0,80%,50%,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 w-full max-w-2xl mx-4">
        {/* Terminal window */}
        <div className="rounded-xl border border-primary/10 bg-card/80 backdrop-blur-md overflow-hidden shadow-[0_0_60px_hsl(120,100%,50%,0.05)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-primary/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="flex-1 text-center text-xs text-muted-foreground font-mono">
              root@rootkeeper ~ {location.pathname}
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm space-y-1 min-h-[280px]">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={line.color || "text-foreground/80"}>
                {line.text.replace("{path}", location.pathname)}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className={`text-primary ${showCursor ? "opacity-100" : "opacity-0"}`}>
                _
              </span>
            )}
          </div>
        </div>

        {/* Below terminal */}
        <div className="mt-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-red-400 drop-shadow-[0_0_15px_hsl(0,80%,50%,0.4)]" />
            <h1 className="text-4xl font-bold">
              <span className="text-red-400">4</span>
              <span className="text-foreground">0</span>
              <span className="text-red-400">4</span>
            </h1>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-red-400 uppercase tracking-widest">
              {t("404.title")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("404.subtitle")}
            </p>
          </div>

          <button
            onClick={() => navigate("/portfolio")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_hsl(120,100%,50%,0.1)]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("404.home")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
