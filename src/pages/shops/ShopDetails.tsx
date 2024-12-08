import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShopDetails: React.FC = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className="container mx-auto">
      <Typography variant="h3" component={'h3'} className="font-bold">
        Shop Name
      </Typography>
    </Box>
  );
};

export default ShopDetails;
