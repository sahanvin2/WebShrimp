import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  { title: "Ceylon Spice Co.", category: "E-Commerce", tag: "Shopify Custom", from: "from-amber-400", to: "to-orange-600" },
  { title: "Lanka Legal", category: "Business Website", tag: "Next.js", from: "from-brand-blue", to: "to-indigo-700" },
  { title: "Studio Bloom", category: "Portfolio", tag: "React + CMS", from: "from-pink-500", to: "to-rose-600" },
  { title: "BetterFit App", category: "Landing Page", tag: "Conversion", from: "from-emerald-500", to: "to-teal-700" },
];

const PortfolioPreview = () => {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="reveal">
          <span className="section-label">Our Portfolio</span>
          <h2 className="heading-underline mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Our Recent Works
          </h2>
        </div>
        <Link
          to="/portfolio"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          View All Projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className="reveal group rounded-2xl overflow-hidden bg-card border border-border shadow-card card-lift"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.from} ${p.to} overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
              <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest bg-white/90 text-brand-navy rounded-full px-2.5 py-1">
                {p.tag}
              </span>
              <div className="absolute inset-0 bg-brand-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button asChild variant="cta" size="sm">
                  <Link to="/portfolio">View Project <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-base text-brand-navy">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{p.category}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfolioPreview;
