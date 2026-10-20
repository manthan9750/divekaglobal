export interface Product {
  id: string;
  slug: string;
  name: string;
  flavor: string;
  price: number;
  originalPrice: number;
  jarCount: number;
  isOutOfStock: boolean;
  tags: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  images: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Customer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = "UPI_MANUAL" | "CONFIRMATION_CALL";

export interface OrderPayload {
  orderId?: string;
  customer: Customer;
  items: CartItem[];
  paymentMethod: PaymentMethod;
  utr?: string;
  website?: string; // honeypot
}