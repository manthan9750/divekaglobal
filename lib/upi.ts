/**
 * Generates the standard UPI intent link.
 */
export function generateUpiLink(
  upiId: string,
  name: string,
  amount: number,
  orderId: string
): string {
  const am = amount.toFixed(2);
  // Ensure we URL encode parameters to build a valid intent
  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${am}&cu=INR&tn=${encodeURIComponent(orderId)}`;
}

/**
 * Validates UTR / UPI Reference Number loosely.
 * Allows 4 to 22 alphanumeric characters.
 */
export function isValidUtr(utr: string): boolean {
  if (!utr) return false;
  return /^[A-Za-z0-9]{4,22}$/.test(utr.trim());
}