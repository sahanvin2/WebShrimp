import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const IMAGES = Array.from({ length: 9 }, (_, i) => `/social/img_${i + 1}.webp`);
const TOTAL = IMAGES.length;

/* ─── Easing helpers ─────────────────────────────────────────────────────── */
// Exponential ease-out: starts fast, decelerates to a stop
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ─── useReel hook ───────────────────────────────────────────────────────── */
// Drives a "slot-machine" spin: fast → slow → land on target
function useReel(targetIndex: number, onLanded: () => void) {
  // fractional index (0–TOTAL), drives which image is "centered"
  const [pos, setPos] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const from = fromRef.current;
    // Always spin forward; add extra full laps for the "fast" feel
    const extraLaps = 2;
    const to = from + extraLaps * TOTAL + ((targetIndex - (from % TOTAL) + TOTAL) % TOTAL);
    const duration = 1600; // ms

    startRef.current = null;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(t);
      const current = from + (to - from) * eased;
      setPos(current);
      fromRef.current = current;

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
        onLanded();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex]);

  return pos;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const SocialBanner = () => {
  const [target, setTarget] = useState(0);
  const [landed, setLanded] = useState(true);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pos = useReel(target, () => setLanded(true));

  /* Auto-advance every 2.8 s */
  const advance = () => {
    setLanded(false);
    setTarget((prev) => (prev + 1) % TOTAL);
  };

  useEffect(() => {
    autoRef.current = setInterval(advance, 2800);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Derive visible strip ──
     We show 3 cards: prev, active, next — each offset by their distance
     from the fractional position `pos`.
  */
  const centeredIdx = pos % TOTAL;   // fractional "which image is centered"

  // Build a window of 5 slots around the center for smooth wrap-around
  const slots = [-2, -1, 0, 1, 2].map((offset) => {
    const rawIdx = Math.round(centeredIdx) + offset;
    const imgIdx = ((rawIdx % TOTAL) + TOTAL) % TOTAL;
    // distance from exact center (fractional)
    const dist = rawIdx - centeredIdx;
    return { imgIdx, dist };
  });

  return (
    <>
      <style>{`
        @keyframes sb-shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(220%)  skewX(-12deg); }
        }
        @keyframes sb-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0;   }
        }
        @keyframes sb-float {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-8px); }
        }
        .sb-card {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 1.25rem;
          overflow: hidden;
          will-change: transform, opacity;
          transition: none;   /* JS drives everything */
          transform-origin: center center;
          backface-visibility: hidden;
        }
        .sb-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>

      <section className="container-x py-10 lg:py-14">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-10 text-white flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
          style={{
            background: "linear-gradient(135deg, #1246CC 0%, #0D3494 40%, #0A2470 100%)",
            boxShadow: "0 24px 80px -16px rgba(18,70,204,0.55)",
          }}
        >
          {/* ── Background decorations ── */}
          <div className="absolute -top-32 -left-16 h-80 w-80 rounded-full bg-white/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
          {/* Diagonal grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                white 0px, white 1px,
                transparent 1px, transparent 40px
              )`,
            }}
          />

          {/* ── Left: text ── */}
          <div className="reveal flex-1 w-full text-center lg:text-left z-10">
            <span
              className="inline-block text-[11px] font-extrabold tracking-[0.22em] uppercase"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              WE ALSO CREATE STUNNING
            </span>

            <h2
              className="mt-4 font-bold leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}
            >
              Posters &amp; Videos
              <span
                className="block"
                style={{ color: "#FFB800" }}
              >
                for Social Media
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.82)" }}>
              Boost your brand with creative designs and engaging videos that get results.
            </p>

            <Button
              asChild
              className="mt-7 bg-white text-brand-blue hover:bg-gray-50 shadow-sm rounded-full font-bold px-7 h-11 transition-transform hover:scale-105"
            >
              <Link to="/portfolio" className="flex items-center gap-2">
                <div className="bg-brand-orange text-white rounded-full p-1 -ml-1">
                  <Play className="h-3.5 w-3.5 fill-white" />
                </div>
                See Our Work
              </Link>
            </Button>
          </div>

          {/* ── Right: reel ── */}
          <div className="reveal relative flex items-center justify-center w-full lg:w-auto shrink-0 z-10">
            {/* Outer frame — the "device" */}
            <div
              style={{
                position: "relative",
                width: "clamp(280px, 40vw, 420px)",
                height: "clamp(280px, 40vw, 420px)",
                overflow: "visible", // let cards peek out
              }}
            >



              {/* ── Slot-machine cards ── */}
              <ReelStrip slots={slots} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ─── ReelStrip ──────────────────────────────────────────────────────────── */
// Renders the 5 slot cards with JS-computed transforms
const ReelStrip = ({
  slots,
}: {
  slots: { imgIdx: number; dist: number }[];
}) => {
  // Card dimensions as % of container
  const W = 80;  // % of container width
  const H = 80;  // % of container height
  const GAP = 12; // % spacing between cards

  return (
    <>
      {slots.map(({ imgIdx, dist }, si) => {
        // dist: -2 to +2 (fractional)
        const absD = Math.abs(dist);
        const scale = Math.max(0.55, 1 - absD * 0.18);
        const opacity = Math.max(0, 1 - absD * 0.45);
        // Horizontal offset: cards left/right of center
        const translateX = dist * (W + GAP);
        // Slight vertical parallax
        const translateY = dist * 4;
        // z-index: center card on top
        const zIndex = Math.round(10 - absD * 3);

        return (
          <div
            key={`slot-${si}-${imgIdx}`}
            className="sb-card"
            style={{
              width: `${W}%`,
              height: `${H}%`,
              marginLeft: `-${W / 2}%`,
              marginTop: `-${H / 2}%`,
              transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
              opacity,
              zIndex,
              boxShadow: absD < 0.5
                ? "0 24px 60px rgba(0,0,0,0.5)"
                : "0 12px 30px rgba(0,0,0,0.3)",
              border: absD < 0.5
                ? "2px solid rgba(255,255,255,0.25)"
                : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={IMAGES[imgIdx]}
              alt={`Social media work ${imgIdx + 1}`}
              loading="eager"
            />
          </div>
        );
      })}
    </>
  );
};

export default SocialBanner;
