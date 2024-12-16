import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useShopFollowToggleMutation } from '../../../redux/features/api/shops/shops.api';
import { TFollowShop } from '../../../types/shop.type';
import { activeStatusColor, getStatusColor } from '../../../utils/constaints';

type CustomerShopCardProps = {
  data: TFollowShop;
};

const CustomerShopCard: React.FC<CustomerShopCardProps> = ({ data }) => {
  // const user = useAppSelector(currentUser);
  const [followToggle] = useShopFollowToggleMutation();

  const toggleFollowShopHandler = async (shopId: string) => {
    const data = { shopId: shopId };
    try {
      await followToggle(data).unwrap();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow">
        <div
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${data.shop?.shopCover})` }}
        >
          <div className="absolute -bottom-6 left-6">
            <Avatar
              src={data.shop.shopLogo}
              alt={data.shop.shopName}
              sx={{ width: 84, height: 84 }}
              className="border-4 border-white shadow-md"
            />
          </div>
          <div className="absolute top-4 right-4">
            <Chip
              label={data.shop.isActive}
              color={getStatusColor(data?.shop?.isActive, activeStatusColor)}
              size="small"
            />
          </div>
        </div>
        <CardContent className="pt-8">
          <div className="flex justify-between items-start">
            <div>
              <Typography variant="h5" component="h3" className="mb-1">
                {data.shop.shopName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-2"
              >
                {data.shop?.category.name}
              </Typography>
              <div className="flex items-center gap-2 mb-3">
                <Rating value={5} readOnly size="small" />
                <Typography variant="body2" color="textSecondary">
                  ({5} reviews)
                </Typography>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<FaHeart />}
                  onClick={() => toggleFollowShopHandler(data?.shop?.id)}
                >
                  Unfollow
                </Button>
              </div>
              <Link to={`/shop-details/${data?.shopId}`}>
                <Button variant="contained" color="primary">
                  Visit Shop
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt />
              <Typography variant="body2">{data.shop?.address}</Typography>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhoneAlt />
              <Typography variant="body2">
                {data.shop?.vendor.contactNumber}
              </Typography>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaStore />
              <Typography variant="body2">
                {data.shop?.products?.length} Products
              </Typography>
            </div>
          </div>

          <Typography
            variant="caption"
            color="textSecondary"
            className="block mt-4"
          >
            Following since {new Date(data.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerShopCard;
