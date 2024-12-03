import React from 'react';
import { productsData } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import { Box, Grid } from '@mui/material';

const Products: React.FC = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {productsData.map((p: any, index) => (
          <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
