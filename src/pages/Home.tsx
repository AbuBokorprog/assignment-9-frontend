import { Box } from '@mui/material';
import React from 'react';
import Products from '../components/home/Products';
import Banner from '../components/home/Banner';

const Home: React.FC = () => {
  return (
    <Box className="container mx-auto ">
      <Banner />
      <div className="my-5 lg:my-10 px-2">
        <Products />
      </div>
    </Box>
  );
};

export default Home;
