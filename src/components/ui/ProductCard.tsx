import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, IconButton, Tooltip, Badge } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuickOrder from '../products/QuickOrder';
import { useAppSelector } from '../../redux/hooks/hooks';
import { currentUser } from '../../redux/store';
import { toast } from 'sonner';
import { useCreateWishlistMutation } from '../../redux/features/api/wishlist/wishlistapi';
import { Product } from '../../types/product.type';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const user: any = useAppSelector(currentUser);

  const [createWishlist] = useCreateWishlistMutation();

  const { name, id, images, regular_price, discount_price, productStatus } =
    product;

  const wishlistHandler = async (id: string) => {
    const toastId = toast.loading('Loading...');
    const data = { userId: user.id, productId: id };

    try {
      const res = await createWishlist(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="relative group h-full transition-all duration-300 hover:shadow-lg">
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {productStatus && (
          <Badge className="bg-green-500 text-white px-2 py-1 text-xs rounded">
            {productStatus}
          </Badge>
        )}
      </div>

      {/* Product image and actions */}
      <div className="relative overflow-hidden">
        <Link to={`/product-details/${id}`}>
          <img
            src={images[0]}
            alt={name}
            className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Quick action buttons */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 transition-all">
          <Tooltip title="Quick view" placement="left">
            <IconButton
              size="small"
              className="bg-white hover:bg-primary-500 hover:text-white"
              onClick={() => {
                /* Handle quick view */
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            placement="left"
          >
            <IconButton
              size="small"
              className="bg-white hover:bg-primary-500 hover:text-white"
              onClick={() => wishlistHandler(id)}
            >
              {isWishlisted ? (
                <FavoriteIcon fontSize="small" className="text-red-500" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Add to cart" placement="left">
            <IconButton
              size="small"
              className="bg-white hover:bg-primary-500 hover:text-white"
              onClick={() => {
                /* Handle add to cart */
              }}
            >
              <ShoppingCartIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Product info */}
      <CardContent className="p-4">
        <Link
          to={`/product-details/${id}`}
          className="text-lg font-medium text-gray-800 h-16 hover:text-primary-500 line-clamp-2"
        >
          {name}
        </Link>

        {/* <div className="flex items-center mt-2">
          <Rating value={rating} precision={0.5} size="small" readOnly />
          <span className="ml-2 text-sm text-gray-500">({reviews})</span>
        </div> */}

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-primary-500">
            ৳{discount_price}
          </span>
          {regular_price && (
            <span className="text-sm text-gray-500 line-through">
              ৳{regular_price}
            </span>
          )}
        </div>

        <QuickOrder data={product} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
