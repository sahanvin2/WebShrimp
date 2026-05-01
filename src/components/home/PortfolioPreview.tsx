import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublicAssetUrl } from "@/lib/site";
import { useMemo, useState } from "react";

const PROJECTS = [
  {
    title: "Ceylon Spice Co.",
    category: "E-Commerce",
    tag: "Shopify Custom",
    img: getPublicAssetUrl("/portfolio_thumbs/Ceylon Spice Co..webp"),
  },
  {
    title: "Lanka Legal",
    category: "Business Website",
    tag: "Next.js",
    img: getPublicAssetUrl("/portfolio_thumbs/Lanka Legal.webp"),
  },
  {
    title: "Studio Bloom",
    category: "Portfolio",
    tag: "React + CMS",
    img: getPublicAssetUrl("/portfolio_thumbs/Studio Bloom.webp"),
  },
  {
    title: "BetterFit App",
    category: "Landing Page",
    tag: "Conversion",
    img: getPublicAssetUrl("/portfolio_thumbs/BetterFit App.webp"),
  },
];

const slugifyProjectTitle = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toPublicPath = (path: string): string => (path.startsWith("/") ? path : `/${path}`);

const buildPathVariants = (path: string): string[] => {
  const normalized = toPublicPath(path);
  const encoded = encodeURI(normalized);
  return [
    getPublicAssetUrl(normalized),
    getPublicAssetUrl(encoded),
    normalized,
    encoded,
  ];
};

const buildImageCandidates = (title: string, primaryUrl: string): string[] => {
  const slug = slugifyProjectTitle(title);
  const candidates = [
    primaryUrl,
    ...buildPathVariants(`/portfolio_thumbs/${title}.webp`),
    ...buildPathVariants(`/portfolio_thumbs/${title}.png`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}.webp`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}.png`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}..webp`),
    ...buildPathVariants(`/portfolio_thumbs/${slug}..png`),
  ];

  return [...new Set(candidates)];
};

type PreviewImageProps = {
  title: string;
  primaryUrl: string;
};

const PreviewImage = ({ title, primaryUrl }: PreviewImageProps) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isMissing, setIsMissing] = useState(false);
  const candidates = useMemo(() => buildImageCandidates(title, primaryUrl), [title, primaryUrl]);
  const currentSrc = candidates[candidateIndex];

  if (isMissing || !currentSrc) {
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
      decoding="async"
      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => {
        setCandidateIndex((prev) => {
          if (prev < candidates.length - 1) {
            return prev + 1;
          }
          setIsMissing(true);
          return prev;
        });
      }}
    />
  );
};

const PortfolioPreview = () => {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="reveal">
          <span className="section-label">Success Stories</span>
          <h2 className="heading-underline mt-3 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Digital Products We've Built
          </h2>
        </div>
        <Link
          to="/portfolio"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
        >
          View All Projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-14 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0 md:overflow-visible">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className="reveal group rounded-[2rem] overflow-hidden bg-card border border-border shadow-card card-lift flex flex-col w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <PreviewImage title={p.title} primaryUrl={p.img} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest bg-white/95 backdrop-blur-sm text-brand-navy font-bold rounded-full px-3 py-1.5 shadow-sm">
                {p.tag}
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] bg-brand-navy/40">
                <Button asChild variant="cta" size="sm" className="scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Link to="/portfolio" className="flex items-center gap-2">View Project <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-10">
              <div>
                <h3 className="text-lg font-bold text-brand-navy transition-colors group-hover:text-brand-blue">{p.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1.5">{p.category}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfolioPreview;
