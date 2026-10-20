import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/config/site";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Divekaa Global for support, feedback, or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get in Touch" subtitle="We'd love to hear from you. Reach out to us directly or fill out the form." />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl bg-white p-8 shadow-soft border border-gray-100 flex items-start gap-4">
              <MapPin className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-navy mb-2">Office & Dispatch</h4>
                <p className="text-sm text-charcoal/80 leading-relaxed">{siteConfig.company.address}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-soft border border-gray-100 flex items-start gap-4">
              <Phone className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-navy mb-2">Phone / WhatsApp</h4>
                <p className="text-sm text-charcoal/80">+91 {siteConfig.company.primaryPhone}</p>
                <p className="text-sm text-charcoal/80">+91 {siteConfig.company.secondaryPhone}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-soft border border-gray-100 flex items-start gap-4">
              <Mail className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-navy mb-2">Email</h4>
                <a href={`mailto:${siteConfig.company.email}`} className="text-sm text-charcoal/80 hover:text-gold transition-colors">{siteConfig.company.email}</a>
              </div>
            </div>
            
            <div className="rounded-2xl bg-white p-8 shadow-soft border border-gray-100 flex items-start gap-4">
              <Clock className="h-6 w-6 text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-navy mb-2">Business Hours</h4>
                <p className="text-sm text-charcoal/80">Monday - Saturday</p>
                <p className="text-sm text-charcoal/80">10:00 AM - 6:00 PM (IST)</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-8 md:p-12 shadow-soft border border-gray-100">
            <h3 className="font-playfair text-2xl font-bold text-navy mb-6">Send us a Message</h3>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}