import { Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { FaSearch, FaStore } from 'react-icons/fa';
import { useGetAllReviewsQuery } from '../../../redux/features/api/reviews/reviews.api';
import Loader from '../../../components/ui/Loader';
import DashboardReviewCard from '../../../components/ui/dashboard/DashboardReviewCard';
import { TReview } from '../../../types/review.type';

const AdminAllReviews: React.FC = () => {
  const { data, isLoading } = useGetAllReviewsQuery({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              All Reviews ({data?.data?.length})
            </h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
          <div className="flex gap-4">
            <TextField
              size="small"
              placeholder="Search orders..."
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
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
        </div>
        <Grid container spacing={4}>
          {data?.data?.map((review: TReview) => (
            <Grid item xs={12} key={review.id}>
              <DashboardReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
        {data?.data?.length === 0 && (
          <div className="text-center py-16">
            <Typography variant="h6" color="textSecondary">
              No reviews found
            </Typography>
            <Typography color="textSecondary"></Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllReviews;
