import SiteLayout from "@/components/SiteLayout";

const PrivacyPolicy = () => {
  return (
    <SiteLayout>
      <div className="container-x py-20 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <span className="section-label">Legal</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-brand-navy">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground mb-12">Last updated: April 22, 2026</p>

          <div className="prose prose-slate lg:prose-lg text-foreground/80 max-w-none">
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us when you fill out a contact form, request a quote, or communicate with us via email or phone. This may include your name, email address, phone number, and details about your project.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to respond to your inquiries, provide our services, send administrative information, and improve our website and offerings. We do not sell or rent your personal information to third parties.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Data Security</h2>
            <p className="mb-4">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">5. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at info@webshrimp.com.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default PrivacyPolicy;
