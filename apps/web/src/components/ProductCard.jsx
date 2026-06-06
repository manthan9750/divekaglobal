import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatPrice } from '../utils/productHelpers.js';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button.jsx';
import { toast } from 'sonner';
import { cn } from '@/lib/utils.js';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="group card-premium flex flex-col h-full overflow-hidden block focus-visible:ring-2 ring-primary ring-offset-2 outline-none">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant={tag === 'Best Seller' ? 'default' : 'secondary'} className="font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white transition-colors shadow-sm"
        >
          <Heart className={cn("w-5 h-5 transition-colors", isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground")} />
        </button>

        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-3 py-1">Out of Stock</Badge>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-2 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews?.length || 0})</span>
        </div>
        
        <h3 className="font-semibold text-lg leading-tight mb-1 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.flavorProfile}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            className="rounded-full px-4"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
