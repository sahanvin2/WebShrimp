import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title: string;
  description: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <SiteLayout>
      <section className="container-x py-24 lg:py-32 text-center">
        <span className="section-label">Coming Up Next</span>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-brand-navy">
          {title}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ComingSoon;
