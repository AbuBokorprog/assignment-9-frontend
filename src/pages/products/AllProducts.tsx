import React, { useEffect, useState } from 'react';
import Products from '../../components/home/Products';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FilterList, Search } from '@mui/icons-material';
import { useGetAllProductsQuery } from '../../redux/features/api/products/products.api';
import ProductCard from '../../components/ui/ProductCard';

const AllProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [shippingTime, setShippingTime] = useState('all');
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data } = useGetAllProductsQuery({});

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

  const meta = data?.data?.meta;

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
        <Box>
          <Grid container spacing={2}>
            {data?.data?.data?.map((p: any, index: number) => (
              <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      <Stack spacing={2} className="mx-auto text-center">
        <Pagination
          count={Math.round(meta.total / 10) || 1}
          page={page}
          color="primary"
          onChange={handleChange}
          className="mx-auto my-5"
        />
      </Stack>
    </div>
  );
};

export default AllProducts;
