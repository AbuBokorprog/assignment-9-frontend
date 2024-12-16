import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Pagination,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import ShopCard from '../ui/ShopCard';
import { useGetAllAvailableShopsQuery } from '../../redux/features/api/shops/shops.api';
import { TShop } from '../../types/shop.type';
import Loader from '../ui/Loader';
import { useGetAllCategoriesQuery } from '../../redux/features/api/categories/catgeories.api';
import { TCategory } from '../../types/categories.type';

const Shop: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [rating, setRating] = useState<string | null>('');
  const [category, setCategory] = useState('all');

  const { data: allCategory } = useGetAllCategoriesQuery({});

  const categories = allCategory?.data?.map((category: TCategory) => ({
    label: category?.name,
    value: category?.name,
  }));

  const { data, isLoading } = useGetAllAvailableShopsQuery([
    { name: 'page', value: currentPage },
    { name: 'limit', value: 10 },
    { name: 'sortBy', value: sortBy },
    ...(category ? [{ name: 'category', value: category }] : []),
    ...(rating ? [{ name: 'rating', value: rating }] : []),
    ...(searchTerm ? [{ name: 'searchTerm', value: searchTerm }] : []),
  ]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                        <MenuItem value="">All</MenuItem>
                        {categories?.map((cat: any, index: number) => (
                          <MenuItem
                            key={index}
                            value={cat?.value?.toLowerCase()}
                          >
                            {cat?.label}
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
                      <InputLabel>Rating</InputLabel>
                      <Select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        label="Rating"
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="4.5">4.5</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                      </Select>
                    </FormControl>
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
                    <ShopCard shop={shop} />
                  </Grid>
                ))}
              </Grid>
            </div>

            {data?.data?.length === 0 && (
              <div className="text-center py-16">
                <Typography variant="h6" color="textSecondary">
                  No shops found
                </Typography>
              </div>
            )}

            <Stack spacing={2} className="mx-auto text-center">
              <Pagination
                // count={Math.round(meta?.total / 10) || 1}
                count={10}
                page={currentPage}
                color="primary"
                onChange={() => setCurrentPage(currentPage + 1)}
                className="mx-auto my-5"
              />
            </Stack>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
