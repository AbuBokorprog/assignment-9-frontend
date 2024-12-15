import React, { useEffect, useState } from 'react';
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
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useGetAllMyCartsQuery } from '../redux/features/api/carts/carts.api';
import { TCartProduct } from '../types/cart.type';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateOrderMutation } from '../redux/features/api/orders/orders.api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import { useApplyCouponMutation } from '../redux/features/api/coupon/coupon.api';
import { orderSchema } from '../schema/order';

const steps = ['Shipping Details', 'Payment Method', 'Review Order'];

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState('COD');
  const [deliveryCharge, setDeliveryCharge] = React.useState('60');
  const [saveMoney, setSaveMoney] = useState<number>(0);
  const [discountedAmount, setDiscountedAmount] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>('');
  const [applyCouponCode] = useApplyCouponMutation();
  const [orderPlace] = useCreateOrderMutation();
  const { data, isLoading } = useGetAllMyCartsQuery({});
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

  // apply coupon
  const applyCoupon = async () => {
    if (couponCode === '' || !couponCode) {
      toast.error('Please enter code');
    }
    const toastId = toast.loading('Loading...');
    const data = { couponCode, cartTotal: totalPrice };
    try {
      const res = await applyCouponCode(data).unwrap();
      if (res?.success) {
        setDiscountedAmount(res?.data?.discountedTotal);
        setSaveMoney(res?.data?.discountAmount);
      }

      toast.success(res?.message, { id: toastId, duration: 200 });
      // setDiscountDetails(response.data);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to apply coupon', {
        id: toastId,
        duration: 200,
      });
    }
  };

  // place order form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Order');
    const toastId = toast.loading('Loading...');
    const orderData = {
      ...data,
      products: products,
      totalAmount: discountedAmount
        ? discountedAmount + Number(deliveryCharge)
        : totalPrice + Number(deliveryCharge),
      quantity: totalQuantity,
    };

    try {
      const res = await orderPlace(orderData).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
        reset();
        if (data?.paymentType === 'COD') {
          navigate('/dashboard/my-orders');
        }

        if (res?.data?.payment) {
          window.location.href = res?.data?.payment?.payment_url;
        }
      }
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
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
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
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

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Enter valid coupon"
                      name="coupon"
                      disabled={discountedAmount ? true : false}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => applyCoupon()}
                    >
                      Apply
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">
                      {discountedAmount
                        ? discountedAmount + Number(deliveryCharge)
                        : totalPrice + Number(deliveryCharge)}{' '}
                      TK
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1">Save:</Typography>
                    <Typography variant="body2">{saveMoney} TK</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Checkout;
