import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const DiseaseDetection = () => {
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
    
    // Simulate disease detection (in real app, this would use a CNN model)
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
        treatment: getDiseaseeTreatment(topDisease.name),
      });
      
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 2000);
  };

  const getDiseaseeTreatment = (disease: string) => {
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
    <section id="disease-detection" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 text-primary">
            <ImageIcon className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              AI Vision Analysis
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Plant Disease Detection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a plant leaf image for instant disease identification using deep learning
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Upload Plant Image</CardTitle>
              <CardDescription>
                Take a clear photo of the plant leaf
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-smooth hover:border-primary">
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
                        Click to upload or drag and drop
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
                className="w-full shadow-soft transition-smooth"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Detection Results</CardTitle>
              <CardDescription>
                {result ? "Analysis completed" : "Upload and analyze to see results"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Detected Condition</p>
                    <p className="text-2xl font-bold">{result.disease}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Confidence</p>
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
                    <p className="font-semibold mb-3">Treatment Recommendations:</p>
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
      </div>
    </section>
  );
};
