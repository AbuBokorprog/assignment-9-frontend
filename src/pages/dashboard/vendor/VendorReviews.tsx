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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  FaSearch,
  FaFilter,
  FaReply,
  FaFlag,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reply?: string;
  helpful: number;
  reported: boolean;
}

const VendorReviews: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Dummy data - replace with actual API call
  const reviews: Review[] = [
    {
      id: '1',
      productId: 'p1',
      productName: 'Wireless Earbuds',
      productImage: 'https://placehold.co/100x100',
      customerName: 'John Doe',
      customerImage: 'https://placehold.co/40x40',
      rating: 4,
      comment:
        'Great sound quality and comfortable to wear. Battery life could be better though.',
      date: '2024-03-15',
      status: 'approved',
      helpful: 12,
      reported: false,
    },
    {
      id: '2',
      productId: 'p2',
      productName: 'Smart Watch',
      productImage: 'https://placehold.co/100x100',
      customerName: 'Jane Smith',
      rating: 2,
      comment: 'The watch keeps disconnecting from my phone. Very frustrating.',
      date: '2024-03-14',
      status: 'pending',
      reply:
        'We apologize for the inconvenience. Please update to the latest firmware.',
      helpful: 5,
      reported: true,
    },
  ];

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleRatingChange = (event: SelectChangeEvent) => {
    setRatingFilter(event.target.value);
  };

  const getStatusColor = (
    status: Review['status']
  ): 'success' | 'warning' | 'error' => {
    const colors = {
      approved: 'success',
      pending: 'warning',
      rejected: 'error',
    } as const;
    return colors[status];
  };

  const handleReplyClick = (review: Review) => {
    setSelectedReview(review);
    setReplyText(review.reply || '');
    setIsReplyDialogOpen(true);
  };

  const handleSaveReply = () => {
    if (selectedReview) {
      // Implement save reply logic
      console.log('Saving reply for review:', selectedReview.id, replyText);
    }
    setIsReplyDialogOpen(false);
  };

  const handleUpdateStatus = (
    reviewId: string,
    newStatus: Review['status']
  ) => {
    // Implement status update logic
    console.log('Updating status:', reviewId, newStatus);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || review.status === statusFilter;
    const matchesRating =
      ratingFilter === 'all' || review.rating === Number(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
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
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
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
              {[5, 4, 3, 2, 1].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating} Stars
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Grid container spacing={4}>
          {filteredReviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="h6" component="h3">
                            {review.productName}
                          </Typography>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {review.customerImage ? (
                                <img
                                  src={review.customerImage}
                                  alt={review.customerName}
                                  className="w-6 h-6 rounded-full"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-200" />
                              )}
                              <Typography variant="body2">
                                {review.customerName}
                              </Typography>
                            </div>
                            <Typography variant="caption" color="textSecondary">
                              • {new Date(review.date).toLocaleDateString()}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            label={review.status}
                            color={getStatusColor(review.status)}
                            size="small"
                          />
                          {review.reported && (
                            <Chip
                              icon={<FaFlag />}
                              label="Reported"
                              color="error"
                              size="small"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="body2" color="textSecondary">
                          • {review.helpful} people found this helpful
                        </Typography>
                      </div>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-4"
                      >
                        {review.comment}
                      </Typography>

                      {review.reply && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className="font-medium mb-1"
                          >
                            Your Reply:
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {review.reply}
                          </Typography>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FaReply />}
                          onClick={() => handleReplyClick(review)}
                        >
                          {review.reply ? 'Edit Reply' : 'Reply'}
                        </Button>
                        {review.status === 'pending' && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={<FaCheck />}
                              onClick={() =>
                                handleUpdateStatus(review.id, 'approved')
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              startIcon={<FaTimes />}
                              onClick={() =>
                                handleUpdateStatus(review.id, 'rejected')
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredReviews.length === 0 && (
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
        <Dialog
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
        </Dialog>
      </div>
    </div>
  );
};

export default VendorReviews;
