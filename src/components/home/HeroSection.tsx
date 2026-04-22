import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, Zap, ShieldCheck, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const numFrames = 192;

const pad = (num: number, size: number) => {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
};

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [framesLoaded, setFramesLoaded] = useState(0);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef(-1);

  useEffect(() => {
    // Preload frames
    let loaded = 0;
    const frames: HTMLImageElement[] = [];
    const cacheBuster = "v=3"; // Ensures we load the newest images
    
    for (let i = 1; i <= numFrames; i++) {
      const img = new Image();
      img.src = `/images/rocket-sequence/ezgif-frame-${pad(i, 3)}.jpg?${cacheBuster}`;
      img.onload = () => {
        loaded++;
        setFramesLoaded(loaded);
        if (loaded === numFrames) {
          setIsAnimationReady(true);
        }
      };
      frames.push(img);
    }
    framesRef.current = frames;
  }, []);

  useEffect(() => {
    if (!isAnimationReady || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Ensure canvas intrinsic size matches image size
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    let ticking = false;

    const updateScroll = () => {
      // Speed up animation so it finishes while passing the feature pills
      // 0.6 * windowHeight ensures it completes much faster
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.6; 
      
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      let frameIndex = Math.floor(progress * numFrames);
      frameIndex = Math.min(numFrames - 1, frameIndex);
      
      if (frameIndex !== currentFrameIndexRef.current) {
        currentFrameIndexRef.current = frameIndex;
        drawFrame(frameIndex);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Initial draw
    drawFrame(0);
    currentFrameIndexRef.current = 0;
    updateScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isAnimationReady]);

  return (
    <section className="relative overflow-hidden bg-hero min-h-[100svh] flex flex-col justify-center">
      
      {/* Floating blobs for light theme */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl animate-float-slow z-0" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-brand-orange/15 blur-3xl animate-float-slower z-0" />

      {/* Absolute Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!isAnimationReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin"></div>
              <p className="text-brand-navy text-sm font-medium">Loading sequence ({Math.floor((framesLoaded / numFrames) * 100)}%)</p>
            </div>
          </div>
        )}
        
        {/* mix-blend-multiply perfectly blends the white background into the light theme */}
        {/* object-[100%_20%] shifts the rocket slightly up so the smoke doesn't hide behind the bottom pills */}
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full object-cover object-[80%_20%] md:object-[100%_20%] mix-blend-multiply opacity-100 -translate-y-12 md:-translate-y-16"
        />
        
        {/* Gradients to ensure text readability, but reduced opacity to make right side more visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
        
      </div>

      <div className="container-x relative z-20 pt-32 pb-12">
        <div className="max-w-2xl">
          <span className="section-label animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <Sparkles className="inline h-3 w-3 mr-1.5 -mt-0.5" />
            Web & Software Agency · Sri Lanka
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-brand-navy animate-fade-up" style={{ animationDelay: "0.1s" }}>
            We Build{" "}
            <span className="text-brand-blue">Websites</span>
            <br />
            That <span className="text-gradient-orange">Grow Your Business.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            From stunning websites to powerful web applications, we build digital experiences that help your business stand out and succeed online.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="hero" size="lg" className="h-14 px-8 text-base">
              <Link to="/services">Explore Services</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg" className="h-14 px-8 text-base bg-white/50 backdrop-blur-sm">
              <Link to="/portfolio">
                View Our Work <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust badge */}
          <div className="mt-12 inline-flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur-md border border-border px-6 py-4 shadow-card animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-brand-navy block">5.0 Customer Rating</span>
              <span className="text-muted-foreground">Trusted by 200+ Businesses</span>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="mt-24 grid sm:grid-cols-3 gap-6 relative z-20">
          {[
            { Icon: Palette, title: "Modern Design", desc: "Beautiful & user-friendly" },
            { Icon: Zap, title: "High Performance", desc: "Fast & SEO optimized" },
            { Icon: ShieldCheck, title: "Reliable Support", desc: "We are here for you" },
          ].map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal flex items-center gap-4 rounded-2xl bg-white/90 backdrop-blur-md border border-border px-6 py-5 shadow-card hover:shadow-lg transition-all card-lift"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-brand-blue-soft flex items-center justify-center text-brand-blue">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
