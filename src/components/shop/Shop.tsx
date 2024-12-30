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
  Box,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import ShopCard from '../ui/ShopCard';
import { useGetAllAvailableShopsQuery } from '../../redux/features/api/shops/shops.api';
import { TShop } from '../../types/shop.type';
import { useGetAllCategoriesQuery } from '../../redux/features/api/categories/catgeories.api';
import { TCategory } from '../../types/categories.type';
import useDebounce from '../../custome-hook/useDebounce';
import ShopsSkeleton from '../Skeleton/ShopsSkeleton';

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
      <div className="container mx-auto px-2 ">
        {/* Hero Section */}
        <Typography
          variant="h4"
          className="text-center font-bold my-10 lg:my-16"
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
                      <MenuItem key={index} value={cat?.value?.toLowerCase()}>
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
        {isLoading || isFetching ? (
          <ShopsSkeleton />
        ) : (
          <div className="my-10 lg:my-16">
            <Box>
              <Grid container spacing={2}>
                {data?.data?.data?.map((shop: TShop, index: number) => (
                  <Grid item lg={3} md={4} sm={4} xs={6} key={index}>
                    <ShopCard shop={shop} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        )}

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
    </>
  );
};

export default Shop;
