import { Product } from './product.type';

export interface TCartProduct {
  id: string;
  customerId: string;
  productId: string;
  vendorId: string;
  color: any;
  size: any;
  qty: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
