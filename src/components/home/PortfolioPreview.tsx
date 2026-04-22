import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import ecommerceImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Ceylon Spice Co..png";
import businessImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Lanka Legal.png";
import portfolioImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Studio Bloom.png";
import landingImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/BetterFit.png";

const PROJECTS = [
  { title: "Ceylon Spice Co.", category: "E-Commerce", tag: "Shopify Custom", img: ecommerceImg },
  { title: "Lanka Legal", category: "Business Website", tag: "Next.js", img: businessImg },
  { title: "Studio Bloom", category: "Portfolio", tag: "React + CMS", img: portfolioImg },
  { title: "BetterFit App", category: "Landing Page", tag: "Conversion", img: landingImg },
];

const PortfolioPreview = () => {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="reveal">
          <span className="section-label">Success Stories</span>
          <h2 className="heading-underline mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Digital Products We've Built
          </h2>
        </div>
        <Link
          to="/portfolio"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
        >
          View All Projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-14 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className="reveal group rounded-[2rem] overflow-hidden bg-card border border-border shadow-card card-lift flex flex-col w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest bg-white/95 backdrop-blur-sm text-brand-navy font-bold rounded-full px-3 py-1.5 shadow-sm">
                {p.tag}
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] bg-brand-navy/40">
                <Button asChild variant="cta" size="sm" className="scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Link to="/portfolio" className="flex items-center gap-2">View Project <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-10">
              <div>
                <h3 className="text-lg font-bold text-brand-navy transition-colors group-hover:text-brand-blue">{p.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1.5">{p.category}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfolioPreview;
