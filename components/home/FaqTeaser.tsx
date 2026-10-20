import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/lib/data/faqs";

export function FaqTeaser() {
  const topFaqs = faqs.slice(0, 3).map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    content: f.answer,
  }));

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Common Questions" 
          subtitle="Everything you need to know about our products and delivery."
        />
        
        <Accordion items={topFaqs} className="mt-10" />

        <div className="mt-10 text-center">
          <Link href="/faq">
            <Button variant="ghost">Read All FAQs &rarr;</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}