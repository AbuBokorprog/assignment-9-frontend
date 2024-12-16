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
import useDebounce from '../../custome-hook/useDebounce';

const Shop: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | null>('');

  const { data: allCategory } = useGetAllCategoriesQuery({});

  const categories = allCategory?.data?.map((category: TCategory) => ({
    label: category?.name,
    value: category?.name,
  }));

  const searchResult = useDebounce(searchTerm);

  const { data, isLoading, isFetching } = useGetAllAvailableShopsQuery([
    { name: 'page', value: currentPage },
    { name: 'limit', value: 10 },
    ...(category ? [{ name: 'category', value: category }] : []),
    ...(searchTerm ? [{ name: 'searchTerm', value: searchResult }] : []),
  ]);

  const meta = data?.data?.meta;

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 ">
            {/* Hero Section */}
            <Typography
              variant="h4"
              className="text-center mb-5 lg:mb-10"
              gutterBottom
            >
              All Shops
            </Typography>

            {/* Advanced Search and Filter Section */}
            <Card className="mb-8">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                </Grid>
              </CardContent>
            </Card>

            {/* All Shops */}
            <div>
              <Typography variant="h5" className="font-bold mb-6">
                All Shops
              </Typography>
              <Grid container spacing={4}>
                {data?.data?.data?.map((shop: TShop) => (
                  <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
                    <ShopCard shop={shop} />
                  </Grid>
                ))}
              </Grid>
            </div>

            {data?.data?.data?.length === 0 && (
              <div className="text-center py-16">
                <Typography variant="h6" color="textSecondary">
                  No shops found
                </Typography>
              </div>
            )}

            <Stack spacing={2} className="mx-auto text-center">
              <Pagination
                count={Math.round(meta?.total / 10) || 1}
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
