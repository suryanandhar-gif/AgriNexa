import { Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import footerIcon from "@/assets/footer-icon.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-4 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AgriNexa</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t("footerDescription")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("features")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => navigate('/predictions')} className="hover:text-primary transition-colors">
                  {t("plantHealthPrediction")}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/predictions')} className="hover:text-primary transition-colors">
                  {t("diseaseDetection")}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">
                  {t("dashboard")}
                </button>
              </li>
            </ul>
          </div>

          <div className="flex justify-center items-start">
            <img 
              src={footerIcon} 
              alt="AgriNexa Footer Icon" 
              className="h-32 w-32 object-contain opacity-70"
            />
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AgriNexa. {t("allRightsReserved")}</p>
          <p className="mt-2">
            {t("poweredByAI")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
