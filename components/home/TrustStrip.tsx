import { Shield, Leaf, Truck, ThumbsUp } from "lucide-react";

const trustFeatures = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No refined sugar or hidden artificial additives."
  },
  {
    icon: Shield,
    title: "Chemical-Free",
    description: "Clarified traditionally without harsh chemicals."
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Carefully packed and delivered to your doorstep."
  },
  {
    icon: ThumbsUp,
    title: "Premium Quality",
    description: "Export-grade jaggery tailored for the best taste."
  }
];

export function TrustStrip() {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-playfair text-lg font-bold text-navy">{feature.title}</h3>
              <p className="text-sm text-charcoal/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}