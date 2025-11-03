import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTranslation } from "react-i18next";

interface PredictionData {
  status: string;
  confidence: number;
  recommendations: string[];
  metrics: {
    soilMoisture: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

const PredictionResults = ({ data }: { data: PredictionData | null }) => {
  const { t } = useTranslation();
  
  if (!data) return null;

  const getStatusIcon = () => {
    switch (data.status) {
      case "Healthy":
        return <CheckCircle className="h-8 w-8 text-primary" />;
      case "Moderate Stress":
        return <AlertTriangle className="h-8 w-8 text-accent" />;
      case "High Stress":
        return <AlertCircle className="h-8 w-8 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case "Healthy":
        return "bg-primary text-primary-foreground";
      case "Moderate Stress":
        return "bg-accent text-accent-foreground";
      case "High Stress":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  const chartData = [
    { name: "Soil Moisture", value: data.metrics.soilMoisture, optimal: 30 },
    { name: "Nitrogen", value: data.metrics.nitrogen, optimal: 35 },
    { name: "Phosphorus", value: data.metrics.phosphorus, optimal: 35 },
    { name: "Potassium", value: data.metrics.potassium, optimal: 35 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <span>{t("predictionResults")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t("healthStatus")}</p>
              <Badge className={`text-lg px-4 py-2 ${getStatusColor()}`}>
                {data.status}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">{t("confidence")}</p>
              <p className="text-3xl font-bold text-primary">{data.confidence}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Nutrient Levels Analysis</CardTitle>
          <CardDescription>
            Current levels compared to optimal ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="hsl(var(--primary))" name="Current" />
              <Bar dataKey="optimal" fill="hsl(var(--secondary))" name="Optimal" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>{t("recommendations")}</CardTitle>
          <CardDescription>
            Action items to improve or maintain plant health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResults;
