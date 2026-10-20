import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config/site";
import { reviews } from "@/lib/data/reviews";
import { Quote } from "lucide-react";

export function Testimonials() {
  if (!siteConfig.SHOW_REVIEWS) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="bg-cream py-20 border-t border-gold/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="What Our Customers Say" 
          subtitle="Real feedback from families who made the switch to Divekaa Global."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-soft relative">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-gold/20" />
              <div className="flex text-gold mb-4">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-charcoal/80 mb-6 italic">&quot;{review.text}&quot;</p>
              <div className="font-medium text-navy font-playfair">- {review.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}