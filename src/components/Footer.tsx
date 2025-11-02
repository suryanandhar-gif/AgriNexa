import { useState } from "react";
import { Sprout, Github, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AgriNexa</span>
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
                <button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-smooth">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/auth')}>
                <LogIn className="mr-2 h-4 w-4" />
                Login / Sign Up
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AgriNexa. All rights reserved.</p>
          <p className="mt-2">
            Powered by AI and Machine Learning for sustainable agriculture
          </p>
        </div>
      </div>
    </footer>
  );
};
