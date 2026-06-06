import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/forms/ContactForm.jsx';
import BusinessInquiryForm from '@/components/forms/BusinessInquiryForm.jsx';
import WholesaleInquiryForm from '@/components/forms/WholesaleInquiryForm.jsx';
import { CONTACT_INFO, SOCIAL_URLS } from '@/data/constants.js';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/40 py-16 border-b border-border">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              We'd love to hear from you. Select the relevant inquiry type below.
            </motion.p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Info Column */}
              <div className="lg:col-span-1 space-y-10">
                <div className="bg-card rounded-2xl p-6 shadow-gold-sm border border-border">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Email Us</p>
                        <a href={`mailto:${CONTACT_INFO.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Call Us</p>
                        <p className="text-muted-foreground">{CONTACT_INFO.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Headquarters</p>
                        <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Business Hours</p>
                        <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                        <p className="text-sm text-muted-foreground mt-1 italic">Expect a response within 24-48 hours.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent-green text-accent-green-foreground rounded-2xl p-6 shadow-sm border border-transparent">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Quick Chat
                  </h3>
                  <p className="mb-4 text-accent-green-foreground/80 text-sm leading-relaxed">
                    Have a quick question about an order or flavor? Reach out to us on WhatsApp for faster support.
                  </p>
                  <a 
                    href="https://wa.me/919876543210" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-white text-accent-green font-semibold rounded-full hover:bg-gray-100 transition-colors w-full"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Forms Column */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-gold-sm border border-border">
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="w-full flex flex-col sm:flex-row h-auto p-1 bg-secondary rounded-xl mb-8">
                      <TabsTrigger value="general" className="flex-1 text-sm rounded-lg py-2.5">General Inquiry</TabsTrigger>
                      <TabsTrigger value="business" className="flex-1 text-sm rounded-lg py-2.5">Business / Corporate</TabsTrigger>
                      <TabsTrigger value="wholesale" className="flex-1 text-sm rounded-lg py-2.5">Wholesale</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general" className="mt-0 focus-visible:outline-none">
                      <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                      <ContactForm />
                    </TabsContent>
                    
                    <TabsContent value="business" className="mt-0 focus-visible:outline-none">
                      <h2 className="text-2xl font-bold mb-2">Corporate Gifting & Partnerships</h2>
                      <p className="text-muted-foreground mb-6 text-sm">Perfect for festive gifting, events, or brand collaborations.</p>
                      <BusinessInquiryForm />
                    </TabsContent>
                    
                    <TabsContent value="wholesale" className="mt-0 focus-visible:outline-none">
                      <h2 className="text-2xl font-bold mb-2">Stock Gud Bite</h2>
                      <p className="text-muted-foreground mb-6 text-sm">Request our catalog and pricing for retail distribution.</p>
                      <WholesaleInquiryForm />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
