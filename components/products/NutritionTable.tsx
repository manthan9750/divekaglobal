import { Product } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NutritionTable({ product }: { product: Product }) {
  return (
    <div className="rounded-3xl bg-navy p-8 text-white shadow-soft lg:p-12">
      <SectionHeading 
        title="Nutrition Facts" 
        className="[&>h2]:text-white"
      />
      
      <div className="mt-8 max-w-2xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm text-cream/90">
          <tbody className="divide-y divide-white/10">
            {product.nutrition.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-gold">{item.label}</td>
                <td className="px-6 py-4 text-right">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-center text-xs text-cream/50">
        * Indicative values. Refer to the product label.
      </p>
    </div>
  );
}