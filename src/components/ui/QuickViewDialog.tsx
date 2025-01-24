import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import QuickOrder from '../products/QuickOrder';
import { Link } from 'react-router-dom';
import ReactImageGallery from 'react-image-gallery';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCreateCartMutation } from '../../redux/features/api/carts/carts.api';
import { toast } from 'sonner';
import { TReview } from '../../types/review.type';
import { useGetProductByIdQuery } from '../../redux/features/api/products/products.api';

type QuickViewDialogProps = {
  children: React.ReactNode;
  id: string;
};

const QuickViewDialog: React.FC<QuickViewDialogProps> = ({ children, id }) => {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  const { data } = useGetProductByIdQuery(id);
  const product = data?.data?.product;

  const [addToCart] = useCreateCartMutation();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const images =
    product?.images?.map((image: string) => ({
      original: image,
      thumbnail: image,
    })) || [];

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

  const totalRating = product?.reviews?.reduce(
    (sum: number, item: TReview) => sum + item.rating,
    0
  );

  const reviewCount = product?.reviews?.length || 0;
  const avgRating = reviewCount > 0 ? totalRating / reviewCount : 0;
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        fullScreen
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          {/* Product Main Section */}
          <Grid container spacing={4}>
            {/* Product Image */}
            <Grid item xs={12} md={6} className="">
              <ReactImageGallery items={images} autoPlay={true} />
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
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default QuickViewDialog;
