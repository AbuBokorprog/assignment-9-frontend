import React, { useState } from 'react';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { TReview } from '../../../types/review.type';
import { useGetVendorAllReviewsQuery } from '../../../redux/features/api/reviews/reviews.api';
import DashboardReviewCard from '../../../components/ui/dashboard/DashboardReviewCard';
import Loader from '../../../components/ui/Loader';

const VendorReviews: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const { data, isLoading } = useGetVendorAllReviewsQuery({});

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleRatingChange = (event: SelectChangeEvent) => {
    setRatingFilter(event.target.value);
  };

  const filteredReviews = data?.data.filter((review: TReview) => {
    const matchesSearch =
      review?.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review?.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || review?.reviewStatus === statusFilter;
    const matchesRating =
      ratingFilter === 'all' || review?.rating === Number(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Review Management</h2>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <TextField
            size="small"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusChange}
              startAdornment={
                <InputAdornment position="start">
                  <FaFilter className="text-gray-400" />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="REJECT">Rejected</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Rating</InputLabel>
            <Select
              value={ratingFilter}
              label="Rating"
              onChange={handleRatingChange}
            >
              <MenuItem value="all">All Ratings</MenuItem>
              {[5, 4, 3, 2, 1]?.map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating} Stars
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Grid container spacing={4}>
          {filteredReviews?.map((review: TReview) => (
            <Grid item xs={12} key={review.id}>
              <DashboardReviewCard review={review} />
            </Grid>
          ))}
        </Grid>

        {filteredReviews?.length === 0 && (
          <div className="text-center py-16">
            <Typography variant="h6" color="textSecondary">
              No reviews found
            </Typography>
            <Typography color="textSecondary">
              {searchTerm || statusFilter !== 'all' || ratingFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No reviews have been submitted yet'}
            </Typography>
          </div>
        )}

        {/* Reply Dialog */}
        {/* <Dialog
          open={isReplyDialogOpen}
          onClose={() => setIsReplyDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Reply to Review</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              fullWidth
              placeholder="Type your reply..."
              className="mt-4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsReplyDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSaveReply}
              variant="contained"
              color="primary"
            >
              Save Reply
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </div>
  );
};

export default VendorReviews;
