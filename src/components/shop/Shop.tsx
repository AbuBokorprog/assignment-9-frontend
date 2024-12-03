import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Chip,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Search,
  FilterList,
  LocationOn,
  Verified,
  Favorite,
  FavoriteBorder,
  Star,
  LocalShipping,
  Storefront,
  TrendingUp,
  NewReleases,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for shops with more vendor-specific information
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

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [shippingTime, setShippingTime] = useState('all');

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Living',
    'Beauty',
    'Food',
    'Sports',
  ];

  const toggleFavorite = (shopId: number) => {
    setFavorites((prev) =>
      prev.includes(shopId)
        ? prev.filter((id) => id !== shopId)
        : [...prev, shopId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Typography variant="h3" component="h1" className="font-bold mb-4">
            Explore Our Marketplace
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className="mb-8"
          >
            Discover trusted vendors and unique products from around the world
          </Typography>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Storefront />, label: 'Active Vendors', value: '500+' },
            {
              icon: <LocalShipping />,
              label: 'Fast Delivery',
              value: '2-4 days avg.',
            },
            { icon: <Star />, label: 'Verified Sellers', value: '200+' },
            { icon: <TrendingUp />, label: 'Monthly Sales', value: '10k+' },
          ].map((stat, index) => (
            <Card key={index} className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <Typography variant="h6">{stat.value}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Card>
          ))}
        </div>

        {/* Advanced Search and Filter Section */}
        <Card className="mb-8">
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search shops or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="rating">Top Rated</MenuItem>
                    <MenuItem value="reviews">Most Reviews</MenuItem>
                    <MenuItem value="products">Most Products</MenuItem>
                    <MenuItem value="sales">Best Selling</MenuItem>
                    <MenuItem value="newest">Newest Vendors</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Shipping Time</InputLabel>
                  <Select
                    value={shippingTime}
                    onChange={(e) => setShippingTime(e.target.value)}
                    label="Shipping Time"
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="1-2">1-2 Days</MenuItem>
                    <MenuItem value="3-5">3-5 Days</MenuItem>
                    <MenuItem value="5+">5+ Days</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  className="h-[56px]"
                >
                  More Filters
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Top Sellers Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-bold">
              Top Selling Vendors
            </Typography>
            <Button
              endIcon={<TrendingUp />}
              component={Link}
              to="/top-sellers"
              color="primary"
            >
              View All
            </Button>
          </div>
          <Grid container spacing={4}>
            {shops
              .filter((shop) => shop.topSeller)
              .map((shop) => (
                <Grid item key={shop.id} xs={12} sm={6} md={4}>
                  <ShopCard
                    shop={shop}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(shop.id)}
                  />
                </Grid>
              ))}
          </Grid>
        </div>

        {/* New Vendors */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-bold">
              New Vendors
            </Typography>
            <Button
              endIcon={<NewReleases />}
              component={Link}
              to="/new-vendors"
              color="primary"
            >
              View All
            </Button>
          </div>
          <Grid container spacing={4}>
            {shops
              .filter(
                (shop) =>
                  new Date().getFullYear() - parseInt(shop.joinedDate) < 1
              )
              .map((shop) => (
                <Grid item key={shop.id} xs={12} sm={6} md={4}>
                  <ShopCard
                    shop={shop}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(shop.id)}
                  />
                </Grid>
              ))}
          </Grid>
        </div>

        {/* All Vendors */}
        <div>
          <Typography variant="h5" className="font-bold mb-6">
            All Vendors
          </Typography>
          <Grid container spacing={4}>
            {shops.map((shop) => (
              <Grid item key={shop.id} xs={12} sm={6} md={4}>
                <ShopCard
                  shop={shop}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.includes(shop.id)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

// Separate ShopCard component for better organization
interface ShopCardProps {
  shop: (typeof shops)[0];
  onFavorite: (id: number) => void;
  isFavorite: boolean;
}

const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  onFavorite,
  isFavorite,
}) => (
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
        <Typography variant="body2" className="flex items-center text-gray-600">
          <LocalShipping className="text-sm mr-1" />
          {shop.shippingTime}
        </Typography>
        <Typography variant="body2" className="flex items-center text-gray-600">
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

export default Shop;
