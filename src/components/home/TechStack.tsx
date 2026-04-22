import { MonitorSmartphone, ServerCog, Smartphone, Blocks } from "lucide-react";

const TIERS = [
  {
    title: "Frontend Only",
    icon: MonitorSmartphone,
    color: "text-brand-blue",
    bgColor: "bg-brand-blue-soft",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js"],
  },
  {
    title: "Frontend + Backend",
    icon: ServerCog,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    items: ["MERN Stack", "Laravel + PHP", "Node.js + Express", "NestJS", "Next.js Full-Stack"],
  },
  {
    title: "Mobile Apps",
    icon: Smartphone,
    color: "text-brand-orange",
    bgColor: "bg-brand-orange-soft",
    items: ["React Native", "Progressive Web Apps (PWA)"],
  },
  {
    title: "Custom Software",
    icon: Blocks,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    items: ["Business tools", "Admin dashboards", "REST APIs", "PostgreSQL DBs"],
  },
];

const BADGES = [
  "React", "Next.js", "Node.js", "Express.js", "NestJS", "Laravel", "PHP",
  "HTML5", "CSS3", "JavaScript", "MERN", "MongoDB", "PostgreSQL", "MySQL",
  "React Native", "REST API", "Git",
];

const TechStack = () => {
  return (
    <section className="bg-brand-blue-soft/60 py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x relative z-10">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label mx-auto">Our Stack</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Technologies We Work With
          </h2>
          <p className="mt-4 text-muted-foreground">
            We deliver solutions using battle-tested, modern technologies — chosen to fit your project, not the other way around.
          </p>
        </div>

        <div className="mt-14 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
          {TIERS.map((t, i) => (
            <div
              key={t.title}
              className="reveal relative group rounded-[2rem] bg-white border border-border p-8 shadow-card card-lift overflow-hidden w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${t.bgColor} ${t.color} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <t.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-bold text-brand-navy mb-4">{t.title}</h3>
                
                <ul className="space-y-3">
                  {t.items.map((item) => (
                    <li key={item} className="text-sm font-medium text-muted-foreground flex items-center gap-3">
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${t.color.replace('text-', 'bg-')} opacity-60`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee badges */}
        <div className="mt-16 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-blue-soft/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-blue-soft/60 to-transparent z-10" />
          <div className="flex gap-4 animate-marquee w-max py-4">
            {[...BADGES, ...BADGES].map((b, i) => (
              <span
                key={i}
                className="tech-badge bg-white/60 backdrop-blur-sm border-border text-brand-navy shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-300"
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
