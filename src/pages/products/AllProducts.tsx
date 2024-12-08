import React, { useEffect, useState } from 'react';
import Products from '../../components/home/Products';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FilterList, Search } from '@mui/icons-material';

const AllProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [category, setCategory] = useState('all');
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-2  ">
      <Typography
        variant="h4"
        className="text-center my-5 lg:my-10"
        gutterBottom
      >
        All Products
      </Typography>

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

      <div className="my-5 lg:my-10">
        <Products />
      </div>
    </div>
  );
};

export default AllProducts;
