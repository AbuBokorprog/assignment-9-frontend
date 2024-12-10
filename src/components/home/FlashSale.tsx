import React from 'react';
import { useGetAllFlashSaleProductsQuery } from '../../redux/features/api/products/products.api';
import ProductCard from '../ui/ProductCard';
import { Button, Typography } from '@mui/material';

const FlashSale: React.FC = () => {
  const { data, isLoading } = useGetAllFlashSaleProductsQuery({});
  return (
    <div>
      <div className="my-5 lg:my-10">
        <Typography>Flash Sale </Typography>
      </div>
      <ProductCard product={data?.data?.slice(0, 10)} />

      <div>
        <Button variant="outlined" color="primary" href="/flash-sale">
          All Products
        </Button>
      </div>
    </div>
  );
};

export default FlashSale;
