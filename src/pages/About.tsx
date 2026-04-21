import { useState } from "react";
import { Linkedin } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import StatsStrip from "@/components/StatsStrip";
import CtaBanner from "@/components/CtaBanner";

const VALUES = [
  { icon: "💡", title: "Innovation", desc: "We stay ahead of tech trends so you don't have to." },
  { icon: "🤝", title: "Integrity", desc: "Honest timelines, transparent pricing, real results." },
  { icon: "⭐", title: "Quality", desc: "We don't ship until it's perfect." },
  { icon: "🚀", title: "Growth", desc: "Your growth is our success metric." },
];

const TEAM = [
  { initials: "AP", name: "Ashan Perera", role: "Lead Developer", bio: "Full-stack engineer with 8+ years building scalable web apps.", color: "bg-brand-blue text-white" },
  { initials: "ND", name: "Nethmi De Silva", role: "UI/UX Designer", bio: "Designs interfaces people love to use — pixel by pixel.", color: "bg-brand-orange text-white" },
  { initials: "RJ", name: "Rohan Jayasinghe", role: "Backend Engineer", bio: "APIs, databases, and the infrastructure that holds it all up.", color: "bg-purple-500 text-white" },
  { initials: "SF", name: "Sara Fernando", role: "Project Manager", bio: "Keeps every project shipping on time, every time.", color: "bg-emerald-500 text-white" },
];

const STACK_TABS = {
  Frontend: ["React", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "NestJS", "Laravel", "PHP", "Perl"],
  Mobile: ["React Native", "Progressive Web Apps (PWA)"],
  Database: ["MongoDB", "PostgreSQL", "MySQL"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Docker"],
} as const;

type TabKey = keyof typeof STACK_TABS;

const CLIENTS = ["Nimal & Co.", "Lanka Foods", "Ocean Spice", "Ceylon Tech", "Green Valley", "Urban Bites", "Sapphire Travels", "Kandy Crafts"];

const About = () => {
  const [tab, setTab] = useState<TabKey>("Frontend");

  return (
    <SiteLayout>
      <PageHero
        label="Who We Are"
        title="About Web Shrimp"
        subtitle="A passionate team of designers, developers and digital creators — building the web from Colombo, Sri Lanka."
        breadcrumb="About"
      />

      {/* Our Story */}
      <section className="container-x py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="section-label">Our Story</span>
          <h2 className="heading-underline mt-3 text-3xl sm:text-4xl text-brand-navy">
            Built by makers, for businesses that want to grow.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We are a passionate team of web designers, developers and digital creators based in Colombo, Sri Lanka. Since our founding, we've helped 200+ businesses across Sri Lanka and beyond establish a powerful digital presence.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe every business — big or small — deserves a beautiful, high-performing website that works as hard as they do. That's the promise behind everything we ship.
          </p>
        </div>

        {/* CSS office illustration */}
        <div className="reveal relative">
          <div className="relative aspect-[4/3] rounded-3xl bg-brand-blue-soft border border-border overflow-hidden shadow-card">
            <div className="absolute inset-0 bg-hero" />
            {/* Desk */}
            <div className="absolute bottom-10 left-6 right-6 h-3 rounded-full bg-brand-navy/15" />
            {/* Laptop */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 h-36 rounded-xl bg-brand-navy shadow-glow flex items-center justify-center">
              <div className="w-[88%] h-[80%] rounded-md bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center text-white font-mono text-xs">
                {"<webshrimp />"}
              </div>
            </div>
            {/* Coffee */}
            <div className="absolute bottom-14 right-12 w-10 h-12 rounded-b-xl bg-amber-700 shadow-md" />
            <div className="absolute bottom-[6.25rem] right-12 w-10 h-2 rounded-full bg-amber-900/60" />
            {/* Plant */}
            <div className="absolute bottom-14 left-10 w-8 h-10 rounded-md bg-amber-800" />
            <div className="absolute bottom-[5.5rem] left-8 w-12 h-12 rounded-full bg-emerald-500 animate-float-slow" />
            {/* Floating tags */}
            <div className="absolute top-8 left-8 px-3 py-1.5 rounded-full bg-white shadow-card text-xs font-mono text-brand-blue animate-float-slower">{"</>"}</div>
            <div className="absolute top-12 right-10 px-3 py-1.5 rounded-full bg-white shadow-card text-xs font-mono text-brand-orange animate-float-slow">✨ Design</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-x pb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="reveal rounded-3xl border border-border bg-card p-8 shadow-card card-lift">
            <div className="text-4xl">🎯</div>
            <h3 className="mt-4 text-2xl text-brand-navy">Our Mission</h3>
            <p className="mt-3 text-muted-foreground">
              To deliver world-class web solutions that are accessible, affordable and impactful — for businesses of all sizes.
            </p>
          </div>
          <div className="reveal rounded-3xl border border-border bg-card p-8 shadow-card card-lift">
            <div className="text-4xl">👁️</div>
            <h3 className="mt-4 text-2xl text-brand-navy">Our Vision</h3>
            <p className="mt-3 text-muted-foreground">
              To be Sri Lanka's most trusted digital agency — where creativity meets technology.
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="container-x py-20">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label">What We Stand For</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Our Core Values</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal rounded-2xl border border-border bg-card p-6 shadow-card card-lift text-center"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="text-3xl">{v.icon}</div>
              <h3 className="mt-3 text-lg text-brand-navy">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack tabs */}
      <section className="bg-brand-blue-soft/60 py-20">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="section-label">Our Stack</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Technologies We Master</h2>
            <p className="mt-4 text-muted-foreground">
              The tools we use every day to build fast, reliable and beautiful products.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {(Object.keys(STACK_TABS) as TabKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  tab === key
                    ? "bg-brand-blue text-white shadow-glow"
                    : "bg-white text-brand-navy border border-border hover:border-brand-blue"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-3xl mx-auto rounded-3xl bg-card border border-border p-8 shadow-card">
            <div className="flex flex-wrap justify-center gap-2.5">
              {STACK_TABS[tab].map((t) => (
                <span key={t} className="tech-badge bg-brand-blue-soft border-brand-blue/20 text-brand-navy">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-x py-20">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label">Our People</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Meet the Team</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className="reveal rounded-2xl border border-border bg-card p-6 text-center shadow-card card-lift"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center font-display font-bold text-xl ${m.color}`}>
                {m.initials}
              </div>
              <h3 className="mt-4 text-lg text-brand-navy">{m.name}</h3>
              <p className="text-xs uppercase tracking-wider text-brand-blue font-semibold mt-1">{m.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              <a
                href="#"
                aria-label={`${m.name} on LinkedIn`}
                className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <StatsStrip />

      {/* Client logos */}
      <section className="container-x py-16">
        <p className="text-center text-sm uppercase tracking-wider text-muted-foreground font-mono">
          Trusted by businesses across Sri Lanka
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CLIENTS.map((c) => (
            <span
              key={c}
              className="px-5 py-2.5 rounded-full bg-brand-blue-soft border border-border text-sm font-medium text-brand-navy"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <CtaBanner title="Want to work with us?" subtitle="We're always excited to take on new challenges." />
    </SiteLayout>
  );
};

export default About;
