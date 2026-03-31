import { useState, useEffect, useCallback } from "react";
import { Languages, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useLanguage } from "@/context/LanguageContext";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const LanguagesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const categories: SkillCategory[] = [
    {
      title: t("skills.category.languages"),
      skills: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
        { name: "PowerShell", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      ],
    },
    {
      title: t("skills.category.frameworks"),
      skills: [
        { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        { name: "Symfony", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg" },
        { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      ],
    },
    {
      title: t("skills.category.securityTools"),
      skills: [
        { name: "Burp Suite", icon: "https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg" },
        { name: "Metasploit", icon: "https://www.kali.org/tools/metasploit-framework/images/metasploit-framework-logo.svg" },
        { name: "Wireshark", icon: "https://upload.wikimedia.org/wikipedia/commons/d/df/Wireshark_icon.svg" },
        { name: "Nmap", icon: "https://nmap.org/images/sitelogo-nmap.svg" },
        { name: "OWASP ZAP", icon: "https://www.zaproxy.org/img/zap-logo.svg" },
        { name: "John the Ripper", icon: "https://www.kali.org/tools/john/images/john-logo.svg" },
        { name: "pfSense", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b9/PfSense_logo.png" },
        { name: "Kali Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      ],
    },
    {
      title: t("skills.category.devops"),
      skills: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      ],
    },
  ];

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section id="languages" className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Languages className="h-6 w-6" />
              <span className="text-sm uppercase tracking-wide">{t("skills.label")}</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">{t("skills.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("skills.subtitle")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => scrollTo(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  current === i
                    ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_15px_hsl(120,100%,50%,0.1)]"
                    : "text-muted-foreground border border-primary/10 hover:text-primary hover:border-primary/20 hover:bg-primary/5"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute -left-2 sm:-left-14 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
              disabled={current === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute -right-2 sm:-right-14 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
              disabled={current === categories.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <Carousel setApi={setApi} opts={{ align: "center", loop: false }} className="w-full">
              <CarouselContent>
                {categories.map((cat) => (
                  <CarouselItem key={cat.title}>
                    <div className="relative rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm p-6 sm:p-8">
                      <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                      <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6">
                        {cat.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 blur-xl rounded-full transition-all duration-300" />
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="relative h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary text-center transition-colors duration-200">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  current === i
                    ? "w-8 h-2 bg-primary shadow-[0_0_8px_hsl(120,100%,50%,0.3)]"
                    : "w-2 h-2 bg-primary/20 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
