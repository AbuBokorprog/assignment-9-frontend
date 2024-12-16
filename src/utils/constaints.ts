export const getStatusColor = <T extends string>(
  status: T,
  statusColors: Record<
    T,
    'success' | 'error' | 'warning' | 'secondary' | 'info' | 'primary'
  >
):
  | 'success'
  | 'error'
  | 'warning'
  | 'secondary'
  | 'info'
  | 'primary'
  | undefined => {
  return statusColors[status];
};

// ------------------------------ COLORS
export const activeStatusColor = {
  APPROVED: 'success',
  PENDING: 'warning',
  REJECT: 'error',
  DELETE: 'error',
  BLOCK: 'info',
} as const;

export const stockColors = {
  IN_STOCK: 'success',
  LOW_STOCK: 'warning',
  OUT_OF_STOCK: 'error',
} as const;

export const orderStatusColors = {
  PENDING: 'warning',
  PROCESSING: 'info',
  SHIPPED: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
} as const;

export const paymentStatusColors = {
  PAID: 'success',
  UNPAID: 'error',
  FAILED: 'warning',
  REFUNDED: 'primary',
} as const;
