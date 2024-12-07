export interface CartProduct {
  product: {
    name: string;
    images: string[];
  };
  price: number;
  qty: number;
  color?: string;
  size?: string;
  id: string;
}
