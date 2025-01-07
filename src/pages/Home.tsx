import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Banner from '../components/home/Banner';
import Categories from '../components/home/Categories';
import Title from '../components/helmet/Title';
import { useGetAllHomeProductsQuery } from '../redux/features/api/products/products.api';
import HomeProducts from '../components/home/HomeProducts';
import Promotional from '../components/home/Promotional';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useGetAllHomeProductsQuery([]);

  return (
    <Box className="">
      <Title title="Home" content="This is home page." />
      <Banner />

      <Categories />
      <HomeProducts
        isLoading={isLoading}
        title="Featured Products"
        product={data?.data?.allFeaturedProducts}
      />
      <HomeProducts
        isLoading={isLoading}
        title="Hot Products"
        product={data?.data?.allHotProducts}
      />

      <Promotional />
      <HomeProducts
        isLoading={isLoading}
        title="Discount Products"
        product={data?.data?.allDiscountProducts}
      />
      <HomeProducts
        isLoading={isLoading}
        title="New Products"
        product={data?.data?.allNewProducts}
      />
    </Box>
  );
};

export default Home;
