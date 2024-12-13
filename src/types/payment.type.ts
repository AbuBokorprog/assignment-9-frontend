export interface TPayment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: 'PAID' | 'UNPAID' | 'FAILED' | 'REFUNDED';
  transactionId: string;
  paidAt: any;
  createdAt: string;
  updatedAt: string;
}
