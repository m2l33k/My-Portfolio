import { Card } from "@/components/ui/card";
import { Briefcase, BarChart } from "lucide-react";

const PortfolioStats = () => {
  const stats = [
    { name: "Projects Completed", value: 8, icon: Briefcase },
    { name: "Internships", value: 4, icon: BarChart },
  ];

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm">
      <div className="flex justify-around divide-x divide-border">
        {stats.map((stat, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2">
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PortfolioStats;
