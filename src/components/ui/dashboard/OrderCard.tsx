import React from 'react';
import { TOrder } from '../../../types/order.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type OrderCardProps = {
  order: TOrder;
  setExpandedOrder: any;
  expandedOrder: any;
};

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  setExpandedOrder,
  expandedOrder,
}) => {
  const getStatusColor = (status: TOrder['status']) => {
    const colors = {
      PENDING: 'warning',
      PROCESSING: 'info',
      SHIPPED: 'primary',
      DELIVERED: 'success',
      CANCELLED: 'error',
    };
    return colors[status];
  };
  return (
    <React.Fragment key={order?.id}>
      <TableRow className="hover:bg-gray-50">
        <TableCell>
          <IconButton
            size="small"
            onClick={() =>
              setExpandedOrder(expandedOrder === order?.id ? null : order?.id)
            }
          >
            {expandedOrder === order?.id ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order?.id}</TableCell>
        <TableCell>{new Date(order?.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>
          <div>
            <div className="font-medium">{order?.customer?.customer?.name}</div>
            <div className="text-sm text-gray-500">
              {order?.customer?.email}
            </div>
          </div>
        </TableCell>
        <TableCell>${order?.totalAmount.toFixed(2)}</TableCell>
        <TableCell>
          <Chip
            label={order?.status}
            color={getStatusColor(order?.status)}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Chip label={'Unpaid'} color={'error'} size="small" />
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            size="small"
            onClick={() => console.log('Update status:', order?.id)}
          >
            Update Status
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse
            in={expandedOrder === order?.id}
            timeout="auto"
            unmountOnExit
          >
            <Box className="p-4 bg-gray-50">
              <div className="mb-4">
                <Typography variant="h6" className="mb-2">
                  Order Details
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography variant="subtitle2" color="textSecondary">
                      Shipping Address
                    </Typography>
                    <Typography>{order?.deliveryAddress}</Typography>
                  </div>
                  {order?.id && (
                    <div>
                      <Typography variant="subtitle2" color="textSecondary">
                        Tracking Number
                      </Typography>
                      <Typography>{order?.id}</Typography>
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
                  {order?.products?.map((item) => (
                    <TableRow key={item?.productId}>
                      <TableCell>{item?.product?.name}</TableCell>
                      <TableCell align="right">{item?.quantity}</TableCell>
                      <TableCell align="right">
                        ${item?.price.toFixed(2)}
                      </TableCell>
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
                      <strong>{order?.deliveryArea}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{order?.deliveryCharge}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{order?.deliveryCharge}</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>${order?.totalAmount.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default OrderCard;
