import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { getPublicAssetUrl } from "@/lib/site";

const nextProjectImg = getPublicAssetUrl("/home/next-project.webp");

const POSTS = [
  {
    date: "Mar 12, 2026",
    category: "Business",
    title: "5 Reasons Your Business Needs a Website in 2026",
    excerpt: "If you're still relying only on word-of-mouth, you're leaving real money on the table. Here's why.",
    imgUrl: getPublicAssetUrl("/blog/article1_business_website.webp"),
  },
  {
    date: "Mar 6, 2026",
    category: "Performance",
    title: "How to Improve Your Website Speed & SEO",
    excerpt: "A faster site ranks higher and converts better. We break down what actually moves the needle.",
    imgUrl: getPublicAssetUrl("/blog/article2_speed_seo.webp"),
  },
  {
    date: "Feb 28, 2026",
    category: "Software",
    title: "Why Custom Software is the Secret to Scaling",
    excerpt: "Stop fighting with spreadsheets and off-the-shelf tools. Here is why bespoke software accelerates growth.",
    imgUrl: getPublicAssetUrl("/blog/article3_social_media_design.webp"),
  },
];

const BlogPreview = () => {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="reveal">
          <span className="section-label">Our Blog</span>
          <h2 className="heading-underline mt-3 text-3xl text-brand-navy sm:text-4xl lg:text-5xl">
            Latest Insights
          </h2>
        </div>
        <Link
          to="/resources"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          View All Articles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4">
        {POSTS.map((post, index) => (
          <article
            key={post.title}
            className="reveal group flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card card-lift md:w-auto md:shrink"
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={post.imgUrl}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-muted-foreground">{post.date}</span>
                <span className="inline-block rounded-full bg-brand-blue-soft px-2.5 py-0.5 font-medium text-brand-blue">
                  {post.category}
                </span>
              </div>
              <h3 className="mt-3 text-lg leading-snug text-brand-navy">{post.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-auto pt-4">
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More <span className="sr-only">about {post.title}</span> <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        <article
          className="reveal group relative flex w-[85vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl bg-blue-grad text-white shadow-glow md:w-auto md:shrink"
          style={{ transitionDelay: "210ms" }}
        >
          <div className="absolute inset-0 opacity-40 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-60">
            <img src={nextProjectImg} alt="Next project" className="h-full w-full object-cover" />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue/60 to-transparent p-7">
            <div>
              <span className="rounded-md bg-brand-orange/90 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white/90">
                Let's Build
              </span>
              <h3 className="mt-4 text-xl font-bold leading-snug text-white">Ready to start your next project?</h3>
              <p className="mt-2 text-sm font-medium text-white/90">
                We'll get back to you within 24 hours with a clear plan and a fair price.
              </p>
            </div>
            <a
              href="https://wa.me/94703031636?text=Hello! I am interested in building a project with you."
              target="_blank"
              rel="noopener noreferrer"
              className="rocket-cta mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-orange shadow-lg transition-all hover:bg-brand-orange hover:text-white"
            >
              <span className="rocket-icon inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-white transition-colors">
                <Rocket className="h-3.5 w-3.5" />
              </span>
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogPreview;
