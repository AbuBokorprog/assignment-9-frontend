import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@mui/material';
import { FaSearch, FaProductHunt } from 'react-icons/fa';
import { useGetMyAllRecentProductsQuery } from '../../redux/features/api/recently-viewed/recently-viewed.api';
import ProductCard from '../../components/ui/ProductCard';
import { TRecentProduct } from '../../types/product.type';

const MyRecentProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetMyAllRecentProductsQuery({});

  const filteredItems = data?.data
    ?.slice(0, 10)
    .filter((item: any) =>
      item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto px-2">
      <div className="flex justify-between items-center my-5">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">My Recent Products</h2>
          <FaProductHunt className="text-2xl text-primary-500" />
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
        {filteredItems?.map((RP: TRecentProduct) => (
          <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={RP.id}>
            <ProductCard product={RP?.product} />
          </Grid>
        ))}
      </Grid>

      {filteredItems?.length === 0 && (
        <div className="text-center py-16">
          <FaProductHunt className="text-6xl text-gray-300 mx-auto mb-4" />
          <Typography variant="h6" color="textSecondary">
            No items found in your recent products
          </Typography>
          <Typography color="textSecondary">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Start adding items to your recent products!'}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MyRecentProducts;
