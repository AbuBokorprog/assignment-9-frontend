import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useEffect } from 'react';
import { FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaStore } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import {
  useGetShopByIdQuery,
  useShopFollowToggleMutation,
} from '../../redux/features/api/shops/shops.api';
import { TShop } from '../../types/shop.type';
import ProductCard from '../../components/ui/ProductCard';
import { Product } from '../../types/product.type';
import { useAppSelector } from '../../redux/hooks/hooks';
import { currentUser } from '../../redux/store';

const ShopDetails: React.FC = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const [followToggle] = useShopFollowToggleMutation();
  const { data } = useGetShopByIdQuery(id);
  const shop: TShop = data?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isFollowingShop = shop.followers?.some((f) => f.userId === user?.id);

  const toggleFollowShopHandler = async (shopId: string) => {
    const data = { shopId: shopId };
    try {
      await followToggle(data).unwrap();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Box className="container mx-auto px-2">
      <Card className="hover:shadow-lg transition-shadow">
        <div
          className="h-60 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${shop?.shopCover})` }}
        >
          <div className="absolute -bottom-6 left-6">
            <Avatar
              src={shop?.shopLogo}
              alt={shop?.shopName}
              sx={{ width: 84, height: 84 }}
              className="border-4 border-white shadow-md"
            />
          </div>
          <div className="absolute top-4 right-4">
            <Chip
              label={shop?.isActive}
              color={shop?.isActive === 'APPROVED' ? 'success' : 'error'}
              size="small"
            />
          </div>
        </div>
        <CardContent className="pt-8">
          <div className="flex justify-between items-start">
            <div>
              <Typography variant="h5" component="h3" className="mb-1">
                {shop?.shopName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-2"
              >
                {shop?.category?.name}
              </Typography>
              <div className="flex items-center gap-2 mb-3">
                <Rating value={5} readOnly size="small" />
                <Typography variant="body2" color="textSecondary">
                  (5 reviews)
                </Typography>
              </div>
            </div>
            <div className="flex gap-2">
              {isFollowingShop ? (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<FaHeart />}
                  onClick={() => toggleFollowShopHandler(shop?.id)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<FavoriteBorderIcon />}
                  onClick={() => toggleFollowShopHandler(shop?.id)}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt />
              <Typography variant="body2">{shop?.address}</Typography>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhoneAlt />
              <Typography variant="body2">
                {shop?.vendor.contactNumber}
              </Typography>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaStore />
              <Typography variant="body2">
                {shop?.products?.length} Products
              </Typography>
            </div>
          </div>

          {/* <Typography
            variant="caption"
            color="textSecondary"
            className="block mt-4"
          >
            Following since {new Date(shop?.followedSince).toLocaleDateString()}
          </Typography> */}
        </CardContent>
      </Card>
      <Divider />
      {/* Products */}
      <Box>
        <Typography
          variant="h4"
          component={'h4'}
          className="text-center my-5 lg:my-10"
        >
          Shop's Products
        </Typography>

        <Grid container spacing={2}>
          {shop?.products?.map((p: Product, index: number) => (
            <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ShopDetails;
