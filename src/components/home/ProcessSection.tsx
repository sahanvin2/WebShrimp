import { useEffect, useRef } from "react";
import { getPublicAssetUrl } from "@/lib/site";

const discoverImg = getPublicAssetUrl("/process/discover.webp");
const planImg = getPublicAssetUrl("/process/plan.webp");
const designImg = getPublicAssetUrl("/process/design-and-develop.webp");
const launchImg = getPublicAssetUrl("/process/launch.webp");
const supportImg = getPublicAssetUrl("/process/support.webp");

const STEPS = [
  {
    img: discoverImg,
    title: "Discover",
    desc: "We dive deep into your business goals and identify the perfect strategy to achieve them.",
    side: "left" as const,
  },
  {
    img: planImg,
    title: "Plan",
    desc: "We map out the architecture, user flows, and timeline to ensure a smooth project delivery.",
    side: "right" as const,
  },
  {
    img: designImg,
    title: "Design & Develop",
    desc: "We craft beautiful interfaces and write clean, scalable code to bring the vision to life.",
    side: "left" as const,
  },
  {
    img: launchImg,
    title: "Launch",
    desc: "After rigorous testing, we deploy your project to the world with optimal performance.",
    side: "right" as const,
  },
  {
    img: supportImg,
    title: "Support",
    desc: "We provide ongoing maintenance, updates, and analytics to keep you ahead.",
    side: "left" as const,
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reveal items on scroll down, and hide them when scrolling back up (bi-directional intersection)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Optional: Remove class to animate out when scrolling up!
            // The user explicitly requested "scroll up images goes hide"
            if (entry.boundingClientRect.top > 0) {
              entry.target.classList.remove("is-visible");
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Intersection observer base styles */
        .process-item {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .process-img-left {
          transform: translateX(-60px);
        }
        
        .process-img-right {
          transform: translateX(60px);
        }
        
        .process-text-left {
          transform: translateX(-40px);
        }
        
        .process-text-right {
          transform: translateX(40px);
        }
        
        /* Visible state */
        .process-item.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Subtle floating for images to feel more tech-y */
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .process-item.is-visible .process-image-inner {
          animation: subtle-float 6s ease-in-out infinite;
        }
        
        /* Timeline line */
        .process-timeline {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, hsl(var(--border)), transparent);
          transform: translateX(-50%);
          z-index: 0;
        }

        @media (max-width: 1024px) {
          .process-timeline {
            left: 2rem;
          }
          .process-img-left, .process-img-right, .process-text-left, .process-text-right {
            transform: translateY(40px);
          }
          .process-item.is-visible {
            transform: translateY(0);
          }
        }
      `}</style>

      <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-background">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Our Process
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              How We Work
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              A simple, transparent five-step process — from your first idea to a launched, supported product.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center Timeline Line (Desktop) / Left Line (Mobile) */}
            <div className="process-timeline hidden md:block" />

            <div className="flex flex-col gap-24 lg:gap-32">
              {STEPS.map((step, i) => {
                const isEven = i % 2 === 0;
                
                return (
                  <div 
                    key={step.title}
                    className="relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24"
                  >
                    {/* Mobile: Top to bottom. Desktop: Alternating sides */}
                    
                    {/* IMAGE BLOCK */}
                    <div 
                      ref={(el) => { elementsRef.current[i * 2] = el; }}
                      className={`process-item flex-1 w-full ${isEven ? 'md:order-1 process-img-left' : 'md:order-2 process-img-right'}`}
                    >
                      <div className="process-image-inner relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-muted/30 p-8 lg:p-12 shadow-2xl flex items-center justify-center">
                        {/* High-end tech backdrop effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_70%)]" />
                        <img 
                          src={step.img} 
                          alt={step.title} 
                          className="w-full h-full object-contain filter drop-shadow-xl relative z-10"
                        />
                      </div>
                    </div>

                    {/* TEXT BLOCK */}
                    <div 
                      ref={(el) => { elementsRef.current[i * 2 + 1] = el; }}
                      className={`process-item flex-1 w-full ${isEven ? 'md:order-2 process-text-right md:pl-12' : 'md:order-1 process-text-left md:pr-12 md:text-right'}`}
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-foreground/10 bg-muted text-foreground font-mono text-sm font-bold mb-6">
                        0{i + 1}
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-md md:ml-0 md:mr-auto" style={!isEven ? { marginLeft: 'auto', marginRight: 0 } : {}}>
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
