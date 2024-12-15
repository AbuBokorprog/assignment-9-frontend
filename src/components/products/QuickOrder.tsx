import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useCreateCartMutation } from '../../redux/features/api/carts/carts.api';
import { toast } from 'sonner';
import { Product } from '../../types/product.type';
import CartAlertDialog from '../ui/CartAlertDialog';
import { useAppSelector } from '../../redux/hooks/hooks';
import { currentUser } from '../../redux/store';
import Loader from '../ui/Loader';

type QuickOrderProps = {
  data: Product;
  variant: 'contained' | 'outlined' | 'text';
};

const QuickOrder: React.FC<QuickOrderProps> = ({ data, variant }) => {
  const user = useAppSelector(currentUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [addToCart, { isLoading }] = useCreateCartMutation();

  const orderData = {
    productId: data?.id,
    color: null,
    size: null,
    qty: 1,
    price: data?.discount_price ? data?.discount_price : data?.regular_price,
  };
  const QuickOrderHandler = async () => {
    if (!user?.email) {
      navigate('/login');
    }
    const toastId = toast.loading('Loading...');

    try {
      const res = await addToCart(orderData).unwrap();

      if (res?.success) {
        toast.success('Add to cart successfully!', {
          id: toastId,
          duration: 200,
        });
        navigate('/checkout');
      } else if (res?.status === 409) {
        setOpen(true);
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Button
        variant={variant}
        color="primary"
        size="large"
        fullWidth
        disabled={data?.inventory === 0}
        startIcon={<FlashOnIcon />}
        onClick={QuickOrderHandler}
      >
        Quick Order
      </Button>

      <CartAlertDialog open={open} setOpen={setOpen} orderData={orderData} />
    </div>
  );
};

export default QuickOrder;
