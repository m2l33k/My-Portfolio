import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, X, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@vercel/analytics";

interface CvDownloadModalProps {
  onClose: () => void;
}

const cvFiles = [
  { key: "cv.english" as const, file: "/Cvs/malek_Hassayoun_Cv_EN.pdf" },
  { key: "cv.french" as const, file: "/Malek_Aziz_hassayoun.pdf" },
];

const CvDownloadModal: React.FC<CvDownloadModalProps> = ({ onClose }) => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const { t } = useLanguage();

  if (previewFile) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col z-50">
        <div className="flex items-center justify-between px-4 py-3 bg-background/90 border-b border-primary/10">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-medium">{t("cv.previewTitle")}</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={previewFile} download onClick={() => track("cv_download", { file: previewFile, source: "preview" })}>
              <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                <Download className="mr-2 h-3.5 w-3.5" />
                {t("cv.download")}
              </Button>
            </a>
            <Button size="sm" variant="ghost" onClick={() => setPreviewFile(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <iframe
            src={`${previewFile}#toolbar=1&navpanes=0`}
            className="w-full h-full rounded-lg border border-primary/10 bg-white"
            title={t("cv.previewTitle")}
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
              {t("cv.title")}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {cvFiles.map((cv) => (
              <div key={cv.key} className="rounded-lg border border-primary/10 bg-card/50 p-4 hover:border-primary/25 transition-all duration-200">
                <p className="text-sm font-medium text-foreground mb-3">{t(cv.key)}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
                    onClick={() => setPreviewFile(cv.file)}
                  >
                    <Eye className="mr-2 h-3.5 w-3.5" />
                    {t("cv.preview")}
                  </Button>
                  <a href={cv.file} download className="flex-1" onClick={() => track("cv_download", { file: cv.file, source: "modal" })}>
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      {t("cv.download")}
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
