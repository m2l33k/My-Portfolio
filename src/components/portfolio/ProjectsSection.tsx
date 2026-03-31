import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Github } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useLanguage } from "@/context/LanguageContext";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { t, lang } = useLanguage();
  const { projects } = usePortfolioData();

  const categories = [
    { value: "All", label: t("projects.tab.all") },
    { value: "Cybersecurity", label: t("projects.tab.cybersecurity") },
    { value: "AI", label: t("projects.tab.ai") },
    { value: "Dev", label: t("projects.tab.dev") },
  ];

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const getStatusLabel = (status: string) => {
    if (status === "Completed") return lang === "ar" ? "مكتمل" : lang === "fr" ? "Termine" : "Completed";
    if (status === "In Development") return lang === "ar" ? "قيد التطوير" : lang === "fr" ? "En cours" : "In Development";
    return status;
  };

  const getCategoryLabel = (category: string) => {
    if (category === "Dev") return t("projects.tab.dev");
    if (category === "AI") return t("projects.tab.ai");
    if (category === "Cybersecurity") return t("projects.tab.cybersecurity");
    return category;
  };

  const getCompanyLabel = (company: string) => {
    if (company === "Personal Project") {
      return lang === "ar" ? "مشروع شخصي" : lang === "fr" ? "Projet Personnel" : "Personal Project";
    }
    return company;
  };

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Briefcase className="h-6 w-6" />
              <span className="text-sm uppercase tracking-wide">{t("projects.eyebrow")}</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">{t("projects.featured")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                onClick={() => setActiveCategory(category.value)}
                className="min-w-[100px] transition-all duration-300"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card
                className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer hover:scale-[1.02] active:scale-[0.98] h-full"
                onClick={() => handleProjectClick(project)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <project.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.githubUrl, "_blank");
                              }}
                              title={t("projects.source")}
                            >
                              <Github className="h-5 w-5" />
                            </Button>
                          )}
                          <Badge variant="outline" className="w-fit">
                            {getCategoryLabel(project.category)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                        <p>{getCompanyLabel(project.company)}</p>
                        <p>{project.period}</p>
                        {project.location && <p>{project.location}</p>}
                      </div>
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"} className="mt-2 w-fit">
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground line-clamp-3">{project.description}</p>

                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">{t("projects.highlights")}</h4>
                    <ul className="space-y-1">
                      {project.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {highlight}
                        </li>
                      ))}
                      {project.highlights.length > 2 && (
                        <li className="text-xs text-primary mt-1 italic">
                          + {project.highlights.length - 2} {t("projects.more")}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">{t("projects.technologies")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ProjectDetailsModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ProjectsSection;





