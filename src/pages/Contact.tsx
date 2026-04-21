import { FormEvent, useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
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
  "Social Media", "Mobile App", "Custom Software", "Other",
];
const BUDGETS = [
  "Under LKR 25,000", "LKR 25,000–60,000", "LKR 60,000–120,000", "LKR 120,000+", "Custom Quote Needed",
];

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

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

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  return (
    <SiteLayout>
      <PageHero
        label="Get In Touch"
        title="Let's build something great"
        subtitle="Tell us about your project — we'll get back within 24 hours."
        breadcrumb="Contact"
      />

      <section className="container-x py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 reveal">
            <div className="rounded-3xl bg-card border border-border p-8 lg:p-10 shadow-card">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center animate-fade-up">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-5 text-2xl text-brand-navy">Thanks, {form.name.split(" ")[0]}!</h3>
                  <p className="mt-2 text-muted-foreground">We'll be in touch within 24 hours.</p>
                  <Button variant="heroOutline" className="mt-6" onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" }); }}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <h2 className="text-2xl text-brand-navy">Send us a message</h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="mt-1.5" />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="mt-1.5" />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
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
                      {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
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
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto">
                    Send Message →
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 reveal space-y-5">
            <div className="rounded-3xl bg-blue-grad text-white p-8 shadow-glow">
              <h3 className="text-xl">Contact Info</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3"><Phone className="h-5 w-5 mt-0.5 text-brand-orange" /> <a href="tel:+94711214567" className="hover:underline">+94 71 121 4567</a></li>
                <li className="flex items-start gap-3"><Mail className="h-5 w-5 mt-0.5 text-brand-orange" /> <a href="mailto:hello@webshrimp.lk" className="hover:underline">hello@webshrimp.lk</a></li>
                <li className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-0.5 text-brand-orange" /> Colombo, Sri Lanka</li>
                <li className="flex items-start gap-3"><Clock className="h-5 w-5 mt-0.5 text-brand-orange" /> Mon–Sat, 9AM–6PM<br /><span className="text-white/65 text-xs">Emergency support 24/7</span></li>
              </ul>
              <div className="mt-6 flex gap-3">
                {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-card aspect-[5/3] bg-brand-blue-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--brand-blue)/0.2),transparent_50%),radial-gradient(circle_at_70%_60%,hsl(var(--brand-orange)/0.15),transparent_50%)]" />
              <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
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
                <p className="mt-3 font-semibold text-brand-navy">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="container-x pb-20">
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { Icon: MessageCircle, title: "WhatsApp", desc: "Chat with us on WhatsApp", color: "bg-emerald-500", href: "https://wa.me/94711214567" },
            { Icon: Mail, title: "Email", desc: "Send us an email", color: "bg-brand-blue", href: "mailto:hello@webshrimp.lk" },
            { Icon: Phone, title: "Call", desc: "Give us a call", color: "bg-brand-orange", href: "tel:+94711214567" },
          ].map(({ Icon, title, desc, color, href }) => (
            <a
              key={title}
              href={href}
              className="reveal group rounded-2xl bg-card border border-border p-6 shadow-card card-lift flex items-center gap-5"
            >
              <div className={`h-14 w-14 rounded-2xl ${color} text-white flex items-center justify-center shrink-0`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
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
