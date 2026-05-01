import { useState, useEffect, useMemo, useRef, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Search, ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPublicAssetUrl } from "@/lib/site";

const POSTS = [
  {
    title: "5 Reasons Your Business Needs a Website in 2026",
    excerpt: "If you're still on the fence about going digital, here's what you're leaving on the table - and how to fix it.",
    category: "Business Tips",
    date: "Mar 12, 2026",
    author: "Sahan Nawarathne",
    initials: "SN",
    color: "bg-brand-blue text-white",
    imgUrl: getPublicAssetUrl("/blog/article1_business_website.webp"),
    mdUrl: "/blog/article1_business_website.md",
  },
  {
    title: "How to Improve Your Website Speed & SEO",
    excerpt: "A practical, no-fluff guide to making your site faster - and ranking higher in Google because of it.",
    category: "SEO",
    date: "Mar 6, 2026",
    author: "Sahan Nawarathne",
    initials: "SN",
    color: "bg-purple-500 text-white",
    imgUrl: getPublicAssetUrl("/blog/article2_speed_seo.webp"),
    mdUrl: "/blog/article2_speed_seo.md",
  },
  {
    title: "Why Custom Software is the Secret to Scaling",
    excerpt: "Stop fighting with spreadsheets and off-the-shelf tools. Here is why bespoke software accelerates growth.",
    category: "Custom Software",
    date: "Feb 28, 2026",
    author: "Sahan Nawarathne",
    initials: "SN",
    color: "bg-brand-orange text-white",
    imgUrl: getPublicAssetUrl("/blog/article3_social_media_design.webp"),
    mdUrl: "/blog/article3_social_media_design.md",
  },
  {
    title: "React vs Next.js: Which Should You Choose?",
    excerpt: "A founder-friendly comparison of two of the most popular frontend choices for modern web apps.",
    category: "Development",
    date: "Feb 20, 2026",
    author: "Sahan Nawarathne",
    initials: "SN",
    color: "bg-brand-blue text-white",
    imgUrl: getPublicAssetUrl("/blog/article4_react_vs_nextjs.webp"),
    mdUrl: "/blog/article4_react_vs_nextjs.md",
  },
  {
    title: "Why Laravel is Still the King of PHP Frameworks",
    excerpt: "Even in 2026, Laravel powers a huge slice of the web. Here's why we still reach for it.",
    category: "Development",
    date: "Feb 12, 2026",
    author: "Sahan Nawarathne",
    initials: "SN",
    color: "bg-purple-500 text-white",
    imgUrl: getPublicAssetUrl("/blog/article5_laravel.webp"),
    mdUrl: "/blog/article5_laravel.md",
  },
  {
    title: "How to Plan a Website Project: A Complete Guide",
    excerpt: "From first idea to launch day - exactly how we plan a website project, step by step.",
    category: "Web Design",
    date: "Feb 4, 2026",
    author: "Sahan Nawarathne",
    initials: "SN",
    color: "bg-emerald-500 text-white",
    imgUrl: getPublicAssetUrl("/blog/article6_website_planning.webp"),
    mdUrl: "/blog/article6_website_planning.md",
  },
];

const CATEGORIES = ["Web Design", "Development", "SEO", "Custom Software", "Business Tips"];
type Post = (typeof POSTS)[number];

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [articleContent, setArticleContent] = useState("");
  const scrollYRef = useRef(0);

  const activeArticle = useMemo(() => {
    const articleSlug = searchParams.get("article");
    if (!articleSlug) return null;
    return POSTS.find((post) => toSlug(post.title) === articleSlug) ?? null;
  }, [searchParams]);

  const filteredPosts = POSTS.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || post.category === category;
    return matchesQuery && matchesCategory;
  });

  const openArticle = (post: Post, event?: MouseEvent) => {
    if (event) event.preventDefault();
    scrollYRef.current = window.scrollY;
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set("article", toSlug(post.title));
      return next;
    });
  };

  const closeArticle = () => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
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
        const response = await fetch(activeArticle.mdUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to load article");
        }

        const text = await response.text();
        const body = text.includes("\n---\n") ? text.split("\n---\n").slice(1).join("\n---\n") : text;
        setArticleContent(body.trim());
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch (error) {
        if ((error as DOMException).name !== "AbortError") {
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
        <Seo
          title={activeArticle.title}
          description={activeArticle.excerpt}
          path={`/resources?article=${toSlug(activeArticle.title)}`}
          image={activeArticle.imgUrl}
          type="article"
        />
        <article className="container-x mx-auto max-w-4xl py-12 md:py-20">
          <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground" onClick={closeArticle}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Resources
          </Button>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-brand-blue">
              <span>{activeArticle.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{activeArticle.date}</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-brand-navy md:text-5xl">{activeArticle.title}</h1>

            <div className="flex items-center gap-3 pb-8 pt-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${activeArticle.color}`}>
                {activeArticle.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-brand-navy">{activeArticle.author}</span>
                <span className="text-xs text-muted-foreground">Loopingon</span>
              </div>
            </div>
          </div>

          <div className="mb-12 aspect-[21/9] overflow-hidden rounded-3xl outline outline-1 outline-border shadow-card">
            <img src={activeArticle.imgUrl} className="h-full w-full object-cover" alt={activeArticle.title} />
          </div>

          <div className="prose prose-lg max-w-none prose-a:text-brand-blue prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-headings:text-brand-navy prose-img:rounded-2xl">
            <ReactMarkdown>{articleContent}</ReactMarkdown>
          </div>
        </article>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Seo
        title="Resources | Loopingon"
        description="Read Loopingon's latest web design, development, SEO, and custom software insights."
        path="/resources"
      />
      <PageHero
        label="Our Blog"
        title="Latest Insights & Resources"
        subtitle="Articles, guides and tips from our team - built from real client work."
        breadcrumb="Resources"
      />

      <section className="container-x flex flex-col-reverse gap-10 py-16 lg:grid lg:grid-cols-3 lg:py-20">
        <div className="lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredPosts.map((post, index) => (
              <article
                key={post.title}
                className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card card-lift"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-[16/10] cursor-pointer overflow-hidden bg-muted" onClick={() => openArticle(post)}>
                  <img
                    src={post.imgUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs text-muted-foreground">{post.date}</p>
                  <h3
                    className="mt-2 cursor-pointer text-lg font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue"
                    onClick={() => openArticle(post)}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${post.color}`}>
                        {post.initials}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>
                    <button onClick={() => openArticle(post)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2">
                      Read More <span className="sr-only">about {post.title}</span> <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredPosts.length === 0 && <p className="py-12 text-center text-muted-foreground">No articles match "{query}".</p>}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-base text-brand-navy">Search</h3>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." className="pl-9" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-base text-brand-navy">Categories</h3>
            <ul className="mt-3 space-y-2">
              <li key="All">
                <button
                  onClick={() => setCategory("All")}
                  className={`group flex w-full items-center justify-between text-sm transition-colors ${category === "All" ? "font-semibold text-brand-blue" : "text-foreground/85 hover:text-brand-blue"}`}
                >
                  <span>All Categories</span>
                  <ArrowRight className={`h-3.5 w-3.5 transition-all ${category === "All" ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                </button>
              </li>
              {CATEGORIES.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setCategory(item)}
                    className={`group flex w-full items-center justify-between text-sm transition-colors ${category === item ? "font-semibold text-brand-blue" : "text-foreground/85 hover:text-brand-blue"}`}
                  >
                    <span>{item}</span>
                    <ArrowRight className={`h-3.5 w-3.5 transition-all ${category === item ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-base text-brand-navy">Popular Posts</h3>
            <ul className="mt-3 space-y-3">
              {POSTS.slice(0, 3).map((post) => (
                <li key={post.title}>
                  <button type="button" onClick={(event) => openArticle(post, event)} className="group flex w-full gap-3 text-left">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <img src={post.imgUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">
                        {post.title}
                      </p>
                      <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{post.date}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

    </SiteLayout>
  );
};

export default Resources;
