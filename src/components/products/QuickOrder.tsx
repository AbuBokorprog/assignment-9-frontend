import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useCreateCartMutation } from '../../redux/features/api/carts/carts.api';

const QuickOrder: React.FC<any> = ({ data }) => {
  const [addToCart, { isLoading }] = useCreateCartMutation();
  const QuickOrderHandler = () => {};
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        startIcon={<FlashOnIcon />}
        component={Link}
        to="/checkout"
        onClick={QuickOrderHandler}
      >
        Quick Order
      </Button>
    </div>
  );
};

export default QuickOrder;
