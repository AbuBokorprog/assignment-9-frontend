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
import { useGetAllShopsQuery } from '../../redux/features/api/shops/shops.api';
import { TShop } from '../../types/shop.type';

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

  const { data } = useGetAllShopsQuery({});

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

        {/* All Shops */}
        <div>
          <Typography variant="h5" className="font-bold mb-6">
            All Shops
          </Typography>
          <Grid container spacing={4}>
            {data?.data.map((shop: TShop) => (
              <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
                <ShopCard
                  shop={shop}
                  // onFavorite={toggleFavorite}
                  // isFavorite={favorites.includes(shop.id)}
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
