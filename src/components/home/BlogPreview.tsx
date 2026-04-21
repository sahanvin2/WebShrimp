import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    date: "Mar 14, 2024",
    category: "Business",
    title: "5 Reasons Your Business Needs a Website in 2024",
    excerpt: "If you're still relying only on social media, you're leaving real money on the table. Here's why.",
  },
  {
    date: "Feb 28, 2024",
    category: "Performance",
    title: "How to Improve Your Website Speed & SEO",
    excerpt: "A faster site ranks higher and converts better. We break down what actually moves the needle.",
  },
  {
    date: "Feb 10, 2024",
    category: "Design",
    title: "Best Social Media Design Tips for More Engagement",
    excerpt: "Stop the scroll with these proven design principles for posters, reels and ad creatives.",
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

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {POSTS.map((p, i) => (
          <article
            key={p.title}
            className="reveal rounded-2xl bg-card border border-border shadow-card card-lift overflow-hidden"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-brand-blue/15 via-brand-blue-soft to-brand-orange/15" />
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-muted-foreground">{p.date}</span>
                <span className="inline-block bg-brand-blue-soft text-brand-blue rounded-full px-2.5 py-0.5 font-medium">
                  {p.category}
                </span>
              </div>
              <h3 className="mt-3 text-lg text-brand-navy leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <Link
                to="/resources"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
              >
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}

        {/* CTA card */}
        <article className="reveal rounded-2xl p-7 bg-blue-grad text-white shadow-glow flex flex-col justify-between" style={{ transitionDelay: "210ms" }}>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/70">Let’s Build</span>
            <h3 className="mt-3 text-xl text-white leading-snug">
              Ready to start your next project?
            </h3>
            <p className="mt-2 text-sm text-white/75">
              We’ll get back to you within 24 hours with a clear plan and a fair price.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </div>
    </section>
  );
};

export default BlogPreview;
