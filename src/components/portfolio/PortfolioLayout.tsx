import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import CertificationsSection from "./CertificationsSection";
import ProjectsSection from "./ProjectsSection";
import InternshipsSection from "./InternshipsSection";
import EducationSection from "./EducationSection";
import LanguagesSection from "./LanguagesSection";
import MotivationSection from "./MotivationSection";
import CodingActivitySection from "./CodingActivitySection";
import Footer from "./Footer";
import HireMeBanner from "./HireMeBanner";
import AchievementsBanner from "./AchievementsBanner";

const PortfolioLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AchievementsBanner />
        <CertificationsSection />
        <ProjectsSection />
        <InternshipsSection />
        <EducationSection />
        <LanguagesSection />
        <MotivationSection />
      </main>
      <Footer />
      <HireMeBanner />
    </div>
  );
};

export default PortfolioLayout;