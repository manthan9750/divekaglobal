/**
 * Generates a client-side Order ID: DG-YYMM-XXXX
 */
export function generateOrderId(): string {
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const random4 = Math.floor(1000 + Math.random() * 9000);
  return `DG-${yy}${mm}-${random4}`;
}

export const orderIdRegex = /^DG-\d{4}-\d{4}$/;

export function isValidOrderId(id: string): boolean {
  return orderIdRegex.test(id);
}