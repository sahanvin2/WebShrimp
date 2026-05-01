import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";

import TechStack from "@/components/home/TechStack";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import ProcessSection from "@/components/home/ProcessSection";
import BlogPreview from "@/components/home/BlogPreview";
import PricingSection from "@/components/home/PricingSection";

const Index = () => {
  return (
    <SiteLayout>
      <Seo
        title="Loopingon | Web and Software Agency Sri Lanka"
        description="Loopingon builds websites, web apps, and digital experiences that help Sri Lankan businesses stand out and grow online."
        path="/"
      />
      <HeroSection />
      <ServicesPreview />

      <TechStack />
      <PortfolioPreview />
      <ProcessSection />
      <PricingSection />
      <BlogPreview />
    </SiteLayout>
  );
};

export default Index;
