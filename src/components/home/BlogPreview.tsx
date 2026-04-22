import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import nextProjectImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Next project.png";

const POSTS = [
  {
    date: "Mar 12, 2026",
    category: "Business",
    title: "5 Reasons Your Business Needs a Website in 2026",
    excerpt: "If you're still relying only on social media, you're leaving real money on the table. Here's why.",
    imgUrl: "/blog/article1_business_website.jpg",
  },
  {
    date: "Mar 6, 2026",
    category: "Performance",
    title: "How to Improve Your Website Speed & SEO",
    excerpt: "A faster site ranks higher and converts better. We break down what actually moves the needle.",
    imgUrl: "/blog/article2_speed_seo.jpg",
  },
  {
    date: "Feb 28, 2026",
    category: "Design",
    title: "Best Social Media Design Tips for More Engagement",
    excerpt: "Stop the scroll with these proven design principles for posters, reels and ad creatives.",
    imgUrl: "/blog/article3_social_media_design.jpg",
  },
];

const BlogPreview = () => {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="reveal">
          <span className="section-label">Our Blog</span>
          <h2 className="heading-underline mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
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

      <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
        {POSTS.map((p, i) => (
          <article
            key={p.title}
            className="reveal group rounded-2xl bg-card border border-border shadow-card card-lift overflow-hidden flex flex-col w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <img src={p.imgUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-muted-foreground">{p.date}</span>
                <span className="inline-block bg-brand-blue-soft text-brand-blue rounded-full px-2.5 py-0.5 font-medium">
                  {p.category}
                </span>
              </div>
              <h3 className="mt-3 text-lg text-brand-navy leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-auto pt-4">
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2"
                  aria-label={`Read more about ${p.title}`}
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* CTA card */}
        <article className="reveal rounded-2xl bg-blue-grad text-white shadow-glow flex flex-col justify-between overflow-hidden relative group w-[85vw] shrink-0 snap-center md:w-auto md:shrink" style={{ transitionDelay: "210ms" }}>
          <div className="absolute inset-0 opacity-40 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-500">
             <img src={nextProjectImg} alt="Next project" className="w-full h-full object-cover" />
          </div>
          <div className="p-7 relative z-10 flex flex-col h-full justify-between bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue/60 to-transparent">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-bold bg-brand-orange/90 px-2 py-1 rounded-md">Let’s Build</span>
              <h3 className="mt-4 text-xl text-white leading-snug font-bold">
                Ready to start your next project?
              </h3>
              <p className="mt-2 text-sm text-white/90 font-medium">
                We’ll get back to you within 24 hours with a clear plan and a fair price.
              </p>
            </div>
            <a
              href="https://wa.me/94703031636?text=Hello! I am interested in building a project with you." target="_blank" rel="noopener noreferrer"
              className="rocket-cta mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-orange hover:bg-brand-orange hover:text-white transition-all shadow-lg"
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
