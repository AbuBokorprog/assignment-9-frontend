import React from 'react';
import { TWishlist } from '../../../types/wishlist.type';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useDeleteWishlistMutation } from '../../../redux/features/api/wishlist/wishlistapi';
import { toast } from 'sonner';
import { useCreateCartMutation } from '../../../redux/features/api/carts/carts.api';
import { useNavigate } from 'react-router-dom';

type WishlistCardProps = {
  item: TWishlist;
};

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [addToCart, { isLoading }] = useCreateCartMutation();

  const handleRemoveFromWishlist = async (itemId: string) => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await deleteWishlist(itemId).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    // Implement add to cart logic
    const toastId = toast.loading('Loading...');
    const orderData = {
      productId: item?.id,
      color: null,
      size: null,
      qty: 1,
      price: item?.product?.discount_price
        ? item?.product?.discount_price
        : item?.product?.regular_price,
    };

    try {
      const res = await addToCart(orderData).unwrap();
      console.log(res);
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
      <Card className="h-full flex flex-col">
        <div className="relative">
          <CardMedia
            component="img"
            height="250"
            src={item.product?.images[0]}
            alt={item?.product?.name}
            className="h-48 object-cover"
          />
          <IconButton
            className="absolute top-2 right-2 bg-white hover:bg-red-50"
            onClick={() => handleRemoveFromWishlist(item.id)}
            size="small"
          >
            <FaTrash className="text-red-500" />
          </IconButton>
        </div>
        <CardContent className="flex-1 flex flex-col">
          <Typography variant="h6" component="h3" className="mb-2">
            {item?.product?.name}
          </Typography>
          <div className="text-sm text-gray-600 mb-2">Vendor: xxx</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-primary-500">
              $
              {item.product?.discount_price
                ? item.product?.discount_price.toFixed(2)
                : item?.product?.regular_price.toFixed(2)}
            </span>
            <div className="text-sm text-gray-500">Rating: /5</div>
          </div>
          <div className="mt-auto">
            {item.product?.inventory > 0 ? (
              <div className="space-y-2">
                <div className="text-sm text-green-600">
                  In Stock ({item.product?.inventory} available)
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaShoppingCart />}
                  onClick={() => handleAddToCart()}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-red-600">Out of Stock</div>
                <Button variant="contained" disabled fullWidth>
                  Out of Stock
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistCard;
