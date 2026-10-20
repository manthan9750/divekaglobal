import { Resend } from "resend";
import { siteConfig } from "./config/site";
import { escapeHtml } from "./escape";
import { PricingResult } from "./pricing";
import { OrderPayload } from "./types";
import { formatINR } from "./format";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = "onboarding@resend.dev";
const OWNER_EMAIL = process.env.NOTIFICATION_EMAIL ? process.env.NOTIFICATION_EMAIL : siteConfig.company.email;

export async function sendOrderEmailToOwner(
  orderId: string,
  payload: OrderPayload,
  pricing: PricingResult
): Promise<{ success: boolean; error?: string }> {
  if (!resend) return { success: false, error: "RESEND_API_KEY missing" };

  const { customer, paymentMethod, utr } = payload;
  
  const itemsHtml = pricing.validItems.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(item.product.name)}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatINR(item.product.price * item.quantity)}</td>
    </tr>
  `).join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2B2B2B;">
      <div style="background-color: #C9A33A; color: #1F3A5F; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">New Order: ${escapeHtml(orderId)}</h1>
      </div>
      <div style="padding: 20px; background-color: #FAF6EC;">
        <h2 style="color: #1F3A5F; margin-top: 0;">Customer Details</h2>
        <p><strong>Name:</strong> ${escapeHtml(customer.fullName)}</p>
        <p><strong>Phone:</strong> <a href="tel:+91${customer.phone}">+91 ${customer.phone}</a> | <a href="https://wa.me/91${customer.phone}">WhatsApp Customer</a></p>
        <p><strong>Email:</strong> ${escapeHtml(customer.email)}</p>
        <p><strong>Address:</strong> ${escapeHtml(customer.address)}${customer.landmark ? `, ${escapeHtml(customer.landmark)}` : ''}, ${escapeHtml(customer.city)}, ${escapeHtml(customer.state)} - ${escapeHtml(customer.pincode)}</p>
        
        <h2 style="color: #1F3A5F; margin-top: 20px;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse; background: white;">
          <thead>
            <tr style="background-color: #eee;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 8px; text-align: right;"><strong>Subtotal:</strong></td>
              <td style="padding: 8px; text-align: right;">${formatINR(pricing.subtotal)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 8px; text-align: right;"><strong>Delivery:</strong></td>
              <td style="padding: 8px; text-align: right;">${pricing.shipping === 0 ? "FREE" : formatINR(pricing.shipping)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 8px; text-align: right; font-size: 18px;"><strong>Grand Total:</strong></td>
              <td style="padding: 8px; text-align: right; font-size: 18px;"><strong>${formatINR(pricing.total)}</strong></td>
            </tr>
          </tfoot>
        </table>

        <h2 style="color: #1F3A5F; margin-top: 20px;">Payment Information</h2>
        <p><strong>Method:</strong> ${paymentMethod === "UPI_MANUAL" ? "UPI - Awaiting Verification" : "Pay on Confirmation Call"}</p>
        ${utr ? `<p><strong>Provided UTR/Ref:</strong> ${escapeHtml(utr)}</p>` : ''}
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Order ${orderId} - ₹${pricing.total}`,
      html,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message ? err.message : "Unknown email error" };
  }
}

export async function sendOrderEmailToCustomer(): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function sendInquiryEmailToOwner(
  payload: any
): Promise<{ success: boolean; error?: string }> {
  if (!resend) return { success: false, error: "RESEND_API_KEY missing" };

  const isWholesale = payload.type === "wholesale";
  const title = isWholesale ? "New Wholesale Inquiry" : "New Contact Message";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2B2B2B;">
      <div style="background-color: #C9A33A; color: #1F3A5F; padding: 20px;">
        <h1 style="margin: 0; font-size: 20px;">${title}</h1>
      </div>
      <div style="padding: 20px; background-color: #FAF6EC;">
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        ${isWholesale ? `
          <p><strong>Company:</strong> ${escapeHtml(payload.company ? payload.company : "N/A")}</p>
          <p><strong>Location:</strong> ${escapeHtml(payload.city ? payload.city : "N/A")}, ${escapeHtml(payload.country ? payload.country : "N/A")}</p>
          <p><strong>Flavors:</strong> ${escapeHtml(payload.flavors ? payload.flavors : "N/A")}</p>
          <p><strong>Est. Quantity:</strong> ${escapeHtml(payload.estimatedQuantity ? payload.estimatedQuantity : "N/A")}</p>
        ` : ''}
        <p><strong>Message:</strong><br/>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `${title} from ${escapeHtml(payload.name)}`,
      html,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message ? err.message : "Unknown error" };
  }
}