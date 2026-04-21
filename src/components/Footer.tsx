import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white/80 mt-24">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo withTagline inverted />
          <p className="mt-5 text-sm text-white/65 max-w-xs">
            A creative web & software agency from Colombo, Sri Lanka — building digital products that grow your business.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange transition-colors"
              >
                <Icon className="h-4 w-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-white text-base mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Services", "/services"],
              ["Portfolio", "/portfolio"],
              ["Pricing", "/pricing"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-brand-orange transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-white text-base mb-5">Our Services</h3>
          <ul className="space-y-3 text-sm">
            {[
              "E-Commerce Websites",
              "Business Websites",
              "Portfolio Websites",
              "Landing Pages",
              "Social Media Content",
              "Website Maintenance",
            ].map((s) => (
              <li key={s}>
                <Link to="/services" className="hover:text-brand-orange transition-colors">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-white text-base mb-5">Get In Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> +94 71 121 4567</li>
            <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> hello@webshrimp.lk</li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> Colombo, Sri Lanka</li>
            <li className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> Available 24/7</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Web Shrimp. All Rights Reserved.</p>
          <p>Made with <span className="text-brand-orange">❤</span> in Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
