import React from 'react';
import ProductCard from '../ui/ProductCard';
import { Box, Grid } from '@mui/material';
import { useGetAllAvailableProductsQuery } from '../../redux/features/api/products/products.api';
import Loader from '../ui/Loader';

const Products: React.FC = () => {
  const { data, isLoading } = useGetAllAvailableProductsQuery({});

  return (
    <Box>
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        {data?.data?.data?.map((p: any, index: number) => (
          <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
