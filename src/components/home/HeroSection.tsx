import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, Zap, ShieldCheck, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const TARGET_DOTS = 4000;
    const MOUSE_RADIUS = 150;
    const BASE_SPEED = 0.008;

    const PALETTE = [
      [0, 212, 255],
      [0, 110, 255],
      [255, 0, 80],
      [255, 69, 0],
      [255, 140, 0],
    ];

    const getGradientColor = (value: number) => {
      const clamped = Math.max(0, Math.min(1, value));
      const scaled = clamped * (PALETTE.length - 1);
      const index = Math.floor(scaled);
      const nextIndex = Math.min(index + 1, PALETTE.length - 1);
      const fraction = scaled - index;

      const c1 = PALETTE[index];
      const c2 = PALETTE[nextIndex];

      const r = Math.round(c1[0] + (c2[0] - c1[0]) * fraction);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * fraction);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * fraction);

      return `${r}, ${g}, ${b}`;
    };

    let dots: Dot[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId = 0;

    class Dot {
      baseX: number;
      baseY: number;
      baseRadius: number;
      activeRadius: number;
      baseAlpha: number;
      activeAlpha: number;
      sx: number;
      sy: number;
      color: string;
      localTime: number;
      speedMultiplier: number;
      x: number;
      y: number;
      drawRadius: number;
      drawAlpha: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.baseRadius = Math.random() * 1.5 + 1.2;
        this.activeRadius = this.baseRadius;
        this.baseAlpha = Math.random() * 0.4 + 0.6;
        this.activeAlpha = this.baseAlpha;
        this.sx = x * 0.0015;
        this.sy = y * 0.003;
        const colorPhase = (Math.sin(this.sx * 1.5 - this.sy * 1.5) + 1) / 2;
        this.color = getGradientColor(colorPhase);
        this.localTime = x * 0.002 + y * 0.002;
        this.speedMultiplier = 1;
        this.x = x;
        this.y = y;
        this.drawRadius = 0;
        this.drawAlpha = 0;
      }

      update() {
        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let intensity = 0;
        if (dist < MOUSE_RADIUS) {
          intensity = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          intensity = Math.pow(intensity, 1.5);
        }

        const targetRadius = this.baseRadius + intensity * 2.5;
        const targetAlpha = this.baseAlpha + intensity * (1 - this.baseAlpha);
        const targetSpeedMultiplier = 1 + intensity * 4;

        this.activeRadius += (targetRadius - this.activeRadius) * 0.1;
        this.activeAlpha += (targetAlpha - this.activeAlpha) * 0.1;
        this.speedMultiplier += (targetSpeedMultiplier - this.speedMultiplier) * 0.05;

        this.localTime += BASE_SPEED * this.speedMultiplier;

        const zPhase = this.localTime * 1.2 + this.sx * 3.0 - this.sy * 2.5;
        const z = Math.sin(zPhase);
        const depth = (z + 1) / 2;

        this.drawRadius = this.activeRadius * (0.3 + depth * 0.9);
        this.drawAlpha = this.activeAlpha * (0.1 + depth * 0.9);

        const waveX = Math.cos(this.localTime * 0.7 + this.sy * 2.2) * 80;
        const waveY = Math.sin(this.localTime * 0.8 + this.sx * 2.5) * 80;

        this.x = this.baseX + waveX * (0.7 + depth * 0.5);
        this.y = this.baseY + waveY * (0.7 + depth * 0.5);
      }

      draw(context: CanvasRenderingContext2D) {
        if (this.drawAlpha < 0.01) return;
        context.fillStyle = `rgba(${this.color}, ${this.drawAlpha})`;
        const size = this.drawRadius * 2;
        context.fillRect(this.x - this.drawRadius, this.y - this.drawRadius, size, size);
      }
    }

    const initGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      dots = [];

      const overscan = 120;
      const computeWidth = canvas.width + overscan * 2;
      const computeHeight = canvas.height + overscan * 2;
      const area = computeWidth * computeHeight;
      const spacing = Math.sqrt(area / TARGET_DOTS);

      const cols = Math.floor(computeWidth / spacing);
      const rows = Math.floor(computeHeight / spacing);

      const marginX = -overscan + (computeWidth - cols * spacing) / 2 + spacing / 2;
      const marginY = -overscan + (computeHeight - rows * spacing) / 2 + spacing / 2;

      for (let xIndex = 0; xIndex < cols; xIndex += 1) {
        for (let yIndex = 0; yIndex < rows; yIndex += 1) {
          dots.push(new Dot(marginX + xIndex * spacing, marginY + yIndex * spacing));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.update();
        dot.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      initGrid();
      animate();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.touches[0].clientX - rect.left;
      mouse.y = event.touches[0].clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchend", handlePointerLeave);

    initGrid();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchend", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,hsl(0_0%_100%/0.88),hsl(0_0%_100%/0.62)_42%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-white via-white/35 to-transparent" />

      <div className="container-x relative z-20 pt-32 pb-16">
        <div className="pointer-events-auto mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="section-label mx-auto animate-fade-up border-border bg-white" style={{ animationDelay: "0.05s" }}>
            <Sparkles className="mr-1.5 inline h-3 w-3 -mt-0.5 text-brand-blue" />
            {siteConfig.heroLabel}
          </span>

          <h1
            className="mt-5 animate-fade-up text-4xl font-bold leading-[1.05] text-brand-navy sm:text-5xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            We Build <span className="text-brand-blue">Websites</span>
            <br />
            That <span className="text-gradient-orange">Grow Your Business.</span>
          </h1>

          <p
            className="mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            From stunning websites to powerful web applications, we build digital experiences that help your business
            stand out and succeed online.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="hero" size="lg" className="h-14 px-8 text-base shadow-lg shadow-brand-blue/20">
              <Link to="/services">Explore Services</Link>
            </Button>
            <Button
              asChild
              variant="heroOutline"
              size="lg"
              className="h-14 bg-white/50 px-8 text-base backdrop-blur-sm"
            >
              <Link to="/portfolio">
                View Our Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

        </div>

        <div className="relative z-20 mx-auto mt-20 grid max-w-5xl gap-6 pointer-events-auto sm:grid-cols-3">
          {[
            { Icon: Palette, title: "Modern Design", desc: "Beautiful and user-friendly" },
            { Icon: Zap, title: "High Performance", desc: "Fast and SEO optimized" },
            { Icon: ShieldCheck, title: "Reliable Support", desc: "We are here for you" },
          ].map(({ Icon, title, desc }, index) => (
            <div
              key={title}
              className="reveal flex items-center gap-4 rounded-2xl border border-border bg-white/90 px-6 py-5 shadow-card transition-all hover:shadow-lg card-lift backdrop-blur-md"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
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
