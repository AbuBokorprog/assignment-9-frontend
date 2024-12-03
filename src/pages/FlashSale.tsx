import { Typography } from '@mui/material';
import React from 'react';
import Products from '../components/home/Products';

const FlashSale: React.FC = () => {
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
        <Products />
      </div>
    </div>
  );
};

export default FlashSale;
