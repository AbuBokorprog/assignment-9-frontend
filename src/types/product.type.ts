import { TWishlist } from './wishlist.type';

export interface Product {
  id: string;
  name: string;
  images: string[];
  regular_price: number;
  discount_price?: number;
  category: string;
  inventory: number;
  stockStatus: string;
  shopId: string;
  shopName: string;
  createdAt: string;
  wishlist: TWishlist[];
  featured: boolean;
  productStatus: string;
  isActive: string;
}

export type productSize = {
  size: string;
  stock: number;
};
export type productColors = {
  color: string;
  code: string;
  stock: number;
};
