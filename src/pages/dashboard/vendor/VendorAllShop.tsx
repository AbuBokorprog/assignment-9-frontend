import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Rating,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  FaSearch,
  FaStore,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaPause,
  FaPlay,
} from 'react-icons/fa';
import { useGetAllShopsQuery } from '../../../redux/features/api/shops/shops.api';
import Loader from '../../../components/ui/Loader';
import { Link } from 'react-router-dom';
import DashboardShopCard from '../../../components/ui/dashboard/DashboardShopCard';

interface Shop {
  id: string;
  shopName: string;
  shopLogo: string;
  shopCover: string;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  address: string;
  phone: string;
  website?: string;
  isActive: 'active' | 'inactive' | 'pending';
  category: string;
  createdAt: string;
}

const VendorAllShop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetAllShopsQuery({});

  const filteredShops = data?.data?.filter((shop: any) =>
    shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold">My Shops</h2>
                <FaStore className="text-2xl text-primary-500" />
              </div>
              <div className="flex gap-4">
                <TextField
                  size="small"
                  placeholder="Search shops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaSearch className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                  className="w-64"
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaStore />}
                  href="/dashboard/vendor/add-shop"
                >
                  Add New Shop
                </Button>
              </div>
            </div>

            <Grid container spacing={4}>
              {filteredShops?.map((shop: any) => (
                <Grid item xs={12} key={shop.id}>
                  <DashboardShopCard shop={shop} />
                </Grid>
              ))}
            </Grid>

            {filteredShops?.length === 0 && (
              <div className="text-center py-16">
                <FaStore className="text-6xl text-gray-300 mx-auto mb-4" />
                <Typography variant="h6" color="textSecondary">
                  No shops found
                </Typography>
                <Typography color="textSecondary">
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : "You haven't created any shops yet"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaStore />}
                  href="/dashboard/vendor/add-shop"
                  className="mt-4"
                >
                  Create Your First Shop
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VendorAllShop;
