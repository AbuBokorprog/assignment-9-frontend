import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetAllMyCartsQuery } from '../redux/features/api/carts/carts.api';
import { CartProduct } from '../types/cart.type';

const steps = ['Shipping Details', 'Payment Method', 'Review Order'];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState('cash');

  const { data } = useGetAllMyCartsQuery({});
  // Calculate total price
  const totalPrice = data?.data?.reduce(
    (sum: number, item: CartProduct) => sum + item.price * item.qty,
    0
  );

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Shipping Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Delivery Address"
                        variant="outlined"
                        multiline
                        rows={3}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Postal Code"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Payment Method
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label="Cash on Delivery"
                      />
                      <FormControlLabel
                        value="bkash"
                        control={<Radio />}
                        label="bKash"
                      />
                      <FormControlLabel
                        value="nagad"
                        control={<Radio />}
                        label="Nagad"
                      />
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label="Credit/Debit Card"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Order Review
                  </Typography>
                  {data?.data.map((p: CartProduct) => (
                    <Box
                      key={p.id}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={p.product?.images[0]}
                        alt={p.product?.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">
                          {p.product?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {p.qty} x {p.price} TK
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        {p.qty * p.price} TK
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? undefined : handleNext}
              component={activeStep === steps.length - 1 ? Link : undefined}
              to={activeStep === steps.length - 1 ? '/' : undefined}
            >
              {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </Button>
          </Box>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
