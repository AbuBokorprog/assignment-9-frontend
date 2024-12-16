import { TCategory } from './categories.type';
import { TOrder } from './order.type';
import { Product } from './product.type';
import { TReview } from './review.type';
import { TActive } from './type';
import { TAdmin } from './user.type';

export interface TShop {
  id: string;
  shopName: string;
  shopLogo: string;
  shopCover: string;
  vendor: TAdmin;
  orders: TOrder[];
  products: Product[];
  reviews: TReview[];
  address: string;
  isActive: TActive;
  createdAt: string;
  category: TCategory;
  followers: any[];
  description?: string;
  registrationNumber?: string;
}

export interface TFollowShop {
  createdAt: string;
  customerId: string;
  shop: TShop;
  id: string;
  shopId: string;
  updatedAt: string;
}
