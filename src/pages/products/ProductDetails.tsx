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
  Avatar,
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Sample reviews data
const reviews = [
  {
    id: 1,
    user: 'John Doe',
    rating: 5,
    date: '2024-03-15',
    comment: 'Very fresh and good quality vegetables. Will order again!',
    avatar: 'J',
  },
  {
    id: 2,
    user: 'Sarah Smith',
    rating: 4,
    date: '2024-03-14',
    comment: 'Good product but delivery took longer than expected.',
    avatar: 'S',
  },
];

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
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  const [createRecentProduct] = useCreateRecentProductsMutation();
  const [addToCart, { isLoading }] = useCreateCartMutation();
  const { data } = useGetProductByIdQuery(id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const images =
    data?.data?.images?.map((image: string) => ({
      original: image,
      thumbnail: image,
    })) || [];

  useEffect(() => {
    window.scrollTo(0, 0);

    const createRecentProductsHandler = async () => {
      const productData = { productId: id };
      try {
        await createRecentProduct(productData).unwrap();
      } catch (error) {
        // console.log(error);
      }
    };

    createRecentProductsHandler();
  }, [id, createRecentProduct]);

  const price = data?.data?.discount_price
    ? data?.data?.discount_price * quantity
    : data?.data?.regular_price * quantity;

  const addToCartHandler = async () => {
    const toastId = toast.loading('Loading...');
    const orderData = {
      productId: data?.data?.id,
      color: selectedColor || null,
      size: selectedSize || null,
      qty: quantity,
      price: price,
    };

    try {
      const res = await addToCart(orderData).unwrap();

      if (res?.success) {
        toast.success('Add to cart successfully!', {
          id: toastId,
          duration: 200,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.success(error, { id: toastId, duration: 200 });
    }
  };

  return (
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
              {data?.data?.name}
            </Typography>

            {/* ratings */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={data?.data?.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({data?.data?.rating} rating)
              </Typography>
            </Box> */}

            {data?.data?.discount_price ? (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold text-primary-500">
                  ৳{data?.data?.discount_price}
                </span>
                {data?.data?.regular_price && (
                  <span className="text-sm text-gray-500 line-through">
                    ৳{data?.data?.regular_price}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-primary-500">
                ৳{data?.data?.regular_price}
              </span>
            )}

            {/* Add Color Selection */}
            {data?.data?.colors?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Color: {selectedColor}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {data?.data?.colors?.map((color: any, index: number) => (
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
            {data?.data?.sizes?.length > 0 && (
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Size: {selectedSize}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {data?.data?.sizes?.map((size: any, index: number) => (
                    <Button
                      key={index}
                      variant={
                        selectedSize === size.size ? 'contained' : 'outlined'
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
              <IconButton onClick={() => handleQuantityChange(-1)} size="small">
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(1)} size="small">
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

              <QuickOrder data={data?.data} variant="outlined" />
            </Stack>

            <Divider sx={{ my: 3 }} />
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
                  {data?.data?.description}
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography variant="h6">Customer Reviews</Typography>
                <Button variant="contained" sx={{ ml: 'auto' }}>
                  Write a Review
                </Button>
              </Box>

              {reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ mr: 2 }}>{review.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle1">{review.user}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Box>
          </TabPanel>

          {/* Privacy Policy Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="body2" paragraph>
              We take your privacy seriously. Here's how we handle your data:
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
              4. Third-Party Sharing: We never sell your data to third parties.
            </Typography>
            <Typography variant="body2">
              For more information about our privacy practices, please contact
              our customer service.
            </Typography>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetails;
