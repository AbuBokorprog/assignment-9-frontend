import React, { useState } from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@mui/material';
import { FaSearch, FaStore } from 'react-icons/fa';
import CustomerShopCard from '../../../components/ui/dashboard/CustomerShopCard';
import { useGetMyFollowingShopQuery } from '../../../redux/features/api/shops/shops.api';
import { TFollowShop, TShop } from '../../../types/shop.type';
import Loader from '../../../components/ui/Loader';

const CustomerFollowShop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetMyFollowingShopQuery({});

  const filteredShops = data?.data?.filter((FShop: TFollowShop) =>
    FShop?.shop?.shopName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Followed Shops</h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
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
        </div>

        <Grid container spacing={4}>
          {filteredShops?.map((shop: TFollowShop) => (
            <Grid item xs={12} key={shop.id}>
              <CustomerShopCard data={shop} />
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
                : "You haven't followed any shops yet"}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerFollowShop;
