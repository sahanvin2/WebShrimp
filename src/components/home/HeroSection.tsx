import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, Zap, ShieldCheck, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-hero">
      {/* Floating blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-brand-orange/15 blur-3xl animate-float-slower" />

      <div className="container-x relative pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <span className="section-label animate-fade-up" style={{ animationDelay: "0.05s" }}>
              <Sparkles className="inline h-3 w-3 mr-1.5 -mt-0.5" />
              Web & Software Agency · Sri Lanka
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-brand-navy animate-fade-up" style={{ animationDelay: "0.1s" }}>
              We Build{" "}
              <span className="text-brand-blue">Websites</span>
              <br />
              That <span className="text-gradient-orange">Grow Your Business.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
              From stunning websites to powerful web applications, we build digital experiences that help your business stand out and succeed online.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button asChild variant="hero" size="lg">
                <Link to="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/portfolio">
                  View Our Work <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Trust badge */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur border border-border px-5 py-3 shadow-card animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-brand-navy">5.0 Customer Rating</span>
                <span className="text-muted-foreground"> · Trusted by 200+ Businesses</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="absolute inset-6 bg-brand-blue/10 rounded-[2rem] blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Isometric illustration of a browser window with floating code snippets"
              width={1024}
              height={1024}
              className="relative w-full max-w-xl mx-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Feature pills */}
        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          {[
            { Icon: Palette, title: "Modern Design", desc: "Beautiful & user-friendly" },
            { Icon: Zap, title: "High Performance", desc: "Fast & SEO optimized" },
            { Icon: ShieldCheck, title: "Reliable Support", desc: "We are here for you" },
          ].map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal flex items-center gap-4 rounded-2xl bg-white border border-border px-5 py-4 shadow-card card-lift"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-brand-blue-soft flex items-center justify-center text-brand-blue">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
