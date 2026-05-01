import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Starter",
    price: "LKR 45,000",
    desc: "Perfect for personal or small projects.",
    features: ["5 Pages Website", "Responsive Design", "Basic SEO", "Contact Form"],
    timeline: "1-2 weeks",
    popular: false,
    delay: 0,
  },
  {
    name: "Business",
    price: "LKR 120,000",
    desc: "Best for businesses and companies.",
    features: ["Up to 10 Pages", "Responsive Design", "SEO Optimized", "Contact Form", "Custom Domain Setup"],
    timeline: "2-4 weeks",
    popular: true,
    delay: 100,
  },
  {
    name: "E-Commerce",
    price: "LKR 250,000",
    desc: "Complete solution for online stores.",
    features: ["Up to 500 Products", "Payment Gateway", "Order Management", "SEO Optimized", "Support & Training"],
    timeline: "4-8 weeks",
    popular: false,
    delay: 200,
  },
  {
    name: "Custom",
    price: "Contact Us",
    desc: "Need something unique? We got you!",
    features: ["Unlimited Pages", "Custom Features", "Advanced Functionality", "Priority Support"],
    timeline: "Custom Timeline",
    popular: false,
    delay: 300,
  },
];

const PricingSection = () => {
  return (
    <section className="container-x py-20 bg-background" id="pricing">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="reveal max-w-2xl">
          <span className="section-label">PRICING PLAN</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Choose Your Plan</h2>
          <p className="mt-2 text-muted-foreground">One-time website builds. No recurring surprises.</p>
        </div>
        <div className="reveal mt-6 md:mt-0 flex items-center gap-4">
          <span className="text-sm text-muted-foreground mr-2">All plans include free support & guidance</span>
        </div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`reveal relative rounded-[2rem] border p-7 shadow-card card-lift bg-card h-full flex flex-col w-[85vw] shrink-0 snap-center md:w-auto md:shrink ${
              plan.popular ? "border-brand-orange ring-1 ring-brand-orange/20" : "border-border"
            }`}
            style={{ transitionDelay: `${plan.delay}ms` }}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-orange text-white text-xs font-semibold shadow-orange whitespace-nowrap">
                Most Popular
              </span>
            )}
            
            <h3 className={`text-xl font-bold ${plan.popular ? 'text-brand-orange' : 'text-brand-blue'}`}>
              {plan.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">
              {plan.desc}
            </p>
            
            <div className="mt-4 mb-2 flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-extrabold ${plan.popular ? 'text-brand-orange' : 'text-brand-orange'}`}>
                  {plan.price}
                </span>
              </div>
              {plan.price !== "Contact Us" && (
                <span className="inline-block mt-1.5 text-xs font-medium text-muted-foreground self-start">
                  One-time project fee. Delivered in {plan.timeline}.
                </span>
              )}
            </div>

            <ul className="mt-6 mb-8 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-foreground/85 font-medium">
                  <Check className="h-4 w-4 mt-0.5 text-brand-navy shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant={plan.popular ? "cta" : "heroOutline"}
              className={`mt-auto w-full py-6 rounded-full font-semibold ${plan.popular ? "text-white" : "border-blue-200 text-brand-blue hover:text-white"}`}
            >
              <a href={`https://wa.me/94703031636?text=Hello! I am interested in the ${plan.name} plan.`} target="_blank" rel="noopener noreferrer">
                {plan.price === "Contact Us" ? "Talk to Us" : "Start My Project"}
              </a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;

