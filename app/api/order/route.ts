export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validation";
import { calculateOrderPricing } from "@/lib/pricing";
import { generateOrderId, isValidOrderId } from "@/lib/order-id";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendOrderEmailToOwner, sendOrderEmailToCustomer } from "@/lib/resend";
import { sendOrderToSheet } from "@/lib/sheets";
import { generateWhatsAppLink, generateOrderWhatsAppMessage } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip, 8, 60000)) {
      return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true, orderId: "DG-FAKE-0000" });
    }

    const parseResult = orderSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: parseResult.error.flatten() }, { status: 400 });
    }

    const payload = parseResult.data;

    // Server-side pricing recalculation
    const pricing = calculateOrderPricing(payload.items, payload.customer.pincode);
    if (pricing.validItems.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid or out of stock items" }, { status: 400 });
    }

    // Order ID validation / generation
    const orderId = (payload.orderId && isValidOrderId(payload.orderId)) 
      ? payload.orderId 
      : generateOrderId();

    // Integrations
    const [sheetResult, ownerEmailResult] = await Promise.allSettled([
      sendOrderToSheet(orderId, payload, pricing),
      sendOrderEmailToOwner(orderId, payload, pricing),
      sendOrderEmailToCustomer(orderId, payload, pricing) // fire-and-forget basically
    ]);

    const sheetSuccess = sheetResult.status === "fulfilled" && sheetResult.value.success;
    const ownerEmailSuccess = ownerEmailResult.status === "fulfilled" && ownerEmailResult.value.success;

    // If BOTH primary logging systems fail, we fallback to a hard error to prompt WhatsApp.
    if (!sheetSuccess && !ownerEmailSuccess) {
      const waMsg = generateOrderWhatsAppMessage(orderId, pricing.total);
      return NextResponse.json({ 
        success: false, 
        code: "DELIVERY_FAILED", 
        message: "Our systems are busy. Please send your order via WhatsApp.",
        whatsappUrl: generateWhatsAppLink(waMsg)
      }, { status: 503 });
    }

    return NextResponse.json({
      success: true,
      orderId,
      grandTotal: pricing.total
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}