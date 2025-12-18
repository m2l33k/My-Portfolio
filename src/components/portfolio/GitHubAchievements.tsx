import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Achievement {
  name: string;
  image: string;
}

const GitHubAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Use relative path to leverage Vite proxy
        const response = await fetch('/api/github-achievements');
        if (!response.ok) {
          throw new Error(`Failed to fetch achievements: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error("GitHub Achievements Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive/20 w-full max-w-5xl mx-auto mt-6">
        <CardContent className="p-6 text-center text-destructive">
          <p>Error loading achievements: {error}</p>
          <p className="text-xs mt-2 text-muted-foreground">Make sure the backend server is running (npm run dev).</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border w-full max-w-5xl mx-auto mt-6">
        <CardContent className="p-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (achievements.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 w-full max-w-5xl mx-auto mt-6 overflow-hidden shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 ring-1 ring-primary/20">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div>
            GitHub Achievements
            <div className="text-xs font-normal text-muted-foreground mt-0.5">
              Badges earned from GitHub activity
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {achievements.map((achievement) => (
            <TooltipProvider key={achievement.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="group relative w-24 h-24 flex items-center justify-center bg-card/50 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                    <img 
                      src={achievement.image} 
                      alt={achievement.name} 
                      className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-popover border-border">
                  <p className="font-semibold text-primary">{achievement.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubAchievements;
