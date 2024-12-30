import React from 'react';
import ProductCard from '../ui/ProductCard';
import { Grid, Typography } from '@mui/material';
import { Product } from '../../types/product.type';
import ProductsSkeleton from '../Skeleton/ProductsSkeleton';

type THomeProductProps = {
  product: Product[];
  isLoading: boolean;
  title: string;
};

const HomeProducts: React.FC<THomeProductProps> = ({
  product,
  isLoading,
  title,
}) => {
  return (
    <div className="px-2 my-5 lg:my-10 container mx-auto">
      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <>
          {product?.length > 0 && (
            <>
              <div className=" ">
                <Typography variant="h4" component={'h4'} className="text-bold">
                  {title}
                </Typography>
              </div>
              <Grid container spacing={2} className="mb-5 lg:mb-10">
                {product?.slice(0, 12)?.map((p: Product, index: number) => (
                  <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>{' '}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomeProducts;
