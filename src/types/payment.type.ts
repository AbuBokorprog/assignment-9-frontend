export interface TPayment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId: string;
  paidAt: any;
  createdAt: string;
  updatedAt: string;
}
