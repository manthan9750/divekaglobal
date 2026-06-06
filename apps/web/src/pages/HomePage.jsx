import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Heart,
  Sparkles,
  CheckCircle2,
  Instagram
} from 'lucide-react';

import { Button } from '../components/ui/button.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import products from '../data/products.js';

const HomePage = () => {
  const featuredProducts = products.filter(p => ['gud-bite-masala-paan', 'gud-bite-saffron-royal', 'gud-bite-tulsi-ginger', 'gud-bite-chocolate-fusion'].includes(p.id));
  
  const testimonials = [
    { author: "Ananya S.", rating: 5, date: "2026-05-12", text: "Finally, a guilt-free sweet that actually tastes authentic. The Masala Paan flavor is incredible!", avatarUrl: "" },
    { author: "Rahul M.", rating: 5, date: "2026-04-28", text: "I swapped my afternoon chocolate for the Saffron Royal bite. My energy levels are stable and it feels like a real treat.", avatarUrl: "" },
    { author: "Priya K.", rating: 5, date: "2026-06-02", text: "My entire family loves these. Perfect for digestion after heavy meals and the ingredients are spotless.", avatarUrl: "" }
  ];

  const instaImages = [
    'https://images.unsplash.com/photo-1622957744298-a874da73e802',
    'https://images.unsplash.com/photo-1625753733975-b20b4973200d',
    'https://images.unsplash.com/photo-1612357005122-d4845440510f',
    'https://images.unsplash.com/photo-1677581329080-f7895dcdfcdd',
    'https://images.unsplash.com/photo-1646685179802-56dd30d6fd3a',
    'https://images.unsplash.com/photo-1559716701-314fb2ab531e'
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1676448672121-ce09fbbf69e5" 
              alt="Gud Bite Premium Products" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl pt-20 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
                Global Reach, Indian Roots
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Traditional Wisdom in <br className="hidden md:block"/> Every Delicious Bite.
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover Gud Bite — premium wellness treats combining authentic Indian flavors with modern health benefits. Crafted with pure jaggery and natural ingredients.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="rounded-full px-8 py-6 text-lg w-full sm:w-auto">
                  <Link to="/products">Shop All Flavors <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-8 py-6 text-lg w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BRAND STORY */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <Leaf className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Rooted in Heritage, <span className="text-premium">Crafted for Today.</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              For generations, Indian households have relied on natural ingredients like jaggery, cardamom, and fennel for wellness and digestion. We founded Divekaa Global to bring these time-tested remedies into the modern era — without compromising on taste or quality. No refined sugar, no artificial flavors, just pure goodness.
            </p>
          </div>
        </section>

        {/* FEATURED FLAVORS */}
        <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Curated Favorites</h2>
                <p className="text-muted-foreground text-lg">Explore our most loved wellness bites, carefully crafted for your daily routine.</p>
              </div>
              <Button variant="ghost" asChild className="hidden md:inline-flex group">
                <Link to="/products">View All Collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
              <Button variant="outline" asChild className="w-full rounded-full">
                <Link to="/products">View All Collection</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* WHY GUD BITE (Bento Grid) */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Gud Bite Promise</h2>
              <p className="text-muted-foreground text-lg">We refuse to compromise on quality. Every ingredient is selected for its purity and specific wellness benefits.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="col-span-1 md:col-span-2 bg-card rounded-2xl p-8 shadow-sm border border-border flex flex-col justify-center">
                <Sparkles className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">100% Natural Ingredients</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We source premium spices, real fruit extracts, and pure jaggery directly from trusted farms. Zero artificial preservatives, colors, or hidden synthetic sweeteners.
                </p>
              </div>
              
              <div className="col-span-1 bg-primary text-primary-foreground rounded-2xl p-8 shadow-sm flex flex-col justify-center">
                <Heart className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-3">Refined Sugar Free</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Sweetened exclusively with traditional, mineral-rich jaggery for sustained energy without the crash.
                </p>
              </div>
              
              <div className="col-span-1 bg-accent-green text-accent-green-foreground rounded-2xl p-8 shadow-sm flex flex-col justify-center">
                <ShieldCheck className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-3">Ayurvedic Wisdom</h3>
                <p className="text-accent-green-foreground/80 leading-relaxed">
                  Formulated based on ancient principles to aid digestion and balance energy.
                </p>
              </div>

              <div className="col-span-1 md:col-span-2 bg-card rounded-2xl p-8 shadow-sm border border-border flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> <span className="font-medium text-sm">Premium Quality</span></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> <span className="font-medium text-sm">Vegan Friendly</span></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> <span className="font-medium text-sm">Gluten Free</span></li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> <span className="font-medium text-sm">Ethically Sourced</span></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> <span className="font-medium text-sm">Travel Friendly</span></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> <span className="font-medium text-sm">Digestive Support</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INGREDIENT HIGHLIGHTS (Zig Zag) */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Nature's Best, Uncompromised.</h2>
            
            <div className="space-y-24">
              {/* Highlight 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-3xl font-bold mb-4">Pure Indian Jaggery</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Unlike empty calories from refined white sugar, our premium jaggery retains molasses, providing essential minerals like iron and magnesium. It offers a rich, complex sweetness that provides sustained energy.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/benefits">Learn about our ingredients</Link>
                  </Button>
                </div>
                <div className="order-1 md:order-2">
                  <img src="https://images.unsplash.com/photo-1672702959512-af149104c388" alt="Premium Jaggery" className="rounded-2xl shadow-lg w-full aspect-[4/3] object-cover" />
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-1">
                  <img src="https://images.unsplash.com/photo-1532666661413-871a4227e256" alt="Fresh Spices" className="rounded-2xl shadow-lg w-full aspect-[4/3] object-cover" />
                </div>
                <div className="order-2">
                  <h3 className="text-3xl font-bold mb-4">Therapeutic Spices</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    From Kashmiri saffron to hand-picked green cardamom, every spice serves a purpose. We utilize these botanical powerhouses to reduce inflammation, aid digestion, and naturally elevate mood.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/products">Explore spiced flavors</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by our Community</h2>
              <p className="text-muted-foreground text-lg">Hear what people are saying about their daily Gud Bite ritual.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM GRID */}
        <section className="py-12 bg-background overflow-hidden">
          <div className="container mx-auto px-4 mb-8 text-center">
            <h2 className="text-2xl font-bold">Follow the Journey <span className="text-primary">@DivekaaGlobal</span></h2>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 snap-x hide-scrollbar pb-8">
            {instaImages.map((img, idx) => (
              <div key={idx} className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden group snap-center">
                <img src={img} alt="Instagram feed" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ PREVIEW */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Common Questions</h2>
            
            <Accordion type="single" collapsible className="w-full bg-card rounded-2xl p-6 shadow-sm border border-border">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary hover:no-underline">What exactly is Gud Bite?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Gud Bite is a premium wellness treat made from unrefined Indian jaggery ('Gud') mixed with specific natural ingredients like spices, nuts, and botanical extracts. It's designed to satisfy sweet cravings while providing functional health benefits like improved digestion and sustained energy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary hover:no-underline">Why do you use Jaggery instead of sugar?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Unlike refined white sugar which offers empty calories, jaggery is unrefined and retains its natural molasses content. This means it contains essential minerals like iron, magnesium, and potassium. It digests slower, preventing severe spikes in blood sugar.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary hover:no-underline">When is the best time to eat them?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  While you can enjoy them anytime, we recommend having one after meals to aid digestion (especially flavors like Masala Paan or Fennel Fresh), or during your afternoon energy dip instead of reaching for processed chocolate.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
