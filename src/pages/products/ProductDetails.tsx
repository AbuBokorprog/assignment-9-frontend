import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Rating,
  IconButton,
  Stack,
  Tabs,
  Tab,
  Paper,
  FormControl,
  TextField,
} from '@mui/material';
import ImageGallery from 'react-image-gallery';
import { useParams, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useGetProductByIdQuery } from '../../redux/features/api/products/products.api';
import QuickOrder from '../../components/products/QuickOrder';
import { useCreateCartMutation } from '../../redux/features/api/carts/carts.api';
import { toast } from 'sonner';
import { useCreateRecentProductsMutation } from '../../redux/features/api/recently-viewed/recently-viewed.api';
import Loader from '../../components/ui/Loader';
import ProductCard from '../../components/ui/ProductCard';
import CartAlertDialog from '../../components/ui/CartAlertDialog';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateReviewMutation } from '../../redux/features/api/reviews/reviews.api';
import { currentUser } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks/hooks';
import { TReview } from '../../types/review.type';
import ReviewCard from '../../components/ui/ReviewCard';
import Title from '../../components/helmet/Title';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Custom TabPanel component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetails = () => {
  const { id } = useParams();
  const user = useAppSelector(currentUser);
  const [value, setValue] = React.useState<number | null>(2);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  const { register, handleSubmit, reset } = useForm();

  const [createRecentProduct] = useCreateRecentProductsMutation();
  const [addToCart, { isLoading }] = useCreateCartMutation();
  const { data, isLoading: loadingData } = useGetProductByIdQuery(id);
  const [addReview] = useCreateReviewMutation();
  const product = data?.data?.product;
  const relatedProducts = data?.data?.relatedProducts;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const images =
    product?.images?.map((image: string) => ({
      original: image,
      thumbnail: image,
    })) || [];

  useEffect(() => {
    window.scrollTo(0, 0);

    const createRecentProductsHandler = async () => {
      const productData = { productId: id };
      try {
        await createRecentProduct(productData).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.log(error);
      }
    };

    createRecentProductsHandler();
  }, [id, createRecentProduct]);

  const price = product?.discount_price
    ? product?.discount_price * quantity
    : product?.regular_price * quantity;

  const orderData = {
    productId: product?.id,
    color: selectedColor || null,
    size: selectedSize || null,
    qty: quantity,
    price: price,
  };

  const addToCartHandler = async () => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await addToCart(orderData).unwrap();

      if (res?.success) {
        toast.success('Add to cart successfully!', {
          id: toastId,
          duration: 200,
        });
      } else if (res?.status === 409) {
        setOpen(true);
      }
    } catch (error: any) {
      setOpen(true);

      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  const isOrderedProduct = product?.orders?.some(
    (item: any) => item.order.customerId === user?.id
  );

  const reviewHandler: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Loading...');
    const reviewData = { productId: product?.id, rating: value, ...data };

    try {
      const res = await addReview(reviewData).unwrap();
      toast.success(res?.message, { id: toastId, duration: 200 });

      reset();
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };
  const totalRating = product?.reviews?.reduce(
    (sum: number, item: TReview) => sum + item.rating,
    0
  );

  const reviewCount = product?.reviews?.length || 0;
  const avgRating = reviewCount > 0 ? totalRating / reviewCount : 0;
  return (
    <>
      <Title
        title={product?.name}
        content={`This is ${product?.name} details page.`}
      />
      {isLoading || loadingData ? (
        <Loader />
      ) : (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Product Main Section */}
          <Grid container spacing={4}>
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              <ImageGallery items={images} autoPlay={true} />
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {product?.name}
                </Typography>

                {/* ratings */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={avgRating} precision={0.5} readOnly />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({avgRating} rating)
                  </Typography>
                </Box>

                {product?.discount_price ? (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-500">
                      ৳{product?.discount_price}
                    </span>
                    {product?.regular_price && (
                      <span className="text-sm text-gray-500 line-through">
                        ৳{product?.regular_price}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-lg font-bold text-primary-500">
                    ৳{product?.regular_price}
                  </span>
                )}

                {/* Add Color Selection */}
                {product?.colors?.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Color: {selectedColor}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {product?.colors?.map((color: any, index: number) => (
                        <Box
                          key={index}
                          onClick={() => setSelectedColor(color.color)}
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: `#${color.code}`,
                            borderRadius: '50%',
                            cursor: 'pointer',
                            border: '2px solid',
                            borderColor:
                              selectedColor === color.name
                                ? 'primary.main'
                                : 'transparent',
                            '&:hover': {
                              opacity: 0.8,
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                {/* Add Size Selection */}
                {product?.sizes?.length > 0 && (
                  <div>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Size: {selectedSize}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {product?.sizes?.map((size: any, index: number) => (
                        <Button
                          key={index}
                          variant={
                            selectedSize === size.size
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => setSelectedSize(size.size)}
                          sx={{ minWidth: 60 }}
                        >
                          {size.size}
                        </Button>
                      ))}
                    </Box>
                  </div>
                )}
                {/* Quantity Selector */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(-1)}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(1)}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Action Buttons */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => addToCartHandler()}
                  >
                    Add to Cart - {price} TK
                  </Button>

                  <QuickOrder data={product} variant="outlined" />
                </Stack>

                <Divider sx={{ my: 3 }} />

                <div>
                  <p>
                    Shop Name:{' '}
                    <Link to={`/shop-details/${product?.shop?.shopName}`}>
                      {product?.shop?.shopName}
                    </Link>{' '}
                  </p>
                  <p>
                    Categories:{' '}
                    <Link
                      to={`/all-products/?category=${product?.category?.name}`}
                    >
                      {product?.category?.name}
                    </Link>{' '}
                  </p>
                </div>
              </Box>
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Box sx={{ mt: 6 }}>
            <Paper sx={{ width: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Description" />
                <Tab label="Reviews" />
                <Tab label="Privacy Policy" />
              </Tabs>

              {/* Description Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Product Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {product?.description}
                    </Typography>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Reviews Tab */}
              <TabPanel value={tabValue} index={1}>
                <Box>
                  <Box>
                    <Typography variant="h6"> Write a Review</Typography>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      disabled={!isOrderedProduct}
                      onChange={(_event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    <form onSubmit={handleSubmit(reviewHandler)}>
                      <FormControl className="w-full my-2">
                        <TextField
                          fullWidth
                          rows={5}
                          multiline
                          disabled={!isOrderedProduct}
                          {...register('comment')}
                          label={'Give me review'}
                        />
                      </FormControl>

                      <div className="text-center my-4">
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={!isOrderedProduct}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </form>
                  </Box>

                  {/* reviews card */}
                  <Typography variant="h6" className="my-4">
                    Customer Reviews
                  </Typography>
                  {product?.reviews?.map((review: TReview, index: number) => (
                    <ReviewCard review={review} key={index} />
                  ))}
                </Box>
              </TabPanel>

              {/* Privacy Policy Tab */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Privacy Policy
                </Typography>
                <Typography variant="body2" paragraph>
                  We take your privacy seriously. Here's how we handle your
                  data:
                </Typography>
                <Typography variant="body2" paragraph>
                  1. Personal Information Collection: We collect only necessary
                  information for order processing and delivery.
                </Typography>
                <Typography variant="body2" paragraph>
                  2. Data Usage: Your information is used solely for order
                  fulfillment and improving our services.
                </Typography>
                <Typography variant="body2" paragraph>
                  3. Data Protection: We implement industry-standard security
                  measures to protect your information.
                </Typography>
                <Typography variant="body2" paragraph>
                  4. Third-Party Sharing: We never sell your data to third
                  parties.
                </Typography>
                <Typography variant="body2">
                  For more information about our privacy practices, please
                  contact our customer service.
                </Typography>
              </TabPanel>
            </Paper>
          </Box>

          {/* Related products */}
          {relatedProducts?.length > 0 && (
            <Box>
              <Typography
                variant="h4"
                component={'h4'}
                className="my-5 lg:my-10"
              >
                Related Products
              </Typography>

              <Grid container spacing={2} className="mb-5 lg:mb-10">
                {relatedProducts?.map((product: any, index: number) => (
                  <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* dialog */}

          <CartAlertDialog
            open={open}
            setOpen={setOpen}
            orderData={orderData}
          />
        </Container>
      )}
    </>
  );
};

export default ProductDetails;
