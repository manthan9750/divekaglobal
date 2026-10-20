import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our chemical-free jaggery, delivery, and more.",
};

export default function FaqPage() {
  const faqItems = faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    content: f.answer,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know about Divekaa Global." />
        <div className="mt-12">
          <Accordion items={faqItems} />
        </div>
      </div>
    </div>
  );
}