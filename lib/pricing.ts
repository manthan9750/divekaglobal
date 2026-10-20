import { products } from "./data/products";
import { getShippingRate, isFreeDelivery } from "./shipping";
import { CartItem } from "./types";

export interface PricingResult {
  subtotal: number;
  shipping: number;
  total: number;
  jarCount: number;
  validItems: { product: typeof products[0], quantity: number }[];
}

export function calculateOrderPricing(items: CartItem[], pincode?: string): PricingResult {
  let subtotal = 0;
  let jarCount = 0;
  const validItems = [];

  for (const item of items) {
    const product = products.find(p => p.id === item.productId && !p.isOutOfStock);
    if (product && item.quantity > 0 && item.quantity <= 20) {
      subtotal += product.price * item.quantity;
      jarCount += product.jarCount * item.quantity;
      validItems.push({ product, quantity: item.quantity });
    }
  }

  let shipping = 0;
  if (pincode) {
    const rate = getShippingRate(pincode);
    if (rate) {
      shipping = rate.charge;
    }
  }

  if (isFreeDelivery(jarCount, subtotal)) {
    shipping = 0;
  }

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    jarCount,
    validItems
  };
}