import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/site";

interface LogoProps {
  withTagline?: boolean;
  inverted?: boolean;
}

const Logo = ({ withTagline = false, inverted = false }: LogoProps) => {
  return (
    <Link to="/" className="group inline-flex flex-col items-start" aria-label={`${siteConfig.brandName} home`}>
      <span className={`font-display font-bold text-3xl tracking-tight transition-colors duration-300 ${inverted ? "text-white" : "text-foreground"}`}>
        loopingon
      </span>
      {withTagline && (
        <span className={`mt-0.5 block font-mono text-[10px] tracking-wider ${inverted ? "text-white/60" : "text-muted-foreground"}`}>
          {siteConfig.tagline}
        </span>
      )}
    </Link>
  );
};

export default Logo;
