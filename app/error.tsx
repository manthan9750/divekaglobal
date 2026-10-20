"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="font-playfair text-2xl font-bold text-navy">Something went wrong!</h2>
      <p className="mt-2 max-w-md text-charcoal/80">
        We apologize for the inconvenience. An unexpected error occurred.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
        <Button onClick={() => window.location.href = "/"} variant="primary">
          Return Home
        </Button>
      </div>
    </div>
  );
}