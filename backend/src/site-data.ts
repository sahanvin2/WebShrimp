export interface PricingPlanSeed {
  name: string;
  price: string;
  description: string;
  timeline: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

export interface ServiceSeed {
  slug: string;
  title: string;
  summary: string;
  description: string;
  startingAt: string;
  timeline: string;
  support: string;
  includes: string[];
  bestFor: string[];
  optionalExtras: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface PortfolioWorkSeed {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  imageUrl: string;
  link: string;
  tag: string;
}

export interface FaqSeed {
  question: string;
  answer: string;
  category: string;
}

export const COMPANY_CONTEXT = {
  brandName: "Loopingon",
  description: "Premium web and software agency focused on websites, landing pages, e-commerce, and custom software.",
  location: "Rambukkana, Sri Lanka",
  phoneDisplay: "+94 70 303 1636",
  phoneHref: "tel:+94703031636",
  whatsappHref: "https://wa.me/94703031636",
  email: "sahannawarathne2004@gmail.com",
  supportHours: "Mon-Sat, 9AM-6PM",
  responsePromise: "We aim to respond within 24 hours.",
  team: [
    { name: "Sahan Nawarathne", role: "Founder & Software Engineer" },
    { name: "Vinura Nawarathne", role: "Co-founder & QA" },
  ],
  technologies: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Laravel",
    "React Native",
    "Docker",
  ],
  clients: ["Movia", "Curevia", "EzyCV", "Sail"],
  process: [
    "Discovery",
    "Plan",
    "Design & Build",
    "Launch",
    "Support",
  ],
};

export const DEFAULT_PRICING_PLANS: PricingPlanSeed[] = [
  {
    name: "Starter",
    price: "LKR 45,000",
    description: "Perfect for personal or small projects.",
    timeline: "1-2 weeks",
    features: ["6 Pages Website", "Responsive Design", "Basic SEO", "Contact Form"],
    isPopular: false,
    buttonText: "Start My Project",
  },
  {
    name: "Business",
    price: "LKR 120,000",
    description: "Best for businesses and companies.",
    timeline: "2-4 weeks",
    features: ["Up to 10 Pages", "Responsive Design", "SEO Optimized", "Contact Form", "Custom Domain Setup"],
    isPopular: true,
    buttonText: "Start My Project",
  },
  {
    name: "E-Commerce",
    price: "LKR 250,000",
    description: "Complete solution for online stores.",
    timeline: "4-8 weeks",
    features: ["Up to 500 Products", "Payment Gateway", "Order Management", "SEO Optimized", "Support & Training"],
    isPopular: false,
    buttonText: "Start My Project",
  },
  {
    name: "Custom",
    price: "Contact Us",
    description: "Need something unique? We can scope a custom solution around your goals.",
    timeline: "Custom timeline",
    features: ["Unlimited Pages", "Custom Features", "Advanced Functionality", "Priority Support"],
    isPopular: false,
    buttonText: "Talk to Us",
  },
];

export const DEFAULT_SERVICES: ServiceSeed[] = [
  {
    slug: "e-commerce-websites",
    title: "E-Commerce Websites",
    summary: "High-performance online stores designed to turn traffic into orders.",
    description: "We design and build e-commerce websites that are fast, easy to manage, and built for conversion.",
    startingAt: "From LKR 250,000",
    timeline: "4-8 weeks",
    support: "Training, launch support, and optional maintenance.",
    includes: [
      "Conversion-focused storefront design",
      "Product, inventory and category management",
      "Payment gateway and shipping setup",
      "Mobile-optimized checkout experience",
      "Analytics and tracking dashboards",
    ],
    bestFor: ["Retail brands", "Growing stores moving online", "Businesses needing simpler order management"],
    optionalExtras: ["Abandoned cart automations", "WhatsApp order support", "Marketplace integrations"],
    faqs: [
      {
        question: "Can you connect local or international payment gateways?",
        answer: "Yes. We plan the store around the payment option that best fits your business and market.",
      },
      {
        question: "Will my team be able to manage products after launch?",
        answer: "Yes. We provide a simple admin workflow and handover guidance.",
      },
    ],
  },
  {
    slug: "business-websites",
    title: "Business Websites",
    summary: "Professional websites that build trust and generate qualified leads.",
    description: "We create modern, clean, SEO-ready business websites that help visitors understand your value and contact you quickly.",
    startingAt: "From LKR 120,000",
    timeline: "2-4 weeks",
    support: "Launch assistance plus optional updates and maintenance.",
    includes: [
      "Up to 10 custom pages",
      "Inquiry forms and call-to-action blocks",
      "On-page SEO setup",
      "Fast-loading responsive design",
      "Google Maps and social integrations",
    ],
    bestFor: ["Service businesses", "Consultants and agencies", "Brands needing a stronger first impression"],
    optionalExtras: ["Copywriting support", "Advanced SEO", "Booking integrations"],
    faqs: [
      {
        question: "How many pages do most business websites need?",
        answer: "Most service businesses start with 5 to 10 well-planned pages.",
      },
      {
        question: "Can you include maps, WhatsApp, and lead forms?",
        answer: "Yes. We can integrate the main contact touchpoints your business needs.",
      },
    ],
  },
  {
    slug: "portfolio-websites",
    title: "Portfolio Websites",
    summary: "Beautiful showcase sites for creatives, freelancers, and studios.",
    description: "We craft portfolio websites that highlight your best work and make it easier for potential clients to trust your quality.",
    startingAt: "Custom quote",
    timeline: "2-3 weeks",
    support: "Launch support with optional content updates.",
    includes: [
      "Project showcase with categories",
      "Case-study style project pages",
      "Image optimization",
      "Personal brand profile sections",
      "Contact and booking CTAs",
    ],
    bestFor: ["Designers and developers", "Photographers and creatives", "Studios with strong visual work"],
    optionalExtras: ["Blog or resources section", "CMS setup", "Inquiry workflow"],
    faqs: [
      {
        question: "Can I add new projects later?",
        answer: "Yes. We structure the site so adding future work stays manageable.",
      },
      {
        question: "Is this only for individuals?",
        answer: "No. Portfolio-style websites also work very well for agencies and boutique firms.",
      },
    ],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    summary: "Campaign pages engineered for conversions.",
    description: "We design focused landing pages with clear messaging, fast load times, and a single conversion goal.",
    startingAt: "From LKR 45,000",
    timeline: "1-2 weeks",
    support: "Tracking setup and launch QA support.",
    includes: [
      "Campaign-focused page structure",
      "Lead capture forms",
      "Pixel and event tracking setup",
      "Speed optimization",
      "A/B-test ready sections",
    ],
    bestFor: ["Paid ad campaigns", "New offers and launches", "Fast lead generation"],
    optionalExtras: ["CRM integration", "Variant testing", "Thank-you page funnels"],
    faqs: [
      {
        question: "Can this connect to my ads and analytics stack?",
        answer: "Yes. We can connect common analytics, pixels, and lead-routing tools.",
      },
      {
        question: "How is a landing page different from a full website?",
        answer: "A landing page is focused on one action and removes distractions.",
      },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software Solutions",
    summary: "Tailored web applications and internal tools built around your workflow.",
    description: "We design and develop custom web applications, portals, and dashboards that solve specific operational problems.",
    startingAt: "Custom quote",
    timeline: "Scope-based roadmap",
    support: "Discovery, phased delivery, and ongoing support options.",
    includes: [
      "Custom web application development",
      "Internal dashboards and admin panels",
      "Third-party API integrations",
      "Database architecture",
      "Automated workflows",
    ],
    bestFor: ["Operations-heavy businesses", "Teams using too many spreadsheets", "Companies needing software around their process"],
    optionalExtras: ["Client portals", "Role-based permissions", "Custom reporting"],
    faqs: [
      {
        question: "How do you price custom software?",
        answer: "We start with discovery, define scope and phases, then quote based on complexity.",
      },
      {
        question: "Do you build in phases?",
        answer: "Yes. Phased delivery is often the safest and fastest way to launch value early.",
      },
    ],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    summary: "Proactive maintenance to keep your website secure, fast, and stable.",
    description: "We handle updates, monitoring, backups, and performance checks so your site stays healthy after launch.",
    startingAt: "From LKR 3,000/mo",
    timeline: "Monthly recurring support",
    support: "Monitored support with emergency response when needed.",
    includes: [
      "Routine updates and security patches",
      "Automated backups",
      "Uptime and error monitoring",
      "Performance tuning",
      "Small content updates",
    ],
    bestFor: ["Business sites that must stay reliable", "Stores and lead-gen sites", "Teams without in-house web support"],
    optionalExtras: ["Priority support", "Extra content hours", "Advanced reporting"],
    faqs: [
      {
        question: "Do I need maintenance if the website is already live?",
        answer: "Yes. Security, uptime, backups, and performance all need regular attention after launch.",
      },
      {
        question: "Can you maintain a site you did not build?",
        answer: "Usually yes. We first review the current setup and recommend the safest approach.",
      },
    ],
  },
];

export const DEFAULT_PORTFOLIO_WORKS: PortfolioWorkSeed[] = [
  {
    title: "Ceylon Spice Co.",
    category: "E-Commerce",
    summary: "Premium spice brand e-commerce with rich storytelling and seamless shopping.",
    stack: ["Shopify", "Tailwind", "JavaScript"],
    imageUrl: "/portfolio_thumbs/Ceylon Spice Co..webp",
    link: "/projects/ceylon-spice.html",
    tag: "Shopify Custom",
  },
  {
    title: "Lanka Legal",
    category: "Business",
    summary: "Professional law firm website built around trust and easy client onboarding.",
    stack: ["Next.js", "React", "Tailwind"],
    imageUrl: "/portfolio_thumbs/Lanka Legal.webp",
    link: "/projects/lanka-legal.html",
    tag: "Next.js",
  },
  {
    title: "Studio Bloom",
    category: "Portfolio",
    summary: "Minimalist creative agency portfolio with refined case study presentation.",
    stack: ["React", "CMS", "Framer"],
    imageUrl: "/portfolio_thumbs/Studio Bloom.webp",
    link: "/projects/studio-bloom.html",
    tag: "React + CMS",
  },
  {
    title: "BetterFit App",
    category: "Landing",
    summary: "High-conversion mobile app landing page for the health and fitness space.",
    stack: ["HTML", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/BetterFit App.webp",
    link: "/projects/betterfit-app.html",
    tag: "Conversion",
  },
  {
    title: "MAISON Premium Essentials",
    category: "E-Commerce",
    summary: "Luxury e-commerce concept with editorial storytelling and product discovery UX.",
    stack: ["HTML", "CSS", "JavaScript"],
    imageUrl: "/portfolio_thumbs/MAISON Premium Essentials.webp",
    link: "/projects/E-Commerce.html",
    tag: "Editorial Commerce",
  },
  {
    title: "Aiden Cole Creative Portfolio",
    category: "Portfolio",
    summary: "Immersive creative portfolio with advanced animation and storytelling.",
    stack: ["HTML", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/Aiden Cole Creative Portfolio.webp",
    link: "/projects/portfilio.html",
    tag: "Creative Portfolio",
  },
  {
    title: "Rise Together Charity Platform",
    category: "Business",
    summary: "Charity experience with campaign pages, impact sections, and donation flows.",
    stack: ["React", "Tailwind", "CDN"],
    imageUrl: "/portfolio_thumbs/Rise Together Charity Platform.webp",
    link: "/projects/Charity.html",
    tag: "Nonprofit",
  },
  {
    title: "NexusCorp Enterprise",
    category: "Business",
    summary: "Modern corporate landing page with polished layouts and enterprise positioning.",
    stack: ["React", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/NexusCorp Enterprise.webp",
    link: "/projects/Business.html",
    tag: "Corporate",
  },
  {
    title: "Local Directory Platform",
    category: "Directory",
    summary: "Directory listing platform with search, filters, and detail views.",
    stack: ["React", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/Local Directory Platform.webp",
    link: "/projects/Listning.html",
    tag: "Directory",
  },
  {
    title: "EdTech Learning Management",
    category: "Education",
    summary: "LMS interface with dashboard, course catalog, and student metrics.",
    stack: ["React", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/EdTech Learning Management.webp",
    link: "/projects/Lms.html",
    tag: "LMS",
  },
  {
    title: "Modern Editorial Blog",
    category: "Blog",
    summary: "Typography-focused blog template optimized for reading and discovery.",
    stack: ["React", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/Modern Editorial Blog.webp",
    link: "/projects/blog.html",
    tag: "Editorial",
  },
  {
    title: "Product Landing Page",
    category: "Landing",
    summary: "Lead generation page designed to capture interest and showcase product value.",
    stack: ["React", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/Product Landing Page.webp",
    link: "/projects/landing.html",
    tag: "Lead Gen",
  },
  {
    title: "Global News Portal",
    category: "News",
    summary: "Media-rich news layout with structured grids and breaking content sections.",
    stack: ["React", "Tailwind", "Lucide"],
    imageUrl: "/portfolio_thumbs/Global News Portal.webp",
    link: "/projects/news.html",
    tag: "Media",
  },
];

export const GENERAL_FAQS: FaqSeed[] = [
  {
    category: "pricing",
    question: "What is included in the price?",
    answer: "Design, development, basic SEO, deployment, and a handover walkthrough. We confirm the detailed scope before kick-off.",
  },
  {
    category: "pricing",
    question: "Do you offer revisions?",
    answer: "Yes. Every project includes design and development revision rounds, with extra changes billed separately if needed.",
  },
  {
    category: "process",
    question: "How long does it take to build a website?",
    answer: "Starter sites usually take 1-2 weeks, Business 2-4 weeks, and E-Commerce 4-8 weeks depending on scope.",
  },
  {
    category: "hosting",
    question: "Do you provide hosting?",
    answer: "Yes. We can deploy on modern cloud infrastructure and recommend the best hosting setup for the project.",
  },
  {
    category: "support",
    question: "Can I upgrade my plan later?",
    answer: "Yes. Many clients start with a smaller scope and expand as the business grows.",
  },
  {
    category: "portfolio",
    question: "Are the projects in your portfolio real businesses?",
    answer: "The portfolio showcases high-fidelity conceptual demos and samples that demonstrate our design and engineering capability.",
  },
];
