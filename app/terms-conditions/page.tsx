import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Terms & Conditions" subtitle="The rules of engagement." />
        <div className="mt-8 rounded-3xl bg-white p-8 md:p-12 shadow-soft prose prose-charcoal max-w-none">
          {/* DUMMY — EDIT: Insert real legal policy here */}
          <p>Last updated: [Date]</p>
          <p>By using this website, you agree to these terms and conditions.</p>
          <h3>1. Products</h3>
          <p>All products are subject to availability. We reserve the right to limit quantities or discontinue products.</p>
          <h3>2. Pricing</h3>
          <p>Prices are subject to change without notice. Delivery charges are calculated at checkout.</p>
          <h3>3. Payment</h3>
          <p>We offer UPI payments and Pay on Confirmation Call. We are not liable for bank routing errors during UPI transfers.</p>
        </div>
      </div>
    </div>
  );
}