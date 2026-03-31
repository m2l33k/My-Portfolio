import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, X, FileText } from "lucide-react";

interface CvDownloadModalProps {
  onClose: () => void;
}

const cvFiles = [
  { label: "English", file: "/Malek_Aziz_hassayoun_English.pdf" },
  { label: "French", file: "/Malek_Aziz_hassayoun.pdf" },
];

const CvDownloadModal: React.FC<CvDownloadModalProps> = ({ onClose }) => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  if (previewFile) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col z-50">
        {/* Preview header */}
        <div className="flex items-center justify-between px-4 py-3 bg-background/90 border-b border-primary/10">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-medium">CV Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={previewFile} download>
              <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                <Download className="mr-2 h-3.5 w-3.5" />
                Download
              </Button>
            </a>
            <Button size="sm" variant="ghost" onClick={() => setPreviewFile(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF embed */}
        <div className="flex-1 p-4">
          <iframe
            src={`${previewFile}#toolbar=1&navpanes=0`}
            className="w-full h-full rounded-lg border border-primary/10 bg-white"
            title="CV Preview"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <Card className="w-full max-w-sm mx-4 border-primary/10 bg-card/95 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Curriculum Vitae
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {cvFiles.map((cv) => (
              <div
                key={cv.label}
                className="rounded-lg border border-primary/10 bg-card/50 p-4 hover:border-primary/25 transition-all duration-200"
              >
                <p className="text-sm font-medium text-foreground mb-3">
                  {cv.label} Version
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
                    onClick={() => setPreviewFile(cv.file)}
                  >
                    <Eye className="mr-2 h-3.5 w-3.5" />
                    Preview
                  </Button>
                  <a href={cv.file} download className="flex-1">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Download
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CvDownloadModal;
