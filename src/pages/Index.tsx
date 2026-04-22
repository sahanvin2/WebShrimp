import SiteLayout from "@/components/SiteLayout";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import SocialBanner from "@/components/home/SocialBanner";
import TechStack from "@/components/home/TechStack";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import ProcessSection from "@/components/home/ProcessSection";
import BlogPreview from "@/components/home/BlogPreview";
import PricingSection from "@/components/home/PricingSection";

const Index = () => {
  return (
    <SiteLayout>
      <HeroSection />
      <ServicesPreview />
      <SocialBanner />
      <TechStack />
      <PortfolioPreview />
      <ProcessSection />
      <PricingSection />
      <BlogPreview />
    </SiteLayout>
  );
};

export default Index;
