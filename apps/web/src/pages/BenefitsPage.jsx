import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import IngredientSpotlight from '../components/IngredientSpotlight.jsx';
import ComparisonTable from '../components/ComparisonTable.jsx';

import { Leaf } from 'lucide-react';

const BenefitsPage = () => {
  const ingredients = [
    {
      name: "Saffron (Kesar)",
      image: "https://images.unsplash.com/photo-1677299235887-294150f9124c",
      traditionalUses: "Used historically in festive cuisines and royalty for its rich aroma and coloring properties.",
      benefits: ["Provides natural antioxidants", "Promotes a sense of calm and well-being", "Delivers a luxurious sensory experience"]
    },
    {
      name: "Green Cardamom",
      image: "https://images.unsplash.com/photo-1622957744298-a874da73e802",
      traditionalUses: "The 'Queen of Spices', traditionally used as a mouth freshener and digestive aid post-meals.",
      benefits: ["Supports comfortable digestion", "Acts as a natural breath freshener", "Offers a soothing aromatic profile"]
    },
    {
      name: "Ginger",
      image: "https://images.unsplash.com/photo-1559716701-314fb2ab531e",
      traditionalUses: "A staple in Ayurveda and home kitchens for warming the body during winters.",
      benefits: ["Provides comforting warmth", "Assists in post-meal digestion", "Offers a naturally spicy flavor kick"]
    },
    {
      name: "Holy Basil (Tulsi)",
      image: "https://images.unsplash.com/photo-1532666661413-871a4227e256",
      traditionalUses: "Revered as a sacred plant in India, consumed daily as herbal tea for overall vitality.",
      benefits: ["Earthy and refreshing taste", "Supports a balanced daily routine", "Contains natural botanical compounds"]
    },
    {
      name: "Fennel Seeds (Saunf)",
      image: "https://images.unsplash.com/photo-1612357005122-d4845440510f",
      traditionalUses: "The traditional Indian restaurant staple for concluding meals and refreshing the palate.",
      benefits: ["Excellent natural breath freshener", "Supports the digestive process", "Provides a crisp, cooling sensation"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/40 py-20 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <Leaf className="w-12 h-12 text-primary mx-auto mb-6" />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Wellness Through <span className="text-premium">Nature</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Discover the functional advantages of our traditional ingredients. We believe in providing transparency so you can make informed choices for your daily routine.
            </motion.p>
          </div>
        </section>

        {/* Jaggery Benefits */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Power of Pure Jaggery</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Jaggery (Gud) is a traditional unrefined sweetener widely used in Asia and Africa. Unlike conventional sugar which undergoes extensive chemical processing, jaggery is boiled down naturally.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground block">Natural Mineral Content</strong>
                      <span className="text-muted-foreground text-sm">Because molasses is retained, jaggery contains trace amounts of iron, calcium, and magnesium.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground block">Sustained Energy</strong>
                      <span className="text-muted-foreground text-sm">Its complex carbohydrate structure allows for slower absorption, providing a more stable energy release.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground block">Digestive Tradition</strong>
                      <span className="text-muted-foreground text-sm">Often consumed after meals in traditional Indian households to comfortably conclude a heavy dinner.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1672702959512-af149104c388" 
                  alt="Pure Jaggery" 
                  className="rounded-2xl shadow-gold-md w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sugar vs Jaggery Comparison */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why We Swapped the Sugar</h2>
              <p className="text-muted-foreground">Understanding the functional difference between refined white sugar and traditional jaggery.</p>
            </div>
            
            <ComparisonTable />
          </div>
        </section>

        {/* Ingredient Spotlight */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Functional Spices & Botanicals</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Every spice in Gud Bite is carefully selected not just for its rich flavor profile, but for its role in traditional wellness practices.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ingredients.map((ing, idx) => (
                <div key={idx} className={idx >= 3 ? "lg:col-span-1.5" : ""}>
                  <IngredientSpotlight {...ing} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wellness Lifestyle */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Embracing the Lifestyle</h2>
            <p className="text-lg leading-relaxed opacity-90 mb-8">
              Incorporating Gud Bite into your daily routine is about making small, intentional choices. Whether you are replacing a midday sugary snack, aiding digestion after a rich dinner, or seeking a comforting flavor on a stressful day—our bites are designed to complement a balanced lifestyle without guilt.
            </p>
            <p className="text-sm opacity-70 italic">
              Note: The information provided is for educational purposes based on traditional practices and is not intended to substitute for professional medical advice or treatment.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default BenefitsPage;
