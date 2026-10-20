import { siteConfig } from "./config/site";

export interface ShippingRate {
  zone: string;
  charge: number;
  eta: string;
}

/**
 * Validates and calculates shipping cost based on pincode.
 * - Mumbai Metropolitan Region (MMR): starts with 400, 401, 402, 410, 421 -> ₹50
 * - Rest of Maharashtra (excluding MMR and Goa): starts with 41-44 -> ₹70
 * - Goa (starts with 403) and Rest of India -> ₹90
 * 
 * Sanity examples:
 * 400067 -> MMR -> ₹50
 * 410206 -> MMR -> ₹50
 * 411001 -> Rest of MH -> ₹70
 * 440001 -> Rest of MH -> ₹70
 * 403001 -> Rest of India (Goa) -> ₹90
 * 110001 -> Rest of India -> ₹90
 */
export function getShippingRate(pincode: string): ShippingRate | null {
  const cleanPin = pincode.trim();
  if (!/^[1-8]\d{5}$/.test(cleanPin)) return null;

  const prefix3 = cleanPin.substring(0, 3);
  const prefix2 = cleanPin.substring(0, 2);

  const mmrPrefixes = ['400', '401', '402', '410', '421'];
  
  if (mmrPrefixes.includes(prefix3)) {
    return { zone: "Mumbai Metropolitan Region", charge: 50, eta: "1–3 business days" };
  }

  // Handle Goa exception
  if (prefix3 === '403') {
    return { zone: "Rest of India", charge: 90, eta: "4–7 days" };
  }

  const p2 = parseInt(prefix2, 10);
  if (p2 >= 41 && p2 <= 44) {
    return { zone: "Maharashtra", charge: 70, eta: "2–4 days" };
  }

  return { zone: "Rest of India", charge: 90, eta: "4–7 days" };
}

export function isFreeDelivery(jarCount: number, subtotal: number): boolean {
  return jarCount >= siteConfig.shipping.freeThresholdJars || subtotal >= siteConfig.shipping.freeThresholdRupees;
}