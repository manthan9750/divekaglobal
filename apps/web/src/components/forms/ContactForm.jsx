import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Input } from '../components/ui/input.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { Button } from '../components/ui/button.jsx';
import { Label } from '../components/ui/label.jsx';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data) => {
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    
    toast.success('Message sent successfully! We will get back to you soon.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contact-name" className="text-foreground">Full Name</Label>
        <Input 
          id="contact-name" 
          placeholder="Jane Doe" 
          {...register('name')} 
          className={errors.name ? 'border-destructive focus-visible:ring-destructive' : 'bg-background text-foreground'}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email" className="text-foreground">Email Address</Label>
        <Input 
          id="contact-email" 
          type="email" 
          placeholder="jane@example.com" 
          {...register('email')} 
          className={errors.email ? 'border-destructive focus-visible:ring-destructive' : 'bg-background text-foreground'}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-foreground">Message</Label>
        <Textarea 
          id="contact-message" 
          placeholder="How can we help you?" 
          rows={5}
          {...register('message')} 
          className={errors.message ? 'border-destructive focus-visible:ring-destructive' : 'bg-background text-foreground resize-none'}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
