import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";

const SERVICES = {
  "e-commerce-websites": {
    title: "E-Commerce Websites",
    summary: "High-performance online stores designed to turn traffic into orders.",
    description:
      "We design and build e-commerce websites that are fast, easy to manage, and built for conversion. From storefront UX to checkout flow, every step is optimized to reduce drop-offs and increase repeat purchases.",
    includes: [
      "Conversion-focused storefront design",
      "Product, inventory and category management",
      "Payment gateway and shipping setup",
      "Mobile-optimized checkout experience",
      "Order notifications and customer emails",
      "Analytics and tracking dashboards",
    ],
    outcomes: ["Higher conversion rates", "Smoother order flow", "Easy back-office management"],
  },
  "business-websites": {
    title: "Business Websites",
    summary: "Professional websites that build trust and generate qualified leads.",
    description:
      "Your business website should clearly communicate your value, prove credibility, and guide visitors toward contact. We create modern, clean, and SEO-ready business websites that support long-term growth.",
    includes: [
      "Up to 10 custom pages",
      "Service-focused messaging and layout",
      "Inquiry forms and call-to-action blocks",
      "On-page SEO setup and metadata",
      "Fast-loading responsive design",
      "Google Maps and social integrations",
    ],
    outcomes: ["More inbound leads", "Stronger brand trust", "Better Google visibility"],
  },
  "portfolio-websites": {
    title: "Portfolio Websites",
    summary: "Beautiful showcase sites for creatives, freelancers, and agencies.",
    description:
      "We craft portfolio websites that highlight your best work and tell your story clearly. The goal is simple: help potential clients understand your quality quickly and contact you with confidence.",
    includes: [
      "Project showcase with categories",
      "Case-study style project pages",
      "Lightweight image optimization",
      "Personal brand profile sections",
      "Contact and booking CTAs",
      "Editable content structure",
    ],
    outcomes: ["Stronger first impression", "Better project storytelling", "More client inquiries"],
  },
  "landing-pages": {
    title: "Landing Pages",
    summary: "Campaign pages engineered for action, not just traffic.",
    description:
      "From ad click to conversion, we design landing pages with a single focused goal. Clear messaging, strong hierarchy, and performance-first build quality help you get more leads from the same ad spend.",
    includes: [
      "Campaign-focused page structure",
      "Clear offer and value framing",
      "Lead capture and validation forms",
      "Pixel and event tracking setup",
      "Speed optimization for paid traffic",
      "A/B-test ready sections",
    ],
    outcomes: ["Lower cost per lead", "Improved conversion rates", "Clear campaign insights"],
  },
  "social-media-content": {
    title: "Social Media Content",
    summary: "Creative visual content that helps your brand stand out and stay consistent.",
    description:
      "We produce branded social media content tailored to your audience and goals. Every design and video follows your brand direction while being optimized for modern feed behavior.",
    includes: [
      "Branded poster and carousel designs",
      "Reel and short-video editing",
      "Story and highlight templates",
      "Ad-creative variations",
      "Monthly content batches",
      "Brand consistency guidelines",
    ],
    outcomes: ["Higher engagement", "Consistent brand look", "Faster content production"],
  },
  "website-maintenance": {
    title: "Website Maintenance",
    summary: "Proactive maintenance to keep your website secure, fast, and stable.",
    description:
      "A launched website still needs regular care. We handle updates, monitoring, backups, and performance checks so your team can focus on business while we keep your platform healthy.",
    includes: [
      "Routine updates and security patches",
      "Automated backups and restore checks",
      "Uptime and error monitoring",
      "Speed and performance tuning",
      "Monthly maintenance report",
      "Small content or copy updates",
    ],
    outcomes: ["Reduced downtime", "Better security posture", "Stable long-term performance"],
  },
} as const;

const PROCESS_STEPS = [
  { title: "Discovery", desc: "We understand your goals, audience, and success metrics." },
  { title: "Plan", desc: "We define scope, timeline, and technical approach." },
  { title: "Design & Build", desc: "We craft and implement the solution with regular updates." },
  { title: "Launch", desc: "We test, optimize, and go live with confidence." },
  { title: "Support", desc: "We monitor performance and improve continuously." },
];

const SERVICE_IMAGES: Record<keyof typeof SERVICES, string> = {
  "e-commerce-websites": new URL("../../assets/upscayl_png_upscayl-standard-4x_4x/E-Commerce Websites.png", import.meta.url).href,
  "business-websites": new URL("../../assets/upscayl_png_upscayl-standard-4x_4x/Business Websites.png", import.meta.url).href,
  "portfolio-websites": new URL("../../assets/upscayl_png_upscayl-standard-4x_4x/Portfolio Websites.png", import.meta.url).href,
  "landing-pages": new URL("../../assets/upscayl_png_upscayl-standard-4x_4x/Landing Pages.png", import.meta.url).href,
  "social-media-content": new URL("../../assets/upscayl_png_upscayl-standard-4x_4x/Social Media Content.png", import.meta.url).href,
  "website-maintenance": new URL("../../assets/upscayl_png_upscayl-standard-4x_4x/Website Maintenance.png", import.meta.url).href,
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? SERVICES[slug as keyof typeof SERVICES] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const imageSrc = SERVICE_IMAGES[slug as keyof typeof SERVICES];

  return (
    <SiteLayout>
      <PageHero
        label="Service Details"
        title={service.title}
        subtitle={service.summary}
        breadcrumb={service.title}
      />

      <section className="container-x py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
        <div className="reveal">
          <span className="section-label">What You Get</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Everything you need to launch with confidence</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {service.outcomes.map((item) => (
              <span key={item} className="tech-badge bg-brand-blue-soft border-brand-blue/20 text-brand-navy">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="pill">
              <a href={`https://wa.me/94703031636?text=Hello! I am interested in the ${service.title} service.`} target="_blank" rel="noopener noreferrer">
                Get a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="pill">
              <Link to="/services">Back to Services</Link>
            </Button>
          </div>
        </div>

        <div className="reveal rounded-3xl bg-card border border-border p-7 shadow-card">
          <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-muted mb-6">
            <img src={imageSrc} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <h3 className="text-xl text-brand-navy">Included In This Service</h3>
          <ul className="mt-5 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-blue-soft/60 py-16 lg:py-20">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="section-label mx-auto">How It Works</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Simple process, reliable delivery</h2>
            <p className="mt-4 text-muted-foreground">From first call to launch and support, every step stays transparent.</p>
          </div>

          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="reveal rounded-2xl bg-card border border-border p-5 shadow-card" style={{ transitionDelay: `${index * 60}ms` }}>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white text-xs font-bold">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-base text-brand-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner
        title="Need a custom package?"
        subtitle="Tell us your goals and we will suggest the best mix of services for your business."
        cta="Talk to Our Team"
      />
    </SiteLayout>
  );
};

export default ServiceDetail;