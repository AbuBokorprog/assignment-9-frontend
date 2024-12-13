import { Product } from './product.type';
import { TUser } from './user.type';

export type TReview = {
  id: string;
  rating: number;
  comment?: string;
  customerId: string;
  productId: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  product?: Product;
  customer?: TUser;
  reviewStatus: 'PENDING' | 'APPROVED' | 'REJECT' | 'DELETE';
};
