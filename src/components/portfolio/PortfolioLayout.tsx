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
import SectionDivider from "./SectionDivider";

const PortfolioLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <SectionDivider variant="wave" />
        <AchievementsBanner />
        <SectionDivider variant="circuit" />
        <CertificationsSection />
        <SectionDivider variant="pulse" />
        <ProjectsSection />
        <SectionDivider variant="circuit" />
        <InternshipsSection />
        <SectionDivider variant="wave" />
        <EducationSection />
        <SectionDivider variant="pulse" />
        <LanguagesSection />
        <SectionDivider variant="circuit" />
        <MotivationSection />
      </main>
      <Footer />
      <HireMeBanner />
    </div>
  );
};

export default PortfolioLayout;