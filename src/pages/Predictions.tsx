import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PredictionForm from "@/components/PredictionForm";
import PredictionResults from "@/components/PredictionResults";
import DiseaseDetection from "@/components/DiseaseDetection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const Predictions = () => {
  const { t } = useTranslation();
  const [predictionData, setPredictionData] = useState<any>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t("predictionsTitle")}
          </h1>
        </div>

        <Tabs defaultValue="health" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="health">{t("plantHealthPrediction")}</TabsTrigger>
            <TabsTrigger value="disease">{t("diseaseDetection")}</TabsTrigger>
          </TabsList>

          <TabsContent value="health">
            <div className="grid md:grid-cols-2 gap-8">
              <PredictionForm onPredict={setPredictionData} />
              {predictionData && <PredictionResults data={predictionData} />}
            </div>
          </TabsContent>

          <TabsContent value="disease">
            <DiseaseDetection />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Predictions;
