import {
  Favorite,
  FavoriteBorder,
  LocalShipping,
  LocationOn,
  Verified,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Separate ShopCard component for better organization
interface ShopCardProps {
  shop: (typeof shops)[0];
  onFavorite: (id: number) => void;
  isFavorite: boolean;
}

const shops = [
  {
    id: 1,
    name: 'Tech Haven',
    vendorName: 'John Electronics Inc.',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86',
    vendorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    location: 'New York, NY',
    verified: true,
    featured: true,
    products: 450,
    description:
      'Premium electronics and gadgets store with the latest technology',
    joinedDate: '2022',
    totalSales: 1200,
    shippingTime: '1-3 days',
    topSeller: true,
    responseRate: 98,
    categories: ['Phones', 'Laptops', 'Accessories'],
  },
  // Add more shops...
];

const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  onFavorite,
  isFavorite,
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <Box className="relative">
        <CardMedia
          component="img"
          height="200"
          image={shop.image}
          alt={shop.name}
          className="h-48 object-cover"
        />
        <IconButton
          className="absolute top-2 right-2 bg-white hover:bg-gray-100"
          onClick={() => onFavorite(shop.id)}
        >
          {isFavorite ? (
            <Favorite className="text-red-500" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        {shop.verified && (
          <Tooltip title="Verified Seller">
            <Chip
              icon={<Verified className="text-blue-500" />}
              label="Verified"
              size="small"
              className="absolute top-2 left-2 bg-white"
            />
          </Tooltip>
        )}
      </Box>
      <CardContent>
        <div className="flex items-center mb-3">
          <Avatar src={shop.vendorAvatar} className="mr-2" />
          <div>
            <Link to={`/shop/${shop.id}`}>
              <Typography variant="h6" className="font-bold">
                {shop.name}
              </Typography>
            </Link>
            <Typography variant="body2" color="text.secondary">
              by {shop.vendorName}
            </Typography>
          </div>
        </div>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          {shop.description}
        </Typography>

        <div className="flex items-center mb-2">
          <Rating value={shop.rating} readOnly precision={0.5} size="small" />
          <Typography variant="body2" color="text.secondary" className="ml-2">
            ({shop.reviews} reviews)
          </Typography>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          {shop.categories.map((cat, index) => (
            <Chip
              key={index}
              label={cat}
              size="small"
              className="bg-blue-50 text-blue-600"
            />
          ))}
        </div>

        <div className="flex items-center justify-between mb-2">
          <Typography
            variant="body2"
            className="flex items-center text-gray-600"
          >
            <LocalShipping className="text-sm mr-1" />
            {shop.shippingTime}
          </Typography>
          <Typography
            variant="body2"
            className="flex items-center text-gray-600"
          >
            <LocationOn className="text-sm mr-1" />
            {shop.location}
          </Typography>
        </div>

        <div className="flex justify-between items-center mt-3">
          <Chip
            size="small"
            label={`${shop.products}+ Products`}
            className="bg-gray-100"
          />
          <Chip
            size="small"
            label={`${shop.responseRate}% Response`}
            className="bg-green-50 text-green-600"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
