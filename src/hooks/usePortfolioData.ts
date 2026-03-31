import { useLanguage } from "@/context/LanguageContext";
import { getPortfolioData } from "@/data/portfolioByLang";

export const usePortfolioData = () => {
  const { lang } = useLanguage();
  return getPortfolioData(lang);
};
