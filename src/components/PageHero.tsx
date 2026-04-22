import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  breadcrumb?: string;
}

const PageHero = ({ label, title, subtitle, breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-hero">
      {/* Floating blobs */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brand-blue/15 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-brand-orange/15 blur-3xl animate-float-slower" />

      <div className="container-x relative py-20 lg:py-28 text-center">
        {label && <span className="section-label inline-block mb-3 animate-fade-up">{label}</span>}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            {subtitle}
          </p>
        )}
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand-navy font-medium">{breadcrumb}</span>
          </nav>
        )}
      </div>
    </section>
  );
};

export default PageHero;
