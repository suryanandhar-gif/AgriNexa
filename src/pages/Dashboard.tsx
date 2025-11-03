import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Leaf, AlertTriangle, TrendingUp, Upload, History, Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t("welcome")}
          </h1>
          <p className="text-muted-foreground">{t("dashboardTitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                {t("quickActions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/predictions")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                {t("startPrediction")}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <History className="mr-2 h-4 w-4" />
                {t("viewHistory")}
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/predictions")}
              >
                <Upload className="mr-2 h-4 w-4" />
                {t("uploadImage")}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t("statsOverview")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t("totalPredictions")}</span>
                <span className="text-2xl font-bold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t("healthyPlants")}</span>
                <span className="text-2xl font-bold text-green-500">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t("diseaseDetected")}</span>
                <span className="text-2xl font-bold text-red-500">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t("avgYield")}</span>
                <span className="text-2xl font-bold">4.2t/ha</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle>{t("gettingStarted")}</CardTitle>
            <CardDescription>Follow these steps to use the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-sm">{t("step1")}</li>
              <li className="text-sm">{t("step2")}</li>
              <li className="text-sm">{t("step3")}</li>
              <li className="text-sm">{t("step4")}</li>
            </ol>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
