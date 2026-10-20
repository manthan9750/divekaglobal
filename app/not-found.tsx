import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-playfair text-8xl font-bold text-navy">404</h1>
      <h2 className="mt-4 font-playfair text-2xl font-bold text-charcoal">Page not found</h2>
      <p className="mt-2 max-w-md text-charcoal/80">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-8">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}