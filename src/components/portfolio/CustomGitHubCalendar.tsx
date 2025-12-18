import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contributions
        const contributionsResponse = await fetch('https://github-contributions-api.jogruber.de/v4/m2l33k?y=last');
        if (!contributionsResponse.ok) {
          throw new Error('Failed to fetch contributions');
        }
        const contributionsJson = await contributionsResponse.json();
        setData(contributionsJson);

        // Fetch rank from raw markdown
        const rankResponse = await fetch('https://raw.githubusercontent.com/gayanvoice/top-github-users/main/markdown/public_contributions/tunisia.md');
        if (rankResponse.ok) {
          const text = await rankResponse.text();
          const lines = text.split('\n');
          // Find the line index containing the username (case-insensitive check)
          const userLineIndex = lines.findIndex(line => line.toLowerCase().includes('m2l33k'));
          
          if (userLineIndex !== -1) {
            // Search backwards from the user line to find the rank
            // The format seems to be:
            // <tr>
            //   <td>RANK</td>
            //   <td>
            //     <a href="...">...m2l33k...</a>
            for (let i = userLineIndex; i >= 0; i--) {
              const line = lines[i];
              // Check for <td>NUMBER</td>
              const match = line.match(/^\s*<td>(\d+)<\/td>/);
              if (match && match[1]) {
                setRank(parseInt(match[1]));
                break;
              }
              // If we hit a <tr> start without finding a rank, stop to avoid wrong rank
              if (line.includes('<tr>')) {
                break;
              }
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 border border-red-500/20 rounded-lg bg-red-500/10">
        <p>Unable to load GitHub activity: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading contributions...</span>
      </div>
    );
  }

  // Helper to group contributions by week
  const weeks: Contribution[][] = [];
  let currentWeek: Contribution[] = [];
  
  // The API returns a flat array of days. We need to group them into weeks (columns).
  // Standard GitHub calendar is Sunday-based or Monday-based.
  // The API typically returns 365+ days.
  
  if (data?.contributions) {
    data.contributions.forEach((day, index) => {
      currentWeek.push(day);
      // If we have 7 days or it's the last day, push the week
      if (currentWeek.length === 7 || index === data.contributions.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
  }

  // Color mapping based on level (0-4)
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-muted/20"; // Empty
      case 1: return "bg-primary/20"; // Low
      case 2: return "bg-primary/40"; // Medium
      case 3: return "bg-primary/60"; // High
      case 4: return "bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]"; // Very High
      default: return "bg-muted/20";
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
                GitHub Contributions
                <div className="text-xs font-normal text-muted-foreground mt-0.5">
                  {data?.total?.lastYear} contributions in the last year
                </div>
              </div>
              {rank && (
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Tunisia Rank</span>
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
                        <div
                          className={`w-3 h-3 rounded-[2px] ${getLevelColor(day.level)} hover:scale-125 hover:z-10 transition-transform duration-200`}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover border-border text-popover-foreground text-xs font-mono">
                        <p>
                          <span className="font-bold text-primary">{day.count}</span> contributions
                        </p>
                        <p className="text-muted-foreground">{day.date}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-6 text-xs text-muted-foreground font-mono">
          <span>Less</span>
          <div className="flex gap-[3px]">
            <div className="w-3 h-3 rounded-[2px] bg-muted/20" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/20" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/40" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/60" />
            <div className="w-3 h-3 rounded-[2px] bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomGitHubCalendar;
