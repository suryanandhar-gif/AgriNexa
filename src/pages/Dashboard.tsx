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
          <h1 className="text-4xl font-bold mb-2">
            {t("welcome")}
          </h1>
          <p className="text-muted-foreground">{t("dashboardTitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                AI-Powered Crop Prediction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Get accurate yield predictions using advanced machine learning algorithms. Our AI analyzes soil conditions, weather patterns, and historical data to help you make informed decisions.
              </p>
              <Button 
                className="w-full" 
                onClick={() => navigate("/predictions")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Start Prediction
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Disease Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Upload images of your crops to detect diseases early. Our AI model can identify various plant diseases and provide recommendations for treatment.
              </p>
              <Button 
                className="w-full" 
                onClick={() => navigate("/predictions")}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle>About AgriNexa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              AgriNexa is your intelligent farming companion, combining the power of artificial intelligence with agricultural expertise. Our platform helps farmers make data-driven decisions to improve crop yields, detect diseases early, and optimize farming practices.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">AI</div>
                <p className="text-sm text-muted-foreground">Powered Analytics</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">Fast</div>
                <p className="text-sm text-muted-foreground">Real-time Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
