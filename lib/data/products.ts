import { Product } from "../types";

// DUMMY — EDIT: All product details, nutrition values, and ingredients are indicative dummies.
export const products: Product[] = [
  {
    id: "prod_ginger_cardamom",
    slug: "ginger-cardamom-jaggery-cubes",
    name: "Ginger & Cardamom Jaggery Cubes",
    flavor: "Ginger & Cardamom",
    price: 249,
    originalPrice: 299,
    jarCount: 1,
    isOutOfStock: false,
    tags: ["Best Seller"],
    description: "A warming blend of natural ginger and aromatic cardamom mixed with our chemical-free jaggery. Traditionally enjoyed as a post-meal sweet to support digestion.",
    benefits: ["Traditionally enjoyed as a post-meal sweet", "Warming spices for cold days", "Chemical-free sweetness"],
    ingredients: ["100% Natural Jaggery", "Dry Ginger Powder", "Cardamom Powder"],
    nutrition: [
      { label: "Energy", value: "383 kcal" },
      { label: "Carbohydrates", value: "95 g" },
      { label: "Iron", value: "11 mg" }
    ],
    images: ["/images/products/ginger-cardamom-jaggery-cubes/jar.jpg"]
  },
  {
    id: "prod_mixed_dryfruits",
    slug: "mixed-dryfruits-jaggery-cubes",
    name: "Mixed Dryfruits Jaggery Cubes",
    flavor: "Mixed Dryfruits",
    price: 299,
    originalPrice: 349,
    jarCount: 1,
    isOutOfStock: false,
    tags: ["Premium", "New"],
    description: "Packed with the goodness of premium dry fruits. A rich, crunchy, and nutritious treat perfect for healthy snacking.",
    benefits: ["Rich in nuts and seeds", "Satisfying crunch", "Great for energy"],
    ingredients: ["100% Natural Jaggery", "Almonds", "Cashews", "Pistachios", "Raisins"],
    nutrition: [
      { label: "Energy", value: "410 kcal" },
      { label: "Carbohydrates", value: "88 g" },
      { label: "Protein", value: "4 g" }
    ],
    images: ["/images/products/mixed-dryfruits-jaggery-cubes/jar.jpg"]
  },
  {
    id: "prod_coconut",
    slug: "coconut-jaggery-cubes",
    name: "Coconut Jaggery Cubes",
    flavor: "Coconut",
    price: 249,
    originalPrice: 299,
    jarCount: 1,
    isOutOfStock: false,
    tags: [],
    description: "The tropical sweetness of real coconut meets traditional jaggery. A delightful pairing that brings traditional coastal flavors to your palate.",
    benefits: ["Tropical flavor profile", "Rich texture", "100% natural ingredients"],
    ingredients: ["100% Natural Jaggery", "Desiccated Coconut"],
    nutrition: [
      { label: "Energy", value: "395 kcal" },
      { label: "Carbohydrates", value: "92 g" },
      { label: "Fat", value: "2 g" }
    ],
    images: ["/images/products/coconut-jaggery-cubes/jar.jpg"]
  },
  {
    id: "prod_masala_paan",
    slug: "masala-paan-jaggery-cubes",
    name: "Masala Pan Jaggery Cubes",
    flavor: "Masala Pan",
    price: 249,
    originalPrice: 299,
    jarCount: 1,
    isOutOfStock: false,
    tags: ["Best Seller"],
    description: "The quintessential Indian mouth freshener reinvented. Enjoy the authentic taste of masala paan wrapped in healthy jaggery.",
    benefits: ["Excellent mouth freshener", "Authentic paan taste", "No refined sugar"],
    ingredients: ["100% Natural Jaggery", "Betel Leaf Extract", "Fennel Seeds", "Rose Petals (Gulkand)"],
    nutrition: [
      { label: "Energy", value: "380 kcal" },
      { label: "Carbohydrates", value: "94 g" },
      { label: "Iron", value: "10 mg" }
    ],
    images: ["/images/products/masala-paan-jaggery-cubes/jar.jpg"]
  },
  {
    id: "prod_butterscotch",
    slug: "butterscotch-jaggery-cubes",
    name: "Butterscotch Jaggery Cubes",
    flavor: "Butterscotch",
    price: 249,
    originalPrice: 299,
    jarCount: 1,
    isOutOfStock: false,
    tags: ["Kids Favorite"],
    description: "A fun twist on traditional gud. The buttery, caramelized notes of butterscotch make these cubes an instant hit with children and adults alike.",
    benefits: ["Kid-friendly taste", "Perfect refined sugar alternative", "Delicious dessert replacement"],
    ingredients: ["100% Natural Jaggery", "Natural Butterscotch Flavor"],
    nutrition: [
      { label: "Energy", value: "385 kcal" },
      { label: "Carbohydrates", value: "95 g" },
      { label: "Calcium", value: "80 mg" }
    ],
    images: ["/images/products/butterscotch-jaggery-cubes/jar.jpg"]
  },
  {
    id: "prod_family_box",
    slug: "assorted-family-box",
    name: "Assorted Family Box (5 × 500 g)",
    flavor: "Assorted",
    price: 1149,
    originalPrice: 1395,
    jarCount: 5,
    isOutOfStock: false,
    tags: ["Gift Pack", "Best Value"],
    description: "Experience all 5 signature Divekaa Global flavors in one grand bundle. Perfect for gifting, festivals, or stocking up your pantry for the month. Contains one 500g jar each of Ginger & Cardamom, Mixed Dryfruits, Coconut, Masala Pan, and Butterscotch.",
    benefits: ["Try all 5 flavors", "Great for family sharing", "Ideal festive gift"],
    ingredients: ["Refer to individual jars for ingredient details."],
    nutrition: [
      { label: "Note", value: "Indicative values. Refer to individual product labels." }
    ],
    images: ["/images/products/assorted-family-box/jar.jpg"]
  }
];