# 🌱 AgriTech AI - Plant Health Prediction & Disease Detection

![AgriTech AI](https://img.shields.io/badge/AgriTech-AI%20Powered-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A real-time agricultural intelligence platform that performs **crop yield prediction** and **plant disease detection** using deep neural networks. Built with React, TypeScript, and modern machine learning techniques.

## 🎯 Features

### 1. 🌾 Plant Health Prediction
- **Real-time analysis** of environmental and soil parameters
- **Multi-factor prediction** using:
  - Soil moisture, temperature, and pH levels
  - Ambient temperature and humidity
  - Light intensity
  - NPK (Nitrogen, Phosphorus, Potassium) levels
  - Chlorophyll content
- **Actionable recommendations** based on prediction results
- **Visual analytics** with interactive charts

### 2. 🔬 Plant Disease Detection
- **AI-powered image analysis** for disease identification
- Upload plant leaf images for instant diagnosis
- **Confidence scoring** for each prediction
- **Treatment recommendations** for detected conditions
- Support for multiple disease types:
  - Early Blight
  - Bacterial Spot
  - Powdery Mildew
  - And more...

### 3. 📊 Data Visualization
- Interactive charts using Recharts
- Nutrient level comparisons
- Real-time metrics dashboard
- Visual health status indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/agritech-ai.git
   cd agritech-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📁 Project Structure

```
agritech-ai/
├── src/
│   ├── components/
│   │   ├── Hero.tsx                 # Landing hero section
│   │   ├── PredictionForm.tsx       # Health prediction form
│   │   ├── PredictionResults.tsx    # Results visualization
│   │   ├── DiseaseDetection.tsx     # Image-based detection
│   │   ├── SetupInstructions.tsx    # Setup guide
│   │   ├── Footer.tsx               # Footer component
│   │   └── ui/                      # shadcn UI components
│   ├── pages/
│   │   ├── Index.tsx                # Main application page
│   │   └── NotFound.tsx             # 404 page
│   ├── assets/                      # Images and static files
│   ├── lib/                         # Utility functions
│   ├── index.css                    # Global styles & design system
│   └── App.tsx                      # App configuration
├── public/                          # Public assets
├── index.html                       # HTML entry point
└── README.md                        # This file
```

## 🔬 Machine Learning Integration

### Current Implementation
The demo uses **simulated predictions** based on threshold heuristics. This allows for immediate testing and UI development without requiring ML model deployment.

### Production ML Setup

For real-world deployment with trained models:

#### 1. Train Models
Use the referenced Kaggle notebook to train models:
- Random Forest Classifier
- Gradient Boosting Classifier
- Support Vector Machine (SVM)
- Deep Neural Networks

**Dataset**: [Plant Health Data](https://www.kaggle.com/code/sulaniishara/plant-health-prediction-with-ml)

#### 2. Export Models
Convert trained models to ONNX or SavedModel format:
```python
# Example: Export to ONNX
import sklearn
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

initial_type = [('float_input', FloatTensorType([None, 11]))]
onx = convert_sklearn(model, initial_types=initial_type)
with open("plant_health_model.onnx", "wb") as f:
    f.write(onx.SerializeToString())
```

#### 3. Deploy Backend API

**Option A: Python FastAPI**
```python
from fastapi import FastAPI, File, UploadFile
import onnxruntime as rt
import numpy as np

app = FastAPI()

# Load model
sess = rt.InferenceSession("plant_health_model.onnx")

@app.post("/predict")
async def predict(data: dict):
    input_data = np.array([list(data.values())]).astype(np.float32)
    result = sess.run(None, {"float_input": input_data})
    return {"prediction": result[0].tolist()}
```

**Option B: TensorFlow.js (Browser)**
```typescript
import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel('/models/plant-health/model.json');
const prediction = model.predict(tf.tensor2d([inputData]));
```

**Option C: Serverless (AWS Lambda, Vercel)**
- Deploy model as serverless function
- Use lightweight inference libraries
- Cache model in memory for performance

#### 4. Update Frontend
Replace simulation code in `PredictionForm.tsx`:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await fetch('YOUR_API_ENDPOINT/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const prediction = await response.json();
    onPredict(prediction);
  } catch (error) {
    toast.error("Prediction failed");
  } finally {
    setIsLoading(false);
  }
};
```

## 📊 Dataset Information

**Source**: [Kaggle Plant Health Dataset](https://www.kaggle.com/code/sulaniishara/plant-health-prediction-with-ml)

**Features**:
- 1,200 observations
- 14 features including environmental and soil parameters
- 3 health status classes: Healthy, Moderate Stress, High Stress

**Key Parameters**:
- Soil Moisture (%)
- Ambient & Soil Temperature (°C)
- Humidity (%)
- Light Intensity (lux)
- Soil pH
- NPK Levels (mg/kg)
- Chlorophyll Content (mg/m²)
- Electrochemical Signal (mV)

## 🎨 Design System

Built with a custom design system optimized for agricultural applications:

**Color Palette**:
- Primary: Deep Green (`hsl(142, 71%, 45%)`) - Growth & agriculture
- Secondary: Lime Green (`hsl(84, 81%, 44%)`) - Vitality
- Accent: Amber (`hsl(47, 96%, 53%)`) - Earth tones
- Gradients: Green to emerald for depth

**Typography**: Modern sans-serif with excellent readability

**Components**: shadcn/ui for consistent, accessible UI elements

## 🛠️ Tech Stack

- **Frontend**: React 18.3, TypeScript
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Form Handling**: React Hook Form, Zod
- **State Management**: React Query (TanStack Query)
- **Build Tool**: Vite
- **Deployment**: Vercel, Netlify, or custom hosting

## 📝 API Endpoints (Production)

### Health Prediction
```
POST /api/predict
Content-Type: application/json

{
  "soilMoisture": 25.5,
  "ambientTemp": 24.0,
  "soilTemp": 20.0,
  "humidity": 55.0,
  "lightIntensity": 600.0,
  "soilPh": 6.5,
  "nitrogen": 30.0,
  "phosphorus": 30.0,
  "potassium": 30.0,
  "chlorophyll": 35.0
}
```

### Disease Detection
```
POST /api/detect-disease
Content-Type: multipart/form-data

FormData: {
  image: <file>
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Dataset from [Sulani Ishara's Kaggle Notebook](https://www.kaggle.com/code/sulaniishara/plant-health-prediction-with-ml)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for sustainable agriculture** 🌾
