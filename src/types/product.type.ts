import { TCategory } from './categories.type';
import { TReview } from './review.type';
import { TAdmin } from './user.type';
import { TWishlist } from './wishlist.type';

export interface Product {
  id: string;
  name: string;
  images: string[];
  regular_price: number;
  discount_price?: number;
  categoryId: string;
  category: TCategory;
  inventory: number;
  stockStatus: string;
  shopId: string;
  shopName: string;
  vendor?: TAdmin;
  createdAt: string;
  wishlist?: TWishlist[];
  featured: boolean;
  productStatus: string;
  isActive: string;
  reviews: TReview[];
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

export type TRecentProduct = {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
};
