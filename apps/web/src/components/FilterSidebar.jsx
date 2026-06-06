import React from 'react';
import { Slider } from '@/components/ui/slider.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.jsx';
import { FLAVORS, TAGS } from '@/data/constants.js';
import { X, Star } from 'lucide-react';

const FilterSidebar = ({ filters, filterActions, className }) => {
  const { selectedFlavors, priceRange, selectedRating, selectedTags } = filters;
  const { toggleFlavor, updatePriceRange, updateRating, toggleTag, resetFilters, hasActiveFilters } = filterActions;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters() && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-muted-foreground hover:text-foreground">
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['flavors', 'price', 'rating', 'tags']} className="w-full">
        
        {/* Tags Filter */}
        <AccordionItem value="tags" className="border-b-0">
          <AccordionTrigger className="hover:no-underline font-semibold py-3">Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-2">
              {TAGS.map(tag => (
                <div key={tag} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`tag-${tag}`} 
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm font-medium leading-none cursor-pointer">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price" className="border-b-0 mt-2">
          <AccordionTrigger className="hover:no-underline font-semibold py-3">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2 pb-2">
              <Slider
                defaultValue={[0, 600]}
                max={600}
                step={10}
                value={[priceRange.min, priceRange.max]}
                onValueChange={([min, max]) => updatePriceRange(min, max)}
                className="mb-6"
              />
              <div className="flex items-center justify-between text-sm font-medium">
                <span>₹{priceRange.min}</span>
                <span>₹{priceRange.max}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating" className="border-b-0 mt-2">
          <AccordionTrigger className="hover:no-underline font-semibold py-3">Minimum Rating</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-2">
              {[4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`rating-${rating}`} 
                    checked={selectedRating === rating}
                    onCheckedChange={(checked) => updateRating(checked ? rating : 0)}
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                      ))}
                    </div>
                    <span className="text-sm">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Flavors Filter */}
        <AccordionItem value="flavors" className="border-b-0 mt-2">
          <AccordionTrigger className="hover:no-underline font-semibold py-3">Flavors</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-2 max-h-60 overflow-y-auto pr-2">
              {FLAVORS.map(flavor => (
                <div key={flavor} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`flavor-${flavor}`} 
                    checked={selectedFlavors.includes(flavor)}
                    onCheckedChange={() => toggleFlavor(flavor)}
                  />
                  <Label htmlFor={`flavor-${flavor}`} className="text-sm font-medium leading-none cursor-pointer">
                    {flavor}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
};

export default FilterSidebar;
