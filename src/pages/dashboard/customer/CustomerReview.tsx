import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  status: 'published' | 'pending' | 'rejected';
}

const CustomerReview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedRating, setEditedRating] = useState(0);
  const [editedComment, setEditedComment] = useState('');

  // Dummy data - replace with actual API call
  const reviews: Review[] = [
    {
      id: '1',
      productId: 'p1',
      productName: 'Wireless Headphones',
      productImage: 'https://placehold.co/300x300',
      rating: 4,
      comment:
        'Great sound quality and comfortable to wear for long periods. Battery life could be better.',
      date: '2024-03-15',
      helpful: 12,
      status: 'published',
    },
    {
      id: '2',
      productId: 'p2',
      productName: 'Smart Watch',
      productImage: 'https://placehold.co/300x300',
      rating: 5,
      comment:
        'Amazing features and battery life. The fitness tracking is very accurate.',
      date: '2024-03-10',
      helpful: 8,
      status: 'published',
    },
    {
      id: '3',
      productId: 'p3',
      productName: 'Bluetooth Speaker',
      productImage: 'https://placehold.co/300x300',
      rating: 3,
      comment: 'Decent sound but connectivity issues sometimes.',
      date: '2024-03-05',
      helpful: 4,
      status: 'pending',
    },
  ];

  const filteredReviews = reviews.filter(
    (review) =>
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (review: Review) => {
    setEditReview(review);
    setEditedRating(review.rating);
    setEditedComment(review.comment);
    setIsEditDialogOpen(true);
  };

  const handleDeleteReview = (reviewId: string) => {
    // Implement delete review logic
    console.log('Deleting review:', reviewId);
  };

  const handleSaveEdit = () => {
    if (editReview) {
      // Implement save edit logic
      console.log('Saving edited review:', {
        ...editReview,
        rating: editedRating,
        comment: editedComment,
      });
    }
    setIsEditDialogOpen(false);
  };

  const getStatusColor = (status: Review['status']) => {
    const colors = {
      published: 'success',
      pending: 'warning',
      rejected: 'error',
    };
    return colors[status];
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Reviews</h2>
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
            className="w-64"
          />
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
                            <Rating
                              value={review.rating}
                              readOnly
                              size="small"
                            />
                            <span className="text-sm text-gray-500">
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            label={review.status}
                            color={getStatusColor(review.status)}
                            size="small"
                          />
                          <Button
                            startIcon={<FaEdit />}
                            onClick={() => handleEditClick(review)}
                            size="small"
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={<FaTrash />}
                            color="error"
                            onClick={() => handleDeleteReview(review.id)}
                            size="small"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-2"
                      >
                        {review.comment}
                      </Typography>
                      <div className="flex justify-between items-center mt-2">
                        <Typography variant="caption" color="textSecondary">
                          Reviewed on{' '}
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {review.helpful} people found this helpful
                        </Typography>
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
              {searchTerm
                ? 'Try adjusting your search terms'
                : "You haven't written any reviews yet"}
            </Typography>
          </div>
        )}

        {/* Edit Review Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Review</DialogTitle>
          <DialogContent>
            <div className="space-y-4 pt-4">
              <div>
                <Typography component="legend">Rating</Typography>
                <Rating
                  value={editedRating}
                  onChange={(_, newValue) => {
                    setEditedRating(newValue || 0);
                  }}
                />
              </div>
              <TextField
                label="Review Comment"
                multiline
                rows={4}
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                fullWidth
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSaveEdit}
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerReview;
