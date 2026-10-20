import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Shipping & Returns",
};

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Shipping & Returns" subtitle="Delivery timelines and perishable food policy." />
        <div className="mt-8 rounded-3xl bg-white p-8 md:p-12 shadow-soft prose prose-charcoal max-w-none">
          {/* DUMMY — EDIT: Insert real policy here */}
          <h3>Shipping Policy</h3>
          <ul>
            <li><strong>Mumbai Metropolitan Region:</strong> 1-3 business days.</li>
            <li><strong>Rest of Maharashtra:</strong> 2-4 business days.</li>
            <li><strong>Rest of India:</strong> 4-7 business days.</li>
          </ul>
          <p>Orders are dispatched within 24-48 hours of confirmation.</p>
          
          <h3>Returns Policy (Perishable Food)</h3>
          <p>Because our products are consumable food items, we <strong>do not accept returns or exchanges</strong> once the item has been shipped.</p>
          <p>If your jar arrives damaged or unsealed, please contact us with a photograph within 24 hours of delivery, and we will issue a replacement or refund.</p>
        </div>
      </div>
    </div>
  );
}