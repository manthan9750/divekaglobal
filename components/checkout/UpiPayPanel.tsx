"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { useIsMobile } from "@/hooks/useIsMobile";
import { generateUpiLink, isValidUtr } from "@/lib/upi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ShieldCheck, Info } from "lucide-react";

interface UpiPayPanelProps {
  total: number;
  orderId: string;
  isSubmitting: boolean;
  onComplete: (utr: string) => void;
  onSwitchMethod: () => void;
}

export function UpiPayPanel({ total, orderId, isSubmitting, onComplete, onSwitchMethod }: UpiPayPanelProps) {
  const isMobile = useIsMobile();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "";
  const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "Divekaa Global";
  const upiLink = generateUpiLink(upiId, upiName, total, orderId);

  useEffect(() => {
    if (!isMobile && upiId) {
      QRCode.toDataURL(upiLink, { width: 250, margin: 1, color: { dark: "#1F3A5F", light: "#FFFFFF" } })
        .then(setQrCodeUrl)
        .catch(console.error);
    }
  }, [upiLink, isMobile, upiId]);

  const handleSubmit = () => {
    if (utr && !isValidUtr(utr)) {
      setUtrError("Invalid UTR format. Expected 4 to 22 alphanumeric characters.");
      return;
    }
    setUtrError("");
    onComplete(utr);
  };

  if (!upiId) {
    console.warn("NEXT_PUBLIC_UPI_ID is missing. UPI payments are hidden.");
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl">
        UPI ID is not configured. Please use Confirmation Call.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="rounded-xl bg-blue-50 p-4 flex items-start gap-3 border border-blue-100 text-sm text-navy">
        <Info className="h-5 w-5 shrink-0 mt-0.5 text-blue-500" />
        <p>Your payment is <strong>100% secure</strong>. You are paying directly via your bank app. No commissions or hidden fees.</p>
      </div>

      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white">
        {isMobile ? (
          <div className="text-center w-full">
            <a href={upiLink} className="block w-full">
              <Button variant="primary" size="lg" className="w-full mb-4 shadow-lg shadow-gold/20">
                Pay ₹{total} via UPI App
              </Button>
            </a>
            <p className="text-xs text-charcoal/60 mt-4">Order ID will be added as a note: {orderId}</p>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center">
            <p className="text-sm font-medium text-navy mb-4">Scan QR with any UPI App to Pay</p>
            {qrCodeUrl ? (
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mb-4 bg-white p-2">
                <Image src={qrCodeUrl} alt="UPI QR Code" width={200} height={200} />
              </div>
            ) : (
              <div className="h-[200px] w-[200px] bg-gray-100 animate-pulse rounded-xl mb-4" />
            )}
            <p className="text-xs text-charcoal/60">Amount: ₹{total} • ID: {orderId}</p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h4 className="font-playfair text-lg font-bold text-navy mb-2 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-leaf" /> Verification Step
        </h4>
        <p className="text-sm text-charcoal/80 mb-4">
          Once paid, optionally enter your 12-digit UPI Reference / UTR (or last 4 digits) to help us verify faster.
        </p>
        <Input 
          placeholder="e.g. 3254..." 
          value={utr} 
          onChange={(e) => setUtr(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 22))}
          error={utrError}
          className="mb-4"
        />
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full mb-4" 
          onClick={handleSubmit}
          isLoading={isSubmitting}
        >
          Complete Order
        </Button>

        <div className="text-center border-t border-gray-100 pt-4 mt-2">
          <p className="text-xs text-charcoal/60 mb-2">Payment failed or facing issues?</p>
          <button 
            onClick={onSwitchMethod} 
            className="text-sm font-medium text-navy hover:text-gold underline underline-offset-4"
            disabled={isSubmitting}
          >
            Switch to Pay on Confirmation Call
          </button>
        </div>
      </div>
    </div>
  );
}