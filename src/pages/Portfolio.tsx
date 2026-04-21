import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "E-Commerce", "Business", "Portfolio", "Landing Pages", "Social Media"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS = [
  { title: "Ocean Spice", category: "E-Commerce", tech: ["Next.js", "Stripe"], grad: "from-orange-400 to-pink-500", desc: "Premium spice store with 200+ SKUs and global shipping." },
  { title: "Ceylon Tech", category: "Business", tech: ["React", "Tailwind"], grad: "from-blue-500 to-indigo-600", desc: "Corporate site for an enterprise IT consultancy." },
  { title: "Lens by Maya", category: "Portfolio", tech: ["Next.js"], grad: "from-purple-500 to-pink-500", desc: "Wedding photographer's filterable gallery." },
  { title: "FitLanka Pro", category: "Landing Pages", tech: ["React", "GA4"], grad: "from-emerald-500 to-teal-500", desc: "High-converting paid-ad landing page for a fitness app." },
  { title: "Urban Bites", category: "Social Media", tech: ["Figma", "After Effects"], grad: "from-amber-400 to-orange-500", desc: "30-day social media reel & poster pack." },
  { title: "Sapphire Travels", category: "Business", tech: ["Laravel", "MySQL"], grad: "from-cyan-500 to-blue-500", desc: "Booking platform for a Sri Lankan tour operator." },
  { title: "Green Valley Mart", category: "E-Commerce", tech: ["MERN", "Stripe"], grad: "from-green-500 to-emerald-600", desc: "Online grocery with same-day delivery in Colombo." },
  { title: "Studio Nadeesha", category: "Portfolio", tech: ["React"], grad: "from-rose-500 to-fuchsia-600", desc: "Interior designer's case study website." },
  { title: "Kandy Crafts", category: "E-Commerce", tech: ["Next.js", "Sanity"], grad: "from-yellow-500 to-amber-600", desc: "Handmade craft marketplace from Kandy artisans." },
];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <PageHero
        label="Our Portfolio"
        title="Our Recent Works"
        subtitle="A selection of projects we've shipped for clients in Sri Lanka and beyond."
        breadcrumb="Portfolio"
      />

      {/* Filters */}
      <section className="container-x pt-8">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === c
                  ? "bg-brand-blue text-white shadow-glow"
                  : "bg-white text-brand-navy border border-border hover:border-brand-blue"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-x py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <article
              key={p.title}
              className="reveal group relative rounded-2xl overflow-hidden bg-card border border-border shadow-card card-lift"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.grad}`}>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-brand-blue">
                  {p.category}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-navy/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                  <p className="text-white/85 text-sm">{p.desc}</p>
                  <Button variant="cta" size="sm" className="mt-5">
                    View Project <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
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
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured project */}
      <section className="container-x py-16">
        <div className="reveal rounded-3xl bg-card border border-border shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Mockup */}
            <div className="relative bg-gradient-to-br from-brand-blue to-brand-navy p-10 lg:p-14 flex items-center justify-center min-h-[360px]">
              <div className="w-full max-w-sm rounded-xl bg-white shadow-glow overflow-hidden">
                <div className="h-7 bg-gray-100 flex items-center gap-1.5 px-3">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="aspect-video bg-gradient-to-br from-orange-400 to-pink-500" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-3/4 rounded-full bg-gray-200" />
                  <div className="h-3 w-1/2 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
            <div className="p-10 lg:p-14">
              <span className="section-label">Featured Project</span>
              <h2 className="mt-3 text-3xl text-brand-navy">Ocean Spice — E-Commerce</h2>
              <p className="mt-2 text-sm text-muted-foreground">Client: Ocean Spice (Pvt) Ltd.</p>
              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-brand-navy">Challenge</h4>
                  <p className="text-muted-foreground mt-1">Outdated Shopify theme with poor mobile conversion and slow load.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy">Solution</h4>
                  <p className="text-muted-foreground mt-1">Custom Next.js storefront with edge caching, redesigned product pages and a one-page checkout.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy">Stack</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Next.js", "Stripe", "Sanity CMS", "Vercel"].map((t) => (
                      <span key={t} className="tech-badge bg-brand-blue-soft border-brand-blue/20 text-brand-navy">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <span className="inline-block rounded-full bg-brand-orange-soft text-brand-orange px-4 py-2 text-sm font-semibold">
                    📈 300% increase in online sales
                  </span>
                </div>
              </div>
              <Button asChild variant="hero" size="lg" className="mt-7">
                <Link to="/contact">Start a similar project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner title="Have a project in mind?" subtitle="Let's talk about what you want to build." cta="Start Your Project" />
    </SiteLayout>
  );
};

export default Portfolio;
