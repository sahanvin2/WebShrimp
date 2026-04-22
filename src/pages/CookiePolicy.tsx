import SiteLayout from "@/components/SiteLayout";

const CookiePolicy = () => {
  return (
    <SiteLayout>
      <div className="container-x py-20 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <span className="section-label">Legal</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-brand-navy">Cookie Policy</h1>
          <p className="mt-4 text-muted-foreground mb-12">Last updated: April 22, 2026</p>

          <div className="prose prose-slate lg:prose-lg text-foreground/80 max-w-none">
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">1. What Are Cookies</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies to understand how you interact with our website, to remember your preferences (such as dismissing the cookie banner), and to improve your overall experience. We also use analytics cookies to measure site traffic and performance.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the basic operation of our website.</li>
              <li><strong>Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
              <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website and remember your preferences.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Managing Cookies</h2>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default CookiePolicy;
