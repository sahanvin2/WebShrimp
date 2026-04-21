const TIERS = [
  {
    title: "Frontend Only",
    icon: "🎨",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js"],
  },
  {
    title: "Frontend + Backend",
    icon: "⚙️",
    items: ["MERN Stack", "Laravel + PHP", "Node.js + Express", "NestJS", "Next.js Full-Stack"],
  },
  {
    title: "Mobile Apps",
    icon: "📱",
    items: ["React Native", "Progressive Web Apps (PWA)"],
  },
  {
    title: "Custom Software",
    icon: "🧩",
    items: ["Business tools", "Admin dashboards", "REST APIs", "PostgreSQL DBs", "Perl-based systems"],
  },
];

const BADGES = [
  "React", "Next.js", "Node.js", "Express.js", "NestJS", "Laravel", "PHP",
  "HTML5", "CSS3", "JavaScript", "MERN", "MongoDB", "PostgreSQL", "MySQL",
  "Perl", "React Native", "REST API", "Git",
];

const TechStack = () => {
  return (
    <section className="bg-brand-blue-soft/60 py-20 lg:py-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label">Our Stack</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Technologies We Work With
          </h2>
          <p className="mt-4 text-muted-foreground">
            We deliver solutions using battle-tested, modern technologies — chosen to fit your project, not the other way around.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((t, i) => (
            <div
              key={t.title}
              className="reveal rounded-2xl bg-card border border-border p-6 shadow-card card-lift"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="text-3xl">{t.icon}</div>
              <h3 className="mt-4 text-lg text-brand-navy">{t.title}</h3>
              <ul className="mt-4 space-y-2">
                {t.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Marquee badges */}
        <div className="mt-14 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-blue-soft/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-blue-soft/60 to-transparent z-10" />
          <div className="flex gap-3 animate-marquee w-max">
            {[...BADGES, ...BADGES].map((b, i) => (
              <span
                key={i}
                className="tech-badge bg-white border-border text-brand-navy"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
