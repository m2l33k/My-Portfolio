import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: {
    [key: string]: number;
  };
  contributions: Contribution[];
}

const CustomGitHubCalendar = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contributionsResponse = await fetch("https://github-contributions-api.jogruber.de/v4/m2l33k?y=last");
        if (!contributionsResponse.ok) {
          throw new Error("Failed to fetch contributions");
        }
        const contributionsJson = await contributionsResponse.json();
        setData(contributionsJson);

        const rankResponse = await fetch("https://raw.githubusercontent.com/gayanvoice/top-github-users/main/markdown/public_contributions/tunisia.md");
        if (rankResponse.ok) {
          const text = await rankResponse.text();
          const lines = text.split("\n");
          const userLineIndex = lines.findIndex((line) => line.toLowerCase().includes("m2l33k"));

          if (userLineIndex !== -1) {
            for (let i = userLineIndex; i >= 0; i--) {
              const line = lines[i];
              const match = line.match(/^\s*<td>(\d+)<\/td>/);
              if (match && match[1]) {
                setRank(parseInt(match[1], 10));
                break;
              }
              if (line.includes("<tr>")) {
                break;
              }
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 border border-red-500/20 rounded-lg bg-red-500/10">
        <p>
          {t("github.calendar.error")}: {error}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">{t("github.calendar.loading")}</span>
      </div>
    );
  }

  const weeks: Contribution[][] = [];
  let currentWeek: Contribution[] = [];

  if (data?.contributions) {
    data.contributions.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === data.contributions.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-muted/20";
      case 1:
        return "bg-primary/20";
      case 2:
        return "bg-primary/40";
      case 3:
        return "bg-primary/60";
      case 4:
        return "bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]";
      default:
        return "bg-muted/20";
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 w-full max-w-5xl mx-auto overflow-hidden shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 ring-1 ring-primary/20">
            <Github className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                {t("github.contributions")}
                <div className="text-xs font-normal text-muted-foreground mt-0.5">
                  {data?.total?.lastYear} {t("github.contributions.lastYear")}
                </div>
              </div>
              {rank && (
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t("github.rank")}</span>
                  <span className="text-sm font-bold text-primary">#{rank}</span>
                </div>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <div className="flex gap-[3px] min-w-max px-2">
            {weeks.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dIndex) => (
                  <TooltipProvider key={`${wIndex}-${dIndex}`}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <div className={`w-3 h-3 rounded-[2px] ${getLevelColor(day.level)} hover:scale-125 hover:z-10 transition-transform duration-200`} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover border-border text-popover-foreground text-xs font-mono">
                        <p>
                          <span className="font-bold text-primary">{day.count}</span> contributions
                        </p>
                        <p className="text-muted-foreground">{new Date(day.date).toLocaleDateString(lang === "fr" ? "fr-FR" : lang === "ar" ? "ar-TN" : "en-US")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-6 text-xs text-muted-foreground font-mono">
          <span>{t("github.calendar.less")}</span>
          <div className="flex gap-[3px]">
            <div className="w-3 h-3 rounded-[2px] bg-muted/20" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/20" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/40" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/60" />
            <div className="w-3 h-3 rounded-[2px] bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]" />
          </div>
          <span>{t("github.calendar.more")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomGitHubCalendar;
