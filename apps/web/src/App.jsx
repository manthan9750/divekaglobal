import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext.jsx';
import { WishlistProvider } from '@/context/WishlistContext.jsx';
import { Toaster } from 'sonner';

// Pages
import HomePage from '@/pages/HomePage.jsx';
import ProductListingPage from '@/pages/ProductListingPage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import BenefitsPage from '@/pages/BenefitsPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import CartPage from '@/pages/CartPage.jsx';
import WishlistPage from '@/pages/WishlistPage.jsx';

// Scroll Management
const ScrollToTop = () => {
  const { pathname } = window.location;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-foreground">
    <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
    <p className="text-muted-foreground mb-8 max-w-md">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
      Back to Home
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="bottom-right" richColors />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
