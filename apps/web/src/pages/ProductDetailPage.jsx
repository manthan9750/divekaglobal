import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, ShieldCheck, Truck, Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import ProductGallery from '@/components/ProductGallery.jsx';
import RelatedProducts from '@/components/RelatedProducts.jsx';
import ReviewCard from '@/components/ReviewCard.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { useCart } from '@/context/CartContext.jsx';
import { useWishlist } from '@/context/WishlistContext.jsx';
import { getProductById, getRelatedProducts, formatPrice } from '@/utils/productHelpers.js';
import products from '@/data/products.js';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount or route change
    window.scrollTo(0, 0);
    
    const fetchedProduct = getProductById(id, products);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setRelated(getRelatedProducts(fetchedProduct, products, 4));
      setQuantity(1);
    } else {
      // Handle 404
      navigate('/products');
      toast.error('Product not found');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><span>/</span></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
              <li><span>/</span></li>
              <li className="text-foreground font-medium truncate" aria-current="page">{product.flavor}</li>
            </ol>
          </nav>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16">
          
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Gallery */}
            <div className="w-full lg:sticky lg:top-28 self-start">
              <ProductGallery images={product.images} altText={product.name} />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {product.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant={tag === 'Best Seller' ? 'default' : 'secondary'} className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                  ))}
                  <span className="ml-2 font-medium text-foreground">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">({product.reviews.length} reviews)</span>
              </div>

              <div className="mb-6 flex items-end gap-3">
                <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-muted-foreground line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="bg-secondary/50 rounded-xl p-5 mb-8 border border-border">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Flavor Profile</h4>
                <p className="text-sm text-foreground/80">{product.flavorProfile}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 border-t border-b py-6">
                <div className="flex items-center bg-secondary rounded-full border border-border p-1 w-full sm:w-32 justify-between">
                  <button onClick={decrementQuantity} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background transition-colors focus-visible:ring-2 ring-primary outline-none" aria-label="Decrease quantity">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold w-8 text-center">{quantity}</span>
                  <button onClick={incrementQuantity} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background transition-colors focus-visible:ring-2 ring-primary outline-none" aria-label="Increase quantity">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button 
                  size="lg" 
                  className="flex-grow rounded-full text-lg h-12"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <Button 
                  size="icon" 
                  variant="outline" 
                  className={`rounded-full w-12 h-12 shrink-0 ${isWishlisted ? 'border-destructive text-destructive bg-destructive/5' : ''}`}
                  onClick={handleWishlistToggle}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-destructive' : ''}`} />
                </Button>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  <span>Refined Sugar Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Nationwide Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="mb-20">
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="w-full sm:w-auto flex flex-wrap h-auto p-1 bg-secondary rounded-xl mb-8">
                <TabsTrigger value="benefits" className="text-base rounded-lg py-2.5 px-6">Health Benefits</TabsTrigger>
                <TabsTrigger value="ingredients" className="text-base rounded-lg py-2.5 px-6">Ingredients</TabsTrigger>
                <TabsTrigger value="story" className="text-base rounded-lg py-2.5 px-6">Our Story</TabsTrigger>
              </TabsList>
              
              <div className="bg-card rounded-2xl p-6 md:p-10 shadow-sm border border-border">
                <TabsContent value="benefits" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <h3 className="text-2xl font-bold mb-6">Wellness in Every Bite</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Benefits</h4>
                      <ul className="space-y-3">
                        {product.healthBenefits?.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">When to Enjoy</h4>
                      <ul className="space-y-3">
                        {product.useCases?.map((use, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ingredients" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <h3 className="text-2xl font-bold mb-6">Nothing to Hide</h3>
                  <p className="text-muted-foreground mb-6">We use only premium, natural ingredients sourced responsibly from trusted farms.</p>
                  <div className="flex flex-wrap gap-3">
                    {product.ingredients?.map((ingredient, idx) => (
                      <span key={idx} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="story" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <h3 className="text-2xl font-bold mb-4">The Inspiration</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {product.heritageStory}
                  </p>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Related Products */}
          <RelatedProducts products={related} />

          {/* Reviews Section */}
          <section className="pt-16 border-t mt-16">
            <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{product.rating} out of 5</span>
                </div>
              </div>
              <Button variant="outline">Write a Review</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews?.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
