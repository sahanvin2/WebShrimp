import discoverImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Discover.png";
import planImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Plan.png";
import designImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Design & Develop.png";
import launchImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Launch.png";
import supportImg from "../../../assets/upscayl_png_upscayl-standard-4x_4x/Support.png";

const STEPS = [
  { img: discoverImg, title: "Discover", desc: "We understand your business and goals." },
  { img: planImg, title: "Plan", desc: "We plan the perfect solution for you." },
  { img: designImg, title: "Design & Develop", desc: "We design and build your website." },
  { img: launchImg, title: "Launch", desc: "We test and launch your website." },
  { img: supportImg, title: "Support", desc: "We provide ongoing support & updates." },
];

const ProcessSection = () => {
  return (
    <section className="container-x py-20 lg:py-28 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto reveal">
        <span className="section-label mx-auto">Our Process</span>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl text-brand-navy">How We Work</h2>
        <p className="mt-5 text-muted-foreground">
          A simple, transparent five-step process — from your first idea to a launched, supported product.
        </p>
      </div>

      <div className="mt-20 max-w-5xl mx-auto relative">
        {/* Central connecting line */}
        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-blue-soft -translate-x-1/2 rounded-full" />

        <div className="space-y-16 lg:space-y-24">
          {STEPS.map((s, i) => {
            const isEven = i % 2 !== 0;
            return (
              <div key={s.title} className="relative flex flex-col md:flex-row items-center gap-8 lg:gap-16 group reveal">
                {/* Number Badge */}
                <div className="absolute left-[28px] md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-white border-[3px] border-brand-blue text-brand-blue text-lg font-bold flex items-center justify-center shadow-lg z-10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white">
                  {i + 1}
                </div>

                {/* Content Container */}
                <div className={`w-full md:w-1/2 pl-[80px] md:pl-0 ${isEven ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}`}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-3">{s.title}</h3>
                  <p className="text-lg text-muted-foreground">{s.desc}</p>
                </div>

                {/* Image Container */}
                <div className={`w-full md:w-1/2 pl-[80px] md:pl-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-card bg-brand-blue-soft/20 aspect-[4/3] group-hover:shadow-glow transition-all duration-500 card-lift flex items-center justify-center p-2 sm:p-4">
                    <img src={s.img} alt={s.title} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700 drop-shadow-sm" loading="lazy" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
