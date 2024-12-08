import { Product } from './product.type';
import { TAdmin } from './user.type';

export type TWishlist = {
  id: string;
  userId: string;
  user: TAdmin;
  productId: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
};
