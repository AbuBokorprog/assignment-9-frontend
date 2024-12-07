export interface Product {
  id: string;
  name: string;
  images: string[];
  regular_price: number;
  discount_price?: number;
  category: string;
  inventory: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  shopId: string;
  shopName: string;
  createdAt: string;
  featured: boolean;
  productStatus: string;
  isActive: string;
}
