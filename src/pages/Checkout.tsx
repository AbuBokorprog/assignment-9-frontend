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
import { useGetAllMyCartsQuery } from '../redux/features/api/carts/carts.api';
import { TCartProduct } from '../types/cart.type';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateOrderMutation } from '../redux/features/api/orders/orders.api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping Details', 'Payment Method', 'Review Order'];

const orderSchema = z.object({
  city: z.string().nonempty('City is required.'),
  deliveryAddress: z.string().nonempty('Delivery address is required.'),
  deliveryArea: z.string().nonempty('Delivery area is required.'),
  email: z.string().email('Email is required!'),
  fullName: z.string().nonempty('Full name is required.'),
  paymentType: z.enum(['COD', 'Online']),
  phoneNumber: z
    .string()
    .regex(
      /^01[3-9]\d{8}$/,
      'Phone number must be a valid Bangladeshi number.'
    ),
  postalCode: z
    .string()
    .regex(/^\d{4}$/, 'Postal code must be a 4-digit number.'),
});

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState('COD');
  const [deliveryCharge, setDeliveryCharge] = React.useState('60');

  const [orderPlace] = useCreateOrderMutation();
  const { data } = useGetAllMyCartsQuery({});
  // Calculate total price
  const totalPrice = data?.data?.reduce(
    (sum: number, item: TCartProduct) => sum + item.price * item.qty,
    0
  );
  const totalQuantity = data?.data?.reduce(
    (sum: number, item: TCartProduct) => sum + item.qty,
    0
  );

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = data?.data?.map((item: TCartProduct) => ({
    productId: item.productId,
    price: item.price,
    color: item.color,
    size: item.size,
    quantity: item.qty,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const orderData = {
      ...data,
      products: products,
      totalAmount: totalPrice + Number(deliveryCharge),
      quantity: totalQuantity,
    };

    try {
      const res = await orderPlace(orderData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        reset();
        if (data?.paymentType === 'COD') {
          navigate('/dashboard/my-orders');
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.success(error);
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                          error={!!errors.name}
                          // helperText={errors.fullName?.message}
                          {...register('fullName')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          {...register('phoneNumber')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          {...register('email')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Delivery Address"
                          {...register('deliveryAddress')}
                          multiline
                          rows={3}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          {...register('city')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Postal Code"
                          {...register('postalCode')}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Delivery Area
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={deliveryCharge}
                        onChange={(e) => setDeliveryCharge(e.target.value)}
                      >
                        <FormControlLabel
                          value="60"
                          control={<Radio />}
                          {...register('deliveryArea')}
                          label="Inside Dhaka"
                        />
                        <FormControlLabel
                          value="120"
                          {...register('deliveryArea')}
                          control={<Radio />}
                          label="Outside Dhaka"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Typography variant="h6" gutterBottom>
                      Payment Method
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <FormControlLabel
                          value="COD"
                          control={<Radio />}
                          {...register('paymentType')}
                          label="Cash on Delivery"
                        />
                        <FormControlLabel
                          value="ADV"
                          {...register('paymentType')}
                          control={<Radio />}
                          label="Online Payment"
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
                    {data?.data.map((p: TCartProduct) => (
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

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === 2 ? (
                <Button variant="contained" type="submit">
                  Place Order
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </form>
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
                  <Typography>{Number(deliveryCharge)} TK</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  {totalPrice + Number(deliveryCharge)} TK
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
