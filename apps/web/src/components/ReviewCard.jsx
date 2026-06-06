import React from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';

const ReviewCard = ({ review }) => {
  const initials = review.author
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  // Generate deterministic pastel background based on name
  const colors = ['bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-rose-100 text-rose-700', 'bg-amber-100 text-amber-700', 'bg-purple-100 text-purple-700'];
  const colorIndex = review.author.length % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="card-premium p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
          <AvatarImage src={review.avatarUrl} alt={review.author} />
          <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-foreground text-sm">{review.author}</h4>
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="ml-auto text-xs text-muted-foreground">
          {review.date ? format(new Date(review.date), 'MMM d, yyyy') : ''}
        </span>
      </div>
      <blockquote className="text-foreground/80 text-sm leading-relaxed italic flex-grow">
        "{review.text}"
      </blockquote>
    </div>
  );
};

export default ReviewCard;
