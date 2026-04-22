import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const phoneDisplay = "+94 70 303 1636";
  const phoneHref = "tel:+94703031636";
  const email = "sahannawarathne2004@gmail.com";

  return (
    <footer className="bg-brand-navy text-white/80 mt-24">
      <div className="container-x py-16 grid gap-12 grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Logo withTagline inverted />
          <p className="mt-5 text-sm text-white/65 max-w-xs">
            A creative web & software agency from Colombo, Sri Lanka — building digital products that grow your business.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com", base: "bg-[#1877F2]", hover: "hover:bg-[#2d88ff]" },
              { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com", base: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]", hover: "hover:brightness-110" },
              { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com", base: "bg-[#0A66C2]", hover: "hover:bg-[#1d74cb]" },
              { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com", base: "bg-[#FF0000]", hover: "hover:bg-[#ff3333]" },
            ].map(({ Icon, label, href, base, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`h-10 w-10 inline-flex items-center justify-center rounded-full text-white transition-colors ${base} ${hover}`}
              >
                <Icon className="h-4 w-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-1">
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

        <div className="col-span-1">
          <h3 className="font-display text-white text-base mb-5">Our Services</h3>
          <ul className="space-y-3 text-sm">
            {[
              ["E-Commerce Websites", "/services/e-commerce-websites"],
              ["Business Websites", "/services/business-websites"],
              ["Portfolio Websites", "/services/portfolio-websites"],
              ["Landing Pages", "/services/landing-pages"],
              ["Social Media Content", "/services/social-media-content"],
              ["Website Maintenance", "/services/website-maintenance"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-brand-orange transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="font-display text-white text-base mb-5">Get In Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> <a href={phoneHref} className="hover:text-brand-yellow transition-colors">{phoneDisplay}</a></li>
            <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> <a href={`mailto:${email}`} className="hover:text-brand-yellow transition-colors">{email}</a></li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> Colombo, Sri Lanka</li>
            <li className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> Available 24/7</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Web Shrimp. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <p>Made with <span className="text-brand-orange">❤</span> in Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
