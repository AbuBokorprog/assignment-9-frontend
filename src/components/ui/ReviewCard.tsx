import { Avatar, Box, Divider, Rating, Typography } from '@mui/material';
import React from 'react';
import { TReview } from '../../types/review.type';

type ReviewCardProps = {
  review: TReview;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  console.log(review);
  return (
    <div>
      <Box key={review?.id} sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ mr: 2 }}>
            {review?.customer?.customer?.profilePhoto}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">
              {review?.customer?.customer?.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={review?.rating} size="small" readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {new Date(review?.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {review?.comment}
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>
    </div>
  );
};

export default ReviewCard;
