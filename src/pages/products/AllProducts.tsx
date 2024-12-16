import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { useGetAllAvailableProductsQuery } from '../../redux/features/api/products/products.api';
import ProductCard from '../../components/ui/ProductCard';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { useGetAllCategoriesQuery } from '../../redux/features/api/categories/catgeories.api';
import { TCategory } from '../../types/categories.type';

const AllProducts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  const [sortBy, setSortBy] = useState('createdAt');
  const [category, setCategory] = useState<string | null>(
    categoryQuery?.toLowerCase() || null
  );
  const [type, setType] = useState<string | null>(null);
  const [stock, setStock] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [page, setPage] = React.useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data, isLoading, isFetching } = useGetAllAvailableProductsQuery([
    { name: 'page', value: page },
    { name: 'limit', value: 10 },
    { name: 'sortBy', value: sortBy },
    ...(category ? [{ name: 'category', value: category }] : []),
    ...(type ? [{ name: 'productStatus', value: type }] : []),
    ...(stock ? [{ name: 'stockStatus', value: stock }] : []),
    ...(minPrice ? [{ name: 'minPrice', value: minPrice }] : []),
    ...(maxPrice ? [{ name: 'maxPrice', value: maxPrice }] : []),
  ]);

  const { data: allCategory } = useGetAllCategoriesQuery({});

  const categories = allCategory?.data?.map((category: TCategory) => ({
    label: category?.name,
    value: category?.name,
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const meta = data?.data?.meta;

  return (
    <div className="container mx-auto px-2  ">
      {isLoading || (isFetching && <Loader />)}
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
                    <MenuItem key={index} value={cat?.value?.toLowerCase()}>
                      {cat?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Product Type</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Product Type"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="REGULAR">Regular</MenuItem>
                  <MenuItem value="FLASH_SALE">Flash Sale</MenuItem>
                  <MenuItem value="HOT">Hot</MenuItem>
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="FEATURED">Featured</MenuItem>
                  <MenuItem value="DISCOUNT">Discount</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Stock Type</InputLabel>
                <Select
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  label="Stock Type"
                >
                  <MenuItem value="IN_STOCK">In Stock</MenuItem>
                  <MenuItem value="LOW_STOCK">Low Stock</MenuItem>
                  <MenuItem value="OUT_OF_STOCK">Out Of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Box display="flex" alignItems="center" gap={2}>
                  <FormControl fullWidth>
                    <InputLabel>Min Price</InputLabel>
                    <Select
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      label="Min price"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="100">100</MenuItem>
                      <MenuItem value="200">200</MenuItem>
                      <MenuItem value="500">500</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Max Price</InputLabel>
                    <Select
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      label="Max Price"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="1000">1000</MenuItem>
                      <MenuItem value="2000">2000</MenuItem>
                      <MenuItem value="500">500</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
                  <MenuItem value="createdAt">Default</MenuItem>
                  <MenuItem value="stockStatus">Stock By</MenuItem>
                  <MenuItem value="reviews">Rate By</MenuItem>
                </Select>
              </FormControl>
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

      {data?.data?.data?.length === 0 && (
        <div className="text-center py-16">
          <Typography variant="h6" color="textSecondary">
            No products found
          </Typography>
        </div>
      )}

      <Stack spacing={2} className="mx-auto text-center">
        <Pagination
          count={Math.round(meta?.total / 10) || 1}
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
