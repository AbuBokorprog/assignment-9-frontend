import { Box, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const ShopDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <Box className="container mx-auto">
      <Typography variant="h3" component={'h3'} className="font-bold">
        Shop Name
      </Typography>
    </Box>
  );
};

export default ShopDetails;
