import { Card } from "@/components/ui/card";
import { Briefcase, BarChart, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { projects, internships, certifications } from "@/data/portfolio";

const CountUp = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
};

const PortfolioStats = () => {
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const stats = [
    { name: "Projects Completed", value: completedProjects, icon: Briefcase },
    { name: "Internships", value: internships.length, icon: BarChart },
    { name: "Certifications", value: certifications.length, icon: Award },
  ];

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm">
      <div className="flex justify-around divide-x divide-border">
        {stats.map((stat, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2">
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                <CountUp end={stat.value} />
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PortfolioStats;
