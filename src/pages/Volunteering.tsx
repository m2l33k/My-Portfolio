import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/portfolio/Footer";
import { useLanguage } from "@/context/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

interface TimelineEntry {
  role: string;
  period: string;
}

interface TimelineGroup {
  organization: string;
  logoUrl: string;
  entries: TimelineEntry[];
  type: "ieee" | "community" | "jci" | "association";
}

const groups: TimelineGroup[] = [
  {
    organization: "IEEE",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg",
    type: "ieee",
    entries: [
      { role: "Chairperson - IEEE MTT-S Chapter, SESAME University (MTT17)", period: "Dec 2024 - Present" },
      { role: "Advisor - IEEE Student Branch Task Force, SESAME University (C16)", period: "Nov 2024 - Nov 2026" },
      { role: "Advisor - IEEE IAS / PES Chapters, SESAME University (IA34 / PE31)", period: "Nov 2024 - Jan 2026" },
      { role: "Active Member - IEEE SESAME Student Branch", period: "Sep 2024 - Present" },
      { role: "Active Member - IEEE Young Professionals", period: "Sep 2023 - Present" },
      { role: "Treasurer - IEEE Women in Engineering, ESPRIT Student Branch", period: "Nov 2023 - May 2024" },
      { role: "Active Member - IEEE RAS Chapter, ESPRIT Student Branch", period: "Sep 2023 - Jun 2024" },
      { role: "Active Member - IEEE SIGHT Group, ESPRIT Student Branch", period: "Sep 2023 - Jun 2024" },
      { role: "Active Member - IEEE IAS Chapter, ESPRIT Student Branch", period: "Sep 2023 - May 2024" },
      { role: "Active Member - IEEE MTT-S Chapter, ESPRIT Student Branch", period: "Sep 2023 - May 2024" },
      { role: "Active Member - IEEE ESPRIT Student Branch", period: "Sep 2023 - Nov 2024" },
    ],
  },
  {
    organization: "Student & Community Engagement",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    type: "community",
    entries: [
      { role: "Sponsoring Manager - Comite des Eleves ESPRIT", period: "Oct 2024 - Present" },
      { role: "Active Member - Securinets Tekup", period: "Oct 2024 - Present" },
      { role: "Election Observer - ISIE", period: "Oct 2024" },
    ],
  },
  {
    organization: "JCI Tunisia",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/JCI_logo.svg/1200px-JCI_logo.svg.png",
    type: "jci",
    entries: [
      { role: "Regional Theme Advisor - Science and Technology", period: "Jan 2022 - Present" },
      { role: "Rewards File Advisor - JCI Tunisia", period: "Jan 2022 - Present" },
      { role: "Project Director - Organized a vaccination center and public open days", period: "Jun 2021 - Sep 2021" },
      { role: "National Convention Participant - JCI Tunisia", period: "Dec 2021" },
      { role: "Active Member - JCI Tunisia", period: "Mar 2020 - Present" },
    ],
  },
  {
    organization: "Other Associations",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    type: "association",
    entries: [
      { role: "Member - Croissant Rouge Tunisien", period: "Jan 2021 - Present" },
      { role: "Active Member - Coding Space ENIM", period: "Oct 2021 - Present" },
      { role: "Member - Enactus Tunisia", period: "Mar 2020 - Jan 2022" },
    ],
  },
];

const typeConfig = {
  ieee: {
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    dot: "bg-blue-400 shadow-[0_0_10px_hsl(210,90%,60%,0.5)]",
    line: "from-blue-400/30 via-blue-400/10 to-transparent",
  },
  community: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    dot: "bg-primary shadow-[0_0_10px_hsl(120,100%,50%,0.5)]",
    line: "from-primary/30 via-primary/10 to-transparent",
  },
  jci: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    dot: "bg-amber-400 shadow-[0_0_10px_hsl(45,90%,55%,0.5)]",
    line: "from-amber-400/30 via-amber-400/10 to-transparent",
  },
  association: {
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    dot: "bg-rose-400 shadow-[0_0_10px_hsl(350,80%,60%,0.5)]",
    line: "from-rose-400/30 via-rose-400/10 to-transparent",
  },
};

const Volunteering = () => {
  usePageTitle("Volunteering");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const getRoleBadge = (role: string) => {
    const lower = role.toLowerCase();
    if (lower.includes("chairperson") || lower.includes("director") || lower.includes("manager")) {
      return { label: t("volunteering.badge.leadership"), cls: "text-violet-400 bg-violet-400/10 border-violet-400/30" };
    }
    if (lower.includes("advisor") || lower.includes("treasurer")) {
      return { label: t("volunteering.badge.officer"), cls: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30" };
    }
    if (lower.includes("observer")) {
      return { label: t("volunteering.badge.civic"), cls: "text-amber-400 bg-amber-400/10 border-amber-400/30" };
    }
    return null;
  };

  const legendLabel: Record<TimelineGroup["type"], string> = {
    ieee: t("volunteering.legend.ieee"),
    community: t("volunteering.legend.community"),
    jci: t("volunteering.legend.jci"),
    association: t("volunteering.legend.association"),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_1px_20px_hsl(120,100%,50%,0.05)]">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{t("volunteering.back")}</span>
          </button>
          <h1 className="text-sm font-bold bg-gradient-cyber bg-clip-text text-transparent">{t("volunteering.navTitle")}</h1>
        </div>
      </div>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">{t("volunteering.title.left")}</span>{" "}
                <span className="bg-gradient-cyber bg-clip-text text-transparent">&</span>{" "}
                <span className="text-foreground">{t("volunteering.title.right")}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("volunteering.subtitle")}</p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {Object.entries(typeConfig).map(([key, cfg]) => (
                  <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${cfg.border} ${cfg.bg}`}>
                    <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className={`text-xs font-medium ${cfg.color}`}>{legendLabel[key as TimelineGroup["type"]]}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-12">
            {groups.map((group, gi) => {
              const cfg = typeConfig[group.type];
              return (
                <ScrollReveal key={gi} delay={gi * 0.1}>
                  <div className="group relative rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className={`relative flex items-center gap-4 px-6 py-5 border-b ${cfg.border} ${cfg.bg}`}>
                      <div className="shrink-0 p-2 rounded-lg bg-background/50 border border-primary/10">
                        <img src={group.logoUrl} alt={group.organization} className="h-8 w-8 object-contain" loading="lazy" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold ${cfg.color}`}>{group.organization}</h3>
                        <p className="text-xs text-muted-foreground">
                          {group.entries.length} {t("volunteering.roles")}
                        </p>
                      </div>
                    </div>

                    <div className="relative px-6 py-4">
                      <div className={`absolute left-9 top-4 bottom-4 w-px bg-gradient-to-b ${cfg.line}`} />

                      <div className="space-y-0">
                        {group.entries.map((entry, ei) => {
                          const badge = getRoleBadge(entry.role);
                          const roleParts = entry.role.split(" - ");
                          const roleTitle = roleParts[0];
                          const roleOrg = roleParts.slice(1).join(" - ");

                          return (
                            <div key={ei} className="relative flex items-start gap-4 py-3 group/item">
                              <div className="relative z-10 mt-1.5 shrink-0">
                                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot} ring-2 ring-background`} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-medium text-foreground/90 group-hover/item:text-foreground transition-colors">{roleTitle}</p>
                                  {badge && (
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${badge.cls}`}>
                                      {badge.label}
                                    </span>
                                  )}
                                </div>
                                {roleOrg && <p className="text-xs text-muted-foreground/70 mt-0.5">{roleOrg}</p>}
                                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground/60">
                                  <Calendar className="h-3 w-3" />
                                  {entry.period}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Volunteering;
