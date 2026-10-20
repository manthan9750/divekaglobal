"use client";

import { useState } from "react";
import { inquirySchema } from "@/lib/validation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = { type: "contact" as const, ...formData };
    const res = inquirySchema.safeParse(payload);

    if (!res.success) {
      const formattedErrors: Record<string, string> = {};
      res.error.errors.forEach(err => {
        if (err.path[0]) formattedErrors[err.path[0] as string] = err.message;
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "", website: "" });
      } else {
        setErrors({ submit: "Something went wrong. Please try again or call us." });
      }
    } catch (err) {
      setErrors({ submit: "Network error. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-cream p-8 text-center border border-leaf/20">
        <CheckCircle2 className="h-12 w-12 text-leaf mb-4" />
        <h3 className="font-playfair text-xl font-bold text-navy mb-2">Message Sent</h3>
        <p className="text-charcoal/80">Thank you for reaching out. Our team will get back to you shortly.</p>
        <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot */}
      <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Your Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
        <Input label="Mobile Number" name="phone" inputMode="numeric" value={formData.phone} onChange={handleChange} error={errors.phone} />
      </div>
      <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <Textarea label="Your Message" name="message" rows={4} value={formData.message} onChange={handleChange} error={errors.message} />
      
      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
      
      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}