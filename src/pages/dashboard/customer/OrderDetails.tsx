import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../redux/features/api/orders/orders.api';
import { TProductOrder } from '../../../types/order.type';
import Loader from '../../../components/ui/Loader';

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderByIdQuery(orderId);

  const orderStatusColors = {
    PENDING: 'warning',
    PROCESSING: 'info',
    SHIPPED: 'primary',
    DELIVERED: 'success',
    CANCELLED: 'error',
  } as const;

  const getStatusColor = (status: keyof typeof orderStatusColors) => {
    return orderStatusColors[status];
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <Box className="p-4 bg-gray-50">
        <div className="mb-4">
          <Typography variant="h5" component={'h5'} className="mb-2 text-bold">
            Order Details
          </Typography>
          <div className="grid grid-cols-4 items-center justify-between gap-4">
            <div>
              <Typography variant="subtitle2" color="textSecondary">
                Shipping Address
              </Typography>
              <Typography>{data?.data?.deliveryAddress}</Typography>
            </div>
            {data?.data?.id && (
              <div>
                <Typography variant="subtitle2" color="textSecondary">
                  Tracking Number
                </Typography>
                <Typography>{data?.data?.id}</Typography>
              </div>
            )}
            <div>
              <Typography variant="subtitle2" color="textSecondary">
                Order status
              </Typography>
              <Chip
                label={data?.data?.status}
                color={getStatusColor(data?.data?.status)}
              />
            </div>
            <Button
              variant="contained"
              color="error"
              disabled={
                data?.data?.status !== 'PENDING' ||
                data?.data?.status !== 'CANCELLED'
              }
            >
              Cancel
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <Typography variant="subtitle2" color="textSecondary">
                Payment Method
              </Typography>
              <Typography>
                {data?.data?.paymentType === 'ADV'
                  ? 'Advanced payment'
                  : 'Cash on Delivery (COD)'}
              </Typography>
            </div>
            {data?.data?.payment?.status && (
              <div>
                <Typography variant="subtitle2" color="textSecondary">
                  Payment
                </Typography>
                <Chip
                  label={data?.data?.payment?.status}
                  color={getStatusColor(data?.data?.payment?.status)}
                />
              </div>
            )}
          </div>
        </div>
        <Typography variant="h6" className="mb-2">
          Items
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.products?.map((item: TProductOrder) => (
              <TableRow key={item?.productId}>
                <TableCell>{item?.product?.name}</TableCell>
                <TableCell align="right">{item?.quantity}</TableCell>
                <TableCell align="right">${item?.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  ${(item?.quantity * item?.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <strong>Delivery Area</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{data?.data?.deliveryArea}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{data?.data?.deliveryCharge}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{data?.data?.deliveryCharge}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>${data?.data?.totalAmount.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default OrderDetails;
