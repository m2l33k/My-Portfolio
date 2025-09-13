import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Languages, Globe, BookOpen } from "lucide-react";

const LanguagesSection = () => {
  const skills = [
    "Python", "PHP", "Java", "C",
    "Bash", "PowerShell", "Problem solving",
    "React.js", "Symfony", "Spring Boot",
    "Wireshark", "Metasploit", "Nmap",
    "Burp Suite", "pfSense", "OWASP ZAP",
    "John the Ripper", "Git", "Windows|Linux",
    "Penetration Testing", "Threat Analysis",
    "Secure SDLC", "Incident Response"
  ];

  return (
    <section id="languages" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Languages className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Communication Skills</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Languages</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multilingual capabilities enabling global cybersecurity collaboration
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-lg p-4">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;