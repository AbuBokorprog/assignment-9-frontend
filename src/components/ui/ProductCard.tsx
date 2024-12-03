import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  IconButton,
  Rating,
  Tooltip,
  Badge,
  Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ProductCardProps {
  product: {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    discount?: number;
    isFeatured?: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    id,
    name,
    slug,
    price,
    originalPrice,
    imageUrl,
    rating,
    reviews,
    isNew,
    discount,
    isFeatured,
  } = product;

  return (
    <Card className="relative group h-full transition-all duration-300 hover:shadow-lg">
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-green-500 text-white px-2 py-1 text-xs rounded">
            New
          </Badge>
        )}
        {discount && (
          <Badge className="bg-red-500 text-white px-2 py-1 text-xs rounded">
            -{discount}%
          </Badge>
        )}
        {isFeatured && (
          <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
            Featured
          </Badge>
        )}
      </div>

      {/* Product image and actions */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${slug}`}>
          <img
            src={imageUrl}
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
              onClick={() => setIsWishlisted(!isWishlisted)}
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
          to={`/product/${slug}`}
          className="text-lg font-medium text-gray-800 h-16 hover:text-primary-500 line-clamp-2"
        >
          {name}
        </Link>

        <div className="flex items-center mt-2">
          <Rating value={rating} precision={0.5} size="small" readOnly />
          <span className="ml-2 text-sm text-gray-500">({reviews})</span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-primary-500">
            ৳{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <Button
          className="mt-3 w-full py-2 px-4 "
          onClick={() => {
            /* Handle add to cart */
          }}
          variant="contained"
        >
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
