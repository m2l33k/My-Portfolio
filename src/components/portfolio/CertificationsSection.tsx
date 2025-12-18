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

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certifications: Certification[] = [
    {
      name: "Fundamentals of Deep Learning",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "1tO0Ys3ITkGJkXM3sgBKrQ",
      description: "Deep learning fundamentals and practical implementation using Python",
      skills: ["Deep Learning", "Python", "Neural Networks", "AI Development"],
      url: "https://learn.nvidia.com/certificates?id=1tO0Ys3ITkGJkXM3sgBKrQ",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766062573/Capture_d_%C3%A9cran_2025-12-18_133650_axmqmq.png"
    },
    {
      name: "Evaluation and Light Customization of Large Language Models",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "M9kdR7yQQ5WiuvosdW_R4g",
      description: "Evaluation and light customization of large language models",
      skills: ["Large Language Models", "Evaluation", "Customization"],
      url: "https://learn.nvidia.com/certificates?id=M9kdR7yQQ5WiuvosdW_R4g",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766062259/Capture_d_%C3%A9cran_2025-12-18_133555_zkr4yk.png"
    },
    {
      name: "Building RAG Agents with LLMs",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "qjskPdObSiC6MS5RlXreLA",
      description: "Building Retrieval Augmented Generation (RAG) agents using Large Language Models.",
      skills: ["RAG", "LLMs", "Generative AI", "LangChain"],
      url: "https://learn.nvidia.com/certificates?id=qjskPdObSiC6MS5RlXreLA",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766061577/Capture_d_%C3%A9cran_2025-12-18_133407_litasi.png"
    },
    {
      name: "Getting Started with AI on Jetson Nano",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "GnzRATHpSIajte8xXpnjoA",
      description: "Fundamentals of AI and deep learning on NVIDIA Jetson Nano.",
      skills: ["Edge AI", "Jetson Nano", "Deep Learning", "Computer Vision"],
      url: "https://learn.nvidia.com/certificates?id=GnzRATHpSIajte8xXpnjoA",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766061783/Capture_d_%C3%A9cran_2025-12-18_133421_xtnv7j.png"
    },
    {
      name: "AppSec (CAP)",
      issuer: "The SECOPS GROUP",
      date: "2025",
      status: "Active",
      credentialId: "10087776",
      description: "Application security fundamentals and secure development practices",
      skills: ["Application Security", "Secure Coding", "OWASP", "Vulnerability Assessment"],
      url: "https://pentestingexams.com/certificate-validation/",
      category: "Cybersecurity",
      issuerLogoUrl: "https://secops.group/wp-content/uploads/2024/03/logo-pentesting-services-pentesting-exams.png",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766062273/Capture_d_%C3%A9cran_2025-12-18_133612_scjsyh.png"
    },
    {
      name: "Scrum Foundation",
      issuer: "CertiProf",
      date: "2024",
      status: "Active",
      credentialId: "8440a79c-603f-485b-9f98-8fca213a817c",
      description: "Agile project management and Scrum methodology fundamentals",
      skills: ["Agile Development", "Scrum", "Project Management", "Team Collaboration"],
      url: "https://www.credly.com/badges/8440a79c-603f-485b-9f98-8fca213a817c/public_url",
      category: "Dev",
      issuerLogoUrl: "https://certiprof.com/cdn/shop/files/CertiProf-Logo_200x.png"
    },
    {
      name: "Hashgraph Developer",
      issuer: "The Hashgraph Association",
      date: "2025",
      status: "Active",
      credentialId: "2d0ed167-0b26-41b3-a16d-5d373cd4463b",
      description: "Hashgraph development and implementation",
      skills: ["Hashgraph", "Development", "Implementation", "Smart Contracts"],
      url: "https://certs.hashgraphdev.com/2d0ed167-0b26-41b3-a16d-5d373cd4463b.pdf",
      category: "Dev",
      issuerLogoUrl: "https://import.cdn.thinkific.com/134097%2Fcustom_site_themes%2Fid%2F73zuG3fHQRigUmlmhQql_bta-new-logo.png",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766062332/Capture_d_%C3%A9cran_2025-12-18_133619_zclayl.png"
    },
    {
      name: "Oracle AI Vector Search Certified Professional",
      issuer: "Oracle",
      date: "2025",
      status: "Active",
      credentialId: "3E1FD1803CC8A032863018AAA3A21D25C6D09345062A6BFB2848FF12D7C94AAE",
      description: "AI vector search implementation and optimization",
      skills: ["AI", "Vector Search", "Implementation", "Optimization"],
      url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=3E1FD1803CC8A032863018AAA3A21D25C6D09345062A6BFB2848FF12D7C94AAE",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
      imageUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766062255/Capture_d_%C3%A9cran_2025-12-18_133548_actqdp.png"
    },
    {
      name: "Cisco Cybersecurity",
      issuer: "Cisco",
      date: "2024",
      status: "Active",
      credentialId: "a48a3270-e587-47a0-ad30-9a183c5c4c42",
      description: "Network security fundamentals and Cisco security technologies",
      skills: ["Network Security", "Cisco Technologies", "Threat Detection", "Security Protocols"],
      url: "https://www.credly.com/badges/a48a3270-e587-47a0-ad30-9a183c5c4c42/public_url",
      category: "Cybersecurity",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766062595/Capture_d_%C3%A9cran_2025-12-18_133720_ldpf4j.png"
    },
    {
      name: "Github Foundation",
      issuer: "GitHub",
      date: "2025",
      status: "Active",
      credentialId: "2307d695-4e5c-4488-8578-7cda57c82d0a",
      description: "Version control and collaborative development with Git and GitHub",
      skills: ["Version Control", "Git", "GitHub", "Collaborative Development"],
      url: "https://www.credly.com/badges/2307d695-4e5c-4488-8578-7cda57c82d0a/public_url",
      category: "Dev",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766063863/Capture_d_%C3%A9cran_2025-12-18_141358_af8iqq.png"
    },
    {
      name: "TryHackMe Pre Security",
      issuer: "TryHackMe",
      date: "2025",
      status: "Active",
      credentialId: "THM-PRESEC-001",
      description: "Cybersecurity fundamentals and ethical hacking basics",
      skills: ["Cybersecurity Basics", "Ethical Hacking", "Network Security", "Linux"],
      url: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-YALUUJOW4H.pdf",
      category: "Cybersecurity",
      issuerLogoUrl: "https://assets.tryhackme.com/img/THMlogo.png",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766063874/Capture_d_%C3%A9cran_2025-12-18_141703_epurbc.png"
    },
    {
      name: "IBM Data Visualization",
      issuer: "IBM",
      date: "2024",
      status: "Active",
      credentialId: "3e8597df-085b-4c34-be6a-a47a657f93b6",
      description: "Data visualization techniques and business intelligence",
      skills: ["Data Visualization", "Business Intelligence", "Analytics", "Dashboard Design"],
      url: "https://www.credly.com/badges/3e8597df-085b-4c34-be6a-a47a657f93b6/public_url",
      category: "Dev",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" , 
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766064544/Capture_d_%C3%A9cran_2025-12-18_142747_phfbwv.png"
    },
    {
      name: "DevSecOps Learning",
      issuer: "TryHackMe",
      date: "2025",
      status: "Active",
      credentialId: "DEVSECOPS-001",
      description: "Security integration in DevOps pipelines and secure development",
      skills: ["DevSecOps", "CI/CD Security", "Infrastructure as Code", "Security Automation"],
      url: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-YALUUJOW4H.pdf",
      category: "Cybersecurity",
      issuerLogoUrl: "https://assets.tryhackme.com/img/THMlogo.png",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766063868/Capture_d_%C3%A9cran_2025-12-18_141503_simms7.png"
    },
    {
      name: "Python Essentials 1",
      issuer: "Python Institute",
      date: "2025",
      status: "Active",
      credentialId: "054bf6b2-8d3d-468e-a078-ec3473a2afff",
      description: "Foundational concepts of computer programming and the Python language.",
      skills: ["Python", "Programming Basics", "Data Types", "Control Flow"],
      url: "https://www.credly.com/badges/054bf6b2-8d3d-468e-a078-ec3473a2afff/public_url",
      category: "Dev",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766064528/Capture_d_%C3%A9cran_2025-12-18_142832_gbgtcz.png"
    },
    {
      name: "AI for Anomaly Detection",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "TDSSTGVqTMmdSBKhU66_bg",
      description: "Implementing AI models for detecting anomalies in industrial data.",
      skills: ["AI", "Anomaly Detection", "Deep Learning", "Industrial IoT"],
      url: "https://learn.nvidia.com/certificates?id=TDSSTGVqTMmdSBKhU66_bg",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766061789/Capture_d_%C3%A9cran_2025-12-18_133434_q0r49c.png"
    },
    {
      name: "Generative AI with Diffusion Models",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "PdQJK76xS2OHwU0Yn_AIWA",
      description: "Deep dive into generative AI and diffusion models.",
      skills: ["Generative AI", "Diffusion Models", "Computer Vision", "Deep Learning"],
      url: "https://learn.nvidia.com/certificates?id=PdQJK76xS2OHwU0Yn_AIWA",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766061801/Capture_d_%C3%A9cran_2025-12-18_133450_ogslwd.png"
    },
    {
      name: "AI for Predictive Maintenance",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "HTAHASfdRuekTxCPxk5QfA",
      description: "Using AI to predict equipment failures and optimize maintenance.",
      skills: ["Predictive Maintenance", "Time Series Analysis", "AI", "Industrial AI"],
      url: "https://learn.nvidia.com/certificates?id=HTAHASfdRuekTxCPxk5QfA#",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766061795/Capture_d_%C3%A9cran_2025-12-18_133443_hqdns0.png"
    },
    {
      name: "Ethical Hacker",
      issuer: "Cisco",
      date: "2025",
      status: "Active",
      credentialId: "d99c8f70-d850-4db5-a0f8-8f95d57b6623",
      description: "Proficiency in offensive security testing and ethical hacking methodologies.",
      skills: ["Ethical Hacking", "Penetration Testing", "Security Assessment", "Vulnerability Analysis"],
      url: "https://www.credly.com/badges/d99c8f70-d850-4db5-a0f8-8f95d57b6623/public_url",
      category: "Cybersecurity",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766064047/Capture_d_%C3%A9cran_2025-12-18_142033_dhfegq.png"
    },
    {
      name: "AWS Training Badge",
      issuer: "AWS",
      date: "2025",
      status: "Active",
      credentialId: "c8c788e5-d0d9-4723-95b4-e78d4c268aec",
      description: "Fundamental understanding of AWS Cloud concepts and services.",
      skills: ["Cloud Computing", "AWS Services", "Cloud Security", "Infrastructure"],
      url: "https://www.credly.com/badges/c8c788e5-d0d9-4723-95b4-e78d4c268aec/public_url",
      category: "Dev",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" , 
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766064538/Capture_d_%C3%A9cran_2025-12-18_142706_grdmhk.png"
    },
    {
      name: "Networking Basics",
      issuer: "Cisco",
      date: "2025",
      status: "Active",
      credentialId: "9fd70672-a3d4-4f9e-965b-a0e595643164",
      description: "Foundational knowledge of network protocols, devices, and operations.",
      skills: ["Networking", "TCP/IP", "OSI Model", "Network Troubleshooting"],
      url: "https://www.credly.com/badges/9fd70672-a3d4-4f9e-965b-a0e595643164/public_url",
      category: "Cybersecurity",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766063929/Capture_d_%C3%A9cran_2025-12-18_141233_qeltyb.png"
    },
    {
      name: "Natural Language Processing",
      issuer: "NVIDIA",
      date: "2025",
      status: "Active",
      credentialId: "9Pfvt0O-Sz29etyyFrXRFw",
      description: "Modern NLP techniques using deep learning and transformers.",
      skills: ["NLP", "Transformers", "BERT", "Text Classification"],
      url: "https://learn.nvidia.com/certificates?id=9Pfvt0O-Sz29etyyFrXRFw",
      category: "AI",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      imageUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766061778/Capture_d_%C3%A9cran_2025-12-18_133414_wq08hg.png"
    },
    {
      name: "Junior Cybersecurity Analyst",
      issuer: "Cisco",
      date: "2025",
      status: "Active",
      credentialId: "213294e0-c258-4c39-acda-2036a43982bf",
      description: "Entry-level cybersecurity operations and incident response.",
      skills: ["Security Operations", "Incident Response", "Threat Analysis", "Network Security"],
      url: "https://www.credly.com/badges/213294e0-c258-4c39-acda-2036a43982bf/public_url",
      category: "Cybersecurity",
      issuerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
      imageUrl : "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766061968/Capture_d_%C3%A9cran_2025-12-18_133518_mfdouk.png"
    },
    {
      name: "Lifelong Learning 2025",
      issuer: "CertiProf",
      date: "2025",
      status: "Active",
      credentialId: "1f5ae449-0f69-4587-b700-a41ebd54178c",
      description: "Demonstrated unwavering commitment to lifelong learning, open-mindedness, and continuous professional development in the digital world.",
      skills: ["Lifelong Learning", "Career Development", "Growth Mindset", "Continuing Education", "Professional Ethics"],
      url: "https://www.credly.com/badges/1f5ae449-0f69-4587-b700-a41ebd54178c/public_url",
      category: "Dev",
      issuerLogoUrl: "https://certiprof.com/cdn/shop/files/CertiProf-Logo_200x.png",
      imageUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766064699/lifelong-learning-2025_zj6bql.png"
    }
  ];

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