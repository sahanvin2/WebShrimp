import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const IMAGES = Array.from({ length: 9 }, (_, i) => `/social/img_${i + 1}.webp`);

const SocialBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container-x py-10 lg:py-14">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#164ED3] to-[#143694] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 text-white shadow-glow flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="reveal flex-1 w-full text-center lg:text-left z-10">
          <span className="text-[12px] font-extrabold tracking-[0.15em] uppercase text-white/80">
            WE ALSO CREATE STUNNING
          </span>
          <h2 className="mt-4 text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-white leading-[1.08] tracking-tight">
            Posters &amp; Videos
            <span className="block text-brand-yellow">for Social Media</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Boost your brand with creative designs and engaging videos that get results.
          </p>
          <Button asChild className="mt-7 bg-white text-brand-blue hover:bg-gray-50 shadow-sm rounded-full font-bold px-7 h-11 transition-transform hover:scale-105">
            <Link to="/portfolio" className="flex items-center gap-2">
              <div className="bg-brand-orange text-white rounded-full p-1 -ml-1">
                <Play className="h-3.5 w-3.5 fill-white" />
              </div>
              See Our Work
            </Link>
          </Button>
        </div>

        <div className="reveal relative flex items-center justify-center w-full max-w-[460px] lg:max-w-none lg:w-1/2 mt-8 lg:mt-0 h-[260px] sm:h-[300px] lg:h-[340px]">
          
          {/* Ambient Rotating Blurred Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] h-full z-0 pointer-events-none">
            {IMAGES.map((src, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={`blur-${src}`}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out origin-center ${
                    isActive ? "opacity-70 scale-125 rotate-3" : "opacity-0 scale-100 -rotate-3"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover rounded-full blur-[2rem]"
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>

          <div className="relative w-full h-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white/20 bg-brand-navy-deep group z-10">
            {IMAGES.map((src, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={src}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    isActive ? "opacity-100 scale-100 z-20" : "opacity-0 scale-110 z-10 pointer-events-none"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Social Media Work ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading={isActive ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50" />
                </div>
              );
            })}

            {/* Progress indicators */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5 z-30">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "w-5 bg-brand-yellow" : "w-1.5 bg-white/50 hover:bg-white/90"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialBanner;
