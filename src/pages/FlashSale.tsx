import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useGetAllProductsQuery } from '../redux/features/api/products/products.api';
import ProductCard from '../components/ui/ProductCard';

const FlashSale: React.FC = () => {
  const { data } = useGetAllProductsQuery({});
  const flashSale = data?.data?.filter(
    (p: any) => p?.productStatus === 'FLASH_SALE'
  );

  return (
    <div className="container mx-auto px-2  ">
      <Typography
        variant="h4"
        className="text-center my-5 lg:my-10"
        gutterBottom
      >
        Flash Sale Products
      </Typography>

      <div className="my-5 lg:my-10">
        <Box>
          <Grid container spacing={2}>
            {flashSale?.map((p: any, index: number) => (
              <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>

          {flashSale?.length < 1 && (
            <Typography variant="h5" component="h5" className="text-center">
              No products
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default FlashSale;
