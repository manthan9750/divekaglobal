import { products } from "@/lib/data/products";
import { Check, Minus } from "lucide-react";

export function ComparisonTable() {
  // Exclude the bundle for direct flavor comparison
  const flavors = products.filter(p => p.id !== "prod_family_box");

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm no-scrollbar">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="bg-cream border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-playfair text-lg font-bold text-navy">Features</th>
            {flavors.map(f => (
              <th key={f.id} className="px-6 py-4 font-medium text-navy text-center">{f.flavor}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-medium text-charcoal">100% Natural Jaggery Base</td>
            {flavors.map(f => (
              <td key={f.id} className="px-6 py-4 text-center"><Check className="inline h-5 w-5 text-leaf" /></td>
            ))}
          </tr>
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-medium text-charcoal">Chemical-Free Clarification</td>
            {flavors.map(f => (
              <td key={f.id} className="px-6 py-4 text-center"><Check className="inline h-5 w-5 text-leaf" /></td>
            ))}
          </tr>
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-medium text-charcoal">Refined Sugar Free</td>
            {flavors.map(f => (
              <td key={f.id} className="px-6 py-4 text-center"><Check className="inline h-5 w-5 text-leaf" /></td>
            ))}
          </tr>
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-medium text-charcoal">Real Spices / Nuts Added</td>
            {flavors.map(f => {
              const hasAdditions = f.flavor !== "Butterscotch"; // Butterscotch uses natural flavor per dummy data
              return (
                <td key={f.id} className="px-6 py-4 text-center">
                  {hasAdditions ? <Check className="inline h-5 w-5 text-gold" /> : <Minus className="inline h-5 w-5 text-gray-300" />}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}