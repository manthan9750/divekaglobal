import masalaPaan from '@/assets/products/masala-paan.jpg';
import saffronRoyal from '@/assets/products/saffron-royal.jpg';
import butterscotch from '@/assets/products/butterscotch.jpg';
import roseDelight from '@/assets/products/rose-delight.jpg';
import tulsiGinger from '@/assets/products/tulsi-ginger.jpg';
import lemonMint from '@/assets/products/lemon-mint.jpg';
import elaichiDelight from '@/assets/products/elaichi-delight.jpg';
import chocolateFusion from '@/assets/products/chocolate-fusion.jpg';
import fennelFresh from '@/assets/products/fennel-fresh.jpg';
import mangoTwist from '@/assets/products/mango-twist.jpg';
import coconutJaggery from '@/assets/products/coconut-jaggery.jpg';
import gingerCardamom from '@/assets/products/ginger-cardamom.jpg';

const products = [
  {
    id: 'gud-bite-masala-paan',
    name: 'Gud Bite - Masala Paan',
    flavor: 'Masala Paan',
    description: 'Experience the authentic taste of traditional Indian paan with a wellness twist. Rich in natural ingredients that aid digestion and freshen breath.',
    flavorProfile: 'Aromatic, sweet, mildly spiced with notes of betel leaf and fennel.',
    heritageStory: 'Inspired by the centuries-old Indian tradition of concluding meals with a refreshing paan, crafted to deliver the same aromatic satisfaction without refined sugar.',
    price: 349,
    originalPrice: 449,
image: masalaPaan,
images: [masalaPaan],
    rating: 4.8,
    reviews: [
      { author: 'Meera Iyer', rating: 5, text: 'Authentic paan flavor without the mess. Love the natural ingredients!', date: '2026-05-28' },
      { author: 'Vikram Joshi', rating: 4, text: 'Great taste and helps with digestion after meals.', date: '2026-05-22' }
    ],
    healthBenefits: ['Aids digestion naturally', 'Freshens breath instantly', 'Rich in antioxidants'],
    useCases: ['Post-meal digestive', 'Afternoon breath freshener', 'Guilt-free sweet craving'],
    ingredients: ['Betel leaf extract', 'Fennel seeds', 'Cardamom', 'Rose petals', 'Jaggery', 'Mint'],
    tags: ['Best Seller', 'Premium', 'Wellness'],
    inStock: true,
    sku: 'GB-MP-001'
  },
  {
    id: 'gud-bite-saffron-royal',
    name: 'Gud Bite - Saffron Royal',
    flavor: 'Saffron Royal',
    description: 'Indulge in the luxury of pure saffron combined with premium jaggery. Known for its mood-enhancing properties and rich antioxidants.',
    flavorProfile: 'Luxurious, rich, delicately floral with warm honey-like undertones.',
    heritageStory: 'Saffron, the golden spice of royalty, has been a centerpiece of Indian luxury for generations. We bring this majestic ingredient into a daily wellness bite.',
    price: 499,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1677299235887-294150f9124c',
    images: [
      'https://images.unsplash.com/photo-1677299235887-294150f9124c',
      'https://images.unsplash.com/photo-1676448672121-ce09fbbf69e5'
    ],
    rating: 5.0,
    reviews: [
      { author: 'Anjali Desai', rating: 5, text: 'The saffron quality is exceptional. You can taste the premium ingredients.', date: '2026-06-01' },
      { author: 'Rahul Khanna', rating: 5, text: 'Worth every rupee. Luxurious flavor and great for stress relief.', date: '2026-05-27' }
    ],
    healthBenefits: ['Enhances mood naturally', 'Rich in antioxidants', 'Supports cognitive function'],
    useCases: ['Evening relaxation', 'Premium gifting', 'Festive celebrations'],
    ingredients: ['Pure saffron', 'Almonds', 'Pistachios', 'Cardamom', 'Jaggery'],
    tags: ['Premium', 'Wellness'],
    inStock: true,
    sku: 'GB-SR-002'
  },
  {
    id: 'gud-bite-butterscotch',
    name: 'Gud Bite - Butterscotch',
    flavor: 'Butterscotch',
    description: 'Classic butterscotch flavor reimagined with natural ingredients. Satisfies sweet cravings while providing sustained energy.',
    flavorProfile: 'Creamy, buttery, deep caramel notes with a satisfying crunch.',
    heritageStory: 'A nostalgic nod to childhood favorites, reimagined for the modern, health-conscious consumer using unrefined jaggery.',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1666973523950-3ca3149d348c',
    images: [
      'https://images.unsplash.com/photo-1666973523950-3ca3149d348c',
      'https://images.unsplash.com/photo-1672702959512-af149104c388'
    ],
    rating: 4.6,
    reviews: [
      { author: 'Neha Singh', rating: 5, text: 'Tastes just like childhood memories but healthier.', date: '2026-05-30' },
      { author: 'Arjun Patel', rating: 4, text: 'Delicious and not overly sweet. The crunch is perfect.', date: '2026-05-24' }
    ],
    healthBenefits: ['Sustained energy release', 'No artificial flavors', 'Mineral-rich sweetness'],
    useCases: ['Afternoon energy dip', 'Kids lunchbox', 'Pre-workout snack'],
    ingredients: ['Jaggery', 'Cashews', 'Natural butter extract', 'Sea salt'],
    tags: ['Best Seller', 'Natural'],
    inStock: true,
    sku: 'GB-BS-003'
  },
  {
    id: 'gud-bite-rose-delight',
    name: 'Gud Bite - Rose Delight',
    flavor: 'Rose Delight',
    description: 'Delicate rose essence combined with traditional wellness ingredients. Known for its cooling properties and calming effects.',
    flavorProfile: 'Floral, sweet, cooling with a soft, lingering perfume.',
    heritageStory: 'Rose has been used in Ayurvedic practices to calm the mind and cool the body. We capture this essence in every bite.',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1672702959512-af149104c388',
    images: [
      'https://images.unsplash.com/photo-1672702959512-af149104c388'
    ],
    rating: 4.9,
    reviews: [
      { author: 'Pooja Reddy', rating: 5, text: 'The rose flavor is elegant and calming.', date: '2026-06-02' }
    ],
    healthBenefits: ['Cooling body naturally', 'Supports skin health', 'Calming aromatherapy'],
    useCases: ['Summer refreshment', 'Stress relief', 'Bedtime treat'],
    ingredients: ['Rose petals', 'Gulkand', 'Fennel', 'Jaggery'],
    tags: ['Premium', 'Wellness'],
    inStock: true,
    sku: 'GB-RD-004'
  },
  {
    id: 'gud-bite-tulsi-ginger',
    name: 'Gud Bite - Tulsi Ginger',
    flavor: 'Tulsi Ginger',
    description: 'Powerful combination of holy basil and ginger for immunity support. Traditional Ayurvedic ingredients that boost natural defenses.',
    flavorProfile: 'Earthy, slightly peppery, warming with a fresh herbal finish.',
    heritageStory: 'Tulsi (Holy Basil) and Ginger are the cornerstones of Indian home remedies. This bite is your daily dose of ancestral wisdom.',
    price: 329,
    originalPrice: 429,
    image: 'https://images.unsplash.com/photo-1532666661413-871a4227e256',
    images: [
      'https://images.unsplash.com/photo-1532666661413-871a4227e256'
    ],
    rating: 4.7,
    reviews: [
      { author: 'Sanjay Gupta', rating: 5, text: 'Perfect for immunity. The tulsi-ginger combo is powerful.', date: '2026-05-29' }
    ],
    healthBenefits: ['Boosts immunity naturally', 'Anti-inflammatory properties', 'Aids respiratory health'],
    useCases: ['Morning routine', 'Seasonal transitions', 'Throat comfort'],
    ingredients: ['Tulsi (Holy Basil)', 'Fresh ginger', 'Black pepper', 'Jaggery'],
    tags: ['New', 'Wellness'],
    inStock: true,
    sku: 'GB-TG-005'
  },
  {
    id: 'gud-bite-lemon-mint',
    name: 'Gud Bite - Lemon Mint',
    flavor: 'Lemon Mint',
    description: 'Refreshing citrus burst combined with cooling mint. Perfect for instant freshness and digestive support.',
    flavorProfile: 'Zesty, bright, intensely refreshing with a cool minty finish.',
    heritageStory: 'Inspired by the classic Indian summer drink Nimbu Pani, captured in a convenient, health-boosting bite.',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1685364085151-39d35cbace40',
    images: [
      'https://images.unsplash.com/photo-1685364085151-39d35cbace40'
    ],
    rating: 4.5,
    reviews: [
      { author: 'Ritu Saxena', rating: 4, text: 'So refreshing! Perfect after meals.', date: '2026-06-03' }
    ],
    healthBenefits: ['Instant breath freshener', 'Aids digestion', 'Rich in vitamin C'],
    useCases: ['Post-lunch refresher', 'Travel companion', 'Palate cleanser'],
    ingredients: ['Fresh lemon extract', 'Mint leaves', 'Fennel', 'Jaggery'],
    tags: ['Natural'],
    inStock: true,
    sku: 'GB-LM-006'
  },
  {
    id: 'gud-bite-elaichi-delight',
    name: 'Gud Bite - Elaichi Delight',
    flavor: 'Elaichi Delight',
    description: 'Premium green cardamom in every bite for aromatic wellness. Known for digestive benefits and breath freshening.',
    flavorProfile: 'Intensely aromatic, sweet, herbal with hints of eucalyptus.',
    heritageStory: 'Cardamom is the queen of spices. We use handpicked green pods to ensure the most vibrant, authentic flavor.',
    price: 329,
    originalPrice: 429,
    image: 'https://images.unsplash.com/photo-1622957744298-a874da73e802',
    images: [
      'https://images.unsplash.com/photo-1622957744298-a874da73e802'
    ],
    rating: 4.8,
    reviews: [
      { author: 'Lakshmi Rao', rating: 5, text: 'The cardamom quality is outstanding.', date: '2026-05-31' }
    ],
    healthBenefits: ['Aids digestion naturally', 'Freshens breath', 'Aromatic therapy'],
    useCases: ['Daily wellness', 'After-dinner mint alternative'],
    ingredients: ['Green cardamom', 'Jaggery', 'Ghee'],
    tags: ['Classic', 'Wellness'],
    inStock: true,
    sku: 'GB-ED-007'
  },
  {
    id: 'gud-bite-chocolate-fusion',
    name: 'Gud Bite - Chocolate Fusion',
    flavor: 'Chocolate Fusion',
    description: 'Rich cocoa blended with wellness ingredients for guilt-free indulgence. Antioxidant-rich dark chocolate meets traditional jaggery.',
    flavorProfile: 'Deep, earthy cocoa, perfectly balanced with the caramel notes of jaggery.',
    heritageStory: 'Bridging the gap between a modern chocolate craving and traditional unrefined sweetness.',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1625753733975-b20b4973200d',
    images: [
      'https://images.unsplash.com/photo-1625753733975-b20b4973200d'
    ],
    rating: 4.9,
    reviews: [
      { author: 'Simran Kaur', rating: 5, text: 'Best chocolate flavor with health benefits.', date: '2026-06-04' }
    ],
    healthBenefits: ['Rich in antioxidants', 'Mood enhancing', 'Natural energy boost'],
    useCases: ['Dessert replacement', 'Mid-day slump', 'Coffee pairing'],
    ingredients: ['Dark cocoa', 'Almonds', 'Jaggery', 'Vanilla extract'],
    tags: ['Best Seller', 'Premium'],
    inStock: true,
    sku: 'GB-CF-008'
  },
  {
    id: 'gud-bite-fennel-fresh',
    name: 'Gud Bite - Fennel Fresh',
    flavor: 'Fennel Fresh',
    description: 'Pure fennel seeds for traditional digestive support. Time-tested Ayurvedic remedy in a convenient, delicious form.',
    flavorProfile: 'Sweet, licorice-like, deeply refreshing and crisp.',
    heritageStory: 'Saunf (fennel) is a staple in every Indian household for good digestion. We’ve elevated it into a perfect daily bite.',
    price: 279,
    originalPrice: 379,
    image: 'https://images.unsplash.com/photo-1612357005122-d4845440510f',
    images: [
      'https://images.unsplash.com/photo-1612357005122-d4845440510f'
    ],
    rating: 4.6,
    reviews: [
      { author: 'Deepak Sharma', rating: 4, text: 'Classic fennel taste. Works wonders for digestion.', date: '2026-05-27' }
    ],
    healthBenefits: ['Aids digestion', 'Reduces bloating', 'Traditional Ayurvedic remedy'],
    useCases: ['Post-heavy meal', 'Everyday digestion'],
    ingredients: ['Premium fennel seeds', 'Jaggery', 'Mint'],
    tags: ['Natural'],
    inStock: true,
    sku: 'GB-FF-009'
  },
  {
    id: 'gud-bite-mango-twist',
    name: 'Gud Bite - Mango Twist',
    flavor: 'Mango Twist',
    description: 'Tropical mango flavor with a wellness twist. Rich in vitamins and natural sweetness. A taste of summer in every bite.',
    flavorProfile: 'Fruity, tangy, bursting with ripe Alphonso mango sweetness.',
    heritageStory: 'Celebrating the king of fruits, this bite captures the joy of Indian summers using real fruit pulp and jaggery.',
    price: 329,
    originalPrice: 429,
    image: 'https://images.unsplash.com/photo-1677581329080-f7895dcdfcdd',
    images: [
      'https://images.unsplash.com/photo-1677581329080-f7895dcdfcdd'
    ],
    rating: 4.7,
    reviews: [
      { author: 'Shreya Jain', rating: 5, text: 'Tastes like real mangoes! The natural flavor is incredible.', date: '2026-06-05' }
    ],
    healthBenefits: ['Rich in vitamins A & C', 'Natural energy source', 'Supports immunity'],
    useCases: ['Sweet craving', 'Kid-friendly snack'],
    ingredients: ['Mango pulp', 'Cardamom', 'Jaggery'],
    tags: ['New', 'Fruity'],
    inStock: true,
    sku: 'GB-MT-010'
  },
  {
    id: 'gud-bite-coconut-jaggery',
    name: 'Gud Bite - Coconut Jaggery',
    flavor: 'Coconut Jaggery',
    description: 'Traditional jaggery sweetness meets tropical coconut. Natural iron-rich sweetener with coconut benefits.',
    flavorProfile: 'Nutty, rich caramel, with toasted coconut texture.',
    heritageStory: 'A combination deeply rooted in coastal Indian traditions, offering wholesome fats and unrefined sugars.',
    price: 319,
    originalPrice: 419,
    image: 'https://images.unsplash.com/photo-1646685179802-56dd30d6fd3a',
    images: [
      'https://images.unsplash.com/photo-1646685179802-56dd30d6fd3a'
    ],
    rating: 4.8,
    reviews: [
      { author: 'Karthik Nair', rating: 5, text: 'The jaggery-coconut combo is perfect.', date: '2026-05-26' }
    ],
    healthBenefits: ['Rich in iron', 'Healthy fats', 'Sustained energy'],
    useCases: ['Pre-workout', 'Fasting days'],
    ingredients: ['Organic jaggery', 'Desiccated coconut', 'Cardamom', 'Ghee'],
    tags: ['Wellness', 'Natural'],
    inStock: true,
    sku: 'GB-CJ-011'
  },
  {
    id: 'gud-bite-ginger-cardamom',
    name: 'Gud Bite - Ginger Cardamom',
    flavor: 'Ginger Cardamom',
    description: 'Warming ginger paired with aromatic cardamom for digestive wellness. Perfect for cold weather and digestion.',
    flavorProfile: 'Spicy, warm, deeply aromatic with a lingering pleasant heat.',
    heritageStory: 'The ultimate comforting spice duo from traditional Indian Chai, transformed into a convenient wellness bite.',
    price: 329,
    originalPrice: 429,
    image: 'https://images.unsplash.com/photo-1559716701-314fb2ab531e',
    images: [
      'https://images.unsplash.com/photo-1559716701-314fb2ab531e'
    ],
    rating: 4.9,
    reviews: [
      { author: 'Ramesh Gupta', rating: 5, text: 'The warming effect is amazing. Perfect for winter.', date: '2026-05-25' }
    ],
    healthBenefits: ['Aids digestion', 'Warming properties', 'Anti-inflammatory'],
    useCases: ['Winter wellness', 'Sore throat relief', 'Tea companion'],
    ingredients: ['Fresh ginger', 'Green cardamom', 'Jaggery', 'Black pepper'],
    tags: ['Premium', 'Wellness'],
    inStock: true,
    sku: 'GB-GC-012'
  }
];

export default products;
