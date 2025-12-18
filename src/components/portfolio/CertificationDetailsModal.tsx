import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Award, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: string;
  credentialId: string;
  description: string;
  skills: string[];
  url: string;
  imageUrl?: string;
  issuerLogoUrl?: string;
  category: "Dev" | "AI" | "Cybersecurity";
}

interface CertificationDetailsModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificationDetailsModal = ({ certification, isOpen, onClose }: CertificationDetailsModalProps) => {
  if (!certification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-card border-border">
        <DialogHeader className="p-6 pb-2 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                {certification.name}
              </DialogTitle>
              <DialogDescription className="mt-2 text-base text-primary font-semibold flex items-center gap-2">
                {certification.issuerLogoUrl && (
                  <img 
                    src={certification.issuerLogoUrl} 
                    alt={certification.issuer} 
                    className="h-6 w-6 object-contain bg-white/10 rounded-sm p-0.5"
                  />
                )}
                {certification.issuer}
              </DialogDescription>
            </div>
            <Badge 
              variant={certification.status === "Active" ? "default" : "secondary"}
              className="shrink-0"
            >
              {certification.status}
            </Badge>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 min-h-0 w-full p-6 pt-2">
          <div className="space-y-6">
            {/* Image Section */}
            {certification.imageUrl ? (
              <div className="rounded-lg overflow-hidden border border-border shadow-md bg-muted/10">
                <img 
                  src={certification.imageUrl} 
                  alt={`${certification.name} Certificate`} 
                  className="w-full max-h-[300px] object-contain mx-auto"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-muted/30 rounded-lg flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-muted">
                <Award className="h-12 w-12 mb-2 opacity-50" />
                <p>No certificate image available</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Issued: {certification.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span className="break-all">ID: {certification.credentialId}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{certification.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Skills Verified</h4>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button 
                onClick={() => window.open(certification.url, '_blank')}
                className="w-full sm:w-auto"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Official Credential
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationDetailsModal;
