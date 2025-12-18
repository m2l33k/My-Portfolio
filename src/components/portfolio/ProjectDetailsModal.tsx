import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, MapPin, Building2, CheckCircle2 } from "lucide-react";

// Define the interface based on usage in ProjectsSection
export interface Project {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  icon: any;
  category: string;
  technologies: string[];
  highlights: string[];
  status: string;
  images?: string[]; // New field for photos
}

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
  if (!project) return null;

  // Default placeholder images if none provided
  const images = project.images && project.images.length > 0 
    ? project.images 
    : [
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg"
      ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <project.icon className="h-6 w-6 text-primary" />
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-base">
                {project.category}
              </DialogDescription>
            </div>
            <Badge 
              variant={project.status === "Completed" ? "default" : "secondary"}
              className="shrink-0"
            >
              {project.status}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 pt-0">
          <div className="space-y-8">
            {/* Image Carousel */}
            <div className="w-full px-12">
              <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                  {images.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden border">
                          <img 
                            src={img} 
                            alt={`${project.title} screenshot ${index + 1}`} 
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About the Project</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{project.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{project.period}</span>
                  </div>
                  {project.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{project.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
