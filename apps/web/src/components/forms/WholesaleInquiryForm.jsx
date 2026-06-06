import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '..@/components/ui/textarea.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  location: z.string().min(5, 'Location is required'),
  productInterest: z.string().min(2, 'Please select or mention product interest'),
  volume: z.string().min(2, 'Please indicate estimated volume'),
  contactDetails: z.string().min(10, 'Please provide full contact details'),
});

const WholesaleInquiryForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data) => {
    const submissions = JSON.parse(localStorage.getItem('wholesale_inquiries') || '[]');
    submissions.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('wholesale_inquiries', JSON.stringify(submissions));
    
    toast.success('Wholesale request received! We will send you our catalog soon.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ws-company" className="text-foreground">Retailer / Company Name</Label>
          <Input id="ws-company" {...register('companyName')} className={errors.companyName ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ws-location" className="text-foreground">Store Location (City, Country)</Label>
          <Input id="ws-location" {...register('location')} className={errors.location ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ws-interest" className="text-foreground">Products of Interest</Label>
          <Input id="ws-interest" placeholder="e.g. Saffron Royal, All flavors" {...register('productInterest')} className={errors.productInterest ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.productInterest && <p className="text-sm text-destructive">{errors.productInterest.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ws-volume" className="text-foreground">Estimated Monthly Volume</Label>
          <Input id="ws-volume" placeholder="e.g. 500 units" {...register('volume')} className={errors.volume ? 'border-destructive' : 'bg-background text-foreground'} />
          {errors.volume && <p className="text-sm text-destructive">{errors.volume.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ws-contact" className="text-foreground">Contact Details (Name, Email, Phone)</Label>
        <Textarea 
          id="ws-contact" 
          rows={3}
          {...register('contactDetails')} 
          className={errors.contactDetails ? 'border-destructive' : 'bg-background text-foreground resize-none'} 
        />
        {errors.contactDetails && <p className="text-sm text-destructive">{errors.contactDetails.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base">
        {isSubmitting ? 'Submitting...' : 'Request Wholesale Catalog'}
      </Button>
    </form>
  );
};

export default WholesaleInquiryForm;
