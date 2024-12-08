import React, { useState } from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@mui/material';
import { FaSearch, FaRegHeart } from 'react-icons/fa';
import { useGetAllMyComparesQuery } from '../../../redux/features/api/compare/compare.api';
import { LuGitCompare } from 'react-icons/lu';

const CustomerComparison: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetAllMyComparesQuery({});

  const filteredItems = data?.data.filter((item: any) =>
    item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-2">
      <div className="flex justify-between items-center my-5">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">
            My Comparison Products ({data?.data?.length})
          </h2>
          <LuGitCompare className="text-2xl text-primary-500" />
        </div>
        <TextField
          size="small"
          placeholder="Search comparison..."
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

      {/* <Grid container spacing={4}>
          {filteredItems?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <WishlistCard item={item} />
            </Grid>
          ))}
        </Grid> */}

      {filteredItems?.length === 0 && (
        <div className="text-center py-16">
          <LuGitCompare className="text-6xl text-gray-300 mx-auto mb-4" />
          <Typography variant="h6" color="textSecondary">
            No items found in your comparison
          </Typography>
          <Typography color="textSecondary">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Start adding items to your comparison!'}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CustomerComparison;
