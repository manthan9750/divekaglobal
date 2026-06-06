import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext.jsx';
import { useWishlist } from '@/context/WishlistContext.jsx';
import { BRAND_NAME } from '@/data/constants.js';
import { Button } from '@/components/ui/button.jsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.jsx';
import { Input } from '@/components/ui/input.jsx';

const NavLinks = ({ onClick }) => {
  const location = useLocation();
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Benefits', path: '/benefits' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
        return (
          <Link
            key={link.name}
            to={link.path}
            onClick={onClick}
            className={`text-sm font-medium transition-smooth hover:text-primary ${
              isActive ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};

const Navbar = () => {
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-gold-sm py-3' : 'bg-background py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col gap-8 pt-12">
                <nav className="flex flex-col gap-6">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="text-xl font-bold tracking-tight text-premium">
              {BRAND_NAME}
            </Link>
          </div>

          {/* Desktop Logo */}
          <Link to="/" className="hidden lg:block text-2xl font-bold tracking-tight text-premium shrink-0">
            {BRAND_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLinks />
          </nav>

          {/* Icons (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isSearchOpen ? (
              <div className="hidden sm:flex items-center animate-fade-in">
                <Input 
                  type="search" 
                  placeholder="Search flavors..." 
                  className="w-[200px] h-9 rounded-full bg-secondary border-none focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-1 h-8 w-8 text-foreground hover:bg-secondary">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} aria-label="Search" className="text-foreground hover:bg-secondary">
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-secondary" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 min-w-[16px] px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-secondary" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 min-w-[16px] px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
