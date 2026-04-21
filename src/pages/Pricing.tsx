import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
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

const ONE_TIME = [
  {
    name: "Starter",
    price: "LKR 25,000",
    desc: "Perfect for personal or small projects.",
    features: ["6 Pages Website", "Responsive Design", "Basic SEO", "Contact Form"],
    popular: false,
  },
  {
    name: "Business",
    price: "LKR 60,000",
    desc: "Best for businesses and companies.",
    features: ["Up to 10 Pages", "Responsive Design", "SEO Optimized", "Contact Form", "Social Media Integration"],
    popular: true,
  },
  {
    name: "E-Commerce",
    price: "LKR 120,000",
    desc: "Complete solution for online stores.",
    features: ["Up to 20 Products", "Payment Gateway", "Order Management", "SEO Optimized", "Support & Training"],
    popular: false,
  },
  {
    name: "Custom",
    price: "Contact Us",
    desc: "Need something unique? We got you!",
    features: ["Unlimited Pages", "Custom Features", "Advanced Functionality", "Priority Support"],
    popular: false,
  },
];

const MONTHLY = [
  {
    name: "Basic",
    price: "LKR 5,000",
    suffix: "/mo",
    desc: "Essential maintenance for small sites.",
    features: ["Security Updates", "Weekly Backups", "2hr Support / mo", "Uptime Monitoring"],
    popular: false,
  },
  {
    name: "Standard",
    price: "LKR 12,000",
    suffix: "/mo",
    desc: "For growing businesses.",
    features: ["Everything in Basic", "Content Updates", "Performance Monitoring", "5hr Support / mo"],
    popular: true,
  },
  {
    name: "Premium",
    price: "LKR 25,000",
    suffix: "/mo",
    desc: "Full-service partnership.",
    features: ["Everything in Standard", "Priority Support", "Monthly Reports", "SEO Updates"],
    popular: false,
  },
  {
    name: "Custom",
    price: "Contact Us",
    suffix: "",
    desc: "Tailored to your needs.",
    features: ["Custom SLA", "Dedicated Engineer", "On-call Support", "Quarterly Strategy"],
    popular: false,
  },
];

const ADDONS = [
  { icon: "🎨", title: "Logo Design", price: "from LKR 8,000" },
  { icon: "📱", title: "Social Media Kit", price: "from LKR 15,000" },
  { icon: "🔍", title: "SEO Package", price: "from LKR 20,000/mo" },
  { icon: "📲", title: "Mobile App Development", price: "Contact for Quote" },
  { icon: "🧠", title: "Custom Software", price: "Contact for Quote" },
];

const FAQ = [
  { q: "What is included in the price?", a: "Each plan lists exactly what's included. In short: design, development, basic SEO, deployment and a handover walkthrough. We always send a detailed scope before kick-off." },
  { q: "Do you offer revisions?", a: "Yes — every project includes 2 rounds of design revisions and 1 round of development revisions. Additional revisions are billed hourly." },
  { q: "How long does it take to build a website?", a: "Starter sites take 1–2 weeks, Business sites 2–4 weeks, and E-Commerce 4–8 weeks depending on scope and content readiness." },
  { q: "Do you provide hosting?", a: "We can set up hosting for you (Vercel, Netlify, or a Sri Lankan provider) and walk you through it. Hosting fees are billed at cost." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. Many clients start on Starter and upgrade as they grow. We'll credit your initial investment toward the upgrade." },
  { q: "Do you work with international clients?", a: "Yes. About 30% of our work is for clients in the UK, US, Australia and the Middle East. We bill in USD on request." },
];

const Pricing = () => {
  const [mode, setMode] = useState<"one-time" | "monthly">("one-time");
  const tiers = mode === "one-time" ? ONE_TIME : MONTHLY;

  return (
    <SiteLayout>
      <PageHero
        label="Transparent Pricing"
        title="Choose Your Plan"
        subtitle="Honest packages with no hidden costs. Pick what fits — upgrade anytime."
        breadcrumb="Pricing"
      />

      {/* Toggle */}
      <section className="container-x">
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-brand-blue-soft border border-border">
            <button
              onClick={() => setMode("one-time")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                mode === "one-time" ? "bg-brand-blue text-white shadow-glow" : "text-brand-navy"
              }`}
            >
              One Time
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                mode === "monthly" ? "bg-brand-blue text-white shadow-glow" : "text-brand-navy"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="container-x py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, i) => (
            <article
              key={t.name}
              className={`reveal relative rounded-3xl border p-7 shadow-card card-lift bg-card ${
                t.popular ? "border-brand-blue ring-2 ring-brand-blue/20" : "border-border"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-semibold uppercase tracking-wider shadow-orange">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg text-brand-navy">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground min-h-[40px]">{t.desc}</p>
              <div className="mt-5">
                <span className="font-display text-3xl font-extrabold text-brand-navy">{t.price}</span>
                {"suffix" in t && t.suffix ? <span className="text-muted-foreground text-sm">{String(t.suffix)}</span> : null}
              </div>
              <ul className="mt-6 space-y-2.5">
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
                <Link to="/contact">{t.price === "Contact Us" ? "Talk to Us" : "Get Started"}</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-brand-blue-soft/60 py-20">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="section-label">Add-Ons</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Extras that pair well</h2>
            <p className="mt-4 text-muted-foreground">Bolt these onto any plan.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADDONS.map((a, i) => (
              <div
                key={a.title}
                className="reveal flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card card-lift"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-3xl">{a.icon}</div>
                <div>
                  <h3 className="text-base text-brand-navy">{a.title}</h3>
                  <p className="text-sm text-brand-blue font-semibold mt-0.5">{a.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Frequently Asked Questions</h2>
        </div>
        <div className="mt-10 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-6 shadow-card"
              >
                <AccordionTrigger className="text-left text-brand-navy font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
