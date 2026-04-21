const STEPS = [
  { icon: "🔍", title: "Discover", desc: "We understand your business and goals." },
  { icon: "📋", title: "Plan", desc: "We plan the perfect solution for you." },
  { icon: "🎨", title: "Design & Develop", desc: "We design and build your website." },
  { icon: "🚀", title: "Launch", desc: "We test and launch your website." },
  { icon: "🛠️", title: "Support", desc: "We provide ongoing support & updates." },
];

const ProcessSection = () => {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="text-center max-w-2xl mx-auto reveal">
        <span className="section-label">Our Process</span>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">How We Work</h2>
        <p className="mt-4 text-muted-foreground">
          A simple, transparent five-step process — from your first idea to a launched, supported product.
        </p>
      </div>

      <div className="mt-16 relative">
        {/* connecting dotted line — desktop only */}
        <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] border-t-2 border-dashed border-brand-blue/30" />

        <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="reveal text-center relative"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative mx-auto h-16 w-16 rounded-2xl bg-card border border-border shadow-card flex items-center justify-center text-2xl">
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-brand-orange text-white text-[11px] font-bold font-mono flex items-center justify-center">
                  {i + 1}
                </span>
                {s.icon}
              </div>
              <h3 className="mt-4 text-base text-brand-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
