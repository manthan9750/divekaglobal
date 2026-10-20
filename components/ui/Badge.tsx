import { HTMLAttributes } from "react";
import { cn } from "@/lib/format";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "gold" | "navy" | "leaf" | "outline";
}

export function Badge({ className, variant = "gold", ...props }: BadgeProps) {
  const variants = {
    gold: "bg-gold text-navy",
    navy: "bg-navy text-white",
    leaf: "bg-leaf text-white",
    outline: "border border-gold text-navy bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}