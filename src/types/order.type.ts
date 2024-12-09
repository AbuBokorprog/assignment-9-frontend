import { Product } from './product.type';

export interface TOrder {
  id: string;
  customerId: string;
  totalAmount: number;
  status: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  deliveryArea: string;
  deliveryCharge: number;
  city: string;
  quantity: number;
  postalCode: number;
  paymentType: string;
  createdAt: string;
  updatedAt: string;
  products: TProductOrder[];
}

export interface TProductOrder {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  size: any;
  color: any;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
