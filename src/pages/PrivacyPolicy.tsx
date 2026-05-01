import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { siteConfig } from "@/lib/site";

const PrivacyPolicy = () => {
  return (
    <SiteLayout>
      <Seo
        title="Privacy Policy | Loopingon"
        description="Read Loopingon's privacy policy and learn how we handle project enquiries, contact details, and website data."
        path="/privacy-policy"
      />
      <div className="container-x py-20 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <span className="section-label">Legal</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-brand-navy">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground mb-12">Last updated: April 22, 2026</p>

          <div className="prose prose-slate lg:prose-lg text-foreground/80 max-w-none">
            <p className="mb-6">
              At {siteConfig.brandName}, accessible from loopingon.com, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document contains types of information that is collected and recorded by {siteConfig.brandName} and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us when you fill out a contact form, request a quote, or communicate with us via email, WhatsApp, or phone. This includes:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and company details.</li>
              <li><strong>Project Data:</strong> Information regarding your business goals, assets, and hosting credentials (when provided securely for deployment).</li>
              <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This may include your device's Internet Protocol address, browser type, pages visited, and time spent on pages.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the collected data for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>To provide, operate, and maintain our website and agency services.</li>
              <li>To improve, personalize, and expand our platform and offerings.</li>
              <li>To understand and analyze how you use our website.</li>
              <li>To develop new products, services, features, and functionality.</li>
              <li>To communicate with you directly for customer service, updates, and project management.</li>
              <li>To process your transactions and manage your account.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. Log Files and Analytics</h2>
            <p className="mb-4">
              {siteConfig.brandName} follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Third-Party Privacy Policies</h2>
            <p className="mb-4">
              Our Privacy Policy does not apply to other advertisers or websites. We utilize third-party tools (such as Google Analytics or deployment platforms like DigitalOcean and AWS). Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We value your trust in providing us your Personal Information, thus we strive to use commercially acceptable means of protecting it. We employ strict access controls for client code, database credentials, and API keys. However, remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">6. Children's Information</h2>
            <p className="mb-4">
              Another part of our priority is adding protection for children while using the internet. {siteConfig.brandName} does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at <a href={`mailto:${siteConfig.email}`} className="text-brand-blue font-medium">{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default PrivacyPolicy;
