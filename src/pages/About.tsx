import { useState } from "react";
import { Linkedin, Lightbulb, ShieldCheck, Sparkles, TrendingUp, Target, Eye, Smartphone } from "lucide-react";
import { 
  SiReact, SiNextdotjs, SiHtml5, SiCss, SiJavascript, SiTailwindcss, 
  SiNodedotjs, SiExpress, SiNestjs, SiLaravel, SiPhp, SiPerl, 
  SiMongodb, SiPostgresql, SiMysql, 
  SiGit, SiGithub, SiFigma, SiPostman, SiDocker, SiVscodium
} from "react-icons/si";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import StatsStrip from "@/components/StatsStrip";
import CtaBanner from "@/components/CtaBanner";
import { getPublicAssetUrl } from "@/lib/site";

const storyImage = getPublicAssetUrl("/about/built-by-makers.webp");
const missionImage = getPublicAssetUrl("/about/our-mission.webp");
const visionImage = getPublicAssetUrl("/about/our-vision.webp");
const sahanPortrait = getPublicAssetUrl("/team/sahan.webp");
const vinuraPortrait = getPublicAssetUrl("/team/vinura.webp");

const VALUES = [
  { icon: Lightbulb, title: "Innovation", desc: "We stay ahead of tech trends so you don't have to." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest timelines, transparent pricing, real results." },
  { icon: Sparkles, title: "Quality", desc: "We don't ship until it's perfect." },
  { icon: TrendingUp, title: "Growth", desc: "Your growth is our success metric." },
];

const TEAM = [
  { img: sahanPortrait, initials: "SN", name: "Sahan Nawarathne", role: "Founder & Software Eng", bio: "Leading the vision and building robust web and software solutions.", color: "bg-brand-blue text-white" },
  { img: vinuraPortrait, initials: "VN", name: "Vinura Nawarathne", role: "Co-founder & QA", bio: "Ensuring every product shipped is flawless and pixel-perfect.", color: "bg-brand-orange text-white" },
];

const STACK_TABS = {
  Frontend: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "Tailwind"],
  Backend: ["Node.js", "Express.js", "NestJS", "Laravel", "PHP", "Perl"],
  Mobile: ["React Native", "PWA"],
  Database: ["MongoDB", "PostgreSQL", "MySQL"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Docker"],
} as const;

const TECH_ICONS: Record<string, React.FC<{className?: string}>> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "JavaScript": SiJavascript,
  "Tailwind": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "NestJS": SiNestjs,
  "Laravel": SiLaravel,
  "PHP": SiPhp,
  "Perl": SiPerl,
  "React Native": SiReact,
  "PWA": Smartphone,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "Git": SiGit,
  "GitHub": SiGithub,
  "VS Code": SiVscodium,
  "Figma": SiFigma,
  "Postman": SiPostman,
  "Docker": SiDocker,
};

type TabKey = keyof typeof STACK_TABS;

const CLIENTS = ["Movia", "Curevia", "EzyCV", "Sail"];

const About = () => {
  const [tab, setTab] = useState<TabKey>("Frontend");

  return (
    <SiteLayout>
      <Seo
        title="About Loopingon"
        description="Meet the Loopingon team, learn how we work, and see the values behind our websites, software, and digital growth work."
        path="/about"
      />
      <PageHero
        label="Who We Are"
        title="About Loopingon"
        subtitle="A passionate team of designers, developers, and digital creators building growth-focused digital products from Rambukkana, Sri Lanka."
        breadcrumb="About"
      />

      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
        <div className="reveal">
          <span className="section-label">Our Story</span>
          <h2 className="heading-underline mt-3 text-3xl text-brand-navy sm:text-4xl">
            Built by makers, for businesses that want to grow.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            We are a passionate team of web designers, developers and digital creators based in Rambukkana, Sri Lanka. Since our founding, we've helped 5+ businesses across Sri Lanka and beyond establish a powerful digital presence.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We believe every business, big or small, deserves a beautiful, high-performing website that works as hard as they do. That's the promise behind everything we ship.
          </p>
        </div>

        <div className="reveal relative">
          <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-border bg-brand-blue-soft shadow-card">
            <img src={storyImage} alt="Team building digital products" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container-x pb-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="reveal flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-card card-lift">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange-soft text-brand-orange">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl text-brand-navy">Our Mission</h3>
              <p className="mt-3 text-muted-foreground">
                To deliver world-class web solutions that are accessible, affordable and impactful for businesses of all sizes.
              </p>
            </div>
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-brand-orange-soft/30">
              <img src={missionImage} alt="Our Mission" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="reveal flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-card card-lift">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl text-brand-navy">Our Vision</h3>
              <p className="mt-3 text-muted-foreground">
                To be Sri Lanka's most trusted digital agency where creativity meets technology.
              </p>
            </div>
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-brand-blue-soft/30">
              <img src={visionImage} alt="Our Vision" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label mx-auto">What We Stand For</span>
          <h2 className="mt-3 text-3xl text-brand-navy sm:text-4xl">Our Core Values</h2>
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal w-[85vw] shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-card card-lift md:w-auto md:shrink"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-lg text-brand-navy">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-blue-soft/60 py-20">
        <div className="container-x">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="section-label mx-auto">Our Stack</span>
            <h2 className="mt-3 text-3xl text-brand-navy sm:text-4xl">Technologies We Master</h2>
            <p className="mt-4 text-muted-foreground">
              The tools we use every day to build fast, reliable and beautiful products.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {(Object.keys(STACK_TABS) as TabKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  tab === key
                    ? "bg-brand-blue text-white shadow-glow"
                    : "border border-border bg-white text-brand-navy hover:border-brand-blue"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {STACK_TABS[tab].map((t) => {
              const Icon = TECH_ICONS[t];
              return (
                <div key={t} className="group flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-card card-lift">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-navy transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-navy group-hover:text-white group-hover:shadow-glow">
                    {Icon ? <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" /> : <Sparkles className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />}
                  </div>
                  <span className="text-sm font-bold text-brand-navy text-center transition-colors group-hover:text-brand-blue">
                    {t}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label mx-auto">Our People</span>
          <h2 className="mt-3 text-3xl text-brand-navy sm:text-4xl">Meet the Team</h2>
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 hide-scrollbar md:flex md:justify-center md:overflow-visible md:pb-0">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className="reveal w-[85vw] shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-card card-lift md:w-auto md:shrink"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-brand-blue/20">
                <img src={m.img} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="mt-4 text-lg text-brand-navy">{m.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">{m.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              <a
                href="#"
                aria-label={`${m.name} on LinkedIn`}
                className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <StatsStrip />

      <section className="container-x py-16">
        <p className="text-center font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Trusted by businesses across Sri Lanka
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CLIENTS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-brand-blue-soft px-5 py-2.5 text-sm font-medium text-brand-navy"
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
