import { useState, useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "E-Commerce", "Business", "Portfolio", "Directory", "Education", "Social Media", "Blog", "Landing", "News"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS = [
  {
    title: "MAISON Premium Essentials",
    category: "E-Commerce",
    tech: ["HTML", "CSS", "JS"],
    desc: "Luxury e-commerce concept with editorial sections, modern navigation and product discovery UX.",
    url: "/projects/E-Commerce.html",
  },
  {
    title: "Aiden Cole Creative Portfolio",
    category: "Portfolio",
    tech: ["HTML", "Tailwind", "Lucide"],
    desc: "Immersive creative portfolio with advanced animations and strong visual storytelling.",
    url: "/projects/portfilio.html",
  },
  {
    title: "Rise Together Charity Platform",
    category: "Business",
    tech: ["React", "Tailwind", "CDN"],
    desc: "Charity and nonprofit experience with campaign pages, impact sections and donation flows.",
    url: "/projects/Charity.html",
  },
  {
    title: "NexusCorp Enterprise",
    category: "Business",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Modern corporate business landing page with interactive layouts and elegant styling.",
    url: "/projects/Business.html",
  },
  {
    title: "Local Directory Platform",
    category: "Directory",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Comprehensive directory listing application with search, filters, and detailed view pages.",
    url: "/projects/Listning.html",
  },
  {
    title: "EdTech Learning Management",
    category: "Education",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Full-featured LMS interface including dashboard, course catalog, and student metrics.",
    url: "/projects/Lms.html",
  },
  {
    title: "Connect Social Media",
    category: "Social Media",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Interactive social feed, profile layouts, and dynamic community engagement platform.",
    url: "/projects/Socialmedia.html",
  },
  {
    title: "Modern Editorial Blog",
    category: "Blog",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Clean, typography-focused blog template optimized for reading and content discovery.",
    url: "/projects/blog.html",
  },
  {
    title: "Product Landing Page",
    category: "Landing",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "High-conversion product landing page designed to capture leads and showcase features.",
    url: "/projects/landing.html",
  },
  {
    title: "Global News Portal",
    category: "News",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Dynamic news aggregator layout with breaking news tickers, structured grids, and media rich articles.",
    url: "/projects/news.html",
  },
];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const [featuredProject, setFeaturedProject] = useState(PROJECTS[0]);
  const featuredRef = useRef<HTMLElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <SiteLayout>
        <PageHero
          label="Our Portfolio"
          title="Our Capabilities"
          subtitle="A curated selection of conceptual demos and templates to give you an idea of our design capabilities. Your actual product will be fully customized, production-ready, and functionally superior."
          breadcrumb="Portfolio"
        />
        <style>{`
          .hw-container {
            container-type: inline-size;
          }
        `}</style>

      {/* Filters */}
      <section className="container-x pt-8">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${active === c
                  ? "bg-brand-blue text-white shadow-glow"
                  : "bg-white text-brand-navy border border-border hover:border-brand-blue"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured project (Moved to top so user doesn't get yanked down) */}
      <section ref={featuredRef} className="container-x py-12 scroll-mt-24">
        <div className="reveal rounded-3xl bg-card border border-border shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-brand-blue-soft p-4 sm:p-6 lg:p-8 min-h-[360px]">
              <div className="absolute top-6 left-6 z-10 px-3 py-1 rounded-full bg-white/95 text-xs font-semibold text-brand-blue border border-border">
                Featured Live Demo
              </div>
              <div className="h-full w-full rounded-2xl overflow-hidden border border-border shadow-card bg-white relative min-h-[320px] hw-container">
                <iframe
                  src={featuredProject.url}
                  title={`${featuredProject.title} preview`}
                  className="absolute top-0 left-0 w-[1280px] h-[960px] origin-top-left"
                  style={{ transform: 'scale(calc(100cqw / 1280))' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
            <div className="p-6 md:p-10 lg:p-14">
              <span className="section-label">Featured Project</span>
              <h2 className="mt-3 text-2xl md:text-3xl text-brand-navy">{featuredProject.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Category: {featuredProject.category}</p>
              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-brand-navy">Overview</h4>
                  <p className="text-muted-foreground mt-1">{featuredProject.desc}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy">Stack</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {featuredProject.tech.map((t) => (
                      <span key={t} className="tech-badge bg-brand-blue-soft border-brand-blue/20 text-brand-navy">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 flex flex-col items-start gap-3">
                  <span className="inline-block rounded-full bg-brand-orange-soft text-brand-orange px-4 py-2 text-sm font-semibold">
                    ✨ Live interactive preview — select other projects below!
                  </span>
                  <span className="inline-block rounded-full bg-gray-100 text-gray-500 px-4 py-2 text-xs font-medium">
                    Note: All embedded demos are for preview purposes only.
                  </span>
                </div>
              </div>
              <Button asChild variant="hero" size="lg" className="mt-7">
                <a href={featuredProject.url} target="_blank" rel="noopener noreferrer">
                  Open Featured Demo in Full View
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-x pb-16 pt-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:overflow-visible">
          {filtered.map((p, i) => (
            <article
              key={p.title}
              className="reveal group relative rounded-2xl overflow-hidden bg-card border border-border shadow-card card-lift cursor-pointer w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
              style={{ transitionDelay: `${(i % 6) * 50}ms` }}
              onClick={() => {
                setFeaturedProject(p);
                featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFeaturedProject(p);
                  featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-[4/3] bg-brand-blue-soft overflow-hidden border-b border-border hw-container">
                <iframe
                  src={p.url}
                  title={`${p.title} preview`}
                  className="absolute top-0 left-0 w-[1280px] h-[960px] origin-top-left pointer-events-none"
                  style={{ transform: 'scale(calc(100cqw / 1280))' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-brand-blue">
                  {p.category}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-navy/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                  <p className="text-white/85 text-sm">{p.desc}</p>
                  <p className="mt-4 text-xs font-semibold tracking-wide uppercase text-brand-yellow">Click card to view demo</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg text-brand-navy">{p.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-blue-soft text-brand-blue">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue/80">
                    Preview on click
                  </span>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark">
                    Open Full <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner title="Have a project in mind?" subtitle="Let's talk about what you want to build." cta="Start Your Project" />
    </SiteLayout>
  );
};

export default Portfolio;
