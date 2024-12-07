import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { useGetAllMyCartsQuery } from '../redux/features/api/carts/carts.api';
import { CartProduct } from '../types/cart.type';

// Fake cart data
const cartProducts = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 299,
    qty: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
  {
    id: 2,
    name: 'Chicken Wings',
    price: 399,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500',
  },
  {
    id: 3,
    name: 'Caesar Salad',
    price: 199,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
  },
];

const ViewCart = () => {
  const { data } = useGetAllMyCartsQuery({});
  // Calculate total price
  const totalPrice = data?.data?.reduce(
    (sum: number, item: CartProduct) => sum + item.price * item.qty,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {data?.data.map((p: CartProduct) => (
            <Card key={p.id} sx={{ mb: 2 }}>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <img
                  src={p.product?.images[0]}
                  alt={p.product?.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{p.product?.name}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Price: {p.price} TK
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small">
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{p.qty}</Typography>
                    <IconButton size="small">
                      <AddIcon />
                    </IconButton>
                    <IconButton color="error" sx={{ ml: 'auto' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>{totalPrice} TK</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Delivery Fee:</Typography>
                  <Typography>60 TK</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">{totalPrice + 60} TK</Typography>
              </Box>
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                fullWidth
                size="large"
              >
                Proceed to Checkout
              </Button>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewCart;
