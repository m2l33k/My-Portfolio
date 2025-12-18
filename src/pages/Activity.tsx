import Navigation from "@/components/portfolio/Navigation";
import CodingActivitySection from "@/components/portfolio/CodingActivitySection";

const Activity = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20">
        <CodingActivitySection />
      </main>
    </div>
  );
};

export default Activity;
