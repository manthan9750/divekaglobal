import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Truck, FastForward, Zap } from 'lucide-react';
import { formatPrice } from '@/utils/productHelpers.js';

const ShippingSelector = ({ selectedMethod, onSelectMethod }) => {
  const options = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      cost: 0,
      time: '5-7 business days',
      icon: Truck
    },
    {
      id: 'express',
      name: 'Express Delivery',
      cost: 415, /* Roughly $5 in INR */
      time: '2-3 business days',
      icon: FastForward
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      cost: 1245, /* Roughly $15 in INR */
      time: 'Next business day',
      icon: Zap
    }
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-8">
      <h3 className="text-xl font-bold mb-6">Shipping Method</h3>
      
      <RadioGroup value={selectedMethod} onValueChange={onSelectMethod} className="space-y-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedMethod === option.id;
          
          return (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <div>
                  <div className="font-semibold flex items-center gap-2 mb-1 text-foreground">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    {option.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estimated: {option.time}
                  </div>
                </div>
              </div>
              <div className="font-semibold text-foreground">
                {option.cost === 0 ? 'Free' : formatPrice(option.cost)}
              </div>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default ShippingSelector;
