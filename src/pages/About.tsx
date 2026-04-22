import { useState } from "react";
import { Linkedin, Lightbulb, ShieldCheck, Sparkles, TrendingUp, Target, Eye } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import StatsStrip from "@/components/StatsStrip";
import CtaBanner from "@/components/CtaBanner";
import storyImage from "@/assets/built-by-makers.png";
import missionImage from "../../assets/upscayl_png_upscayl-standard-4x_4x/Our Mission.png";
import visionImage from "../../assets/upscayl_png_upscayl-standard-4x_4x/Our Vision.png";

const VALUES = [
  { icon: Lightbulb, title: "Innovation", desc: "We stay ahead of tech trends so you don't have to." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest timelines, transparent pricing, real results." },
  { icon: Sparkles, title: "Quality", desc: "We don't ship until it's perfect." },
  { icon: TrendingUp, title: "Growth", desc: "Your growth is our success metric." },
];

const TEAM = [
  { initials: "SN", name: "Sahan Nawarathne", role: "Founder & Software Eng", bio: "Leading the vision and building robust web and software solutions.", color: "bg-brand-blue text-white" },
  { initials: "VN", name: "Vinura Nawarathne", role: "Co-founder & QA", bio: "Ensuring every product shipped is flawless and pixel-perfect.", color: "bg-brand-orange text-white" },
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

        <div className="reveal relative">
          <div className="relative rounded-3xl border border-border overflow-hidden shadow-card bg-brand-blue-soft min-h-[300px]">
            <img src={storyImage} alt="Team building digital products" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-x pb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="reveal rounded-3xl border border-border bg-card p-8 shadow-card card-lift flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-brand-orange-soft text-brand-orange flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl text-brand-navy">Our Mission</h3>
              <p className="mt-3 text-muted-foreground">
                To deliver world-class web solutions that are accessible, affordable and impactful — for businesses of all sizes.
              </p>
            </div>
            <div className="mt-6 aspect-video w-full rounded-2xl overflow-hidden border border-border bg-brand-orange-soft/30">
              <img src={missionImage} alt="Our Mission" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="reveal rounded-3xl border border-border bg-card p-8 shadow-card card-lift flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-brand-blue-soft text-brand-blue flex items-center justify-center">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl text-brand-navy">Our Vision</h3>
              <p className="mt-3 text-muted-foreground">
                To be Sri Lanka's most trusted digital agency — where creativity meets technology.
              </p>
            </div>
            <div className="mt-6 aspect-video w-full rounded-2xl overflow-hidden border border-border bg-brand-blue-soft/30">
              <img src={visionImage} alt="Our Vision" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="container-x py-20">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="section-label mx-auto">What We Stand For</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Our Core Values</h2>
        </div>
        <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-5 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal rounded-2xl border border-border bg-card p-6 shadow-card card-lift text-center w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mx-auto h-11 w-11 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center">
                <v.icon className="h-5 w-5" />
              </div>
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
            <span className="section-label mx-auto">Our Stack</span>
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
          <span className="section-label mx-auto">Our People</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-brand-navy">Meet the Team</h2>
        </div>
        <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:flex md:justify-center md:pb-0 md:overflow-visible">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className="reveal rounded-2xl border border-border bg-card p-6 text-center shadow-card card-lift w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
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
