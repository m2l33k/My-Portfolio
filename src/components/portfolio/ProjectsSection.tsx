import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Github, ExternalLink, Lock, Shield, Bug, Network } from "lucide-react";
import ProjectDetailsModal from "./ProjectDetailsModal";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      title: "ERP SYSTEM FOR ISO 9001 PROCESS AUTOMATION",
      company: "Cocosunult",
      period: "October 2024 – May 2025",
      location: "ESPRIT",
      description: "Integrated an ERP system to automate ISO 9001 compliance, reducing manual work by 60% and improving quality management through real-time reporting.",
      icon: Briefcase,
      category: "Dev",
      technologies: ["SpringBoot", "Angular 19 ", "PostgreSQL", "Maven", "Git", "Jenkins", "Docker", "Kubernetes", "Jira"],
      highlights: ["60% reduction in manual work", "Real-time compliance reporting", "Quality management automation"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"],
      githubUrl: "https://github.com/yourusername/erp-iso-9001"
    },
    {
      title: "AI-DRIVEN CYBERSECURITY INCIDENT RESPONSE PLATFORM",
      company: "IEEE",
      period: "July 2024 – Sep 2024",
      location: "",
      description: "Designed an AI/ML-based platform for automated threat analysis, integrating Snort/Suricata to accelerate incident response by 35%",
      icon: Shield,
      category: "IA",
      technologies: ["Python", "Scikit-learn", "Snort", "Suricata", "Pandas", "NumPy", "Jupyter Notebook"],
      highlights: ["35% faster incident response", "Automated threat analysis", "ML-based detection"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      title: "Techpioneers",
      company: "Personal Project",
      period: "2025",
      location: "",
      description: "A project focused on developing innovative software solutions for modern engineering challenges.",
      icon: Briefcase,
      category: "Dev",
      technologies: ["Symfony 6", "MySQL"],
      highlights: ["Innovative software solutions", "Modern engineering focus"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      title: "BASIC NETWORK SNIFFER",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "An initial phase of network traffic monitoring to detect suspicious activities in cybersecurity.",
      icon: Network,
      category: "Cybersecurity",
      technologies: ["Python", "Scapy"],
      highlights: ["Network traffic monitoring", "Suspicious activity detection"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      title: "Phishing Awareness Training",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "A training program designed to raise awareness and prevent phishing attacks through interactive sessions.",
      icon: Shield,
      category: "Cybersecurity",
      technologies: [],
      highlights: ["Interactive training sessions", "Phishing attack prevention"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      title: "SmartShield AI-Powered",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "An advanced cybersecurity solution powered by AI to detect and prevent threats in real-time.",
      icon: Shield,
      category: "IA",
      technologies: ["Python", "TensorFlow" , "SAST" , "DAST" , "Nmap" , "Jupyter" , "Git" , "Docker","OWASP" , "ZAP"],
      highlights: ["AI-powered threat detection", "Real-time prevention"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      title: "NextJEEL",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "A web development project focused on creating a modern, responsive platform for interactive learning.",
      icon: Briefcase,
      category: "Dev",
      technologies: ["React.js"],
      highlights: ["Modern & responsive platform", "Interactive learning focus"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      title: "Luducatio - Robot éducatif pour l'apprentissage des échecs",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "An educational web project integrating a robotic platform for chess learning and skill-building.",
      icon: Briefcase,
      category: "IA",
      technologies: ["python" , "machine learning" , "opencv"],
      highlights: ["Robotic platform integration", "Chess learning application"],
      status: "Completed",
      images: ["/placeholder.svg", "/placeholder.svg"]
    },
  ];

  const categories = ["All", "Cybersecurity", "IA", "Dev"];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Briefcase className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Portfolio</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing real-world cybersecurity projects and solutions I've developed
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="min-w-[100px] transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={index} 
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => handleProjectClick(project)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <project.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-primary" 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              window.open(project.githubUrl, '_blank'); 
                            }}
                            title="View Source Code"
                          >
                            <Github className="h-5 w-5" />
                          </Button>
                        )}
                        <Badge variant="outline" className="w-fit">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                      <p>{project.company}</p>
                      <p>{project.period}</p>
                      {project.location && <p>{project.location}</p>}
                    </div>
                    <Badge 
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className="mt-2 w-fit"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {project.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {highlight}
                      </li>
                    ))}
                    {project.highlights.length > 2 && (
                      <li className="text-xs text-primary mt-1 italic">
                        + {project.highlights.length - 2} more (click to view)
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Technologies:</h4>
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
          ))}
        </div>
      </div>
      
      <ProjectDetailsModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default ProjectsSection;