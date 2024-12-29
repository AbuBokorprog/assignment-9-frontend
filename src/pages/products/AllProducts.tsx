import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { useGetAllAvailableProductsQuery } from '../../redux/features/api/products/products.api';
import ProductCard from '../../components/ui/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../redux/features/api/categories/catgeories.api';
import { TCategory } from '../../types/categories.type';
import Title from '../../components/helmet/Title';

const AllProducts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  // Memoize the query parameters
  const queryParameters = useMemo(() => {
    const params = [
      { name: 'page', value: page },
      { name: 'limit', value: 10 },
      { name: 'sortBy', value: sortBy },
      { name: 'sortOrder', value: 'desc' },
    ];

    if (category) params.push({ name: 'category', value: category });
    if (type) params.push({ name: 'productStatus', value: type });
    if (stock) params.push({ name: 'stockStatus', value: stock });
    if (minPrice) params.push({ name: 'minPrice', value: minPrice });
    if (maxPrice) params.push({ name: 'maxPrice', value: maxPrice });

    return params;
  }, [page, sortBy, category, type, stock, minPrice, maxPrice]);

  const { data, isLoading, isFetching } =
    useGetAllAvailableProductsQuery(queryParameters);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data: allCategory } = useGetAllCategoriesQuery({});

  const categories = allCategory?.data?.map((category: TCategory) => ({
    label: category?.name.toLowerCase(),
    value: category?.name.toLowerCase(),
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    searchParams.delete('category');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const meta = data?.data?.meta;

  return (
    <div className="container mx-auto px-2  ">
      <Title title="All Products" content="This is all products page." />
      <Typography
        variant="h4"
        className="hidden lg:block text-center my-5 lg:my-10"
        gutterBottom
      >
        All Products
      </Typography>

      <div className="lg:hidden block">
        <div className="flex items-center justify-between">
          <Typography
            variant="h5"
            className="lg:hidden block text-left "
            gutterBottom
          >
            All Products
          </Typography>
          <Button variant="contained" color="primary">
            Filter
          </Button>
        </div>
      </div>

      <div className="lg:flex items-start gap-4">
        <Card className="hidden lg:block w-1/3">
          <CardContent>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="createdAt">Default</MenuItem>
                    <MenuItem value="inventory">Stock By</MenuItem>
                    <MenuItem value="reviews">Rate By</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {isLoading || isFetching ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 mx-auto w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((p) => (
              <Card key={p} className="rounded-md shadow-md p-2 ">
                <div className="bg-secondary-200 animate-pulse w-full h-32 lg:h-44"></div>
                <div>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
                <div className="my-1">
                  <Skeleton height={60} />
                </div>
              </Card>
            ))}
          </div>
        ) : data?.data?.data?.length > 0 ? (
          <div className="w-full">
            <Box>
              <Grid container spacing={2}>
                {data?.data?.data?.map((p: any, index: number) => (
                  <Grid item lg={3} md={4} sm={4} xs={6} key={index}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        ) : (
          <div className="text-center mx-auto">
            <Typography variant="h6" color="textSecondary">
              No products found
            </Typography>
          </div>
        )}
      </div>

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
