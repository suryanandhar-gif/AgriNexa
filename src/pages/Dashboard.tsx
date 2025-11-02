import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, LogOut, TrendingUp, Activity, Database, Image } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect unauthenticated users to auth page
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">AgriNexa Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your plant health predictions and disease detection analysis
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft transition-smooth hover:shadow-hover cursor-pointer" onClick={() => navigate('/')}>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>New Prediction</CardTitle>
              <CardDescription>
                Analyze plant health parameters
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft transition-smooth hover:shadow-hover cursor-pointer" onClick={() => navigate('/')}>
            <CardHeader>
              <Image className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Disease Detection</CardTitle>
              <CardDescription>
                Upload plant images for analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft transition-smooth hover:shadow-hover">
            <CardHeader>
              <Activity className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Recent Analysis</CardTitle>
              <CardDescription>
                View your prediction history
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft transition-smooth hover:shadow-hover">
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Data Insights</CardTitle>
              <CardDescription>
                Track crop health trends
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Total Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start making predictions to see statistics
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Disease Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground mt-2">
                Upload images for disease detection
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">--</p>
              <p className="text-sm text-muted-foreground mt-2">
                Average health score across all plants
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Get Started Section */}
        <Card className="mt-8 shadow-soft">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Begin your journey with AI-powered agriculture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold">Make Your First Prediction</h3>
                <p className="text-sm text-muted-foreground">
                  Enter environmental and soil parameters to predict plant health
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold">Upload Plant Images</h3>
                <p className="text-sm text-muted-foreground">
                  Use our AI to detect diseases from leaf images
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold">Track Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor crop health trends over time
                </p>
              </div>
            </div>
            <Button onClick={() => navigate('/')} className="mt-4">
              Go to Home Page
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
