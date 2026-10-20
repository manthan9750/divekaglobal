import { siteConfig } from "./config/site";

export function generateWhatsAppLink(text: string): string {
  const phone = siteConfig.company.primaryPhone;
  return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
}

export function generateOrderWhatsAppMessage(orderId: string, total: number): string {
  return `Hello Divekaa Global! I just placed an order on your website.
Order ID: ${orderId}
Amount: ₹${total}

Please confirm my order. Thank you!`;
}