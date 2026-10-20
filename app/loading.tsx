export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cream border-t-gold"></div>
      <p className="mt-4 font-playfair text-lg font-medium text-navy animate-pulse">Loading...</p>
    </div>
  );
}