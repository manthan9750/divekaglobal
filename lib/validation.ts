import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^[1-8]\d{5}$/;

export const orderSchema = z.object({
  orderId: z.string().optional(),
  customer: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().transform(v => v.replace(/\D/g, '').replace(/^91/, '')).refine(v => phoneRegex.test(v), "Invalid 10-digit mobile number"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address is too short"),
    landmark: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(pincodeRegex, "Invalid 6-digit pincode"),
  }),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1).max(20)
  })).min(1, "Cart is empty").max(15, "Too many different items"),
  paymentMethod: z.enum(["UPI_MANUAL", "CONFIRMATION_CALL"]),
  utr: z.string().optional(),
  website: z.string().optional() // Honeypot
});

export const inquirySchema = z.object({
  type: z.enum(["contact", "wholesale"]),
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().transform(v => v.replace(/\D/g, '').replace(/^91/, '')).refine(v => phoneRegex.test(v), "Invalid mobile number"),
  message: z.string().min(10, "Message is too short"),
  
  // Wholesale specific
  company: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  flavors: z.string().optional(),
  estimatedQuantity: z.string().optional(),
  
  website: z.string().optional() // Honeypot
});