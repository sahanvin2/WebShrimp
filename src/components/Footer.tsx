import { Link } from "react-router-dom";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site";
import DotWave from "./DotWave";

const Footer = () => {
  const quickLinks = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Portfolio", "/portfolio"],
    ["Pricing", "/pricing"],
    ["About Us", "/about"],
    ["Contact", "/contact"],
  ] as const;

  const serviceLinks = [
    ["Business Websites", "/services/business-websites"],
    ["E-Commerce", "/services/e-commerce-websites"],
    ["Landing Pages", "/services/landing-pages"],
    ["Custom Software", "/services/custom-software"],
  ] as const;

  return (
    <footer className="relative mt-20 border-t border-border bg-[#050505] text-white pt-20 pb-8 overflow-hidden">
      <DotWave />
      <div className="container-x relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-12 mb-20 pointer-events-none">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white max-w-sm">
            Let's build the future.
          </h2>
          
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-12 sm:gap-16 md:gap-24 pointer-events-auto w-full sm:w-auto">
            <div className="flex flex-col gap-4">
              {quickLinks.map(([label, to]) => (
                <Link key={to} to={to} className="text-[15px] font-medium text-white hover:opacity-70 transition-opacity">
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {serviceLinks.map(([label, to]) => (
                <Link key={to} to={to} className="text-[15px] font-medium text-white hover:opacity-70 transition-opacity">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Huge Text Section with Letter by Letter Animation */}
        <div className="w-full mb-12 flex justify-center pointer-events-none">
          <h1 
            className="text-white font-bold tracking-tighter leading-none select-none text-center flex pb-10 pt-4"
            style={{ fontSize: "clamp(4rem, 15vw, 16rem)" }}
          >
            {"Loopingon".split("").map((char, index) => (
              <span 
                key={index} 
                className="animate-letter-reveal inline-block" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 pointer-events-auto relative z-20">
          <Logo inverted />
          
          <div className="flex flex-wrap justify-center gap-6 text-[13px] font-medium text-white/80">
            <Link to="/about" className="hover:text-white transition-colors">About {siteConfig.brandName}</Link>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
