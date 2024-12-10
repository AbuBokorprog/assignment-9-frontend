import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useGetAllFlashSaleProductsQuery } from '../redux/features/api/products/products.api';
import ProductCard from '../components/ui/ProductCard';
import Loader from '../components/ui/Loader';

const FlashSale: React.FC = () => {
  const { data, isLoading } = useGetAllFlashSaleProductsQuery({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                {data?.data?.map((p: any, index: number) => (
                  <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>

              {data?.data?.length < 1 && (
                <Typography variant="h5" component="h5" className="text-center">
                  No products
                </Typography>
              )}
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default FlashSale;
