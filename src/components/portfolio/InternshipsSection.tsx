import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InternshipDetailsModal, { Internship } from "./InternshipDetailsModal";
import { internships } from "@/data/portfolio";

const InternshipsSection = () => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInternshipClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  return (
    <section id="internships" className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Internships</h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {internships.map((internship, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card 
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
            </ScrollReveal>
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
