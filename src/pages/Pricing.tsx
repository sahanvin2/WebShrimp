import { Check, Palette, Search, Smartphone, Code2, Shield, Settings, Server } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAbsoluteUrl, getPublicAssetUrl } from "@/lib/site";

const PLANS = [
  {
    name: "Starter",
    price: "LKR 45,000",
    desc: "Perfect for personal or small projects.",
    features: ["6 Pages Website", "Responsive Design", "Basic SEO", "Contact Form"],
    timeline: "1-2 weeks",
    popular: false,
  },
  {
    name: "Business",
    price: "LKR 120,000",
    desc: "Best for businesses and companies.",
    features: ["Up to 10 Pages", "Responsive Design", "SEO Optimized", "Contact Form", "Custom Domain Setup"],
    timeline: "2-4 weeks",
    popular: true,
  },
  {
    name: "E-Commerce",
    price: "LKR 250,000",
    desc: "Complete solution for online stores.",
    features: ["Up to 500 Products", "Payment Gateway", "Order Management", "SEO Optimized", "Support & Training"],
    timeline: "4-8 weeks",
    popular: false,
  },
  {
    name: "Custom",
    price: "Contact Us",
    desc: "Need something unique? We got you!",
    features: ["Unlimited Pages", "Custom Features", "Advanced Functionality", "Priority Support"],
    timeline: "Custom Timeline",
    popular: false,
  },
];

const ADDONS = [
  { icon: Palette, title: "Logo Design", price: "from LKR 3,000", desc: "Professional, scalable vector logos." },
  { icon: Code2, title: "API Integrations", price: "from LKR 15,000", desc: "Connect CRMs, payment gateways, and third-party tools." },
  { icon: Search, title: "SEO Package", price: "from LKR 5,000/mo", desc: "Monthly technical and content SEO boosts." },
  { icon: Smartphone, title: "Mobile App Development", price: "from LKR 10,000", desc: "Convert your site into iOS and Android apps." },
  { icon: Code2, title: "Custom Software", price: "from LKR 30,000", desc: "Tailored dashboards and tools." },
];

const MAINTENANCE = [
  { icon: Shield, name: "Basic", price: "LKR 3,000/mo", features: ["Security updates", "Uptime monitoring", "Email support"] },
  { icon: Settings, name: "Standard", price: "LKR 6,000/mo", features: ["Security updates", "Uptime monitoring", "Content updates", "Backups"] },
  { icon: Server, name: "Premium", price: "LKR 12,000/mo", features: ["Security updates", "Uptime monitoring", "Content updates", "Backups", "Priority support", "Monthly reports"] },
];

const FAQ = [
  {
    q: "What is included in the price?",
    a: "Each plan lists exactly what's included. In short: design, development, basic SEO, deployment and a handover walkthrough. We always send a detailed scope before kick-off.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes - every project includes 2 rounds of design revisions and 1 round of development revisions. Additional revisions are billed hourly.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Starter sites take 1-2 weeks, Business sites 2-4 weeks, and E-Commerce projects take 4-8 weeks depending on scope and content readiness.",
  },
  {
    q: "Do you provide free hosting?",
    a: "No, we do not provide free web hosting or domain registration. However, we assist in securely deploying your project on world-class infrastructure (like AWS, Digital Ocean, or Vercel) under your own accounts, ensuring you have full ownership and control.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. Many clients start on Starter and upgrade as they grow. We'll credit your initial investment toward the upgrade when possible.",
  },
  {
    q: "Do you work with international clients?",
    a: "We primarily focus on the Sri Lankan market right now to deliver localized, dedicated support, though we occasionally take on select international projects.",
  },
  {
    q: "Are the projects in your portfolio real businesses?",
    a: "Our portfolio currently features high-fidelity conceptual demos to showcase our creative and technical capabilities. When we build your actual product, it will be fully bespoke, mobile-responsive, and far more advanced functionally than these initial concepts.",
  },
];

const generatePlanWhatsAppLink = (planName: string) => {
  const phone = "94703031636";

  const imageMap: Record<string, string> = {
    Starter: "Starter.webp",
    Business: "Business.webp",
    "E-Commerce": "E-commerce.webp",
    Custom: "Custom.webp",
  };

  const imageUrl = getAbsoluteUrl(getPublicAssetUrl(`/whatsapp/${imageMap[planName] || "Starter.webp"}`));

  const text = `*Hello Loopingon!*
I am highly interested in starting my project with the *${planName} Plan*.

To help you understand my needs, here are a few details:
1. *What is your business name or industry?*
- (Type here...)

2. *What is the main goal of the website?*
- (Type here...)

3. *Do you have a target deadline?*
- (Type here...)

Let's build something amazing together!

${imageUrl}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

const Pricing = () => {
  return (
    <SiteLayout>
      <Seo
        title="Pricing | Loopingon"
        description="See Loopingon's website pricing, maintenance plans, and add-ons for startups, businesses, and e-commerce brands."
        path="/pricing"
      />
      <PageHero
        label="Transparent Pricing"
        title="Choose Your Plan"
        subtitle="One-time website builds. No recurring surprises."
        breadcrumb="Pricing"
      />

      <section className="container-x py-12">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {PLANS.map((tier, index) => (
            <article
              key={tier.name}
              className={`reveal relative flex h-full w-[85vw] shrink-0 snap-center flex-col rounded-3xl border bg-card p-7 shadow-card md:w-auto md:shrink ${
                tier.popular ? "border-brand-orange ring-2 ring-brand-orange/30 bg-brand-orange-soft/30" : "border-border"
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-orange">
                  Most Popular
                </span>
              )}
              <h3 className={`text-lg ${tier.popular ? "text-brand-orange" : "text-brand-navy"}`}>{tier.name}</h3>
              <p className="mt-1 min-h-[40px] text-sm text-muted-foreground">{tier.desc}</p>

              <div className="mb-2 mt-4 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-3xl font-extrabold ${tier.popular ? "text-brand-orange" : "text-brand-navy"}`}>
                    {tier.price}
                  </span>
                </div>
                {tier.price !== "Contact Us" && (
                  <span className="mt-1.5 inline-block self-start text-xs font-medium text-muted-foreground">
                    One-time project fee. Delivered in {tier.timeline}.
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant={tier.popular ? "cta" : "heroOutline"} size="pill" className="mt-7 w-full">
                <a href={generatePlanWhatsAppLink(tier.name)} target="_blank" rel="noopener noreferrer">
                  {tier.price === "Contact Us" ? "Talk to Us" : "Start My Project"}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-brand-blue-soft/30 py-20 lg:py-28">
        <div className="container-x relative z-10">
          <div className="reveal mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="section-label mx-auto">MAINTENANCE</span>
            <h2 className="mt-3 text-2xl font-bold text-brand-navy sm:text-3xl lg:text-4xl">Keep Your Website Running</h2>
            <p className="mt-3 text-base text-muted-foreground">Optional plans to keep your site fast, secure, and up to date.</p>
          </div>
          <div className="mx-auto mt-10 flex max-w-5xl snap-x snap-mandatory gap-5 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
            {MAINTENANCE.map((maintenance, index) => (
              <div
                key={maintenance.name}
                className="reveal group flex h-full w-[85vw] shrink-0 snap-center flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-blue/30 hover:shadow-md card-lift md:w-auto md:shrink"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 transition-transform duration-300 group-hover:scale-105 group-hover:bg-brand-blue/20">
                    <maintenance.icon className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">{maintenance.name}</h3>
                    <p className="text-xl font-extrabold text-brand-navy">{maintenance.price}</p>
                  </div>
                </div>

                <ul className="flex-1 space-y-3">
                  {maintenance.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-6 w-full rounded-full border-border bg-transparent text-brand-navy transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  <a
                    href={`https://wa.me/94703031636?text=Hello! I am interested in the ${maintenance.name} maintenance plan.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Select Plan
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-border bg-slate-50/50 py-20">
        <div className="container-x">
          <div className="reveal mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="section-label mx-auto">ADD-ONS</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl lg:text-5xl">Extras that pair well</h2>
            <p className="mt-4 text-lg text-muted-foreground">Bolt these onto any plan.</p>
          </div>
          <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
            {ADDONS.map((addon, index) => (
              <div
                key={addon.title}
                className="reveal group flex h-full w-[85vw] shrink-0 snap-center flex-col items-start gap-4 rounded-[2rem] border border-border bg-white p-7 shadow-card transition-all duration-300 hover:shadow-glow card-lift md:w-auto md:shrink"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-orange-soft/60 transition-transform group-hover:scale-110">
                  <addon.icon className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">{addon.title}</h3>
                  <p className="mb-2 mt-1 text-sm font-semibold text-brand-blue">{addon.price}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{addon.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="container-x">
          <div className="reveal mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="section-label mx-auto">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about our pricing and process.</p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border bg-white px-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <AccordionTrigger className="py-4 text-left text-lg font-semibold text-brand-navy hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-base leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not sure which plan?"
        subtitle="Let's talk and find the perfect fit for your budget."
        cta="Talk to an Expert"
      />
    </SiteLayout>
  );
};

export default Pricing;
