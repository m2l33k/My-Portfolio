import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/portfolio/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: "ctf" | "security" | "ai" | "tutorial";
  slug: string;
}

const posts: BlogPost[] = [
  {
    title: "Building an AI-Powered Pentesting Agent: Reducing Manual Testing by 60%",
    excerpt:
      "How I designed and built an autonomous AI agent that automates web application security testing using LLMs, achieving 85% OWASP vulnerability detection coverage.",
    date: "2026-03-15",
    readTime: "8 min",
    tags: ["AI", "Pentesting", "LLM", "Automation"],
    category: "ai",
    slug: "ai-pentesting-agent",
  },
  {
    title: "RAG Architectures for Cybersecurity: Building Context-Aware Threat Analysis",
    excerpt:
      "Exploring how Retrieval-Augmented Generation can enhance threat intelligence by combining real-time vulnerability databases with LLM reasoning capabilities.",
    date: "2026-02-20",
    readTime: "6 min",
    tags: ["RAG", "LLM", "Threat Intelligence", "AI"],
    category: "security",
    slug: "rag-cybersecurity",
  },
  {
    title: "Blockchain-Based Smart Grid Security: Achieving 49.5ms Anomaly Detection",
    excerpt:
      "A deep dive into my research on using blockchain consensus mechanisms to secure smart grid infrastructure, benchmarking latency and reliability.",
    date: "2026-01-10",
    readTime: "10 min",
    tags: ["Blockchain", "Smart Grid", "Security", "Research"],
    category: "security",
    slug: "blockchain-smart-grid",
  },
  {
    title: "TryHackMe: Breaking Into the Top 5% — My Journey and Key Lessons",
    excerpt:
      "Sharing the strategies, tools, and mindset that helped me reach the top 5% on TryHackMe, from basic CTF challenges to advanced exploitation techniques.",
    date: "2025-11-05",
    readTime: "7 min",
    tags: ["TryHackMe", "CTF", "Learning Path", "Pentesting"],
    category: "ctf",
    slug: "tryhackme-top-5",
  },
  {
    title: "Prompt Engineering for Security Automation: A Practical Guide",
    excerpt:
      "How to craft effective prompts for AI-driven security tools, from vulnerability scanning to incident response automation.",
    date: "2025-09-18",
    readTime: "5 min",
    tags: ["Prompt Engineering", "AI", "Security", "Tutorial"],
    category: "tutorial",
    slug: "prompt-engineering-security",
  },
];

const categoryConfig = {
  ctf: { color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", label: "CTF" },
  security: { color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", label: "Security" },
  ai: { color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", label: "AI" },
  tutorial: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", label: "Tutorial" },
};

const Blog = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_1px_20px_hsl(120,100%,50%,0.05)]">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{t("blog.back")}</span>
          </button>
          <h1 className="text-sm font-bold bg-gradient-cyber bg-clip-text text-transparent">
            {t("blog.title")}
          </h1>
        </div>
      </div>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Title */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">Blog</span>{" "}
                <span className="bg-gradient-cyber bg-clip-text text-transparent">&</span>{" "}
                <span className="text-foreground">Write-ups</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("blog.subtitle")}
              </p>

              {/* Category filter pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {Object.entries(categoryConfig).map(([key, cfg]) => (
                  <span
                    key={key}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${cfg.border} ${cfg.bg} ${cfg.color}`}
                  >
                    {cfg.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Posts */}
          <div className="max-w-3xl mx-auto space-y-6">
            {posts.map((post, i) => {
              const cfg = categoryConfig[post.category];
              return (
                <ScrollReveal key={post.slug} delay={i * 0.08}>
                  <article className="group relative rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/25 transition-all duration-300 cursor-pointer">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${cfg.border} ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      {/* Tags & Read more */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-card border border-primary/10 text-[11px] text-muted-foreground"
                            >
                              <Tag className="h-2.5 w-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {t("blog.readMore")}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}

            {/* Coming soon */}
            <ScrollReveal delay={posts.length * 0.08}>
              <div className="text-center py-8 text-sm text-muted-foreground/50 font-mono">
                {t("blog.comingSoon")}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
