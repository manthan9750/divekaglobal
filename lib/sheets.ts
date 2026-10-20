import { PricingResult } from "./pricing";
import { OrderPayload } from "./types";
import { getShippingRate } from "./shipping";

const WEBAPP_URL = process.env.GOOGLE_SHEET_WEBAPP_URL;

export async function sendOrderToSheet(
  orderId: string,
  payload: OrderPayload,
  pricing: PricingResult
): Promise<{ success: boolean; error?: string }> {
  if (!WEBAPP_URL) return { success: false, error: "GOOGLE_SHEET_WEBAPP_URL missing" };

  const { customer, paymentMethod, utr } = payload;
  const rate = getShippingRate(customer.pincode);
  
  const itemsString = pricing.validItems
    .map(i => `${i.quantity}x ${i.product.name}`)
    .join(", ");

  const data = {
    action: "NEW_ORDER",
    orderId,
    customerName: customer.fullName,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    landmark: customer.landmark || "",
    city: customer.city,
    state: customer.state,
    pincode: customer.pincode,
    items: itemsString,
    jars: pricing.jarCount,
    subtotal: pricing.subtotal,
    deliveryZone: rate ? rate.zone : "Unknown",
    deliveryFee: pricing.shipping,
    grandTotal: pricing.total,
    paymentMethod: paymentMethod === "UPI_MANUAL" ? "UPI" : "Confirmation Call",
    utr: utr || "",
    paymentStatus: paymentMethod === "UPI_MANUAL" ? "UPI - Awaiting Verification" : "Pay on Confirmation Call"
  };

  return postToAppScript(data);
}

export async function sendInquiryToSheet(payload: any): Promise<{ success: boolean; error?: string }> {
  if (!WEBAPP_URL) return { success: false, error: "GOOGLE_SHEET_WEBAPP_URL missing" };
  
  const data = {
    action: "NEW_INQUIRY",
    ...payload
  };

  return postToAppScript(data);
}

async function postToAppScript(data: any): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(WEBAPP_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      redirect: "follow",
    });

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      // Apps script sometimes returns HTML if misconfigured
      return { success: false, error: "Failed to parse Sheet response" };
    }

    if (json.status === "success") {
      return { success: true };
    } else {
      return { success: false, error: json.message || "Sheet error" };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Network error to Sheet" };
  }
}