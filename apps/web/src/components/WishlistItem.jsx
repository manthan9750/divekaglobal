import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext.jsx';
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

const WishlistItem = ({ item }) => {
  const { removeFromWishlist, moveToCart } = useWishlist();
  const { product } = item;

  const handleRemove = () => {
    removeFromWishlist(product.id);
    toast.info(`${product.name} removed from wishlist`);
  };

  const handleMoveToCart = () => {
    moveToCart(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-b border-border hover:bg-secondary/20 transition-colors p-4 rounded-xl">
      <Link to={`/products/${product.id}`} className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-secondary">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </Link>
      
      <div className="flex-grow flex flex-col gap-2">
        <Link to={`/products/${product.id}`} className="font-semibold text-lg hover:text-primary transition-colors inline-block">
          {product.name}
        </Link>
        <span className="text-sm text-muted-foreground">{product.flavor}</span>
        
        <div className="flex items-center gap-1 text-sm mt-1">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="font-medium">{product.rating}</span>
        </div>
        
        <span className="font-bold text-lg text-foreground mt-1">{formatPrice(product.price)}</span>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
        <Button 
          onClick={handleMoveToCart}
          className="rounded-full flex-grow sm:flex-grow-0"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Move to Cart
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/5">
              <Trash2 className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {product.name} from your wishlist?
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
  );
};

export default WishlistItem;
