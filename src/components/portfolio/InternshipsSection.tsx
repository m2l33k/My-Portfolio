import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InternshipDetailsModal, { Internship } from "./InternshipDetailsModal";

const InternshipsSection = () => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const internships: Internship[] = [
    {
      company: "OXYNAS",
      role: "INTERN IN AI-POWERED WEB APPLICATION PENTESTING",
      period: "June 2025 – August 2025",
      location: "Paris / Remote",
      description: "Developed an AI-powered penetration testing agent designed to automate the security assessment of web applications Integrated advanced vulnerability scanning techniques enhanced by machine learning to identify potential threats more efficiently Achieved higher detection accuracy while significantly reducing manual testing time, streamlining the overall security testing process",
      logoUrl: "oxynas-logo-slogan.png",
      companyUrl: "https://oxynas.com/",
      technologies: ["AI", "Web Security", "Python", "Automation"],
      certificateUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766060184/Capture_d_%C3%A9cran_2025-12-18_131425_kcqq6t.png"
    },
    {
      company: "ESPRIT",
      role: "BLOCKCHAIN & AI RESEARCH INTERN – SMART GRID SECURITY",
      period: "July 2025 – Present",
      location: "Tunis, Tunisia",
      description: "Developed a blockchain-based solution for smart grid security, analyzing performance, reliability, and latency in a simulated environment, achieving a benchmark latency of 49.5 ms for anomaly detection in the model.",
      logoUrl: "image-removebg-preview(17).png",
      companyUrl: "https://esprit.tn",
      technologies: ["Blockchain", "AI", "Smart Grid", "Security Research"],
      certificateUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766060218/WhatsApp_Image_2025-12-18_at_13.16.30_s57ofs.jpg"
    },
    {
      company: "TALAN-TUNISIA",
      role: "PENTESTING WEB APPLICATION INTERN",
      period: "June 2024 – September 2024",
      location: "Tunis, Tunisia",
      description: "Enhanced ZAP Proxy-based pentesting through automation and custom scripts, accelerating vulnerability assessment.",
      logoUrl: "image-removebg-preview(16).png",
      companyUrl: "https://talan.com",
      technologies: ["OWASP ZAP", "Python", "Web Security", "Automation"],
      certificateUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766060199/Capture_d_%C3%A9cran_2025-12-18_131434_qjcrmc.png"
    },
    {
      company: "ESPRIT",
      role: "PENTESTING WIFI/BLUETOOTH INTERN",
      period: "June 2024 – August 2024",
      location: "Tunis, Tunisia",
      description: "Simulated wireless network attacks, identified vulnerabilities, and implemented countermeasures, reducing the attack surface by 40%.",
      logoUrl: "image-removebg-preview(17).png",
      companyUrl: "https://esprit.tn",
      technologies: ["Wireless Security", "Bluetooth Security", "Network Attacks", "Countermeasures"],
      certificateUrl: "https://res.cloudinary.com/dvmuvjukn/image/upload/v1766060203/Capture_d_%C3%A9cran_2025-12-18_131442_r92h0t.png"
    },
  ];

  const handleInternshipClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  return (
    <section id="internships" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Internships</h2>
        </div>

        <div className="space-y-8">
          {internships.map((internship, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-glow group"
              onClick={() => handleInternshipClick(internship)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex items-center justify-center p-6 bg-muted/40 group-hover:bg-primary/5 transition-colors duration-300">
                  <img src={internship.logoUrl} alt={`${internship.company} logo`} className="h-20 w-auto object-contain" />
                </div>
                <div className="md:w-3/4">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">{internship.company}</CardTitle>
                    <p className="text-primary font-semibold">{internship.role}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                      <p>{internship.period}</p>
                      <p>{internship.location}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2">{internship.description}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <InternshipDetailsModal 
        internship={selectedInternship}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default InternshipsSection;
