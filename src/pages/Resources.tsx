import { useState, useEffect, useMemo, useRef, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Search, ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const POSTS = [
  { title: "5 Reasons Your Business Needs a Website in 2026", excerpt: "If you're still on the fence about going digital, here's what you're leaving on the table — and how to fix it.", category: "Business Tips", date: "Mar 12, 2026", author: "Sahan Nawarathne", initials: "SN", color: "bg-brand-blue text-white", imgUrl: "/blog/article1_business_website.jpg", mdUrl: "/blog/article1_business_website.md" },
  { title: "How to Improve Your Website Speed & SEO", excerpt: "A practical, no-fluff guide to making your site faster — and ranking higher in Google because of it.", category: "SEO", date: "Mar 6, 2026", author: "Sahan Nawarathne", initials: "SN", color: "bg-purple-500 text-white", imgUrl: "/blog/article2_speed_seo.jpg", mdUrl: "/blog/article2_speed_seo.md" },
  { title: "Best Social Media Design Tips for More Engagement", excerpt: "What makes a thumb stop scrolling? We break down 7 design rules that consistently drive engagement.", category: "Social Media", date: "Feb 28, 2026", author: "Sahan Nawarathne", initials: "SN", color: "bg-brand-orange text-white", imgUrl: "/blog/article3_social_media_design.jpg", mdUrl: "/blog/article3_social_media_design.md" },
  { title: "React vs Next.js: Which Should You Choose?", excerpt: "A founder-friendly comparison of two of the most popular frontend choices for modern web apps.", category: "Development", date: "Feb 20, 2026", author: "Sahan Nawarathne", initials: "SN", color: "bg-brand-blue text-white", imgUrl: "/blog/article4_react_vs_nextjs.jpg", mdUrl: "/blog/article4_react_vs_nextjs.md" },
  { title: "Why Laravel is Still the King of PHP Frameworks", excerpt: "Even in 2026, Laravel powers a huge slice of the web. Here's why we still reach for it.", category: "Development", date: "Feb 12, 2026", author: "Sahan Nawarathne", initials: "SN", color: "bg-purple-500 text-white", imgUrl: "/blog/article5_laravel.jpg", mdUrl: "/blog/article5_laravel.md" },
  { title: "How to Plan a Website Project: A Complete Guide", excerpt: "From first idea to launch day — exactly how we plan a website project, step by step.", category: "Web Design", date: "Feb 4, 2026", author: "Sahan Nawarathne", initials: "SN", color: "bg-emerald-500 text-white", imgUrl: "/blog/article6_website_planning.jpg", mdUrl: "/blog/article6_website_planning.md" },
];

const CATEGORIES = ["Web Design", "Development", "SEO", "Social Media", "Business Tips"];
type Post = (typeof POSTS)[number];

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [articleContent, setArticleContent] = useState("");
  const scrollYRef = useRef(0);

  const activeArticle = useMemo(() => {
    const articleSlug = searchParams.get("article");
    if (!articleSlug) return null;
    return POSTS.find((post) => toSlug(post.title) === articleSlug) ?? null;
  }, [searchParams]);

  const filtered = POSTS.filter((p) => {
    const matchesQ = p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase());
    const matchesCat = cat === "All" || p.category === cat;
    return matchesQ && matchesCat;
  });

  const openArticle = (p: Post, e?: MouseEvent) => {
    if (e) e.preventDefault();
    scrollYRef.current = window.scrollY;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("article", toSlug(p.title));
      return next;
    });
  };

  const closeArticle = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("article");
      return next;
    });
    setArticleContent("");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });
    });
  };

  useEffect(() => {
    if (!activeArticle) return;

    const controller = new AbortController();

    const loadArticle = async () => {
      setArticleContent("Loading content...");
      try {
        const res = await fetch(activeArticle.mdUrl, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Failed to load article");
        }

        const text = await res.text();
        const body = text.includes("\n---\n") ? text.split("\n---\n").slice(1).join("\n---\n") : text;
        setArticleContent(body.trim());
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          setArticleContent("Failed to load article.");
        }
      }
    };

    void loadArticle();

    return () => controller.abort();
  }, [activeArticle]);

  if (activeArticle) {
    return (
      <SiteLayout>
        <article className="container-x py-12 md:py-20 max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground" onClick={closeArticle}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Resources
          </Button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium text-brand-blue uppercase tracking-wider">
              <span>{activeArticle.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{activeArticle.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-brand-navy leading-tight">
              {activeArticle.title}
            </h1>
            
            <div className="flex items-center gap-3 pt-4 pb-8">
              <div className={`h-10 w-10 rounded-full ${activeArticle.color} flex items-center justify-center text-sm font-semibold`}>
                {activeArticle.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-brand-navy text-sm">{activeArticle.author}</span>
                <span className="text-xs text-muted-foreground">Web Shrimp Studio</span>
              </div>
            </div>
          </div>

          <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-card outline outline-1 outline-border">
            <img src={activeArticle.imgUrl} className="w-full h-full object-cover" alt={activeArticle.title} />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-brand-blue prose-img:rounded-2xl">
            <ReactMarkdown>{articleContent}</ReactMarkdown>
          </div>
        </article>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero
        label="Our Blog"
        title="Latest Insights & Resources"
        subtitle="Articles, guides and tips from our team — built from real client work."
        breadcrumb="Resources"
      />

      <section className="container-x py-16 lg:py-20 flex flex-col-reverse lg:grid lg:grid-cols-3 gap-10">
        {/* Posts grid */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <article
                key={p.title}
                className="reveal group rounded-2xl bg-card border border-border shadow-card card-lift overflow-hidden flex flex-col"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-muted cursor-pointer" onClick={() => openArticle(p)}>
                  <img src={p.imgUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-wider text-brand-blue shadow-sm">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-muted-foreground font-mono">{p.date}</p>
                  <h3 className="mt-2 text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors cursor-pointer" onClick={() => openArticle(p)}>
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
                    <button onClick={() => openArticle(p)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </button>
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
              <li key="All">
                <button onClick={() => setCat("All")} className={`w-full flex items-center justify-between text-sm transition-colors group ${cat === "All" ? "text-brand-blue font-semibold" : "text-foreground/85 hover:text-brand-blue"}`}>
                  <span>All Categories</span>
                  <ArrowRight className={`h-3.5 w-3.5 transition-all ${cat === "All" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button onClick={() => setCat(c)} className={`w-full flex items-center justify-between text-sm transition-colors group ${cat === c ? "text-brand-blue font-semibold" : "text-foreground/85 hover:text-brand-blue"}`}>
                    <span>{c}</span>
                    <ArrowRight className={`h-3.5 w-3.5 transition-all ${cat === c ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
            <h3 className="text-base text-brand-navy">Popular Posts</h3>
            <ul className="mt-3 space-y-3">
              {POSTS.slice(0, 3).map((p) => (
                <li key={p.title}>
                  <button type="button" onClick={(e) => openArticle(p, e)} className="w-full text-left flex gap-3 group">
                    <div className="h-16 w-16 rounded-lg overflow-hidden shrink-0">
                      <img src={p.imgUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-brand-navy font-semibold leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {p.title}
                      </p>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mt-1.5">{p.date}</p>
                    </div>
                  </button>
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
