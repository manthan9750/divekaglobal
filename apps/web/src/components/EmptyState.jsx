import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';

const EmptyState = ({ title, description, icon: Icon, ctaText = 'Continue Shopping', ctaLink = '/products' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-2xl shadow-gold-sm border border-border"
    >
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-sm">
        {Icon && <Icon className="w-10 h-10 text-primary" />}
      </div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      <Button asChild size="lg" className="rounded-full px-8">
        <Link to={ctaLink}>{ctaText}</Link>
      </Button>
    </motion.div>
  );
};

export default EmptyState;
