import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Aaron Reed",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=80",
    quote:
      "Loopingon completely transformed our online presence. Our traffic doubled in mere weeks after launch. A highly recommended agency that knows delivery.",
    highlighted: false,
  },
  {
    name: "Sarah Kim",
    role: "Marketing Lead",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    quote:
      "Fast, creative, and remarkably reliable. The team delivered exactly what we needed and their design iteration speed was absolutely phenomenal.",
    highlighted: true,
  },
  {
    name: "Paul Davies",
    role: "Director, TechCorp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    quote:
      "Hands down the best agency experience we have had. Great communication, transparent process, and absolutely pristine quality output.",
    highlighted: false,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-brand-blue-soft/60 py-20 lg:py-24">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label mx-auto">What Our Clients Say</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight">
            Real Results, Real Feedback
          </h2>
          <p className="mt-4 text-muted-foreground">
            Don&apos;t just take our word for it. Here is what our clients have to say about working with us to scale their business.
          </p>
        </div>

        <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-5 items-stretch pb-4 lg:grid lg:grid-cols-3 lg:pb-0 lg:overflow-visible">
          {TESTIMONIALS.map((item, i) => (
            <article
              key={item.name}
              className={`reveal relative rounded-3xl border p-6 sm:p-7 shadow-card transition-all duration-300 w-[85vw] shrink-0 snap-center lg:w-auto lg:shrink ${
                item.highlighted
                  ? "bg-blue-grad border-transparent text-white"
                  : "bg-card border-border text-brand-navy"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className={`absolute right-6 top-6 text-5xl leading-none ${item.highlighted ? "text-white/20" : "text-brand-navy/8"}`} aria-hidden>
                &rdquo;
              </div>
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>

              <blockquote className={`text-lg sm:text-xl leading-relaxed ${item.highlighted ? "text-white/95" : "text-brand-navy"}`}>
                &quot;{item.quote}&quot;
              </blockquote>

              <div className="mt-7 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={`h-12 w-12 rounded-full object-cover ${item.highlighted ? "ring-2 ring-white/30" : "ring-1 ring-border"}`}
                  loading="lazy"
                />
                <div>
                  <p className={`text-xl ${item.highlighted ? "text-white" : "text-brand-navy"}`}>{item.name}</p>
                  <p className={`text-sm ${item.highlighted ? "text-white/75" : "text-muted-foreground"}`}>{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
