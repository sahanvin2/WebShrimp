import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCKS = [
  { title: "BURGER", subtitle: "Mega Combo", price: "Rs 1,290", from: "from-amber-400", to: "to-orange-600" },
  { title: "DIGITAL", subtitle: "Marketing Pack", price: "Boost 3x", from: "from-brand-blue", to: "to-indigo-700" },
  { title: "SUPER SALE", subtitle: "Up to 70% off", price: "This Week", from: "from-pink-500", to: "to-rose-600" },
];

const SocialBanner = () => {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-3xl bg-blue-grad p-8 sm:p-12 lg:p-16 text-white">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-brand-orange/30 blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <h2 className="text-3xl sm:text-4xl text-white max-w-lg leading-tight">
              We also create stunning <span className="text-brand-yellow">Posters</span> & <span className="text-brand-orange">Videos</span> for Social Media
            </h2>
            <p className="mt-4 text-white/80 max-w-md">
              Boost your brand with creative designs and engaging videos that get real results.
            </p>
            <Button asChild variant="cta" size="lg" className="mt-7 bg-white text-brand-navy hover:bg-white/90 shadow-none">
              <Link to="/portfolio">
                See Our Work <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="reveal grid grid-cols-3 gap-4">
            {MOCKS.map((m, i) => (
              <div
                key={m.title}
                className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${m.from} ${m.to} p-4 flex flex-col justify-between shadow-2xl ${
                  i === 1 ? "translate-y-4" : ""
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">{m.subtitle}</div>
                <div>
                  <div className="text-white text-lg font-display font-bold leading-tight">{m.title}</div>
                  <div className="mt-1 inline-block text-[10px] bg-white/20 backdrop-blur rounded-full px-2 py-0.5 text-white">{m.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialBanner;
