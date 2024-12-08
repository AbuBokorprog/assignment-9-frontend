import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useCreateCartMutation } from '../../redux/features/api/carts/carts.api';
import { toast } from 'sonner';
import { Product } from '../../types/product.type';

type QuickOrderProps = {
  data: Product;
  variant: 'contained' | 'outlined' | 'text';
};

const QuickOrder: React.FC<QuickOrderProps> = ({ data, variant }) => {
  const navigate = useNavigate();

  const [addToCart, { isLoading }] = useCreateCartMutation();

  const QuickOrderHandler = async () => {
    const toastId = toast.loading('Loading...');

    const orderData = {
      productId: data?.id,
      color: null,
      size: null,
      qty: 1,
      price: data?.discount_price ? data?.discount_price : data?.regular_price,
    };

    try {
      const res = await addToCart(orderData).unwrap();

      if (res?.success) {
        toast.success('Add to cart successfully!', {
          id: toastId,
          duration: 200,
        });
        navigate('/checkout');
      }
    } catch (error: any) {
      console.log(error);
      toast.success(error, { id: toastId, duration: 200 });
    }
  };
  return (
    <div>
      <Button
        variant={variant}
        color="primary"
        size="large"
        fullWidth
        startIcon={<FlashOnIcon />}
        onClick={QuickOrderHandler}
      >
        Quick Order
      </Button>
    </div>
  );
};

export default QuickOrder;
