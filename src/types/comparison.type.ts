import { Product } from './product.type';

export type TComparison = {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  rating: string;
  createdAt: string;
  updatedAt: string;
};
