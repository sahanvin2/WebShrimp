import SiteLayout from "@/components/SiteLayout";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import SocialBanner from "@/components/home/SocialBanner";
import TechStack from "@/components/home/TechStack";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import ProcessSection from "@/components/home/ProcessSection";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import useReveal from "@/hooks/useReveal";

const Index = () => {
  useReveal();

  return (
    <SiteLayout>
      <HeroSection />
      <ServicesPreview />
      <SocialBanner />
      <TechStack />
      <PortfolioPreview />
      <ProcessSection />
      <Testimonials />
      <BlogPreview />
    </SiteLayout>
  );
};

export default Index;
