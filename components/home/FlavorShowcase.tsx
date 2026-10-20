import { SectionHeading } from "@/components/ui/SectionHeading";

const flavors = [
  { name: "Ginger & Cardamom", color: "bg-[#D4A373]", text: "Warming & Aromatic" },
  { name: "Mixed Dryfruits", color: "bg-[#8B5A2B]", text: "Rich & Crunchy" },
  { name: "Coconut", color: "bg-[#F5F5DC]", text: "Tropical & Sweet", textColor: "text-navy" },
  { name: "Masala Pan", color: "bg-[#5F7F4A]", text: "Authentic & Fresh" },
  { name: "Butterscotch", color: "bg-[#E6C76B]", text: "Buttery & Fun", textColor: "text-navy" },
];

export function FlavorShowcase() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="A Flavor for Every Craving" 
          subtitle="We transformed traditional jaggery into 5 irresistible, health-conscious treats."
        />
        
        <div className="mt-10 flex flex-wrap justify-center gap-4 lg:gap-6">
          {flavors.map((f, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center justify-center rounded-2xl ${f.color} p-6 shadow-sm transition-transform hover:-translate-y-2 h-40 w-full sm:w-56`}
            >
              <h3 className={`font-playfair text-xl font-bold text-center ${f.textColor || 'text-white'}`}>
                {f.name}
              </h3>
              <p className={`mt-2 text-sm text-center ${f.textColor ? 'text-navy/80' : 'text-white/80'}`}>
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}