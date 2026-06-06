import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { BRAND_NAME, TAGLINE } from '../data/constants.js';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';
import { toast } from 'sonner';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col">
            <Link to="/" className="text-2xl font-bold tracking-tight text-primary mb-4">
              {BRAND_NAME}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {TAGLINE}. Premium wellness treats combining traditional Indian flavors with modern health benefits.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors text-sm">All Flavors</Link></li>
              <li><Link to="/products?filter=best-seller" className="text-gray-400 hover:text-primary transition-colors text-sm">Best Sellers</Link></li>
              <li><Link to="/benefits" className="text-gray-400 hover:text-primary transition-colors text-sm">Wellness Benefits</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-primary transition-colors text-sm">Your Cart</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors text-sm">Our Story</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for exclusive offers, new flavor drops, and wellness tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Email address" 
                  required 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 pr-12 focus-visible:ring-primary"
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1 h-7 w-7 rounded-sm bg-primary hover:bg-primary-dark text-primary-foreground">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Made with heritage in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
