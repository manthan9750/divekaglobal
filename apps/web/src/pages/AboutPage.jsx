import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Recycle, Lightbulb, ShieldCheck } from 'lucide-react';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const AboutPage = () => {
  const values = [
    { icon: Award, title: "Quality", desc: "Uncompromising standards in every ingredient sourced." },
    { icon: Leaf, title: "Authenticity", desc: "Honoring traditional Indian recipes without dilution." },
    { icon: Recycle, title: "Sustainability", desc: "Ethical sourcing that supports local farming communities." },
    { icon: Lightbulb, title: "Innovation", desc: "Reimagining heritage ingredients for modern lifestyles." },
    { icon: ShieldCheck, title: "Trust", desc: "Complete transparency in our ingredients and processes." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              The <span className="text-premium">Divekaa Global</span> Story
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Modernizing traditional Indian ingredients through premium branding and uncompromising quality.
            </motion.p>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1625753733975-b20b4973200d" 
                  alt="Traditional Indian Spices" 
                  className="rounded-2xl shadow-gold-md w-full object-cover aspect-square"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Rooted in Heritage</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Growing up in India, jaggery and spices were the cornerstone of every family gathering and daily wellness ritual. We saw the incredible benefits of these ingredients—from the digestive aid of fennel to the sustained energy of pure jaggery.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  However, modern life introduced processed sugars and artificial snacks that lacked soul and functionality. Gud Bite was born from a desire to reclaim those traditional remedies and present them in a convenient, premium format suited for the contemporary world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
              <div className="bg-background/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider text-primary-foreground/90">Our Mission</h3>
                <p className="text-lg leading-relaxed font-medium">
                  To modernize traditional Indian ingredients through premium branding, uncompromising quality, and functional everyday wellness formats.
                </p>
              </div>
              <div className="bg-background/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider text-primary-foreground/90">Our Vision</h3>
                <p className="text-lg leading-relaxed font-medium">
                  Achieving a global reach while firmly maintaining our Indian roots, making authentic wellness accessible and enjoyable for all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Bento Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">Our Core Values</h2>
              <p className="text-muted-foreground mt-4">The principles that guide every decision at Divekaa Global.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className={`bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-gold-md transition-smooth ${idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''} ${idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                    <p className="text-muted-foreground">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Manufacturing Excellence */}
        <section className="py-24 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Manufacturing Excellence</h2>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Direct Sourcing</h4>
                      <p className="text-muted-foreground mt-1">We partner directly with farmers to ensure raw ingredient purity and fair compensation.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Hygienic Production</h4>
                      <p className="text-muted-foreground mt-1">Manufactured in state-of-the-art facilities observing the highest international food safety protocols.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Quality Assurance</h4>
                      <p className="text-muted-foreground mt-1">Every batch undergoes rigorous lab testing to guarantee no refined sugars or artificial additives exist.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1612357005122-d4845440510f" 
                  alt="Quality Control" 
                  className="rounded-2xl shadow-gold-md w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">The Road Ahead</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are continually exploring traditional Indian botanicals to formulate new flavors and product lines. Our roadmap includes expanding into international markets, ensuring that regardless of where you are in the world, a piece of Indian heritage and functional wellness is always within reach.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
