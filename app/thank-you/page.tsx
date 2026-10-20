"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Printer, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/format";
import { generateOrderWhatsAppMessage, generateWhatsAppLink } from "@/lib/whatsapp";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  
  const [summary, setSummary] = useState<{ total: number; method: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("dg-last-order");
    if (stored) {
      try { setSummary(JSON.parse(stored)); } catch (e) {}
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center animate-slide-up">
      <div className="flex justify-center mb-8">
        <div className="rounded-full bg-leaf/10 p-4">
          <CheckCircle2 className="h-20 w-20 text-leaf" />
        </div>
      </div>
      
      <h1 className="font-playfair text-4xl font-bold text-navy mb-4">Order Confirmed!</h1>
      <p className="text-lg text-charcoal/80 mb-8">
        Thank you for choosing Divekaa Global. Your order <strong className="text-navy">#{orderId || "DG-..."}</strong> has been successfully placed.
      </p>

      {/* Summary Box */}
      {summary && (
        <div className="rounded-2xl bg-white p-6 shadow-soft border border-gray-100 mb-8 max-w-sm mx-auto text-left">
          <h3 className="font-playfair font-bold text-navy mb-4 border-b border-gray-100 pb-2">Order Details</h3>
          <div className="space-y-2 text-sm text-charcoal">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-medium text-navy">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-medium text-navy">{formatINR(summary.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Method:</span>
              <span className="font-medium text-navy">{summary.method === "UPI_MANUAL" ? "UPI" : "Call Confirmation"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="mb-10 text-left bg-cream p-6 rounded-2xl">
        <h3 className="font-playfair font-bold text-navy mb-4">What happens next?</h3>
        <ol className="space-y-3 text-sm text-charcoal/80 list-decimal list-inside marker:text-gold marker:font-bold">
          <li>You will receive an order confirmation email shortly.</li>
          <li>Our team will process and pack your natural jaggery cubes safely.</li>
          <li>You&apos;ll be notified once your package is dispatched with tracking info.</li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 no-print">
        {summary && orderId && (
          <a href={generateWhatsAppLink(generateOrderWhatsAppMessage(orderId, summary.total))} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-md border-none">
              <MessageCircle className="mr-2 h-4 w-4" /> Send Order on WhatsApp
            </Button>
          </a>
        )}
        <Button variant="outline" onClick={() => window.print()} className="w-full sm:w-auto">
          <Printer className="mr-2 h-4 w-4" /> Print Summary
        </Button>
        <Link href="/products" className="w-full sm:w-auto">
          <Button variant="secondary" className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <meta name="robots" content="noindex" />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-cream border-t-gold" /></div>}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
}