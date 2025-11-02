import { useState } from "react";
import { Hero } from "@/components/Hero";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResults } from "@/components/PredictionResults";
import { DiseaseDetection } from "@/components/DiseaseDetection";
import { SetupInstructions } from "@/components/SetupInstructions";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [predictionData, setPredictionData] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <PredictionForm onPredict={setPredictionData} />
      <PredictionResults data={predictionData} />
      <DiseaseDetection />
      <SetupInstructions />
      <Footer />
    </div>
  );
};

export default Index;
