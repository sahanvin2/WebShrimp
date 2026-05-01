import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { siteConfig } from "@/lib/site";

const TermsOfService = () => {
  return (
    <SiteLayout>
      <Seo
        title="Terms of Service | Loopingon"
        description="Read Loopingon's terms of service for project scope, payments, ownership, revisions, and support."
        path="/terms-of-service"
      />
      <div className="container-x py-20 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <span className="section-label">Legal</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-brand-navy">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground mb-12">Last updated: April 22, 2026</p>

          <div className="prose prose-slate lg:prose-lg text-foreground/80 max-w-none">
            <p className="mb-6">
              Welcome to {siteConfig.brandName}. By accessing our website and utilizing our web design, software development, and digital marketing services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the {siteConfig.brandName} website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. Services Rendered & Project Scope</h2>
            <p className="mb-4">
              {siteConfig.brandName} provides web design, custom software development, API integration, and branding services. Specific deliverables, timelines, and costs will be strictly outlined in a separate Statement of Work (SOW), Proposal, or Contract tailored to your project. Any requests falling outside the agreed scope will be subject to additional fees and extended timelines.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. Hosting and Maintenance</h2>
            <p className="mb-4">
              Unless explicitly stated in your contract, <strong>{siteConfig.brandName} does not provide free web hosting or domain registration.</strong> Clients are responsible for all ongoing third-party costs associated with their digital products (e.g., AWS, DigitalOcean, Vercel, domain renewals). We do offer separate, premium maintenance and management plans for clients who prefer us to handle their infrastructure.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Payment Terms</h2>
            <p className="mb-4">
              Standard projects require a non-refundable upfront deposit (typically 30% to 50%) before any design or development work commences. The remaining balance is due upon project completion or at agreed-upon milestones. Final files, source code, and live deployments will not be handed over until the invoice is paid in full.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">5. Intellectual Property & Ownership</h2>
            <p className="mb-4">
              Upon final payment clearing, the client receives full ownership and copyright of the final approved designs, compiled code, and deliverables specific to their project. {siteConfig.brandName} retains the right to display the completed work in our portfolio, case studies, and marketing materials unless a strict Non-Disclosure Agreement (NDA) is signed prior to the project start.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">6. Revisions and Modifications</h2>
            <p className="mb-4">
              Our projects include a set number of revision rounds (usually 2-3 rounds during the design phase). Once development begins, design changes or additional revisions outside the agreed scope will be billed at our standard hourly rate.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">7. Warranties & Liability</h2>
            <p className="mb-4">
              {siteConfig.brandName} ensures that the websites and software we build function according to the agreed specifications upon delivery. However, we do not guarantee uninterrupted service, nor are we liable for third-party API changes, server downtimes out of our control, or malicious attacks.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">8. Contact Information</h2>
            <p className="mb-4">
              If you have any questions regarding these Terms, please contact us at <a href={`mailto:${siteConfig.email}`} className="text-brand-blue font-medium">{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default TermsOfService;
