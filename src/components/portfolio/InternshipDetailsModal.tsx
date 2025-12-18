import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, Calendar, MapPin, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Internship {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  logoUrl: string;
  companyUrl?: string;
  certificateUrl?: string;
  technologies?: string[];
}

interface InternshipDetailsModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
}

const InternshipDetailsModal = ({ internship, isOpen, onClose }: InternshipDetailsModalProps) => {
  if (!internship) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 shrink-0 bg-muted/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-background rounded-lg border shadow-sm shrink-0">
              <img 
                src={internship.logoUrl} 
                alt={`${internship.company} logo`} 
                className="h-12 w-12 object-contain"
              />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-primary">
                {internship.role}
              </DialogTitle>
              <DialogDescription className="mt-1 text-lg font-medium text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {internship.company}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                <Calendar className="h-4 w-4" />
                {internship.period}
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                <MapPin className="h-4 w-4" />
                {internship.location}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Overview</h4>
              <p className="text-muted-foreground leading-relaxed">
                {internship.description}
              </p>
            </div>

            {internship.technologies && internship.technologies.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground">Technologies & Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {internship.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {internship.companyUrl && (
                <Button 
                  onClick={() => window.open(internship.companyUrl, '_blank')}
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Company
                </Button>
              )}
              {internship.certificateUrl && (
                <Button 
                  variant="outline"
                  onClick={() => window.open(internship.certificateUrl, '_blank')}
                  className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Award className="h-4 w-4" />
                  View Certificate
                </Button>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default InternshipDetailsModal;
