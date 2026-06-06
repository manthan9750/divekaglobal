import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext.jsx';
import { formatPrice } from '@/utils/productHelpers.js';
import { Button } from '@/components/ui/button.jsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx';
import { toast } from 'sonner';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
      toast.success('Cart updated');
    }
  };

  const handleIncrease = () => {
    if (quantity < 10) {
      updateQuantity(product.id, quantity + 1);
      toast.success('Cart updated');
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    toast.info(`${product.name} removed from cart`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-b border-border">
      <Link to={`/products/${product.id}`} className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-secondary">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </Link>
      
      <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div className="flex flex-col gap-1">
          <Link to={`/products/${product.id}`} className="font-semibold text-lg hover:text-primary transition-colors">
            {product.name}
          </Link>
          <span className="text-sm text-muted-foreground">{product.flavor}</span>
          <span className="font-medium text-foreground mt-2">{formatPrice(product.price)}</span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="flex items-center bg-secondary rounded-full border border-border p-1 w-28 justify-between">
            <button 
              onClick={handleDecrease} 
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold w-6 text-center text-sm">{quantity}</span>
            <button 
              onClick={handleIncrease} 
              disabled={quantity >= 10}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block font-bold w-20 text-right">
              {formatPrice(product.price * quantity)}
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Item</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove {product.name} from your cart?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
