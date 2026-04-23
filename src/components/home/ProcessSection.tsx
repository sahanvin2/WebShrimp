import { useEffect, useRef, useCallback } from "react";
import discoverImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Discover.png";
import planImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Plan.png";
import designImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Design & Develop.png";
import launchImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Launch.png";
import supportImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Support.png";

/* ─── Step data ─────────────────────────────────────────────────────────── */
const STEPS = [
  {
    img: discoverImg,
    title: "Discover",
    desc: "We understand your business and goals.",
    color: "#2563EB",        // blue
    colorLight: "#EFF6FF",
    colorMid: "#BFDBFE",
    side: "left" as const,   // image side on desktop
  },
  {
    img: planImg,
    title: "Plan",
    desc: "We plan the perfect solution for you.",
    color: "#16A34A",        // green
    colorLight: "#F0FDF4",
    colorMid: "#BBF7D0",
    side: "right" as const,
  },
  {
    img: designImg,
    title: "Design & Develop",
    desc: "We design and build your website.",
    color: "#D97706",        // amber
    colorLight: "#FFFBEB",
    colorMid: "#FDE68A",
    side: "left" as const,
  },
  {
    img: launchImg,
    title: "Launch",
    desc: "We test and launch your website.",
    color: "#7C3AED",        // purple
    colorLight: "#F5F3FF",
    colorMid: "#DDD6FE",
    side: "right" as const,
  },
  {
    img: supportImg,
    title: "Support",
    desc: "We provide ongoing support & updates.",
    color: "#0D9488",        // teal
    colorLight: "#F0FDFA",
    colorMid: "#99F6E4",
    side: "left" as const,
  },
];

/* ─── SVG Wave ──────────────────────────────────────────────────────────── */
const WavePath = ({
  svgRef,
  dotRefs,
}: {
  svgRef: React.RefObject<SVGSVGElement | null>;
  dotRefs: React.RefObject<(SVGCircleElement | null)[]>;
}) => (
  <svg
    ref={svgRef}
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      overflow: "visible",
      zIndex: 0,
    }}
  >
    <defs>
      {STEPS.map((s, i) => (
        <radialGradient key={i} id={`dotGlow${i}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={s.color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={s.color} stopOpacity="0" />
        </radialGradient>
      ))}
    </defs>

    {/* The wave path — JS fills in the `d` attribute */}
    <path
      id="hw-wave"
      fill="none"
      strokeDasharray="10 8"
      strokeLinecap="round"
      style={{
        stroke: "#CBD5E1",
        strokeWidth: 2.5,
        transition: "d 0.4s ease",
      }}
    />

    {/* Anchor dots — one per step */}
    {STEPS.map((s, i) => (
      <g key={i}>
        <circle
          r="18"
          fill={`url(#dotGlow${i})`}
          ref={(el) => {
            if (dotRefs.current) dotRefs.current[i * 2] = el;
          }}
        />
        <circle
          r="7"
          fill={s.color}
          stroke="white"
          strokeWidth="2.5"
          style={{ filter: `drop-shadow(0 2px 6px ${s.color}88)` }}
          ref={(el) => {
            if (dotRefs.current) dotRefs.current[i * 2 + 1] = el;
          }}
        />
      </g>
    ))}
  </svg>
);

/* ─── Main component ────────────────────────────────────────────────────── */
const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Draw / redraw the SVG wave ─────────────────────────────────────── */
  const drawWave = useCallback(() => {
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!svg || !wrap) return;

    const wrapRect = wrap.getBoundingClientRect();

    // Collect anchor points (center of each step row, at the midline x)
    const anchors: { x: number; y: number }[] = [];

    stepRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const relY = r.top - wrapRect.top + r.height / 2;
      const midX = wrapRect.width / 2;
      anchors.push({ x: midX, y: relY });
    });

    if (anchors.length < 2) return;

    // Build a smooth cubic bezier through all anchors
    let d = `M ${anchors[0].x} ${anchors[0].y}`;
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i];
      const b = anchors[i + 1];
      // Alternate the control-point X to create the snake/river effect
      const cpX = i % 2 === 0
        ? a.x + wrapRect.width * 0.18
        : a.x - wrapRect.width * 0.18;
      d += ` C ${cpX} ${a.y}, ${cpX} ${b.y}, ${b.x} ${b.y}`;
    }

    const pathEl = svg.querySelector<SVGPathElement>("#hw-wave");
    if (pathEl) pathEl.setAttribute("d", d);
    // Position each dot pair on its anchor
    anchors.forEach((pt, i) => {
      const halo = dotRefs.current[i * 2];
      const solid = dotRefs.current[i * 2 + 1];
      if (halo) { halo.setAttribute("cx", String(pt.x)); halo.setAttribute("cy", String(pt.y)); }
      if (solid) { solid.setAttribute("cx", String(pt.x)); solid.setAttribute("cy", String(pt.y)); }
    });
  }, []);

  /* ── IntersectionObserver for step animations ───────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("hw-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );

    imgRefs.current.forEach((el) => el && observer.observe(el));
    textRefs.current.forEach((el) => el && observer.observe(el));
    
    // Also observe the step container itself for the plates
    stepRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ── Draw wave on mount + resize ────────────────────────────────────── */
  useEffect(() => {
    // Small delay so layout is painted
    const t = setTimeout(drawWave, 120);
    window.addEventListener("resize", drawWave, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", drawWave);
    };
  }, [drawWave]);

  /* ── Scroll reveal for section header ──────────────────────────────── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Scoped styles ─────────────────────────────────────────────── */}
      <style>{`
        /* ── Step enter animations ── */
        .hw-img-wrap,
        .hw-text-wrap {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }

        /* Desktop: slide from side */
        @media (min-width: 641px) {
          .hw-from-left  { transform: translateX(-160px); opacity: 0; }
          .hw-from-right { transform: translateX( 160px); opacity: 0; }
          .hw-img-wrap.hw-visible,
          .hw-text-wrap.hw-visible {
            opacity: 1;
            transform: translateX(0) !important;
          }
        }

        /* Mobile: slide up */
        @media (max-width: 640px) {
          .hw-img-wrap,
          .hw-text-wrap { transform: translateY(40px); opacity: 0; }
          .hw-img-wrap.hw-visible,
          .hw-text-wrap.hw-visible {
            opacity: 1;
            transform: translateY(0) !important;
          }
        }

        /* ── Accent underline ── */
        .hw-underline {
          display: block;
          height: 3px;
          border-radius: 99px;
          margin-top: 10px;
          width: 0;
          transition: width 0.6s cubic-bezier(.4,0,.2,1) 0.55s;
        }
        .hw-text-wrap.hw-visible .hw-underline { width: 52px; }

        /* ── Image card  ── */
        .hw-img-card {
          transition: transform 0.6s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.6s ease;
          cursor: default;
        }

        /* ── Connector lines ── */
        .hw-connector {
          position: absolute;
          top: 50%;
          height: 3px;
          width: 0;
          background: currentColor;
          z-index: 0;
          transition: width 0.6s cubic-bezier(.4,0,.2,1) 0.4s;
          border-radius: 99px;
        }
        /* Left images connect to the right */
        .hw-from-left .hw-connector {
          right: 0;
          transform: translateY(-50%) translateX(100%);
        }
        /* Right images connect to the left */
        .hw-from-right .hw-connector {
          left: 0;
          transform: translateY(-50%) translateX(-100%);
        }
        .hw-step.hw-visible .hw-from-left .hw-connector,
        .hw-step.hw-visible .hw-from-right .hw-connector {
          width: calc(clamp(0.75rem, 2vw, 2rem) + 8px);
        }

        /* ── Mobile responsive overrides ── */
        .hw-mobile-line {
          display: none;
        }
        @media (max-width: 640px) {
          .hw-mobile-line {
            display: block;
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            transform: translateX(-50%);
            background: repeating-linear-gradient(
              to bottom,
              #CBD5E1 0px,
              #CBD5E1 8px,
              transparent 8px,
              transparent 18px
            );
            z-index: 0;
          }
          .hw-svg-wave { display: none !important; }

          .hw-step {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            padding-bottom: 2rem !important;
          }
          .hw-step > div {
            order: unset !important;
            text-align: center !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .hw-step .hw-img-wrap { order: 0 !important; }
          .hw-step .hw-text-wrap { order: 1 !important; }
          .hw-underline { margin-left: auto !important; margin-right: auto !important; }
          .hw-text-wrap p { margin-left: auto !important; margin-right: auto !important; }
          
          .hw-connector { display: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="py-20 lg:py-28 overflow-hidden"
        style={{ background: "linear-gradient(180deg,#f8faff 0%,#ffffff 60%,#f8faff 100%)" }}
      >
        {/* ── Header ── */}
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto reveal mb-20">
            <span
              className="section-label mx-auto"
              style={{ letterSpacing: "0.2em", fontSize: 11 }}
            >
              Our Process
            </span>
            <h2
              className="mt-4 font-bold text-brand-navy"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)", lineHeight: 1.1 }}
            >
              How We Work
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              A simple, transparent five-step process — from your first idea to a launched, supported product.
            </p>
          </div>
        </div>

        {/* ── Zigzag steps ── */}
        <div className="container-x">
          <div
            ref={wrapRef}
            className="relative max-w-5xl mx-auto"
            style={{ isolation: "isolate" }}
          >
            {/* SVG wave (desktop) */}
            <div
              className="hw-svg-wave"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              <WavePath svgRef={svgRef} dotRefs={dotRefs} />
            </div>

            {/* Mobile dotted line */}
            <div className="hw-mobile-line" />

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3rem,8vw,6rem)" }}>
              {STEPS.map((step, i) => {
                const imgLeft = step.side === "left";

                return (
                  <div
                    key={step.title}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      alignItems: "center",
                      gap: "clamp(1.5rem,4vw,4rem)",
                    }}
                    className="hw-step"
                  >


                    {/* ── Image card ── */}
                    <div
                      ref={(el) => { imgRefs.current[i] = el; }}
                      className={`hw-img-wrap ${imgLeft ? "hw-from-left" : "hw-from-right"}`}
                      style={{ order: imgLeft ? 0 : 1, position: "relative" }}
                    >
                      {/* Connector line to the center dot */}
                      <div className="hw-connector hidden sm:block" style={{ color: step.colorMid }} />
                      
                      <div
                        className="hw-img-card"
                        style={{
                          borderRadius: "1.75rem",
                          overflow: "hidden",
                          border: `2px solid ${step.colorMid}`,
                          background: step.colorLight,
                          boxShadow: `0 8px 40px -12px ${step.color}44`,
                          aspectRatio: "1 / 1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1.5rem",
                          position: "relative",
                        }}
                      >
                        {/* Subtle corner glow */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `radial-gradient(ellipse at 80% 20%, ${step.color}18 0%, transparent 60%)`,
                            pointerEvents: "none",
                          }}
                        />

                        <img
                          src={step.img}
                          alt={step.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            position: "relative",
                            zIndex: 1,
                            filter: `drop-shadow(0 6px 18px ${step.color}33)`,
                          }}
                        />
                      </div>
                    </div>

                    {/* ── Text block ── */}
                    <div
                      ref={(el) => { textRefs.current[i] = el; }}
                      className={`hw-text-wrap ${imgLeft ? "hw-from-right" : "hw-from-left"}`}
                      style={{
                        order: imgLeft ? 1 : 0,
                        textAlign: imgLeft ? "left" : "right",
                        paddingLeft: imgLeft ? "clamp(0px,3vw,2rem)" : 0,
                        paddingRight: imgLeft ? 0 : "clamp(0px,3vw,2rem)",
                      }}
                    >
                      <span
                        className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 w-max uppercase tracking-wider"
                        style={{ background: step.colorLight, color: step.color, marginLeft: imgLeft ? 0 : "auto" }}
                      >
                        Step 0{i + 1}
                      </span>
                      <h3
                        style={{
                          fontSize: "clamp(1.5rem,3vw,2rem)",
                          fontWeight: 800,
                          color: "#0B1B3F",
                          fontFamily: "'Sora', sans-serif",
                          lineHeight: 1.15,
                          marginBottom: 0,
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* Animated accent underline */}
                      <span
                        className="hw-underline"
                        style={{
                          background: `linear-gradient(90deg, ${step.color}, ${step.colorMid})`,
                          marginLeft: imgLeft ? 0 : "auto",
                        }}
                      />

                      <p
                        style={{
                          marginTop: "1rem",
                          fontSize: "clamp(1rem,1.8vw,1.125rem)",
                          color: "#64748B",
                          lineHeight: 1.7,
                          maxWidth: 340,
                          marginLeft: imgLeft ? 0 : "auto",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessSection;
