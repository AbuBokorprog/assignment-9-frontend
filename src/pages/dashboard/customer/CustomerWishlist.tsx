import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@mui/material';
import { FaSearch, FaRegHeart } from 'react-icons/fa';
import { useGetAllMyWishlistsQuery } from '../../../redux/features/api/wishlist/wishlistapi';
import { TWishlist } from '../../../types/wishlist.type';
import WishlistCard from '../../../components/ui/dashboard/WishlistCard';
import Loader from '../../../components/ui/Loader';

const CustomerWishlist: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetAllMyWishlistsQuery({});

  const filteredItems = data?.data.filter((item: TWishlist) =>
    item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">My Wishlist</h2>
            <FaRegHeart className="text-2xl text-primary-500" />
          </div>
          <TextField
            size="small"
            placeholder="Search wishlist..."
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
          {filteredItems?.map((item: TWishlist) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <WishlistCard item={item} />
            </Grid>
          ))}
        </Grid>

        {filteredItems?.length === 0 && (
          <div className="text-center py-16">
            <FaRegHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <Typography variant="h6" color="textSecondary">
              No items found in your wishlist
            </Typography>
            <Typography color="textSecondary">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Start adding items to your wishlist!'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerWishlist;
