import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Nuwan Perera",
    role: "Founder, Ceylon Spice Co.",
    initials: "NP",
    color: "bg-brand-orange",
    quote:
      "Web Shrimp rebuilt our online store from the ground up. Sales doubled in three months and the team is genuinely a pleasure to work with — fast, thoughtful, and always one step ahead.",
  },
  {
    name: "Anushka Silva",
    role: "Marketing Lead, BetterFit",
    initials: "AS",
    color: "bg-brand-blue",
    quote:
      "Our landing page conversions went from 1.4% to 6.2%. They didn't just design what we asked for — they pushed us to do it better. Highly recommend.",
  },
  {
    name: "Rajiv Fernando",
    role: "Owner, Studio Bloom",
    initials: "RF",
    color: "bg-emerald-600",
    quote:
      "Beautiful portfolio site, on time, and at a fair price. Communication was clear from day one. We're already planning phase two with them.",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="bg-brand-blue-soft/60 py-20 lg:py-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label">What Our Clients Say</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Trusted by Amazing People
          </h2>
        </div>

        <div className="mt-12 max-w-3xl mx-auto reveal">
          <article className="relative bg-card rounded-3xl border border-border shadow-card p-8 sm:p-12 pl-10 sm:pl-14">
            <span className="absolute left-0 top-8 bottom-8 w-1.5 rounded-r-full bg-brand-blue" aria-hidden />
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl text-brand-navy leading-relaxed font-display font-medium">
              “{t.quote}”
            </blockquote>
            <div className="mt-7 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-full ${t.color} text-white flex items-center justify-center font-display font-bold`}>
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-brand-navy">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </article>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-brand-navy hover:bg-brand-blue hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${
                    active === i ? "bg-brand-blue w-8" : "bg-brand-blue/30 w-2"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
              className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-brand-navy hover:bg-brand-blue hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
