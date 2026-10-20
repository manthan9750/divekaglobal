import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/format";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-navy">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border bg-white px-3 py-2 text-sm text-charcoal shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500 focus-visible:ring-red-500" : "border-gray-200 focus-visible:ring-gold",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";