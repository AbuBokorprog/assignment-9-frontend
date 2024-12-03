export interface Product {
  id: string | number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
  isFeatured?: boolean;
  description?: string;
  category?: string;
  stock?: number;
}

export const productsData: Product[] = [
  {
    id: 1,
    name: "Men's Premium Cotton T-Shirt",
    slug: 'mens-premium-cotton-tshirt',
    price: 599,
    originalPrice: 799,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.5,
    reviews: 128,
    isNew: true,
    discount: 25,
    category: "Men's Fashion",
    stock: 50,
    description:
      'Premium quality cotton t-shirt with comfortable fit and stylish design.',
  },
  {
    id: 2,
    name: "Women's Designer Handbag",
    slug: 'womens-designer-handbag',
    price: 2499,
    originalPrice: 2999,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.8,
    reviews: 89,
    isFeatured: true,
    discount: 17,
    category: 'Accessories',
    stock: 15,
    description:
      'Elegant designer handbag made with premium materials and exquisite craftsmanship.',
  },
  {
    id: 3,
    name: 'Wireless primarytooth Earbuds',
    slug: 'wireless-primarytooth-earbuds',
    price: 1299,
    originalPrice: 1599,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.3,
    reviews: 245,
    isNew: true,
    category: 'Electronics',
    stock: 30,
    description:
      'High-quality wireless earbuds with exceptional sound and long battery life.',
  },
  {
    id: 4,
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    price: 3499,
    originalPrice: 3999,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.6,
    reviews: 167,
    isFeatured: true,
    discount: 13,
    category: 'Electronics',
    stock: 25,
    description:
      'Advanced fitness tracker with heart rate monitoring and sleep tracking features.',
  },
  {
    id: 5,
    name: 'Professional DSLR Camera',
    slug: 'professional-dslr-camera',
    price: 49999,
    originalPrice: 54999,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.9,
    reviews: 78,
    isFeatured: true,
    category: 'Electronics',
    stock: 10,
    description:
      'High-end DSLR camera for professional photography with advanced features.',
  },
  {
    id: 6,
    name: 'Leather Wallet',
    slug: 'leather-wallet',
    price: 899,
    originalPrice: 999,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.4,
    reviews: 156,
    discount: 10,
    category: 'Accessories',
    stock: 45,
    description:
      'Genuine leather wallet with multiple card slots and sleek design.',
  },
  {
    id: 7,
    name: 'Running Shoes',
    slug: 'running-shoes',
    price: 2799,
    originalPrice: 3299,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.7,
    reviews: 203,
    isNew: true,
    discount: 15,
    category: 'Footwear',
    stock: 30,
    description:
      'Comfortable and durable running shoes with excellent support.',
  },
  {
    id: 8,
    name: 'Mechanical Keyboard',
    slug: 'mechanical-keyboard',
    price: 4499,
    originalPrice: 4999,
    imageUrl:
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3',
    rating: 4.5,
    reviews: 112,
    isFeatured: true,
    category: 'Electronics',
    stock: 20,
    description: 'High-performance mechanical keyboard with RGB backlight.',
  },
];

// Featured products
export const featuredProducts = productsData.filter(
  (product) => product.isFeatured
);

// New arrivals
export const newArrivals = productsData.filter((product) => product.isNew);

// Discounted products
export const discountedProducts = productsData.filter(
  (product) => product.discount
);

// Get products by category
export const getProductsByCategory = (category: string) => {
  return productsData.filter((product) => product.category === category);
};

// Get product by slug
export const getProductBySlug = (slug: string) => {
  return productsData.find((product) => product.slug === slug);
};
