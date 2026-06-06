import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CartItem from '../components/CartItem.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import ShippingSelector from '../components/ShippingSelector.jsx';
import EmptyState from '../components/EmptyState.jsx';

import { useCart } from '../context/CartContext.jsx';

const CartPage = () => {
  const { cartItems, cartTotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const getShippingCost = () => {
    switch (shippingMethod) {
      case 'express': return 415;
      case 'overnight': return 1245;
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <EmptyState 
              title="Your cart is empty" 
              description="Looks like you haven't added any premium wellness bites to your cart yet."
              icon={ShoppingCart}
            />
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-8">
                  <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-3 text-right">Total</div>
                  </div>
                  
                  <div className="flex flex-col">
                    {cartItems.map(item => (
                      <CartItem key={item.productId} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="sticky top-28">
                  <ShippingSelector 
                    selectedMethod={shippingMethod} 
                    onSelectMethod={setShippingMethod} 
                  />
                  <OrderSummary 
                    subtotal={cartTotal} 
                    shippingCost={getShippingCost()} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
