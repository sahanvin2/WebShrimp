import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  to?: string;
}

const CtaBanner = ({
  title = "Ready to get started?",
  subtitle = "Let's build something amazing together.",
  cta = "Get a Free Quote",
  to = "/contact",
}: CtaBannerProps) => {
  return (
    <section className="container-x py-20">
      <div className="relative overflow-hidden rounded-3xl bg-blue-grad px-8 py-14 lg:px-16 lg:py-20 text-center text-white shadow-glow">
        <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-brand-orange/30 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float-slower" />
        <h2 className="relative text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="relative mt-4 text-white/80 max-w-xl mx-auto">{subtitle}</p>
        <div className="relative mt-8">
          <Button asChild variant="cta" size="lg">
            <Link to={to}>{cta} →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
