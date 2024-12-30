import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Banner from '../components/home/Banner';
import Categories from '../components/home/Categories';
import Title from '../components/helmet/Title';
import { useGetAllAvailableProductsQuery } from '../redux/features/api/products/products.api';
import HomeProducts from '../components/home/HomeProducts';
import Promotional from '../components/home/Promotional';
import { Product } from '../types/product.type';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useGetAllAvailableProductsQuery([]);

  const allFeaturedProducts = data?.data?.data?.filter(
    (product: Product) => product.productStatus === 'FEATURED'
  );

  const allHotProducts = data?.data?.data?.filter(
    (product: Product) => product.productStatus === 'HOT'
  );

  const allDiscountProducts = data?.data?.data?.filter(
    (product: Product) => product.productStatus === 'DISCOUNT'
  );

  const allNewProducts = data?.data?.data?.filter(
    (product: Product) => product.productStatus === 'NEW'
  );

  return (
    <Box className="">
      <Title title="Home" content="This is home page." />
      <Banner />

      <Categories />
      <HomeProducts
        isLoading={isLoading}
        title="Featured Products"
        product={allFeaturedProducts}
      />
      <HomeProducts
        isLoading={isLoading}
        title="Hot Products"
        product={allHotProducts}
      />

      <Promotional />
      <HomeProducts
        isLoading={isLoading}
        title="Discount Products"
        product={allDiscountProducts}
      />
      <HomeProducts
        isLoading={isLoading}
        title="New Products"
        product={allNewProducts}
      />
    </Box>
  );
};

export default Home;
