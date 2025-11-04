import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      predictions: "Predictions",
      logout: "Logout",
      
      // Auth
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      createAccount: "Create Account",
      backToHome: "Back to Home",
      loggingIn: "Logging in...",
      creatingAccount: "Creating account...",
      passwordRequirement: "Must be at least 6 characters",
      
      // Dashboard
      welcome: "Welcome to AgriNexa",
      dashboardTitle: "Agricultural Intelligence Dashboard",
      quickActions: "Quick Actions",
      startPrediction: "Start Prediction",
      viewHistory: "View History",
      uploadImage: "Upload Image",
      statsOverview: "Statistics Overview",
      totalPredictions: "Total Predictions",
      healthyPlants: "Healthy Plants",
      diseaseDetected: "Disease Detected",
      avgYield: "Avg. Yield",
      gettingStarted: "Getting Started",
      step1: "Login to your account",
      step2: "Go to Predictions page",
      step3: "Enter plant parameters or upload image",
      step4: "Get AI-powered insights",
      
      // Predictions
      predictionsTitle: "Plant Health & Disease Predictions",
      plantHealthPrediction: "Plant Health Prediction",
      diseaseDetection: "Disease Detection",
      cropType: "Crop Type",
      soilType: "Soil Type",
      temperature: "Temperature (°C)",
      humidity: "Humidity (%)",
      rainfall: "Rainfall (mm)",
      phLevel: "pH Level",
      nitrogen: "Nitrogen (kg/ha)",
      phosphorus: "Phosphorus (kg/ha)",
      potassium: "Potassium (kg/ha)",
      sunlight: "Sunlight (hours/day)",
      predict: "Predict",
      predicting: "Predicting...",
      uploadPlantImage: "Upload Plant Image",
      dragDrop: "Drag and drop an image here, or click to select",
      analyze: "Analyze",
      analyzing: "Analyzing...",
      
      // Results
      predictionResults: "Prediction Results",
      healthStatus: "Health Status",
      estimatedYield: "Estimated Yield",
      recommendations: "Recommendations",
      diseaseDetectionResults: "Disease Detection Results",
      detectedDisease: "Detected Disease",
      confidence: "Confidence",
      treatment: "Treatment Recommendations",
      
      // Common
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      
      // Dashboard
      aiPoweredCropPrediction: "AI-Powered Crop Prediction",
      aiPoweredCropDescription: "Get accurate yield predictions using advanced machine learning algorithms. Our AI analyzes soil conditions, weather patterns, and historical data to help you make informed decisions.",
      diseaseDetectionTitle: "Disease Detection",
      diseaseDetectionDescription: "Upload images of your crops to detect diseases early. Our AI model can identify various plant diseases and provide recommendations for treatment.",
      aboutAgriNexa: "About AgriNexa",
      aboutDescription: "AgriNexa is your intelligent farming companion, combining the power of artificial intelligence with agricultural expertise. Our platform helps farmers make data-driven decisions to improve crop yields, detect diseases early, and optimize farming practices.",
      aiPoweredAnalytics: "Powered Analytics",
      supportAvailable: "Support Available",
      realTimeResults: "Real-time Results",
      
      // Auth
      authSubtitle: "AI-Powered Plant Health & Disease Detection",
      
      // Footer
      features: "Features",
      footerDescription: "Empowering agriculture with artificial intelligence for sustainable farming and improved crop health.",
      allRightsReserved: "All rights reserved.",
      poweredByAI: "Powered by AI and Machine Learning for sustainable agriculture",
    }
  },
  ta: {
    translation: {
      // Navigation
      dashboard: "டாஷ்போர்டு",
      predictions: "கணிப்புகள்",
      logout: "வெளியேறு",
      
      // Auth
      login: "உள்நுழைய",
      signup: "பதிவு செய்க",
      email: "மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      createAccount: "கணக்கை உருவாக்கு",
      backToHome: "முகப்புக்குத் திரும்பு",
      loggingIn: "உள்நுழைகிறது...",
      creatingAccount: "கணக்கை உருவாக்குகிறது...",
      passwordRequirement: "குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்",
      
      // Dashboard
      welcome: "AgriNexa க்கு வரவேற்கிறோம்",
      dashboardTitle: "விவசாய புத்திசாலித்தனம் டாஷ்போர்டு",
      quickActions: "விரைவு செயல்கள்",
      startPrediction: "கணிப்பைத் தொடங்கு",
      viewHistory: "வரலாற்றைக் காண்க",
      uploadImage: "படத்தைப் பதிவேற்று",
      statsOverview: "புள்ளிவிவர கண்ணோட்டம்",
      totalPredictions: "மொத்த கணிப்புகள்",
      healthyPlants: "ஆரோக்கியமான தாவரங்கள்",
      diseaseDetected: "நோய் கண்டறியப்பட்டது",
      avgYield: "சராசரி விளைச்சல்",
      gettingStarted: "தொடங்குதல்",
      step1: "உங்கள் கணக்கில் உள்நுழைக",
      step2: "கணிப்புகள் பக்கத்திற்குச் செல்லவும்",
      step3: "தாவர அளவுருக்களை உள்ளிடவும் அல்லது படத்தைப் பதிவேற்றவும்",
      step4: "AI-இயங்கும் நுண்ணறிவுகளைப் பெறுங்கள்",
      
      // Predictions
      predictionsTitle: "தாவர ஆரோக்கியம் & நோய் கணிப்புகள்",
      plantHealthPrediction: "தாவர ஆரோக்கிய கணிப்பு",
      diseaseDetection: "நோய் கண்டறிதல்",
      cropType: "பயிர் வகை",
      soilType: "மண் வகை",
      temperature: "வெப்பநிலை (°C)",
      humidity: "ஈரப்பதம் (%)",
      rainfall: "மழைப்பொழிவு (mm)",
      phLevel: "pH அளவு",
      nitrogen: "நைட்ரஜன் (kg/ha)",
      phosphorus: "பாஸ்பரஸ் (kg/ha)",
      potassium: "பொட்டாசியம் (kg/ha)",
      sunlight: "சூரிய ஒளி (மணிநேரம்/நாள்)",
      predict: "கணிக்கவும்",
      predicting: "கணிக்கிறது...",
      uploadPlantImage: "தாவர படத்தைப் பதிவேற்று",
      dragDrop: "இங்கே ஒரு படத்தை இழுத்து விடவும், அல்லது தேர்ந்தெடுக்க கிளிக் செய்யவும்",
      analyze: "பகுப்பாய்வு செய்",
      analyzing: "பகுப்பாய்வு செய்கிறது...",
      
      // Results
      predictionResults: "கணிப்பு முடிவுகள்",
      healthStatus: "ஆரோக்கிய நிலை",
      estimatedYield: "மதிப்பிடப்பட்ட விளைச்சல்",
      recommendations: "பரிந்துரைகள்",
      diseaseDetectionResults: "நோய் கண்டறிதல் முடிவுகள்",
      detectedDisease: "கண்டறியப்பட்ட நோய்",
      confidence: "நம்பிக்கை",
      treatment: "சிகிச்சை பரிந்துரைகள்",
      
      // Common
      language: "மொழி",
      theme: "தீம்",
      light: "வெளிச்சம்",
      dark: "இருள்",
      
      // Dashboard
      aiPoweredCropPrediction: "AI-இயங்கும் பயிர் கணிப்பு",
      aiPoweredCropDescription: "மேம்பட்ட இயந்திர கற்றல் அல்காரிதங்களைப் பயன்படுத்தி துல்லியமான விளைச்சல் கணிப்புகளைப் பெறுங்கள். எங்கள் AI மண் நிலைகள், வானிலை முறைகள் மற்றும் வரலாற்று தரவுகளை பகுப்பாய்வு செய்து தகவலறிந்த முடிவுகளை எடுக்க உதவுகிறது.",
      diseaseDetectionTitle: "நோய் கண்டறிதல்",
      diseaseDetectionDescription: "நோய்களை சீக்கிரம் கண்டறிய உங்கள் பயிர்களின் படங்களைப் பதிவேற்றவும். எங்கள் AI மாதிரி பல்வேறு தாவர நோய்களை அடையாளம் காணவும் சிகிச்சைக்கான பரிந்துரைகளை வழங்கவும் முடியும்.",
      aboutAgriNexa: "AgriNexa பற்றி",
      aboutDescription: "AgriNexa உங்கள் புத்திசாலி விவசாய துணைவர், செயற்கை நுண்ணறிவின் சக்தியை விவசாய நிபுணத்துவத்துடன் இணைக்கிறது. எங்கள் தளம் விவசாயிகள் பயிர் விளைச்சலை மேம்படுத்தவும், நோய்களை சீக்கிரம் கண்டறியவும், விவசாய நடைமுறைகளை மேம்படுத்தவும் தரவு-சார்ந்த முடிவுகளை எடுக்க உதவுகிறது.",
      aiPoweredAnalytics: "இயங்கும் பகுப்பாய்வு",
      supportAvailable: "ஆதரவு கிடைக்கும்",
      realTimeResults: "நிகழ்நேர முடிவுகள்",
      
      // Auth
      authSubtitle: "AI-இயங்கும் தாவர ஆரோக்கியம் & நோய் கண்டறிதல்",
      
      // Footer
      features: "அம்சங்கள்",
      footerDescription: "நிலையான விவசாயம் மற்றும் மேம்படுத்தப்பட்ட பயிர் ஆரோக்கியத்திற்கான செயற்கை நுண்ணறிவுடன் விவசாயத்தை மேம்படுத்துதல்.",
      allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      poweredByAI: "நிலையான விவசாயத்திற்கான AI மற்றும் இயந்திர கற்றல் மூலம் இயக்கப்படுகிறது",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
