import SiteLayout from "@/components/SiteLayout";

const TermsOfService = () => {
  return (
    <SiteLayout>
      <div className="container-x py-20 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <span className="section-label">Legal</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-brand-navy">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground mb-12">Last updated: April 22, 2026</p>

          <div className="prose prose-slate lg:prose-lg text-foreground/80 max-w-none">
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the Web Shrimp Studio website and services, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. Services Rendered</h2>
            <p className="mb-4">
              Web Shrimp Studio provides web design, development, branding, and digital marketing services. Specific deliverables, timelines, and costs will be outlined in a separate Statement of Work (SOW) or contract tailored to your project.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. Payment Terms</h2>
            <p className="mb-4">
              Unless otherwise agreed, a deposit is required before work commences. The remaining balance is due upon project completion or at agreed-upon milestones. Late payments may result in a pause in services.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              Upon final payment, the client owns the copyright to the final approved designs and code specific to their project. Web Shrimp Studio retains the right to display the work in our portfolio and marketing materials.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">5. Revisions and Modifications</h2>
            <p className="mb-4">
              Our projects include a set number of revision rounds. Additional revisions outside the agreed scope will be billed at our standard hourly rate.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">6. Contact Information</h2>
            <p className="mb-4">
              If you have any questions regarding these Terms, please contact us at info@webshrimp.com.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default TermsOfService;
