import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Clock3, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/portfolio/Footer";
import { useLanguage } from "@/context/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

const Blog = () => {
  usePageTitle("Blog");
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_1px_20px_hsl(120,100%,50%,0.05)]">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/portfolio")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{t("blog.back")}</span>
          </button>
          <h1 className="text-sm font-bold bg-gradient-cyber bg-clip-text text-transparent">{t("blog.title")}</h1>
        </div>
      </div>

      <main className="relative pt-24 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-56 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-72 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <ScrollReveal>
            <section className="mx-auto max-w-5xl rounded-3xl border border-primary/20 bg-card/55 backdrop-blur-md p-6 md:p-10 shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_20px_80px_hsl(var(--primary)/0.12)]">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                  <Clock3 className="h-3.5 w-3.5" />
                  Launching Soon
                </div>

                <h2 className="mt-6 text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  <span className="text-foreground">Blog</span>
                  <span className="mx-2 text-primary">&</span>
                  <span className="text-foreground">Write-ups</span>
                  <br />
                  <span className="bg-gradient-cyber bg-clip-text text-transparent">Coming Soon</span>
                </h2>

                <p className="mt-5 text-base md:text-lg text-muted-foreground">
                  {t("blog.subtitle")}
                </p>
                <p className="mt-2 text-sm text-muted-foreground/80">{t("blog.comingSoon")}</p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-4 text-left">
                  <div className="mb-2 inline-flex rounded-md bg-amber-400/20 p-2 text-amber-300">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">CTF Write-ups</p>
                  <p className="mt-1 text-xs text-muted-foreground">Step-by-step exploit notes and methodology breakdowns.</p>
                </div>

                <div className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-4 text-left">
                  <div className="mb-2 inline-flex rounded-md bg-red-400/20 p-2 text-red-300">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Security Research</p>
                  <p className="mt-1 text-xs text-muted-foreground">Real-case findings, tooling, and defensive insights.</p>
                </div>

                <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-4 text-left">
                  <div className="mb-2 inline-flex rounded-md bg-cyan-400/20 p-2 text-cyan-300">
                    <Bot className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">AI Tutorials</p>
                  <p className="mt-1 text-xs text-muted-foreground">Practical guides for AI in security and automation.</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => navigate("/portfolio")}
                  className="rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                >
                  {t("blog.back")}
                </button>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
