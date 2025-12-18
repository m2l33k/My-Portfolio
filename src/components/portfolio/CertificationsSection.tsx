import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, ExternalLink, Calendar, CheckCircle, Eye, 
  Cpu, Shield, Code, Cloud, Server, Database, Github, Flag, Lock, Network, Blocks, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CertificationDetailsModal, { Certification } from "./CertificationDetailsModal";
import { certifications } from "@/data/portfolio";

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (cert: Certification) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const getProviderIcon = (issuer: string) => {
    const normalizedIssuer = issuer.toLowerCase();
    if (normalizedIssuer.includes("nvidia")) return <Cpu className="h-5 w-5" />;
    if (normalizedIssuer.includes("cisco")) return <Shield className="h-5 w-5" />; // or Network
    if (normalizedIssuer.includes("python")) return <Code className="h-5 w-5" />;
    if (normalizedIssuer.includes("aws")) return <Cloud className="h-5 w-5" />;
    if (normalizedIssuer.includes("ibm")) return <Server className="h-5 w-5" />;
    if (normalizedIssuer.includes("oracle")) return <Database className="h-5 w-5" />;
    if (normalizedIssuer.includes("github")) return <Github className="h-5 w-5" />;
    if (normalizedIssuer.includes("tryhackme")) return <Flag className="h-5 w-5" />;
    if (normalizedIssuer.includes("secops")) return <Lock className="h-5 w-5" />;
    if (normalizedIssuer.includes("hashgraph")) return <Blocks className="h-5 w-5" />;
    return <Award className="h-5 w-5" />;
  };

  const categories = ["All", "Dev", "AI", "Cybersecurity"];

  return (
    <section id="certifications" className="py-24 bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Award className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Professional Credentials</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cybersecurity, AI, and cloud technologies
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-secondary/50 p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications
                  .filter(cert => category === "All" || cert.category === category)
                  .map((cert, index) => (
                    <Card key={index} className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow flex flex-col h-full">
                      <CardHeader>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 flex-1 mr-2">
                              {cert.name}
                            </CardTitle>
                            <div className="flex flex-col items-end gap-2">
                              <Badge 
                                variant={cert.status === "Active" ? "default" : "secondary"}
                                className={`shrink-0 ${cert.status === "Active" ? "bg-primary text-primary-foreground" : ""}`}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {cert.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                            <div className="p-1 bg-primary/10 rounded-md h-8 w-8 flex items-center justify-center shrink-0">
                              {cert.issuerLogoUrl ? (
                                <img 
                                  src={cert.issuerLogoUrl} 
                                  alt={cert.issuer} 
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                getProviderIcon(cert.issuer)
                              )}
                            </div>
                            {cert.issuer}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 flex-1 flex flex-col">
                        <p className="text-muted-foreground text-sm line-clamp-3 flex-1">{cert.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {cert.date}
                          </div>
                          <div className="truncate max-w-[150px]" title={cert.credentialId}>
                            ID: {cert.credentialId}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-[10px]">
                              {skill}
                            </Badge>
                          ))}
                          {cert.skills.length > 3 && (
                            <Badge variant="outline" className="text-[10px]">
                              +{cert.skills.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="pt-2 mt-auto grid grid-cols-2 gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleOpenModal(cert)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button variant="outline" size="sm" className="w-full group">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Verify
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <CertificationDetailsModal 
        certification={selectedCert} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default CertificationsSection;