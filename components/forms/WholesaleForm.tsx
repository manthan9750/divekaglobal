"use client";

import { useState } from "react";
import { inquirySchema } from "@/lib/validation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export function WholesaleForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", country: "", city: "", flavors: "", estimatedQuantity: "", message: "", website: ""
  });
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

    const payload = { type: "wholesale" as const, ...formData };
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
      } else {
        setErrors({ submit: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setErrors({ submit: "Network error. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-cream p-10 text-center shadow-soft">
        <CheckCircle2 className="h-16 w-16 text-leaf mb-6" />
        <h3 className="font-playfair text-2xl font-bold text-navy mb-2">Inquiry Received</h3>
        <p className="text-charcoal/80 max-w-md mx-auto">
          Thank you for your interest in partnering with Divekaa Global. Our export and wholesale team will review your requirements and contact you within 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-soft border border-gray-100">
      <h3 className="font-playfair text-xl font-bold text-navy mb-2">Request a Quote</h3>
      <p className="text-sm text-charcoal/60 mb-4">Fill out the form below and we&apos;ll get back to you with pricing and MOQ details.</p>
      
      <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" tabIndex={-1} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Contact Person *" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
        <Input label="Company Name" name="company" value={formData.company} onChange={handleChange} error={errors.company} />
        <Input label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <Input label="Phone/WhatsApp *" name="phone" inputMode="numeric" value={formData.phone} onChange={handleChange} error={errors.phone} />
        <Input label="Country" name="country" value={formData.country} onChange={handleChange} error={errors.country} />
        <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
        <Input label="Interested Flavors" name="flavors" placeholder="e.g. Assorted, Ginger" value={formData.flavors} onChange={handleChange} error={errors.flavors} />
        <Input label="Estimated Quantity (Monthly/Total)" name="estimatedQuantity" placeholder="e.g. 500 Jars" value={formData.estimatedQuantity} onChange={handleChange} error={errors.estimatedQuantity} />
      </div>
      <Textarea label="Message / Additional Requirements *" name="message" rows={4} value={formData.message} onChange={handleChange} error={errors.message} />
      
      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
      
      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="mt-2">
        Submit Inquiry
      </Button>
    </form>
  );
}