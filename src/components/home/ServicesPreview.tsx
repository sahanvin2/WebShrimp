import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  { icon: "🛒", title: "E-Commerce Websites", desc: "Online stores that convert visitors into loyal customers.", color: "bg-brand-orange-soft text-brand-orange" },
  { icon: "💼", title: "Business Websites", desc: "Professional websites to build trust and grow your brand.", color: "bg-brand-blue-soft text-brand-blue" },
  { icon: "🖼️", title: "Portfolio Websites", desc: "Showcase your work with beautiful portfolio websites.", color: "bg-purple-50 text-purple-600" },
  { icon: "🚀", title: "Landing Pages", desc: "High-converting pages for your marketing campaigns.", color: "bg-pink-50 text-pink-600" },
  { icon: "📱", title: "Social Media Content", desc: "Eye-catching posters, videos & designs for social media.", color: "bg-emerald-50 text-emerald-600" },
  { icon: "🔧", title: "Website Maintenance", desc: "Keep your website updated, secure and running smoothly.", color: "bg-amber-50 text-amber-600" },
];

const ServicesPreview = () => {
  return (
    <section className="container-x py-20 lg:py-28">
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

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <article
            key={s.title}
            className="reveal group rounded-2xl bg-card border border-border p-7 shadow-card card-lift"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl ${s.color}`}>
              <span aria-hidden>{s.icon}</span>
            </div>
            <h3 className="mt-5 text-xl text-brand-navy">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.desc}</p>
            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:gap-2.5 transition-all"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicesPreview;
