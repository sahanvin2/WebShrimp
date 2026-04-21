import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import StatsStrip from "@/components/StatsStrip";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    icon: "🛒",
    title: "E-Commerce Websites",
    color: "bg-brand-orange-soft text-brand-orange",
    desc: "Sell more with online stores built for speed, conversion and effortless management. Integrated payments and a clean admin keep you focused on growth.",
    features: [
      "Shopping cart & checkout flow",
      "Payment gateway integration",
      "Product & inventory management",
      "Order tracking & notifications",
      "Mobile-optimized storefront",
    ],
  },
  {
    icon: "💼",
    title: "Business Websites",
    color: "bg-brand-blue-soft text-brand-blue",
    desc: "Professional, trust-building websites that turn visitors into customers. Perfect for service businesses, agencies and growing brands.",
    features: [
      "Up to 10 custom-designed pages",
      "Fully responsive across devices",
      "On-page SEO foundation",
      "Contact form with email routing",
      "Social media integration",
    ],
  },
  {
    icon: "🖼️",
    title: "Portfolio Websites",
    color: "bg-purple-50 text-purple-600",
    desc: "Beautiful, gallery-focused sites that let your work speak for itself — for creatives, freelancers, photographers and studios.",
    features: [
      "Unlimited project showcase",
      "Filterable gallery & categories",
      "Contact & enquiry integration",
      "Optimised image loading",
      "Personal branding focus",
    ],
  },
  {
    icon: "🚀",
    title: "Landing Pages",
    color: "bg-pink-50 text-pink-600",
    desc: "High-converting single pages purpose-built for your campaigns — paid ads, product launches, or lead generation.",
    features: [
      "A/B test ready structure",
      "Conversion-optimized layout",
      "Analytics & pixel integration",
      "Sub-2s load speed",
      "Lead capture forms",
    ],
  },
  {
    icon: "📱",
    title: "Social Media Content",
    color: "bg-emerald-50 text-emerald-600",
    desc: "Eye-catching design and motion content that stops the scroll — built around your brand and your goals.",
    features: [
      "Posters & feed posts",
      "Reels & short-form video",
      "Story templates",
      "Branded banners",
      "Brand kits & guidelines",
    ],
  },
  {
    icon: "🔧",
    title: "Website Maintenance",
    color: "bg-amber-50 text-amber-600",
    desc: "Keep your website fast, secure and up-to-date with monthly maintenance plans handled by our engineering team.",
    features: [
      "Security patches & updates",
      "Daily/weekly backups",
      "Uptime monitoring",
      "Content & copy updates",
      "Performance tuning",
    ],
  },
];

const ADDITIONAL = [
  { icon: "📲", title: "Mobile App Development", desc: "Native-feeling apps built with React Native & PWAs." },
  { icon: "🧠", title: "Custom Software Solutions", desc: "Tailored business tools, dashboards & internal systems." },
  { icon: "🔍", title: "SEO Optimization", desc: "Technical & on-page SEO to grow organic traffic." },
  { icon: "🔗", title: "API Development & Integration", desc: "REST APIs and 3rd-party integrations done right." },
];

const Services = () => {
  return (
    <SiteLayout>
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
              className="reveal rounded-3xl bg-card border border-border p-8 shadow-card card-lift"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${s.color}`}>
                  <span aria-hidden>{s.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl text-brand-navy">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className="h-4 w-4 mt-0.5 text-brand-blue shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant="cta" size="pill" className="mt-7">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Additional services */}
      <section className="bg-brand-blue-soft/60 py-20">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="section-label">More From Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Additional Services</h2>
            <p className="mt-4 text-muted-foreground">
              Beyond websites — we build the digital tools and content your business needs to scale.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADDITIONAL.map((a, i) => (
              <div
                key={a.title}
                className="reveal rounded-2xl bg-card border border-border p-6 shadow-card card-lift text-center"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-3xl">{a.icon}</div>
                <h3 className="mt-4 text-lg text-brand-navy">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
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
