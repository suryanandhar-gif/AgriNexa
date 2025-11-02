import { Sprout, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AgriTech AI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering agriculture with artificial intelligence for sustainable farming and improved crop health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#prediction" className="hover:text-primary transition-smooth">
                  Plant Health Prediction
                </a>
              </li>
              <li>
                <a href="#disease-detection" className="hover:text-primary transition-smooth">
                  Disease Detection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Yield Forecasting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Real-time Monitoring
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a href="#setup" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <FileText className="mr-2 h-4 w-4" />
                  Setup Instructions
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AgriTech AI. Built with React, TypeScript, and Machine Learning.</p>
          <p className="mt-2">
            Data sourced from{" "}
            <a 
              href="https://www.kaggle.com/code/sulaniishara/plant-health-prediction-with-ml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Kaggle Plant Health Dataset
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
