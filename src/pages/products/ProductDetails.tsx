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
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import 'react-image-gallery/styles/css/image-gallery.css';
import ProductCard from '../../components/ui/ProductCard';
import { productsData } from '../../data/products';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type TSelectedColor = {
  name: string;
  code: string;
};

// Sample grocery products data
const products: any = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    sku: 'VEG-TOM-001',
    price: 80,
    image:
      'https://m2ce.sindabad.com/pub/media/catalog/product/f/g/fgrf0200027g500.jpg',
    category: 'vegetables',
    subcategory: 'fresh-vegetables',
    description:
      'Premium organic tomatoes, locally sourced and perfect for salads, cooking, or sandwiches. Packed with vitamins and natural goodness.',
    rating: 4.5,
    isPopular: true,
    weight: '500g',
    origin: 'Local Farm',
    nutritionalInfo: {
      calories: '18 kcal/100g',
      protein: '0.9g',
      carbs: '3.9g',
      fiber: '1.2g',
    },
    storage: 'Store in a cool, dry place. Best kept in refrigerator.',
    shelfLife: '5-7 days when refrigerated',
    isOrganic: true,
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Green', code: '#008000' },
      { name: 'Yellow', code: '#FFD700' },
    ],
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: 2,
    name: 'Fresh Green Spinach',
    sku: 'VEG-SPN-002',
    price: 60,
    image:
      'https://m2ce.sindabad.com/pub/media/catalog/product//b/e/bengal_meat_mutton_keema_1kg.jpg',
    category: 'vegetables',
    subcategory: 'fresh-vegetables',
    description:
      'Fresh, crisp spinach leaves, perfect for salads, smoothies, or cooking. Rich in iron and vitamins.',
    rating: 4.7,
    isPopular: true,
    weight: '250g',
    origin: 'Local Farm',
    nutritionalInfo: {
      calories: '23 kcal/100g',
      protein: '2.9g',
      carbs: '3.6g',
      fiber: '2.2g',
    },
    storage: 'Keep refrigerated',
    shelfLife: '3-5 days when refrigerated',
    isOrganic: true,
  },
  {
    id: 3,
    name: 'Red Onions',
    sku: 'VEG-ONI-003',
    price: 45,
    image:
      'https://m2ce.sindabad.com/pub/media/catalog/product//b/e/bengal_meat_mutton_keema_1kg.jpg',
    category: 'vegetables',
    subcategory: 'fresh-vegetables',
    description:
      'Fresh, crisp red onions. Essential for everyday cooking, salads, and garnishing.',
    rating: 4.3,
    weight: '500g',
    origin: 'Local Farm',
    nutritionalInfo: {
      calories: '40 kcal/100g',
      protein: '1.1g',
      carbs: '9.3g',
      fiber: '1.7g',
    },
    storage: 'Store in a cool, dry place',
    shelfLife: '2-3 weeks when properly stored',
  },
];

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [selectedColor, setSelectedColor] = useState<TSelectedColor | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState(null);

  // Find the current product
  const product =
    products.find((p: any) => p.id === parseInt(id as string)) || products[0];

  // Find related products (same subcategory, excluding current product)
  const relatedProducts = products.filter(
    (p: any) => p.subcategory === product.subcategory && p.id !== product.id
  );

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleQuickOrder = () => {
    // Add quick order logic here
    // This should add to cart and redirect to checkout
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const images = [
    {
      original:
        'https://m2ce.sindabad.com/pub/media/catalog/product//s/i/sindabad-chinigura-rice_-1kg.jpg',
      thumbnail:
        'https://m2ce.sindabad.com/pub/media/catalog/product//s/i/sindabad-chinigura-rice_-1kg.jpg',
    },
    {
      original:
        'https://m2ce.sindabad.com/pub/media/catalog/product//p/r/pran-aromatic-chinigura-premium-rice_-1kg.jpg',
      thumbnail:
        'https://m2ce.sindabad.com/pub/media/catalog/product//p/r/pran-aromatic-chinigura-premium-rice_-1kg.jpg',
    },
    {
      original:
        'https://m2ce.sindabad.com/pub/media/catalog/product//f/o/fortune-basmati-rice_-5kg.jpg',
      thumbnail:
        'https://m2ce.sindabad.com/pub/media/catalog/product//f/o/fortune-basmati-rice_-5kg.jpg',
    },
  ];

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
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              SKU: {product.sku}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.rating} rating)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" gutterBottom>
              {product.price} TK
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                per {product.weight}
              </Typography>
            </Typography>

            {/* Add Color Selection */}
            {product.colors && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Color: {selectedColor?.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {product.colors.map((color: any) => (
                    <Box
                      key={color.code}
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: color.code,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor:
                          selectedColor?.code === color.code
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
            {product.sizes && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Size: {selectedSize}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {product.sizes.map((size: any) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'contained' : 'outlined'}
                      onClick={() => setSelectedSize(size)}
                      sx={{ minWidth: 60 }}
                    >
                      {size}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

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
                onClick={() => {
                  /* Add to cart logic */
                }}
              >
                Add to Cart - {product.price * quantity} TK
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<FlashOnIcon />}
                component={Link}
                to="/checkout"
                onClick={handleQuickOrder}
              >
                Quick Order
              </Button>
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
            <Tab label="Video" />
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
                  {product.description}
                </Typography>

                {/* Product Details */}
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Product Details
                </Typography>
                <Grid container spacing={2}>
                  {product.origin && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Origin
                      </Typography>
                      <Typography variant="body2">{product.origin}</Typography>
                    </Grid>
                  )}
                  {product.weight && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Package Size
                      </Typography>
                      <Typography variant="body2">{product.weight}</Typography>
                    </Grid>
                  )}
                  {product.storage && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Storage Instructions
                      </Typography>
                      <Typography variant="body2">{product.storage}</Typography>
                    </Grid>
                  )}
                  {product.shelfLife && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Shelf Life
                      </Typography>
                      <Typography variant="body2">
                        {product.shelfLife}
                      </Typography>
                    </Grid>
                  )}
                </Grid>

                {/* Nutritional Information */}
                {product.nutritionalInfo && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Nutritional Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {Object.entries(product.nutritionalInfo).map(
                        ([key, value]) => (
                          <Box key={key}>
                            <Typography variant="body2" color="text.secondary">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Typography>
                            <Typography variant="body1">
                              {value as string}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                )}
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

          {/* Video Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 800,
                  margin: '0 auto',
                  aspectRatio: '16/9',
                  bgcolor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                }}
              >
                <PlayCircleIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography
                  variant="body1"
                  sx={{ position: 'absolute', bottom: 16 }}
                >
                  Product Overview Video
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Watch our product overview video to learn more about the
                features and benefits.
              </Typography>
            </Box>
          </TabPanel>

          {/* Privacy Policy Tab */}
          <TabPanel value={tabValue} index={3}>
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

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom className="font-semibold">
            You May Also Like
          </Typography>
          <Grid container spacing={3}>
            {productsData.map((relatedProduct: any) => (
              <Grid
                item
                xl={2}
                lg={3}
                md={4}
                sm={4}
                xs={6}
                key={relatedProduct.id}
              >
                <ProductCard product={relatedProduct} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetails;
