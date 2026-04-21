import { Link } from "react-router-dom";

interface LogoProps {
  withTagline?: boolean;
  inverted?: boolean;
}

const Logo = ({ withTagline = false, inverted = false }: LogoProps) => {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group" aria-label="Web Shrimp home">
      <span className="text-2xl" aria-hidden="true">🦐</span>
      <div className="leading-none">
        <span
          className={`font-display font-extrabold text-xl tracking-tight ${
            inverted ? "text-white" : "text-brand-navy"
          }`}
        >
          Web<span className="text-brand-orange">Shrimp</span>
        </span>
        {withTagline && (
          <span
            className={`block font-mono text-[10px] mt-1 tracking-wider ${
              inverted ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            We Design. You Grow.
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
