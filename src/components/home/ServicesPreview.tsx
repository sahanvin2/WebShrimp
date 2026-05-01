import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Briefcase, Layout, Rocket, Code2, Settings } from "lucide-react";

const SERVICES = [
  { icon: <ShoppingCart className="h-6 w-6" />, title: "E-Commerce Websites", slug: "e-commerce-websites", desc: "Online stores that convert visitors into loyal customers.", color: "bg-brand-blue-soft text-brand-navy" },
  { icon: <Briefcase className="h-6 w-6" />, title: "Business Websites", slug: "business-websites", desc: "Professional websites to build trust and grow your brand.", color: "bg-blue-50 text-brand-blue" },
  { icon: <Layout className="h-6 w-6" />, title: "Portfolio Websites", slug: "portfolio-websites", desc: "Showcase your work with beautiful portfolio websites.", color: "bg-purple-50 text-purple-600" },
  { icon: <Rocket className="h-6 w-6" />, title: "Landing Pages", slug: "landing-pages", desc: "High-converting pages for your marketing campaigns.", color: "bg-pink-50 text-pink-600" },
  { icon: <Code2 className="h-6 w-6" />, title: "Custom Software Solutions", slug: "custom-software", desc: "Tailored web applications and internal tools for your business.", color: "bg-emerald-50 text-emerald-600" },
  { icon: <Settings className="h-6 w-6" />, title: "Website Maintenance", slug: "website-maintenance", desc: "Keep your website updated, secure and running smoothly.", color: "bg-brand-blue-soft text-brand-navy" },
];

const ServicesPreview = () => {
  return (
    <section className="container-x py-16 lg:py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="reveal">
          <span className="section-label">What We Do</span>
          <h2 className="heading-underline mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Our Services
          </h2>
        </div>
        <Link
          to="/services"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          View All Services
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:overflow-visible">
        {SERVICES.map((s, i) => (
          <article
            key={s.title}
            className="reveal group rounded-2xl bg-card border border-border p-7 shadow-card card-lift w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${s.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
              {s.icon}
            </div>
            <h3 className="mt-5 text-xl text-brand-navy">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.desc}</p>
            <Link
              to={`/services/${s.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:gap-2.5 transition-all"
              aria-label={`Learn more about ${s.title}`}
            >
              Learn More <span className="sr-only">about {s.title}</span> <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicesPreview;
