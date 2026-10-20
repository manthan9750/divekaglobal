import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Privacy Policy" subtitle="How we handle your data." />
        <div className="mt-8 rounded-3xl bg-white p-8 md:p-12 shadow-soft prose prose-charcoal max-w-none">
          {/* DUMMY — EDIT: Insert real legal policy here */}
          <p>Last updated: [Date]</p>
          <p>This privacy policy explains how Divekaa Global collects, uses, and protects your information.</p>
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us when placing an order, including name, shipping address, and phone number.</p>
          <h3>2. How We Use Your Information</h3>
          <p>Your information is used solely to fulfill your order and communicate with you regarding delivery.</p>
          <h3>3. Data Sharing</h3>
          <p>We do not sell your data. We share necessary shipping details with our courier partners.</p>
        </div>
      </div>
    </div>
  );
}