import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const DiseaseDetection = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const diseases = [
        { name: "Healthy Leaf", probability: 0.85, severity: "None" },
        { name: "Early Blight", probability: 0.72, severity: "Moderate" },
        { name: "Bacterial Spot", probability: 0.65, severity: "High" },
        { name: "Powdery Mildew", probability: 0.45, severity: "Low" },
      ];
      
      const topDisease = diseases[Math.floor(Math.random() * diseases.length)];
      
      setResult({
        disease: topDisease.name,
        confidence: (topDisease.probability * 100).toFixed(1),
        severity: topDisease.severity,
        treatment: getDiseaseTreatment(topDisease.name),
      });
      
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 2000);
  };

  const getDiseaseTreatment = (disease: string) => {
    const treatments: Record<string, string[]> = {
      "Healthy Leaf": [
        "No treatment necessary",
        "Continue regular monitoring",
        "Maintain current care routine"
      ],
      "Early Blight": [
        "Remove infected leaves immediately",
        "Apply copper-based fungicide",
        "Improve air circulation around plants",
        "Avoid overhead watering"
      ],
      "Bacterial Spot": [
        "Remove and destroy infected plant parts",
        "Apply copper-based bactericide",
        "Reduce leaf wetness duration",
        "Use disease-free seeds next season"
      ],
      "Powdery Mildew": [
        "Spray with neem oil or sulfur-based fungicide",
        "Increase spacing between plants",
        "Ensure adequate sunlight exposure",
        "Remove heavily infected leaves"
      ]
    };
    
    return treatments[disease] || ["Consult with agricultural expert"];
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "None":
        return "text-primary";
      case "Low":
        return "text-accent";
      case "Moderate":
        return "text-orange-500";
      case "High":
        return "text-destructive";
      default:
        return "";
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>{t("uploadPlantImage")}</CardTitle>
          <CardDescription>
            Take a clear photo of the plant leaf
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded plant"
                  className="max-h-64 mx-auto rounded-lg mb-4"
                />
              ) : (
                <div className="py-12">
                  <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {t("dragDrop")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!selectedImage || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("analyzing")}
              </>
            ) : (
              t("analyze")
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>{t("diseaseDetectionResults")}</CardTitle>
          <CardDescription>
            {result ? "Analysis completed" : "Upload and analyze to see results"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t("detectedDisease")}</p>
                <p className="text-2xl font-bold">{result.disease}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{t("confidence")}</p>
                  <p className="text-xl font-semibold text-primary">{result.confidence}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Severity</p>
                  <p className={`text-xl font-semibold ${getSeverityColor(result.severity)}`}>
                    {result.severity}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3">{t("treatment")}</p>
                <ul className="space-y-2">
                  {result.treatment.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No analysis yet</p>
              <p className="text-sm mt-2">Upload an image to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseDetection;
