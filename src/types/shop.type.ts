import { TOrder } from './order.type';
import { Product } from './product.type';
import { TAdmin } from './user.type';

export interface Shop {
  id: string;
  shopName: string;
  shopLogo: string;
  shopCover: string;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  vendor: TAdmin;
  orders: TOrder[];
  products: Product[];
  address: string;
  phone: string;
  website?: string;
  isActive: string;
  category: string;
  createdAt: string;
}
