import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const POSTS = [
  { title: "5 Reasons Your Business Needs a Website in 2024", excerpt: "If you're still on the fence about going digital, here's what you're leaving on the table — and how to fix it.", category: "Business Tips", date: "Mar 12, 2024", author: "Ashan", initials: "AP", color: "bg-brand-blue text-white", grad: "from-blue-500 to-indigo-600" },
  { title: "How to Improve Your Website Speed & SEO", excerpt: "A practical, no-fluff guide to making your site faster — and ranking higher in Google because of it.", category: "SEO", date: "Mar 6, 2024", author: "Rohan", initials: "RJ", color: "bg-purple-500 text-white", grad: "from-purple-500 to-pink-500" },
  { title: "Best Social Media Design Tips for More Engagement", excerpt: "What makes a thumb stop scrolling? We break down 7 design rules that consistently drive engagement.", category: "Social Media", date: "Feb 28, 2024", author: "Nethmi", initials: "ND", color: "bg-brand-orange text-white", grad: "from-orange-400 to-pink-500" },
  { title: "React vs Next.js: Which Should You Choose?", excerpt: "A founder-friendly comparison of two of the most popular frontend choices for modern web apps.", category: "Development", date: "Feb 20, 2024", author: "Ashan", initials: "AP", color: "bg-brand-blue text-white", grad: "from-cyan-500 to-blue-500" },
  { title: "Why Laravel is Still the King of PHP Frameworks", excerpt: "Even in 2024, Laravel powers a huge slice of the web. Here's why we still reach for it.", category: "Development", date: "Feb 12, 2024", author: "Rohan", initials: "RJ", color: "bg-purple-500 text-white", grad: "from-rose-500 to-red-500" },
  { title: "How to Plan a Website Project: A Complete Guide", excerpt: "From first idea to launch day — exactly how we plan a website project, step by step.", category: "Web Design", date: "Feb 4, 2024", author: "Sara", initials: "SF", color: "bg-emerald-500 text-white", grad: "from-emerald-500 to-teal-500" },
];

const CATEGORIES = ["Web Design", "Development", "SEO", "Social Media", "Business Tips"];

const Resources = () => {
  const [q, setQ] = useState("");
  const filtered = POSTS.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <SiteLayout>
      <PageHero
        label="Our Blog"
        title="Latest Insights & Resources"
        subtitle="Articles, guides and tips from our team — built from real client work."
        breadcrumb="Resources"
      />

      <section className="container-x py-16 lg:py-20 grid lg:grid-cols-3 gap-10">
        {/* Posts grid */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <article
                key={p.title}
                className="reveal group rounded-2xl bg-card border border-border shadow-card card-lift overflow-hidden flex flex-col"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${p.grad} relative`}>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-xs font-semibold text-brand-blue">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-muted-foreground font-mono">{p.date}</p>
                  <h3 className="mt-2 text-lg text-brand-navy leading-snug group-hover:text-brand-blue transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-full ${p.color} flex items-center justify-center text-xs font-semibold`}>
                        {p.initials}
                      </div>
                      <span className="text-xs text-muted-foreground">{p.author}</span>
                    </div>
                    <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No articles match "{q}".</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
            <h3 className="text-base text-brand-navy">Search</h3>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
            <h3 className="text-base text-brand-navy">Categories</h3>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <a href="#" className="flex items-center justify-between text-sm text-foreground/85 hover:text-brand-blue group">
                    <span>{c}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
            <h3 className="text-base text-brand-navy">Popular Posts</h3>
            <ul className="mt-3 space-y-3">
              {POSTS.slice(0, 3).map((p) => (
                <li key={p.title}>
                  <a href="#" className="flex gap-3 group">
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${p.grad} shrink-0`} />
                    <div>
                      <p className="text-sm text-brand-navy font-medium leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.date}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* Newsletter */}
      <section className="container-x pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-blue-grad px-8 py-12 lg:px-14 lg:py-16 text-white shadow-glow">
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-brand-orange/30 blur-3xl animate-float-slow" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl">Stay updated with our latest articles & tips</h2>
              <p className="mt-2 text-white/75">No spam. One thoughtful email per month.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 bg-white/95 text-brand-navy placeholder:text-muted-foreground border-0 h-12"
              />
              <Button type="submit" variant="cta" size="lg">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Resources;
