const STATS = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5.0", label: "Average Rating" },
  { value: "24/7", label: "Support" },
];

const StatsStrip = () => {
  return (
    <section className="bg-blue-grad text-white">
      <div className="container-x py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s) => (
          <div key={s.label} className="reveal">
            <div className="font-display text-3xl sm:text-4xl font-extrabold">{s.value}</div>
            <div className="mt-2 text-sm text-white/75 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
