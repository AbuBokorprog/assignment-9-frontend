import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Products from '../components/home/Products';
import Banner from '../components/home/Banner';
import Categories from '../components/home/Categories';
import FlashSale from '../components/home/FlashSale';
import Title from '../components/helmet/Title';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box className="container mx-auto">
      <Title title="Home" content="This is home page." />
      <Banner />
      <div className="px-2">
        <Categories />
        <FlashSale />
        <div className="my-5 lg:my-10">
          <Products />
        </div>
      </div>
    </Box>
  );
};

export default Home;
