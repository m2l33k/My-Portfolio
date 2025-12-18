import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Github, ExternalLink, Lock, Shield, Bug, Network } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "ERP SYSTEM FOR ISO 9001 PROCESS AUTOMATION",
      company: "Cocosunult",
      period: "October 2024 – May 2025",
      location: "ESPRIT",
      description: "Integrated an ERP system to automate ISO 9001 compliance, reducing manual work by 60% and improving quality management through real-time reporting.",
      icon: Briefcase,
      category: "Enterprise Software",
      technologies: ["SpringBoot", "Angular 19 ", "PostgreSQL", "Maven", "Git", "Jenkins", "Docker", "Kubernetes", "Jira"],
      highlights: ["60% reduction in manual work", "Real-time compliance reporting", "Quality management automation"],
      status: "Completed",
    },
    {
      title: "AI-DRIVEN CYBERSECURITY INCIDENT RESPONSE PLATFORM",
      company: "IEEE",
      period: "July 2024 – Sep 2024",
      location: "",
      description: "Designed an AI/ML-based platform for automated threat analysis, integrating Snort/Suricata to accelerate incident response by 35%",
      icon: Shield,
      category: "AI/Cybersecurity",
      technologies: ["Python", "Scikit-learn", "Snort", "Suricata", "Pandas", "NumPy", "Jupyter Notebook"],
      highlights: ["35% faster incident response", "Automated threat analysis", "ML-based detection"],
      status: "Completed",
    },
    {
      title: "Techpioneers",
      company: "Personal Project",
      period: "2025",
      location: "",
      description: "A project focused on developing innovative software solutions for modern engineering challenges.",
      icon: Briefcase,
      category: "Web Development",
      technologies: ["Symfony 6", "MySQL"],
      highlights: ["Innovative software solutions", "Modern engineering focus"],
      status: "Completed",
    },
    {
      title: "BASIC NETWORK SNIFFER",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "An initial phase of network traffic monitoring to detect suspicious activities in cybersecurity.",
      icon: Network,
      category: "Cyber Security",
      technologies: ["Python", "Scapy"],
      highlights: ["Network traffic monitoring", "Suspicious activity detection"],
      status: "Completed",
    },
    {
      title: "Phishing Awareness Training",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "A training program designed to raise awareness and prevent phishing attacks through interactive sessions.",
      icon: Shield,
      category: "Cyber Security",
      technologies: [],
      highlights: ["Interactive training sessions", "Phishing attack prevention"],
      status: "Completed",
    },
    {
      title: "SmartShield AI-Powered",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "An advanced cybersecurity solution powered by AI to detect and prevent threats in real-time.",
      icon: Shield,
      category: "Cyber Security",
      technologies: ["Python", "TensorFlow" , "SAST" , "DAST" , "Nmap" , "Jupyter" , "Git" , "Docker","OWASP" , "ZAP"],
      highlights: ["AI-powered threat detection", "Real-time prevention"],
      status: "Completed",
    },
    {
      title: "NextJEEL",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "A web development project focused on creating a modern, responsive platform for interactive learning.",
      icon: Briefcase,
      category: "Web Development",
      technologies: ["React.js"],
      highlights: ["Modern & responsive platform", "Interactive learning focus"],
      status: "Completed",
    },
    {
      title: "Luducatio - Robot éducatif pour l'apprentissage des échecs",
      company: "Personal Project",
      period: "2024",
      location: "",
      description: "An educational web project integrating a robotic platform for chess learning and skill-building.",
      icon: Briefcase,
      category: "Web Development",
      technologies: ["python" , "machine learning" , "opencv"],
      highlights: ["Robotic platform integration", "Chess learning application"],
      status: "Completed",
    },
  ];

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

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <project.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {project.category}
                      </Badge>
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
                <p className="text-muted-foreground">{project.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>


              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;