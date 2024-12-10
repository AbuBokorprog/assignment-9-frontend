import React from 'react';
import { useGetAllFlashSaleProductsQuery } from '../../redux/features/api/products/products.api';
import ProductCard from '../ui/ProductCard';
import { Button, Grid, Typography } from '@mui/material';
import { Product } from '../../types/product.type';

const FlashSale: React.FC = () => {
  const { data, isLoading } = useGetAllFlashSaleProductsQuery({});
  const product = data?.data;
  return (
    <div>
      <div className="my-5 lg:my-10">
        <Typography variant="h4" component={'h4'} className="text-bold">
          Flash Sale{' '}
        </Typography>
      </div>

      <Grid container spacing={2} className="mb-5 lg:mb-10">
        {product?.map((p: Product, index: number) => (
          <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>

      <div className="mx-auto text-center">
        <Button variant="outlined" color="primary" href="/flash-sale">
          All Products
        </Button>
      </div>
    </div>
  );
};

export default FlashSale;
