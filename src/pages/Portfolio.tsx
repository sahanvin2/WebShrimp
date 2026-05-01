import { useState, useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";
import { getPublicAssetUrl } from "@/lib/site";

const CATEGORIES = ["All", "E-Commerce", "Business", "Portfolio", "Directory", "Education", "Social Media", "Blog", "Landing", "News"] as const;
type Category = (typeof CATEGORIES)[number];

const toPublicPath = (path: string): string => (path.startsWith("/") ? path : `/${path}`);

const buildPathVariants = (path: string): string[] => {
  const normalized = toPublicPath(path);
  const encoded = encodeURI(normalized);
  return [
    getPublicAssetUrl(normalized),
    getPublicAssetUrl(encoded),
    normalized,
    encoded,
  ];
};

const slugifyProjectTitle = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildImageCandidates = (title: string, primaryUrl: string): string[] => {
  const slug = slugifyProjectTitle(title);
  const candidates = [
    primaryUrl,
    ...buildPathVariants(`/portfolio_thumbs/${title}.webp`),
    ...buildPathVariants(`/portfolio_thumbs/${title}.png`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}.webp`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}.png`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}..webp`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}..png`),
  ];

  return [...new Set(candidates)];
};

type PortfolioImageProps = {
  title: string;
  primaryUrl: string;
  eager: boolean;
};

const PortfolioImage = ({ title, primaryUrl, eager }: PortfolioImageProps) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isMissing, setIsMissing] = useState(false);
  const candidates = buildImageCandidates(title, primaryUrl);
  const currentSrc = candidates[candidateIndex];

  if (isMissing || !currentSrc) {
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={`${title} preview`}
      className="absolute top-0 left-0 z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => {
        setCandidateIndex((prev) => {
          if (prev < candidates.length - 1) {
            return prev + 1;
          }
          setIsMissing(true);
          return prev;
        });
      }}
    />
  );
};

const PROJECTS = [
  {
    title: "Voss & Crane Studio",
    category: "Business",
    tech: ["HTML", "CSS", "JS"],
    desc: "A sleek, minimalist architecture and design studio site featuring brutalist concrete elements.",
    url: "/projects/Voss-and-crane-studio.html",
    image: getPublicAssetUrl("/portfolio_thumbs/voss-and-crane-studio.webp"),
  },
  {
    title: "Ember & Salt Fine Dining",
    category: "Business",
    tech: ["HTML", "Tailwind", "JS"],
    desc: "A high-end fine dining restaurant website with an elegant dark mode and sophisticated aesthetic.",
    url: "/projects/Ember & Salt Fine Dining.html",
    image: getPublicAssetUrl("/portfolio_thumbs/ember-and-salt-fine-dining.webp"),
  },
  {
    title: "Phantom Studio",
    category: "Portfolio",
    tech: ["HTML", "CSS", "GSAP"],
    desc: "An avant-garde creative agency portfolio with bold typography and edgy layouts.",
    url: "/projects/Phantom Studio.html",
    image: getPublicAssetUrl("/portfolio_thumbs/phantom-studio.webp"),
  },
  {
    title: "Meridian Analytics",
    category: "Landing",
    tech: ["React", "Tailwind", "JS"],
    desc: "A modern data analytics dashboard highlighting clear visualizations and clean corporate design.",
    url: "/projects/Meridian Analytics.html",
    image: getPublicAssetUrl("/portfolio_thumbs/meridian-analytics.webp"),
  },
  {
    title: "Sōkai Wellness",
    category: "Business",
    tech: ["HTML", "CSS", "JS"],
    desc: "A tranquil wellness and spa website with soft pastel colors and a calming zen layout.",
    url: "/projects/Sōkai Wellness.html",
    image: getPublicAssetUrl("/portfolio_thumbs/sokai-wellness.webp"),
  },
  {
    title: "TerraGuard Foundation",
    category: "Business",
    tech: ["HTML", "CSS", "JS"],
    desc: "An environmental charity site featuring lush nature tones and a professional non-profit design.",
    url: "/projects/TerraGuard Foundation.html",
    image: getPublicAssetUrl("/portfolio_thumbs/terraguard-foundation.webp"),
  },
  {
    title: "LUNE Atelier",
    category: "E-Commerce",
    tech: ["HTML", "CSS", "JS"],
    desc: "A luxury fashion brand layout with editorial-style photography and elegant typography.",
    url: "/projects/LUNE Atelier.html",
    image: getPublicAssetUrl("/portfolio_thumbs/lune-atelier.webp"),
  },
  {
    title: "VAEL Portfolio",
    category: "Portfolio",
    tech: ["HTML", "Tailwind", "JS"],
    desc: "A minimalist personal portfolio for a creative professional using a clean grid and white space.",
    url: "/projects/VAEL Portfolio.html",
    image: getPublicAssetUrl("/portfolio_thumbs/vael-portfolio.webp"),
  },
  {
    title: "Nomad Routes",
    category: "Business",
    tech: ["HTML", "CSS", "JS"],
    desc: "An adventure travel and tour booking layout highlighting vibrant photography and clear CTAs.",
    url: "/projects/Nomad Routes.html",
    image: getPublicAssetUrl("/portfolio_thumbs/nomad-routes.webp"),
  },
  {
    title: "Aurum Estate",
    category: "Business",
    tech: ["HTML", "CSS", "JS"],
    desc: "A luxury real estate agency site with a dark elegant theme and gold accents.",
    url: "/projects/Aurum Estate.html",
    image: getPublicAssetUrl("/portfolio_thumbs/aurum-estate.webp"),
  },
  {
    title: "Axiom Protocol",
    category: "Landing",
    tech: ["HTML", "CSS", "JS"],
    desc: "A futuristic web3 protocol concept with neon accents and high-tech grid backgrounds.",
    url: "/projects/Axiom Protocol.html",
    image: getPublicAssetUrl("/portfolio_thumbs/axiom-protocol.webp"),
  },
  {
    title: "Ceylon Spice Co.",
    category: "E-Commerce",
    tech: ["Shopify", "Tailwind", "JS"],
    desc: "Premium spice brand e-commerce with rich storytelling and seamless shopping experience.",
    url: "/projects/ceylon-spice.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Ceylon Spice Co..webp"),
  },
  {
    title: "Lanka Legal",
    category: "Business",
    tech: ["Next.js", "React", "Tailwind"],
    desc: "Professional law firm website emphasizing trust, expertise, and easy client onboarding.",
    url: "/projects/lanka-legal.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Lanka Legal.webp"),
  },
  {
    title: "Studio Bloom",
    category: "Portfolio",
    tech: ["React", "CMS", "Framer"],
    desc: "Minimalist creative agency portfolio showcasing high-end visual design and case studies.",
    url: "/projects/studio-bloom.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Studio Bloom.webp"),
  },
  {
    title: "BetterFit App",
    category: "Landing",
    tech: ["HTML", "Tailwind", "Lucide"],
    desc: "High-conversion mobile app landing page designed for health and fitness enthusiasts.",
    url: "/projects/betterfit-app.html",
    image: getPublicAssetUrl("/portfolio_thumbs/BetterFit App.webp"),
  },
  {
    title: "MAISON Premium Essentials",
    category: "E-Commerce",
    tech: ["HTML", "CSS", "JS"],
    desc: "Luxury e-commerce concept with editorial sections, modern navigation and product discovery UX.",
    url: "/projects/E-Commerce.html",
    image: getPublicAssetUrl("/portfolio_thumbs/MAISON Premium Essentials.webp"),
  },
  {
    title: "Aiden Cole Creative Portfolio",
    category: "Portfolio",
    tech: ["HTML", "Tailwind", "Lucide"],
    desc: "Immersive creative portfolio with advanced animations and strong visual storytelling.",
    url: "/projects/portfilio.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Aiden Cole Creative Portfolio.webp"),
  },
  {
    title: "Rise Together Charity Platform",
    category: "Business",
    tech: ["React", "Tailwind", "CDN"],
    desc: "Charity and nonprofit experience with campaign pages, impact sections and donation flows.",
    url: "/projects/Charity.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Rise Together Charity Platform.webp"),
  },
  {
    title: "NexusCorp Enterprise",
    category: "Business",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Modern corporate business landing page with interactive layouts and elegant styling.",
    url: "/projects/Business.html",
    image: getPublicAssetUrl("/portfolio_thumbs/NexusCorp Enterprise.webp"),
  },
  {
    title: "Local Directory Platform",
    category: "Directory",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Comprehensive directory listing application with search, filters, and detailed view pages.",
    url: "/projects/Listning.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Local Directory Platform.webp"),
  },
  {
    title: "EdTech Learning Management",
    category: "Education",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Full-featured LMS interface including dashboard, course catalog, and student metrics.",
    url: "/projects/Lms.html",
    image: getPublicAssetUrl("/portfolio_thumbs/EdTech Learning Management.webp"),
  },
  {
    title: "Modern Editorial Blog",
    category: "Blog",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Clean, typography-focused blog template optimized for reading and content discovery.",
    url: "/projects/blog.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Modern Editorial Blog.webp"),
  },
  {
    title: "Product Landing Page",
    category: "Landing",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "High-conversion product landing page designed to capture leads and showcase features.",
    url: "/projects/landing.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Product Landing Page.webp"),
  },
  {
    title: "Global News Portal",
    category: "News",
    tech: ["React", "Tailwind", "Lucide"],
    desc: "Dynamic news aggregator layout with breaking news tickers, structured grids, and media rich articles.",
    url: "/projects/news.html",
    image: getPublicAssetUrl("/portfolio_thumbs/Global News Portal.webp"),
  },
];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const [featuredProject, setFeaturedProject] = useState(PROJECTS[0]);
  const featuredRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const observeElement = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        // Calculate scale based on container width vs base width 1280
        setScale(entry.contentRect.width / 1280);
      }
    };
    
    const observer = new ResizeObserver(observeElement);
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [containerRef]);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const eagerImageCount = 9;

  return (
    <SiteLayout>
      <PageHero
        label="Our Samples"
        title="Our Capabilities"
        subtitle="A curated selection of conceptual demos and templates to give you an idea of our design capabilities. Your actual product will be fully customized, production-ready, and functionally superior."
        breadcrumb="Samples"
      />

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

      {/* Featured project */}
      <section ref={featuredRef} className="container-x py-12 scroll-mt-24">
        <div className="reveal rounded-3xl bg-card border border-border shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-brand-blue-soft p-4 sm:p-6 lg:p-8 min-h-[360px]">
              <div className="absolute top-6 left-6 z-10 px-3 py-1 rounded-full bg-white/95 text-xs font-semibold text-brand-blue border border-border">
                Featured Live Demo
              </div>
              <div 
                className="h-full w-full rounded-2xl overflow-hidden border border-border shadow-card bg-white relative min-h-[320px]"
                ref={containerRef}
              >
                <iframe
                  src={featuredProject.url}
                  title={`${featuredProject.title} preview`}
                  className="absolute top-0 left-0 origin-top-left"
                  style={{ 
                    width: '1280px', 
                    height: '960px', 
                    transform: `scale(${scale})` 
                  }}
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
              <div 
                className="relative aspect-[4/3] overflow-hidden border-b border-border bg-gradient-to-br from-brand-blue-soft via-white to-brand-orange-soft"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(26,107,255,0.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(247,249,255,0.94))]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent" />
                <PortfolioImage
                  title={p.title}
                  primaryUrl={p.image}
                  eager={i < eagerImageCount}
                />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-brand-blue shadow-sm">
                  {p.category}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-brand-navy/85 p-6 text-center opacity-0 transition-opacity group-hover:opacity-100">
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
