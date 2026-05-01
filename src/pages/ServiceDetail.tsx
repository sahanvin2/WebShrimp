import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, BadgeDollarSign, CheckCircle2, Clock3, LifeBuoy, Star } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPublicAssetUrl } from "@/lib/site";

const SERVICES = {
  "e-commerce-websites": {
    title: "E-Commerce Websites",
    summary: "High-performance online stores designed to turn traffic into orders.",
    description:
      "We design and build e-commerce websites that are fast, easy to manage, and built for conversion. From storefront UX to checkout flow, every step is planned to reduce drop-offs, improve trust, and increase repeat purchases.",
    includes: [
      "Conversion-focused storefront design",
      "Product, inventory and category management",
      "Payment gateway and shipping setup",
      "Mobile-optimized checkout experience",
      "Order notifications and customer emails",
      "Analytics and tracking dashboards",
    ],
    outcomes: ["Higher conversion rates", "Smoother order flow", "Easy back-office management"],
    startingAt: "From LKR 250,000",
    timeline: "4-8 weeks",
    support: "Training, launch support, and optional monthly maintenance",
    bestFor: ["Retail brands", "Growing stores moving online", "Businesses that need easier product and order management"],
    deliverables: [
      { title: "Storefront UX", desc: "A polished homepage, collection pages, product pages, cart, and checkout flow designed to sell." },
      { title: "Catalog Setup", desc: "Clear product structures, category organization, product variants, stock handling, and admin guidance." },
      { title: "Payments & Delivery", desc: "Gateway setup, shipping logic, order alerts, and customer-facing order communication." },
      { title: "Tracking & SEO", desc: "Analytics, key conversion events, metadata, and core technical SEO foundations for discoverability." },
    ],
    optionalExtras: ["Abandoned cart automations", "WhatsApp order support", "Marketplace integrations", "Product photo/content support"],
    faqs: [
      { q: "Can you connect local or international payment gateways?", a: "Yes. We plan the store around the payment option that best fits your market, product type, and operational needs." },
      { q: "Will my team be able to manage products after launch?", a: "Yes. We build a simple admin workflow and provide handover guidance so you can manage products, pricing, and orders confidently." },
      { q: "Can this scale as my catalog grows?", a: "Yes. We structure the catalog and product data so the store stays manageable as you add more products and campaigns." },
    ],
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
    startingAt: "From LKR 120,000",
    timeline: "2-4 weeks",
    support: "Launch assistance plus optional updates and maintenance",
    bestFor: ["Service businesses", "Consultants and agencies", "Brands that need a stronger online first impression"],
    deliverables: [
      { title: "Messaging & Structure", desc: "A clear page structure that explains what you do, who you help, and why clients should trust you." },
      { title: "Lead Generation", desc: "Contact forms, quote requests, call-to-action sections, and conversion-focused page flow." },
      { title: "Brand Presentation", desc: "Professional visuals, social proof placement, and a layout that makes the business look established." },
      { title: "Search Foundation", desc: "Core technical SEO, mobile responsiveness, speed optimization, and metadata setup." },
    ],
    optionalExtras: ["Copywriting support", "Multi-location pages", "Advanced SEO packages", "Booking integrations"],
    faqs: [
      { q: "How many pages do most business websites need?", a: "Most service businesses start with 5 to 10 well-planned pages covering services, about, proof, FAQs, and contact." },
      { q: "Can you include maps, WhatsApp, and lead forms?", a: "Yes. We can integrate maps, WhatsApp, quote forms, social links, and other key contact touchpoints." },
      { q: "Will the site be mobile friendly?", a: "Yes. Every page is built to work cleanly across phones, tablets, and desktop screens." },
    ],
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
    startingAt: "Custom quote",
    timeline: "2-3 weeks",
    support: "Launch support with optional content updates",
    bestFor: ["Designers and developers", "Photographers and creatives", "Studios that need stronger case study presentation"],
    deliverables: [
      { title: "Showcase Design", desc: "A visual-first layout that makes work samples, galleries, and case studies easy to browse." },
      { title: "Personal Brand Story", desc: "About sections, expertise positioning, and calls to action that help visitors trust your work." },
      { title: "Project Depth", desc: "Optional case study templates to explain process, results, and value instead of only showing screenshots." },
      { title: "Performance Care", desc: "Image optimization and lightweight build quality so the portfolio still feels fast." },
    ],
    optionalExtras: ["Blog or resources section", "Inquiry workflow", "CMS setup", "Photo and copy organization support"],
    faqs: [
      { q: "Can I add new projects later?", a: "Yes. We structure the site so adding future work stays manageable and consistent." },
      { q: "Do you help organize project content?", a: "Yes. We can guide you on what project details, visuals, and proof points to include for stronger case studies." },
      { q: "Is this only for individuals?", a: "No. Portfolio-style websites also work very well for agencies, studios, and boutique firms." },
    ],
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
    startingAt: "From LKR 45,000",
    timeline: "1-2 weeks",
    support: "Tracking setup and launch QA support",
    bestFor: ["Paid ad campaigns", "New offers and launches", "Businesses that need fast lead generation pages"],
    deliverables: [
      { title: "Offer Framing", desc: "Headlines, structure, proof, and copy hierarchy centered around one conversion goal." },
      { title: "Lead Capture", desc: "Simple, trustworthy forms and CTA placement designed to increase completion rates." },
      { title: "Tracking Ready Build", desc: "Analytics, pixels, and event mapping so you can measure what is working." },
      { title: "Fast Performance", desc: "Lean builds that load quickly and reduce campaign waste from slow pages." },
    ],
    optionalExtras: ["Multi-step forms", "CRM integration", "Variant testing", "Thank-you page funnels"],
    faqs: [
      { q: "Can this connect to my ads and analytics stack?", a: "Yes. We can connect common analytics, pixels, and lead-routing tools based on your campaign setup." },
      { q: "How is a landing page different from a full website?", a: "A landing page is focused on one action. It removes distractions and is built to support a specific offer or campaign." },
      { q: "Can you build multiple variants for testing?", a: "Yes. We can prepare sections or variants that make A/B testing easier after launch." },
    ],
  },
  "custom-software": {
    title: "Custom Software Solutions",
    summary: "Tailored web applications and internal tools built to solve your unique business challenges.",
    description:
      "Off-the-shelf software does not always fit. We design and develop custom web applications, portals, and dashboards that integrate with your workflows, helping your team operate more efficiently and scale without unnecessary manual work.",
    includes: [
      "Custom web application development",
      "Internal business dashboards and admin panels",
      "Third-party API integrations",
      "Database architecture and optimization",
      "Automated data workflows",
      "Scalable cloud deployment",
    ],
    outcomes: ["Streamlined operations", "Reduced manual work", "Highly scalable infrastructure"],
    startingAt: "Custom quote",
    timeline: "Scope-based roadmap",
    support: "Discovery, phased delivery, and ongoing support options",
    bestFor: ["Operations-heavy businesses", "Teams using too many spreadsheets", "Companies that need workflows built around their process"],
    deliverables: [
      { title: "Discovery & Scope", desc: "We map your process, roles, bottlenecks, and desired outcomes before we recommend the build." },
      { title: "Admin & Workflow Tools", desc: "Dashboards, internal systems, portals, and automations tailored to how your team actually works." },
      { title: "Integrations", desc: "Connections with payment systems, messaging tools, CRMs, or other business platforms when needed." },
      { title: "Scalable Architecture", desc: "A build approach that supports future modules, data growth, and product improvements over time." },
    ],
    optionalExtras: ["Role-based permissions", "Client portals", "Custom reports", "Ongoing product support"],
    faqs: [
      { q: "How do you price custom software?", a: "We usually start with a discovery conversation, define scope and phases, then quote based on complexity and delivery approach." },
      { q: "Can this integrate with tools we already use?", a: "Often yes. We evaluate your current tools and plan integrations where they create real operational value." },
      { q: "Do you build in phases?", a: "Yes. For larger systems, phased delivery is usually the safest and fastest way to launch value early." },
    ],
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
    startingAt: "From LKR 3,000/mo",
    timeline: "Monthly recurring support",
    support: "Monitored support with emergency response when needed",
    bestFor: ["Business sites that must stay reliable", "Stores and lead-gen sites", "Teams without in-house web support"],
    deliverables: [
      { title: "Security & Updates", desc: "Routine platform and dependency updates with practical attention to stability and risk reduction." },
      { title: "Backups & Recovery", desc: "Backup checks and restore readiness so you are not exposed when something breaks." },
      { title: "Monitoring", desc: "Uptime, issue awareness, and practical response for common website problems." },
      { title: "Performance Care", desc: "Speed improvements, cleanup, and small content changes that keep the site healthy over time." },
    ],
    optionalExtras: ["Priority support", "Extra content hours", "Monthly growth recommendations", "Advanced reporting"],
    faqs: [
      { q: "Do I need maintenance if the website is already live?", a: "Yes. Security, uptime, backups, and performance all need regular attention after launch." },
      { q: "Is emergency support available?", a: "Yes. Our normal support window is Mon-Sat, and emergency support can be arranged for urgent issues." },
      { q: "Can you maintain a site you did not build?", a: "Usually yes. We first review the current setup and then recommend the safest maintenance approach." },
    ],
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
  "e-commerce-websites": getPublicAssetUrl("/services/e-commerce-websites.webp"),
  "business-websites": getPublicAssetUrl("/services/business-websites.webp"),
  "portfolio-websites": getPublicAssetUrl("/services/portfolio-websites.webp"),
  "landing-pages": getPublicAssetUrl("/services/landing-pages.webp"),
  "custom-software": getPublicAssetUrl("/services/custom-software.webp"),
  "website-maintenance": getPublicAssetUrl("/services/website-maintenance.webp"),
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
  const facts = [
    { label: "Starting from", value: service.startingAt, Icon: BadgeDollarSign },
    { label: "Typical timeline", value: service.timeline, Icon: Clock3 },
    { label: "Support", value: service.support, Icon: LifeBuoy },
  ];

  return (
    <SiteLayout>
      <Seo
        title={`${service.title} | Loopingon`}
        description={service.summary}
        path={`/services/${slug}`}
      />
      <PageHero
        label="Service Details"
        title={service.title}
        subtitle={service.summary}
        breadcrumb={service.title}
      />

      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="reveal">
          <span className="section-label">What You Get</span>
          <h2 className="mt-3 text-3xl text-brand-navy sm:text-4xl">Everything you need to launch with confidence</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {service.outcomes.map((item) => (
              <span key={item} className="tech-badge border-brand-blue/20 bg-brand-blue-soft text-brand-navy">
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
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {facts.map(({ label, value, Icon }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange-soft text-brand-orange">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-brand-navy">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal space-y-5">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <div className="mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted">
              <img src={imageSrc} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <h3 className="text-xl text-brand-navy">Included in this service</h3>
            <ul className="mt-5 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-brand-blue-soft/60 p-7 shadow-card">
            <h3 className="text-xl text-brand-navy">Best fit for</h3>
            <ul className="mt-5 space-y-3">
              {service.bestFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-brand-blue-soft/50 py-16 lg:py-20">
        <div className="container-x">
          <div className="max-w-2xl reveal">
            <span className="section-label">Deliverables</span>
            <h2 className="mt-3 text-3xl text-brand-navy sm:text-4xl">What this package should cover</h2>
            <p className="mt-4 text-muted-foreground">
              These are the practical areas we focus on so the final result is not just attractive, but useful for your business.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {service.deliverables.map((item, index) => (
              <article
                key={item.title}
                className="reveal rounded-3xl border border-border bg-card p-6 shadow-card"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange-soft text-brand-orange">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-8 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="reveal rounded-3xl border border-border bg-card p-8 shadow-card">
          <span className="section-label">Optional Extras</span>
          <h2 className="mt-3 text-2xl text-brand-navy sm:text-3xl">Common add-ons clients ask for</h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {service.optionalExtras.map((item) => (
              <span key={item} className="tech-badge border-brand-orange/20 bg-brand-orange-soft text-brand-navy">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            If you need a mix of features across packages, we can shape a custom scope around your goals instead of forcing you into a rigid bundle.
          </p>
        </div>

        <div className="reveal rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="max-w-2xl">
            <span className="section-label">How It Works</span>
            <h2 className="mt-3 text-2xl text-brand-navy sm:text-3xl">Simple process, reliable delivery</h2>
            <p className="mt-4 text-muted-foreground">
              From first call to launch and support, every step stays transparent and focused on business outcomes.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-white p-5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-base text-brand-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-slate-50/70 py-16 lg:py-20">
        <div className="container-x">
          <div className="max-w-2xl reveal">
            <span className="section-label">FAQs</span>
            <h2 className="mt-3 text-3xl text-brand-navy sm:text-4xl">Questions clients usually ask</h2>
          </div>

          <div className="mt-10 max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${index}`}
                  className="reveal rounded-2xl border border-border bg-white px-6 shadow-sm transition-shadow hover:shadow-md"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <AccordionTrigger className="py-4 text-left text-base font-semibold text-brand-navy hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ServiceDetail;
