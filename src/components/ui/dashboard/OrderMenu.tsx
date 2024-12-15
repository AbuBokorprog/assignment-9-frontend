import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { toast } from 'sonner';
import { useUpdateOrderStatusMutation } from '../../../redux/features/api/orders/orders.api';
import { useUpdatePaymentStatusMutation } from '../../../redux/features/api/payment/PaymentApi';

type UserMenuProps = {
  orderId: string;
  paymentId: string;
};

const OrderMenu: React.FC<UserMenuProps> = ({ orderId, paymentId }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [orderStatusUpdate] = useUpdateOrderStatusMutation();
  const [paymentStatusUpdate] = useUpdatePaymentStatusMutation();

  const updateOrderStatus = async (id: string, status: string) => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await orderStatusUpdate({ id, status }).unwrap();
      console.log(res);
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };
  const updatePaymentStatus = async (id: string, status: string) => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await paymentStatusUpdate({ id, status }).unwrap();
      console.log(res);
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  return (
    <Box>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FaEllipsisV />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className="px-4"
      >
        <Typography>Order status</Typography>
        <MenuItem onClick={() => updateOrderStatus(orderId, 'PENDING')}>
          Pending
        </MenuItem>
        <MenuItem onClick={() => updateOrderStatus(orderId, 'PROCESSING')}>
          Processing
        </MenuItem>
        <MenuItem onClick={() => updateOrderStatus(orderId, 'SHIPPED')}>
          Shipped
        </MenuItem>
        <MenuItem onClick={() => updateOrderStatus(orderId, 'DELIVERED')}>
          Delivered
        </MenuItem>
        <MenuItem onClick={() => updateOrderStatus(orderId, 'CANCEL')}>
          CANCEL
        </MenuItem>
        <Divider />
        <Typography>Payment status</Typography>
        <MenuItem onClick={() => updatePaymentStatus(paymentId, 'PAID')}>
          Paid
        </MenuItem>
        <MenuItem onClick={() => updatePaymentStatus(paymentId, 'UNPAID')}>
          Unpaid
        </MenuItem>
        <MenuItem onClick={() => updatePaymentStatus(paymentId, 'FAILED')}>
          Failed
        </MenuItem>
        <MenuItem onClick={() => updatePaymentStatus(paymentId, 'REFUNDED')}>
          Refunded
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default OrderMenu;
