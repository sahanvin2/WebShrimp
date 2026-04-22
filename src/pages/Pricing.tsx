import { Check, Palette, Share2, Search, Smartphone, Code2, Shield, Settings, Server } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    features: ["Up to 10 Pages", "Responsive Design", "SEO Optimized", "Contact Form", "Social Media Integration"],
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
  { icon: Share2, title: "Social Media Kit", price: "from LKR 5,000", desc: "Facebook/Instagram banners & templates." },
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
  { q: "What is included in the price?", a: "Each plan lists exactly what's included. In short: design, development, basic SEO, deployment and a handover walkthrough. We always send a detailed scope before kick-off." },
  { q: "Do you offer revisions?", a: "Yes — every project includes 2 rounds of design revisions and 1 round of development revisions. Additional revisions are billed hourly." },
  { q: "How long does it take to build a website?", a: "Starter sites take 1–2 weeks, Business sites 2–4 weeks, and E-Commerce 4–8 weeks depending on scope and content readiness." },
  { q: "Do you provide hosting?", a: "Yes, we deploy on world-class infrastructure including AWS, Digital Ocean, and Netlify. Enjoy blazing speeds up to 10Gbps and unlimited bandwidth for peak performance." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. Many clients start on Starter and upgrade as they grow. We'll credit your initial investment toward the upgrade." },
  { q: "Do you work with international clients?", a: "We primarily focus on the Sri Lankan market right now to deliver highly localized, dedicated support, though we occasionally take on select foreign projects." },
  { q: "Are the projects in your portfolio real businesses?", a: "Our portfolio currently features high-fidelity conceptual demos to showcase our creative and technical capabilities. When we build your actual product, it will be fully bespoke, perfectly mobile-responsive, and far more advanced functionally than these initial concepts." },
];

const generatePlanWhatsAppLink = (planName: string) => {
  const phone = "94703031636";
  const domain = typeof window !== "undefined" ? window.location.origin : "https://webshrimp.com";
  
  const imageMap: Record<string, string> = {
    "Starter": "Starter.png",
    "Business": "Business.png",
    "E-Commerce": "E-commerce.png",
    "Custom": "Custom.png"
  };
  
  const imageUrl = `${domain}/whatsapp/${imageMap[planName] || "Starter.png"}`;
  
  const text = `*Hello Web Shrimp Studio!* 🦐
I am highly interested in starting my project with the *${planName} Plan*.

To help you understand my needs, here are a few details:
1️⃣ *What is your business name or industry?*
- (Type here...)

2️⃣ *What is the main goal of the website?*
- (Type here...)

3️⃣ *Do you have a target deadline?*
- (Type here...)

Let's build something amazing together! 🚀✨

${imageUrl}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

const Pricing = () => {
  return (
    <SiteLayout>
      <PageHero
        label="Transparent Pricing"
        title="Choose Your Plan"
        subtitle="One-time website builds. No recurring surprises."
        breadcrumb="Pricing"
      />

      {/* Tiers */}
      <section className="container-x py-12">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
          {PLANS.map((t, i) => (
            <article
              key={t.name}
              className={`reveal relative rounded-3xl border p-7 shadow-card card-lift bg-card h-full flex flex-col w-[85vw] shrink-0 snap-center md:w-auto md:shrink ${
                t.popular ? "border-brand-orange ring-2 ring-brand-orange/30 bg-brand-orange-soft/30" : "border-border"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-semibold uppercase tracking-wider shadow-orange">
                  Most Popular
                </span>
              )}
              <h3 className={`text-lg ${t.popular ? "text-brand-orange" : "text-brand-navy"}`}>{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground min-h-[40px]">{t.desc}</p>
              
              <div className="mt-4 mb-2 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-3xl font-extrabold ${t.popular ? "text-brand-orange" : "text-brand-navy"}`}>
                    {t.price}
                  </span>
                </div>
                {t.price !== "Contact Us" && (
                  <span className="inline-block mt-1.5 text-xs font-medium text-muted-foreground self-start">
                    One-time project fee. Delivered in {t.timeline}.
                  </span>
                )}
              </div>
              
              <ul className="mt-6 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className="h-4 w-4 mt-0.5 text-brand-blue shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={t.popular ? "cta" : "heroOutline"}
                size="pill"
                className="mt-7 w-full"
              >
                <a href={generatePlanWhatsAppLink(t.name)} target="_blank" rel="noopener noreferrer">
                  {t.price === "Contact Us" ? "Talk to Us" : "Start My Project"}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="bg-brand-blue-soft/30 py-20 lg:py-28 relative overflow-hidden border-y border-border">
        <div className="container-x relative z-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto reveal">
            <span className="section-label mx-auto">MAINTENANCE</span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy">Keep Your Website Running</h2>
            <p className="mt-3 text-base text-muted-foreground">Optional plans to keep your site fast, secure, and up to date.</p>
          </div>
          <div className="mt-10 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-5 max-w-5xl mx-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:overflow-visible">
            {MAINTENANCE.map((m, i) => (
              <div
                key={m.name}
                className="reveal flex flex-col h-full rounded-3xl bg-white border border-border p-6 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-300 card-lift group w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-blue/20 transition-transform duration-300">
                    <m.icon className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">{m.name}</h3>
                    <p className="text-xl font-extrabold text-brand-navy">
                      {m.price}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3 flex-1">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80 font-medium">
                      <Check className="h-4 w-4 mt-0.5 text-brand-blue shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-6 w-full rounded-full border-border bg-transparent text-brand-navy hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300"
                >
                  <a href={`https://wa.me/94703031636?text=Hello! I am interested in the ${m.name} maintenance plan.`} target="_blank" rel="noopener noreferrer">
                    Select Plan
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-slate-50/50 py-20 relative border-y border-border">
        <div className="container-x">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto reveal">
            <span className="section-label mx-auto">ADD-ONS</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy">Extras that pair well</h2>
            <p className="mt-4 text-lg text-muted-foreground">Bolt these onto any plan.</p>
          </div>
          <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:overflow-visible">
            {ADDONS.map((a, i) => (
              <div
                key={a.title}
                className="reveal group flex flex-col items-start gap-4 h-full rounded-[2rem] bg-white border border-border p-7 shadow-card hover:shadow-glow transition-all duration-300 card-lift w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="h-12 w-12 rounded-2xl bg-brand-orange-soft/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <a.icon className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">{a.title}</h3>
                  <p className="text-sm font-semibold text-brand-blue mt-1 mb-2">
                    {a.price}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 relative">
        <div className="container-x">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto reveal">
            <span className="section-label mx-auto">FAQ</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about our pricing and process.</p>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-brand-navy font-semibold text-lg hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">{item.a}</AccordionContent>
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
