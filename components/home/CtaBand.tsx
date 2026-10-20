import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="bg-gold py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy mb-6">
          Ready to Make the Switch?
        </h2>
        <p className="text-navy/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
          Ditch the refined sugar today. Treat your family to the pure, chemical-free sweetness of Divekaa Global jaggery cubes.
        </p>
        <Link href="/products">
          <Button variant="secondary" size="lg" className="px-10">
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  );
}