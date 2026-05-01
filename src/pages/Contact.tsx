import { FormEvent, useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiBaseUrl } from "@/lib/api";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const SERVICES = [
  "E-Commerce Website", "Business Website", "Portfolio", "Landing Page",
  "Web App", "Mobile App", "Custom Software", "Other",
];
const BUDGETS = [
  "LKR 45,000 (Essential)", "LKR 120,000 (Professional)", "LKR 250,000 (Premium)", "Custom Quote Needed",
];

const CONTACT = {
  phoneDisplay: "+94 70 303 1636",
  phoneHref: "tel:+94703031636",
  whatsappHref: "https://wa.me/94703031636",
  email: "sahannawarathne2004@gmail.com",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Rambukkana%2C%20Sri%20Lanka",
  locationLabel: "Rambukkana, Sri Lanka",
};

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.service) e.service = "Choose a service.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Please share a few details (min. 10 chars).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${getApiBaseUrl()}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit contact form (${response.status})`);
      }

      setSent(true);
    } catch (error) {
      console.error("Contact form error:", error);
      const message = [
        "Hello! I want to discuss a project.",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        `Service: ${form.service}`,
        `Budget: ${form.budget || "Not selected"}`,
        `Message: ${form.message}`,
      ].join("\n");

      window.open(`${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <Seo
        title="Contact Loopingon"
        description="Talk to Loopingon about your next website, web app, landing page, or custom software project."
        path="/contact"
      />
      <PageHero
        label="Get In Touch"
        title="Let's build something great"
        subtitle="Tell us about your project and we'll get back within 24 hours."
        breadcrumb="Contact"
      />

      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="reveal lg:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-card lg:p-10">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 animate-fade-up">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-5 text-2xl text-brand-navy">Thanks, {form.name.split(" ")[0]}!</h3>
                  <p className="mt-2 text-muted-foreground">We'll be in touch within 24 hours.</p>
                  <Button
                    variant="heroOutline"
                    className="mt-6"
                    onClick={() => {
                      setSent(false);
                      setIsSubmitting(false);
                      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <h2 className="text-2xl text-brand-navy">Send us a message</h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="mt-1.5" />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="mt-1.5" />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+94 ..." className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Service *</Label>
                      <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                        <SelectTrigger className="mt-1.5"><SelectValue placeholder="Choose a service" /></SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                    </div>
                  </div>

                  <div>
                    <Label>Budget</Label>
                    <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a budget range" /></SelectTrigger>
                      <SelectContent>
                        {BUDGETS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Project description *</Label>
                    <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your goals, timeline and any inspiration..." className="mt-1.5" />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="reveal space-y-5 lg:col-span-2">
            <div className="rounded-3xl bg-blue-grad p-8 text-white shadow-glow">
              <h3 className="text-xl">Contact Info</h3>
              <ul className="mt-6 space-y-5">
                <li className="group flex items-center gap-4">
                  <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 p-2.5 shadow-sm backdrop-blur-md transition-colors group-hover:bg-white/20">
                    <Phone className="h-5 w-5 text-brand-orange" />
                  </div>
                  <a href={CONTACT.phoneHref} className="text-[15px] font-medium transition-colors hover:text-brand-yellow">{CONTACT.phoneDisplay}</a>
                </li>
                <li className="group flex items-center gap-4">
                  <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 p-2.5 shadow-sm backdrop-blur-md transition-colors group-hover:bg-white/20">
                    <Mail className="h-5 w-5 text-brand-orange" />
                  </div>
                  <a href={`mailto:${CONTACT.email}`} className="text-[15px] font-medium transition-colors hover:text-brand-yellow">{CONTACT.email}</a>
                </li>
                <li className="group flex items-center gap-4">
                  <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 p-2.5 shadow-sm backdrop-blur-md transition-colors group-hover:bg-white/20">
                    <MapPin className="h-5 w-5 text-brand-orange" />
                  </div>
                  <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium transition-colors hover:text-brand-yellow">
                    {CONTACT.locationLabel}
                  </a>
                </li>
                <li className="group flex items-center gap-4">
                  <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 p-2.5 shadow-sm backdrop-blur-md transition-colors group-hover:bg-white/20">
                    <Clock className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div>
                    <span className="text-[15px] font-medium">Support: Mon-Sat, 9AM-6PM</span><br />
                    <span className="text-xs text-white/70">Emergency support available when required</span>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com", base: "bg-[#1877F2]", hover: "hover:bg-[#2d88ff]" },
                  { Icon: Instagram, href: "https://www.instagram.com", base: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]", hover: "hover:brightness-110" },
                  { Icon: Linkedin, href: "https://www.linkedin.com", base: "bg-[#0A66C2]", hover: "hover:bg-[#1d74cb]" },
                  { Icon: Youtube, href: "https://www.youtube.com", base: "bg-[#FF0000]", hover: "hover:bg-[#ff3333]" },
                ].map(({ Icon, href, base, hover }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors ${base} ${hover}`}>
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-border bg-brand-blue-soft shadow-card">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--brand-blue)/0.2),transparent_50%),radial-gradient(circle_at_70%_60%,hsl(var(--brand-orange)/0.15),transparent_50%)]" />
              <svg className="absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--brand-blue))" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <MapPin className="h-10 w-10 text-brand-orange drop-shadow-lg" />
                  <span className="absolute inset-0 rounded-full bg-brand-orange/30 animate-ping" />
                </div>
                <p className="mt-3 font-semibold text-brand-navy">{CONTACT.locationLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="flex flex-row justify-center gap-4 sm:grid sm:gap-5 sm:grid-cols-3">
          {[
            { Icon: MessageCircle, title: "WhatsApp", desc: "Start a chat instantly", color: "bg-brand-navy", href: CONTACT.whatsappHref },
            { Icon: Mail, title: "Email", desc: CONTACT.email, color: "bg-brand-navy", href: `mailto:${CONTACT.email}` },
            { Icon: Phone, title: "Call", desc: CONTACT.phoneDisplay, color: "bg-brand-navy", href: CONTACT.phoneHref },
          ].map(({ Icon, title, desc, color, href }) => (
            <a
              key={title}
              href={href}
              target={title === "WhatsApp" ? "_blank" : undefined}
              rel={title === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="reveal flex items-center justify-center sm:justify-start sm:gap-5 rounded-2xl sm:border border-border bg-transparent sm:bg-card p-2 sm:p-6 sm:shadow-card transition-all sm:hover:shadow-glow group"
            >
              <div className={`h-14 w-14 rounded-2xl ${color} flex shrink-0 items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110`}>
                {title === "WhatsApp" ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </div>
              <div className="hidden sm:block">
                <h3 className="text-lg text-brand-navy">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
