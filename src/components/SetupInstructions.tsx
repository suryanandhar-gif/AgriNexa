import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Download, Play, Database } from "lucide-react";

export const SetupInstructions = () => {
  return (
    <section id="setup" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 text-primary">
            <Code className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Implementation Guide
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Setup Instructions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with the AgriTech AI platform in minutes
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Prerequisites */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">1</Badge>
                Prerequisites
              </CardTitle>
              <CardDescription>Required tools and dependencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <p>• Node.js 18+ and npm/yarn</p>
                <p>• Git for version control</p>
                <p>• Modern web browser</p>
              </div>
            </CardContent>
          </Card>

          {/* Clone Repository */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">2</Badge>
                Clone Repository
              </CardTitle>
              <CardDescription>Get the source code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-card border border-border p-4 rounded-lg">
                <code className="text-sm">
                  git clone https://github.com/your-repo/agritech-ai.git
                  <br />
                  cd agritech-ai
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Install Dependencies */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">3</Badge>
                Install Dependencies
              </CardTitle>
              <CardDescription>Set up the project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-card border border-border p-4 rounded-lg">
                <code className="text-sm">
                  npm install
                  <br />
                  # or
                  <br />
                  yarn install
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Data Setup */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">4</Badge>
                <Database className="h-5 w-5" />
                Dataset Setup
              </CardTitle>
              <CardDescription>Download and configure the plant health dataset</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Download the plant health dataset from Kaggle:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold">Option 1: Direct Download</p>
                <a 
                  href="https://www.kaggle.com/datasets/plant-health-data" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm block"
                >
                  → Visit Kaggle Dataset Page
                </a>
              </div>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold">Option 2: Kaggle API</p>
                <code className="text-xs block mt-2">
                  kaggle datasets download -d plant-health-data
                  <br />
                  unzip plant-health-data.zip -d ./data
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Run Development Server */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">5</Badge>
                <Play className="h-5 w-5" />
                Run Development Server
              </CardTitle>
              <CardDescription>Start the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card border border-border p-4 rounded-lg">
                <code className="text-sm">
                  npm run dev
                  <br />
                  # or
                  <br />
                  yarn dev
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                The application will be available at{" "}
                <code className="text-primary">http://localhost:8080</code>
              </p>
            </CardContent>
          </Card>

          {/* ML Model Integration */}
          <Card className="shadow-soft border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge>Advanced</Badge>
                ML Model Integration
              </CardTitle>
              <CardDescription>
                For production use with real ML models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
                <p className="font-semibold">Current Implementation:</p>
                <p>
                  • Using simulated predictions based on threshold heuristics
                  <br />
                  • Perfect for demo and UI development
                </p>
                
                <p className="font-semibold mt-4">Production Setup:</p>
                <p>
                  1. Train models using the Kaggle notebook (Random Forest, Gradient Boosting)
                  <br />
                  2. Export trained models to ONNX format
                  <br />
                  3. Deploy models via:
                  <br />
                  &nbsp;&nbsp;• Backend API (Python Flask/FastAPI)
                  <br />
                  &nbsp;&nbsp;• Serverless functions (AWS Lambda, Vercel)
                  <br />
                  &nbsp;&nbsp;• Or use TensorFlow.js for in-browser inference
                  <br />
                  4. Update API endpoints in the React components
                </p>

                <div className="bg-background p-3 rounded mt-4">
                  <p className="text-xs font-mono">
                    See /docs/ML_INTEGRATION.md for detailed instructions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Structure */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Project Structure</CardTitle>
              <CardDescription>Understanding the codebase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-card border border-border p-4 rounded-lg font-mono text-xs">
                <pre>{`src/
├── components/          # React components
│   ├── Hero.tsx        # Landing hero section
│   ├── PredictionForm.tsx  # Health prediction form
│   ├── PredictionResults.tsx  # Results display
│   ├── DiseaseDetection.tsx   # Image upload & analysis
│   └── ui/             # shadcn UI components
├── pages/              # Page components
├── assets/             # Images and static files
└── index.css           # Global styles & design system`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
