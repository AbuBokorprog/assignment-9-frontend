import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search,
  FilterList,
  Star,
  LocalShipping,
  Storefront,
  TrendingUp,
  NewReleases,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ShopCard from '../ui/ShopCard';

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
      <div className="container mx-auto px-4 sm:px-6 ">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Typography variant="h3" className="font-bold mb-4">
            All Shops
          </Typography>
          {/* <Typography
            variant="subtitle1"
            color="text.secondary"
            className="mb-8"
          >
            Discover trusted vendors and unique products from around the world
          </Typography> */}
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
                <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
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
                <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
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
              <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
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

export default Shop;
