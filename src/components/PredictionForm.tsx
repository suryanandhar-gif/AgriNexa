import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface PredictionFormData {
  soilMoisture: string;
  ambientTemp: string;
  soilTemp: string;
  humidity: string;
  lightIntensity: string;
  soilPh: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  chlorophyll: string;
}

export const PredictionForm = ({ onPredict }: { onPredict: (data: any) => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PredictionFormData>({
    soilMoisture: "",
    ambientTemp: "",
    soilTemp: "",
    humidity: "",
    lightIntensity: "",
    soilPh: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    chlorophyll: "",
  });

  const handleChange = (field: keyof PredictionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const emptyFields = Object.entries(formData).filter(([_, value]) => !value);
    if (emptyFields.length > 0) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate ML prediction (in real app, this would call an API)
    setTimeout(() => {
      const prediction = simulatePrediction(formData);
      onPredict(prediction);
      setIsLoading(false);
      toast.success("Prediction completed successfully!");
    }, 1500);
  };

  const simulatePrediction = (data: PredictionFormData) => {
    // Simple heuristic for demo purposes
    const moisture = parseFloat(data.soilMoisture);
    const nitrogen = parseFloat(data.nitrogen);
    const ph = parseFloat(data.soilPh);
    
    let status = "Healthy";
    let confidence = 85;
    
    if (moisture < 20 || nitrogen < 20 || ph < 5.5 || ph > 7.5) {
      status = "High Stress";
      confidence = 92;
    } else if (moisture < 25 || nitrogen < 25) {
      status = "Moderate Stress";
      confidence = 88;
    }

    return {
      status,
      confidence,
      recommendations: getRecommendations(status, data),
      metrics: {
        soilMoisture: parseFloat(data.soilMoisture),
        nitrogen: parseFloat(data.nitrogen),
        phosphorus: parseFloat(data.phosphorus),
        potassium: parseFloat(data.potassium),
      }
    };
  };

  const getRecommendations = (status: string, data: PredictionFormData) => {
    const recs = [];
    if (parseFloat(data.soilMoisture) < 25) {
      recs.push("Increase irrigation frequency");
    }
    if (parseFloat(data.nitrogen) < 25) {
      recs.push("Apply nitrogen-rich fertilizer");
    }
    if (parseFloat(data.soilPh) < 6 || parseFloat(data.soilPh) > 7) {
      recs.push("Adjust soil pH to optimal range (6.0-7.0)");
    }
    if (status === "Healthy" && recs.length === 0) {
      recs.push("Continue current care regimen");
      recs.push("Monitor regularly for changes");
    }
    return recs;
  };

  return (
    <section id="prediction" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 text-primary">
            <TrendingUp className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Crop Health Analysis
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Plant Health Prediction
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter environmental and soil parameters to predict plant health status
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-soft">
          <CardHeader>
            <CardTitle>Environmental & Soil Parameters</CardTitle>
            <CardDescription>
              Provide accurate measurements for best prediction results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="soilMoisture">Soil Moisture (%)</Label>
                  <Input
                    id="soilMoisture"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder="e.g., 25.5"
                    value={formData.soilMoisture}
                    onChange={(e) => handleChange("soilMoisture", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambientTemp">Ambient Temperature (°C)</Label>
                  <Input
                    id="ambientTemp"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 24.0"
                    value={formData.ambientTemp}
                    onChange={(e) => handleChange("ambientTemp", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilTemp">Soil Temperature (°C)</Label>
                  <Input
                    id="soilTemp"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 20.0"
                    value={formData.soilTemp}
                    onChange={(e) => handleChange("soilTemp", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder="e.g., 55.0"
                    value={formData.humidity}
                    onChange={(e) => handleChange("humidity", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lightIntensity">Light Intensity (lux)</Label>
                  <Input
                    id="lightIntensity"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 600.0"
                    value={formData.lightIntensity}
                    onChange={(e) => handleChange("lightIntensity", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilPh">Soil pH</Label>
                  <Input
                    id="soilPh"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="e.g., 6.5"
                    value={formData.soilPh}
                    onChange={(e) => handleChange("soilPh", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen Level (mg/kg)</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 30.0"
                    value={formData.nitrogen}
                    onChange={(e) => handleChange("nitrogen", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus Level (mg/kg)</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 30.0"
                    value={formData.phosphorus}
                    onChange={(e) => handleChange("phosphorus", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium Level (mg/kg)</Label>
                  <Input
                    id="potassium"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 30.0"
                    value={formData.potassium}
                    onChange={(e) => handleChange("potassium", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chlorophyll">Chlorophyll Content (mg/m²)</Label>
                  <Input
                    id="chlorophyll"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 35.0"
                    value={formData.chlorophyll}
                    onChange={(e) => handleChange("chlorophyll", e.target.value)}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full shadow-soft transition-smooth"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Predict Plant Health"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
