import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import usePageTitle from "@/hooks/usePageTitle";

const Index = () => {
  usePageTitle();
  return <PortfolioLayout />;
};

export default Index;
