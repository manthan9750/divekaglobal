import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  inquiryDetails: z.string().min(20, 'Please provide more details about your inquiry'),
});

const BusinessInquiryForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data) => {
    const submissions = JSON.parse(localStorage.getItem('business_inquiries') || '[]');
    submissions.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('business_inquiries', JSON.stringify(submissions));
    
    toast.success('Inquiry submitted! Our partnership team will contact you shortly.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="biz-company" className="text-foreground">Company Name</Label>
          <Input id="biz-company" {...register('companyName')} className={errors.companyName ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="biz-person" className="text-foreground">Contact Person</Label>
          <Input id="biz-person" {...register('contactPerson')} className={errors.contactPerson ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.contactPerson && <p className="text-sm text-destructive">{errors.contactPerson.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="biz-email" className="text-foreground">Business Email</Label>
          <Input id="biz-email" type="email" {...register('email')} className={errors.email ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="biz-phone" className="text-foreground">Phone Number</Label>
          <Input id="biz-phone" type="tel" {...register('phone')} className={errors.phone ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="biz-details" className="text-foreground">Inquiry Details</Label>
        <Textarea 
          id="biz-details" 
          rows={4} 
          placeholder="Tell us about potential partnership opportunities..."
          {...register('inquiryDetails')} 
          className={errors.inquiryDetails ? 'border-destructive' : 'bg-background text-foreground resize-none'} 
        />
        {errors.inquiryDetails && <p className="text-sm text-destructive">{errors.inquiryDetails.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base">
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </Button>
    </form>
  );
};

export default BusinessInquiryForm;
