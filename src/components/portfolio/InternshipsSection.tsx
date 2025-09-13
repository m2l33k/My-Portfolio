import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InternshipsSection = () => {
  const internships = [
    {
      company: "OXYNAS",
      role: "INTERN IN AI-POWERED WEB APPLICATION PENTESTING",
      period: "June 2025 – August 2025",
      location: "Paris / Remote",
      description: "Developed an AI-based web pentesting automation tool, enhancing vulnerability detection and reducing manual effort by 80%",
      logoUrl: "oxynas-logo-slogan.png", // Replace with actual path or URL
    },
    {
      company: "ESPRIT",
      role: "BLOCKCHAIN & AI RESEARCH INTERN – SMART GRID SECURITY",
      period: "July 2025 – Present",
      location: "Tunis, Tunisia",
      description: "Developed a blockchain-based solution for smart grid security, analyzing performance, reliability, and latency in a simulated environment, achieving a benchmark latency of 49.5 ms for anomaly detection in the model.",
      logoUrl: "image-removebg-preview(17).png", // Replace with actual path or URL
    },
    {
      company: "TALAN-TUNISIA",
      role: "PENTESTING WEB APPLICATION INTERN",
      period: "June 2024 – September 2024",
      location: "Tunis, Tunisia",
      description: "Enhanced ZAP Proxy-based pentesting through automation and custom scripts, accelerating vulnerability assessment.",
      logoUrl: "image-removebg-preview(16).png", // Replace with actual path or URL
    },
    {
      company: "ESPRIT",
      role: "PENTESTING WIFI/BLUETOOTH INTERN",
      period: "June 2024 – August 2024",
      location: "Tunis, Tunisia",
      description: "Simulated wireless network attacks, identified vulnerabilities, and implemented countermeasures, reducing the attack surface by 40%.",
      logoUrl: "image-removebg-preview(17).png", // Replace with actual path or URL
    },
  ];

  return (
    <section id="internships" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Internships</h2>
        </div>

        <div className="space-y-8">
          {internships.map((internship, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex items-center justify-center p-6 bg-muted/40">
                  <img src={internship.logoUrl} alt={`${internship.company} logo`} className="h-20 w-auto object-contain" />
                </div>
                <div className="md:w-3/4">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{internship.company}</CardTitle>
                    <p className="text-primary font-semibold">{internship.role}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <p>{internship.period}</p>
                      <p>{internship.location}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{internship.description}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternshipsSection;
