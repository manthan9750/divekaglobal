import { cn } from "@/lib/format";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-3", centered && "items-center text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-charcoal/80 text-base md:text-lg">
          {subtitle}
        </p>
      )}
      {centered && <div className="mt-2 h-0.5 w-24 bg-gold rounded-full" />}
    </div>
  );
}