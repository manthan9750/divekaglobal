import { siteConfig } from "@/lib/config/site";
import { reviews } from "@/lib/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ReviewList() {
  if (!siteConfig.SHOW_REVIEWS) return null;

  return (
    <div className="py-12">
      <SectionHeading title="Customer Reviews" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {reviews.map(review => (
          <div key={review.id} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-playfair font-bold text-navy">{review.author}</p>
                <p className="text-xs text-charcoal/50">{new Date(review.date).toLocaleDateString()}</p>
              </div>
              <div className="flex text-gold text-sm">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed">&quot;{review.text}&quot;</p>
          </div>
        ))}
      </div>
    </div>
  );
}