import React from 'react';
import { Leaf } from 'lucide-react';

const IngredientSpotlight = ({ image, name, traditionalUses, benefits }) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-gold-sm border border-border group transition-smooth hover:shadow-gold-md hover:-translate-y-1 h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" /> {name}
        </h3>
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Traditional Uses</h4>
          <p className="text-foreground/80 text-sm leading-relaxed">{traditionalUses}</p>
        </div>
        <div className="mt-auto">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Wellness Profile</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientSpotlight;
