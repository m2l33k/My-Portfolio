import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Trophy, Target, Award, Loader2 } from "lucide-react";

interface THMStats {
  rank: number;
  topPercentage: number;
  completedRoomsNumber: number;
  badgesNumber: number;
  level: number;
  points: number; // Assuming points might be available or calculated
}

const TryHackMeStats = () => {
  const [stats, setStats] = useState<THMStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/tryhackme-stats');
        if (!response.ok) {
          throw new Error('Failed to fetch THM stats');
        }
        const json = await response.json();
        // The API returns { status: "success", data: { ... } }
        if (json.status === 'success' && json.data) {
             setStats(json.data);
        } else {
             throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive/20 w-full max-w-5xl mx-auto mt-6">
        <CardContent className="p-6 text-center text-destructive">
          <p>Error loading TryHackMe stats: {error}</p>
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

  if (!stats) return null;

  return (
    <Card className="bg-[#11191f] border-[#202c36] hover:border-[#88cc14]/50 transition-all duration-300 w-full max-w-5xl mx-auto mt-6 overflow-hidden shadow-lg shadow-[#88cc14]/5">
      <CardHeader className="bg-[#162028] border-b border-[#202c36]">
        <CardTitle className="text-xl text-white flex items-center gap-3">
          <div className="p-2 rounded-md bg-[#88cc14]/10 ring-1 ring-[#88cc14]/20">
            <Shield className="h-5 w-5 text-[#88cc14]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                TryHackMe Profile
                <div className="text-xs font-normal text-gray-400 mt-0.5">
                  Cybersecurity Training Progress
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#88cc14]/10 px-3 py-1.5 rounded-full border border-[#88cc14]/20">
                <span className="text-xs text-[#88cc14] uppercase tracking-wider font-semibold">Level</span>
                <span className="text-sm font-bold text-white">{stats.level}</span>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Rank */}
            <div className="flex flex-col items-center p-4 rounded-lg bg-[#162028] border border-[#202c36] hover:border-[#88cc14]/30 transition-colors">
                <Trophy className="h-6 w-6 text-[#88cc14] mb-2" />
                <span className="text-2xl font-bold text-white">#{stats.rank}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Global Rank</span>
            </div>

            {/* Top % */}
            <div className="flex flex-col items-center p-4 rounded-lg bg-[#162028] border border-[#202c36] hover:border-[#88cc14]/30 transition-colors">
                <Target className="h-6 w-6 text-[#88cc14] mb-2" />
                <span className="text-2xl font-bold text-white">Top {stats.topPercentage}%</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Percentile</span>
            </div>

            {/* Rooms Completed */}
            <div className="flex flex-col items-center p-4 rounded-lg bg-[#162028] border border-[#202c36] hover:border-[#88cc14]/30 transition-colors">
                <Shield className="h-6 w-6 text-[#88cc14] mb-2" />
                <span className="text-2xl font-bold text-white">{stats.completedRoomsNumber}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Rooms Completed</span>
            </div>

             {/* Badges */}
             <div className="flex flex-col items-center p-4 rounded-lg bg-[#162028] border border-[#202c36] hover:border-[#88cc14]/30 transition-colors">
                <Award className="h-6 w-6 text-[#88cc14] mb-2" />
                <span className="text-2xl font-bold text-white">{stats.badgesNumber}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Badges Earned</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TryHackMeStats;
