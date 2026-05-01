import { Link } from "react-router-dom";
import { Check, ShoppingCart, Briefcase, Image as ImageIcon, Rocket, Share2, Wrench, Smartphone, Code2, Search, Link as LinkIcon, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import StatsStrip from "@/components/StatsStrip";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    slug: "e-commerce-websites",
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    color: "bg-brand-orange-soft text-brand-orange shadow-orange",
    desc: "Sell more with online stores built for speed, conversion and effortless management. Integrated payments and a clean admin keep you focused on growth.",
    features: [
      "Shopping cart & checkout flow",
      "Payment gateway integration",
      "Product & inventory management",
      "Order tracking & notifications",
      "Mobile-optimized storefront",
    ],
    timeline: "4-8 weeks",
  },
  {
    slug: "business-websites",
    icon: Briefcase,
    title: "Business Websites",
    color: "bg-brand-blue-soft text-brand-blue shadow-glow",
    desc: "Professional, trust-building websites that turn visitors into customers. Perfect for service businesses, agencies and growing brands.",
    features: [
      "Up to 10 custom-designed pages",
      "Fully responsive across devices",
      "On-page SEO foundation",
      "Contact form with email routing",
      "Custom domain setup",
    ],
    timeline: "2-4 weeks",
  },
  {
    slug: "portfolio-websites",
    icon: ImageIcon,
    title: "Portfolio Websites",
    color: "bg-purple-50 text-purple-600 shadow-glow",
    desc: "Beautiful, gallery-focused sites that let your work speak for itself — for creatives, freelancers, photographers and studios.",
    features: [
      "Unlimited project showcase",
      "Filterable gallery & categories",
      "Contact & enquiry integration",
      "Optimised image loading",
      "Personal branding focus",
    ],
    timeline: "2-3 weeks",
  },
  {
    slug: "landing-pages",
    icon: Rocket,
    title: "Landing Pages",
    color: "bg-pink-50 text-pink-600 shadow-glow",
    desc: "High-converting single pages purpose-built for your campaigns — paid ads, product launches, or lead generation.",
    features: [
      "A/B test ready structure",
      "Conversion-optimized layout",
      "Analytics & pixel integration",
      "Sub-2s load speed",
      "Lead capture forms",
    ],
    timeline: "1-2 weeks",
  },
  {
    slug: "custom-software",
    icon: Code2,
    title: "Custom Software Solutions",
    color: "bg-emerald-50 text-emerald-600 shadow-glow",
    desc: "Tailored web applications, internal tools, and dashboards built to solve your unique business challenges and streamline operations.",
    features: [
      "Custom web applications",
      "Internal business dashboards",
      "API development & integration",
      "Database design & management",
      "Automated workflows",
    ],
    timeline: "Ongoing / Varies by scope",
  },
  {
    slug: "website-maintenance",
    icon: Wrench,
    title: "Website Maintenance",
    color: "bg-brand-blue-soft text-brand-navy shadow-orange",
    desc: "Keep your website fast, secure and up-to-date with monthly maintenance plans handled by our engineering team.",
    features: [
      "Security patches & updates",
      "Daily/weekly backups",
      "Uptime monitoring",
      "Content & copy updates",
      "Performance tuning",
    ],
    timeline: "Monthly Recurring",
  },
];

const ADDITIONAL = [
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-feeling apps built with React Native & PWAs.", color: "text-brand-orange" },
  { icon: Rocket, title: "Cloud Infrastructure", desc: "Scalable hosting, AWS, Digital Ocean, and CI/CD pipelines.", color: "text-brand-blue" },
  { icon: Search, title: "SEO Optimization", desc: "Technical & on-page SEO to grow organic traffic.", color: "text-emerald-600" },
  { icon: LinkIcon, title: "API Development & Integration", desc: "REST APIs and 3rd-party integrations done right.", color: "text-purple-600" },
];

const Services = () => {
  return (
    <SiteLayout>
      <Seo
        title="Services | Loopingon"
        description="Explore Loopingon's website, software, landing page, e-commerce, and maintenance services for growing businesses."
        path="/services"
      />
      <PageHero
        label="What We Do"
        title="Our Services"
        subtitle="End-to-end web, software and creative services designed to help your business grow online."
        breadcrumb="Services"
      />

      <section className="container-x py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-7">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="reveal group flex flex-col rounded-3xl bg-card border border-border p-8 shadow-card hover:shadow-glow transition-all card-lift"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${s.color}`}>
                  <s.icon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-navy">{s.title}</h2>
                  {s.timeline && <p className="text-xs font-semibold text-brand-orange mt-1">Delivered in {s.timeline}</p>}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/85 font-medium">
                    <Check className="h-4 w-4 mt-0.5 text-brand-blue shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="pill" className="group-hover:shadow-[0_4px_20px_rgb(20,50,225,0.3)] transition-all">
                  <Link to={s.slug === "website-maintenance" ? "/pricing" : `/services/${s.slug}`}>
                    View Details <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="pill">
                  <a href={`https://wa.me/94703031636?text=Hello! I am interested in the ${s.title} service.`} target="_blank" rel="noopener noreferrer">
                    Get a Quote
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Additional services */}
      <section className="bg-brand-blue-soft/60 py-20">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="section-label mx-auto">More From Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Additional Services</h2>
            <p className="mt-4 text-muted-foreground">
              Beyond websites — we build the digital tools and content your business needs to scale.
            </p>
          </div>
          <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-5 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
            {ADDITIONAL.map((a, i) => (
              <div
                key={a.title}
                className="reveal group rounded-3xl bg-card border border-border p-8 shadow-card hover:shadow-glow transition-all card-lift text-center w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className={`mx-auto h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:-translate-y-2 transition-transform shadow-sm border border-border ${a.color}`}>
                  <a.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-brand-navy">{a.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsStrip />
      <CtaBanner
        title="Ready to get started?"
        subtitle="Let's build something amazing together — tell us about your project."
      />
    </SiteLayout>
  );
};

export default Services;
