import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Code2, Briefcase, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

const Welcome = () => {
  usePageTitle();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();

  const langOptions: { value: "en" | "fr" | "ar"; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "fr", label: "FR" },
    { value: "ar", label: "عر" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.06)_0%,transparent_60%)]" />

      {/* Language switcher */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 right-6 flex gap-1 z-10"
      >
        {langOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setLang(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              lang === opt.value
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl w-full">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <Shield className="relative h-14 w-14 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t("welcome.title")}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              {t("welcome.subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Technical Card */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/portfolio")}
            className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-300 text-center cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {t("welcome.technical")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {t("welcome.technicalDesc")}
              </p>
            </div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs font-mono">
              &rarr;
            </div>
          </motion.button>

          {/* Recruiter Card */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/recruiter")}
            className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-300 text-center cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {t("welcome.recruiter")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {t("welcome.recruiterDesc")}
              </p>
            </div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs font-mono">
              &rarr;
            </div>
          </motion.button>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground/50 font-mono"
        >
          Hassayoun Malek Aziz &mdash; Security Engineer &amp; AI Developer
        </motion.p>
      </div>
    </div>
  );
};

export default Welcome;
