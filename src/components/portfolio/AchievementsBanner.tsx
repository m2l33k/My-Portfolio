import { useEffect, useState, useRef } from "react";
import { Award, Users, Briefcase, Shield, GraduationCap, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const CountUp = ({ end, suffix = "+" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const AchievementsBanner = () => {
  const { t } = useLanguage();

  const achievements = [
    { icon: Users, value: 11, label: t("achievements.ieeeRoles"), color: "text-blue-400" },
    { icon: Award, value: 23, label: t("achievements.certifications"), color: "text-amber-400" },
    { icon: Briefcase, value: 13, label: t("achievements.projects"), color: "text-primary" },
    { icon: Shield, value: 8, label: t("achievements.internships"), color: "text-cyan-400" },
    { icon: Heart, value: 6, suffix: "+ yrs", label: t("achievements.volunteering"), color: "text-rose-400" },
    { icon: GraduationCap, value: 2, label: t("achievements.degrees"), color: "text-violet-400" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">{t("achievements.title")}</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative max-w-4xl mx-auto rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 pointer-events-none" />
            <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {achievements.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="group flex flex-col items-center gap-2 p-6 border-b sm:border-b lg:border-b-0 border-r border-primary/5 last:border-r-0 hover:bg-primary/5 transition-all duration-300"
                  >
                    <Icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-3xl font-bold text-foreground">
                      <CountUp end={item.value} suffix={item.suffix || "+"} />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground text-center">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AchievementsBanner;
