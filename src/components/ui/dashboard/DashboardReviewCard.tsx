import {
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { TReview } from '../../../types/review.type';
import { FaCheck, FaReply, FaTimes } from 'react-icons/fa';

type DashboardReviewCardProps = {
  review: TReview;
};

const DashboardReviewCard: React.FC<DashboardReviewCardProps> = ({
  review,
}): any => {
  const getStatusColor = (
    status: TReview['reviewStatus']
  ): 'success' | 'warning' | 'error' => {
    const colors = {
      APPROVED: 'success',
      PENDING: 'warning',
      REJECTED: 'error',
    } as const;
    return colors[status];
  };

  const handleUpdateStatus = (
    reviewId: string,
    newStatus: TReview['reviewStatus']
  ) => {
    // Implement status update logic
    console.log('Updating status:', reviewId, newStatus);
  };

  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-32">
              <img
                src={review?.product?.images?.[0]}
                alt={review?.product?.name}
                className="w-full h-32 object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <Typography variant="h6" component="h3">
                    {review?.product?.name}
                  </Typography>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {review.customer?.customer ? (
                        <img
                          src={review.customer?.customer?.profilePhoto}
                          alt={review.customer?.customer?.name}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                      )}
                      <Typography variant="body2">
                        {review.customer?.customer?.name}
                      </Typography>
                    </div>
                    <Typography variant="caption" color="textSecondary">
                      • {new Date(review?.createdAt).toLocaleDateString()}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Chip
                    label={review?.reviewStatus}
                    color={getStatusColor(review?.reviewStatus)}
                    size="small"
                  />
                  {/* {review.reported && (
                            <Chip
                              icon={<FaFlag />}
                              label="Reported"
                              color="error"
                              size="small"
                            />
                          )} */}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Rating value={review.rating} readOnly size="small" />
                {/* <Typography variant="body2" color="textSecondary">
                          • {review.helpful} people found this helpful
                        </Typography> */}
              </div>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-4"
              >
                {review.comment}
              </Typography>

              {/* {review.reply && (
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
                      )} */}

              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FaReply />}
                  // onClick={() => handleReplyClick(review)}
                >
                  {/* {review.reply ? 'Edit Reply' : 'Reply'} */}
                </Button>
                {review.reviewStatus === 'PENDING' && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<FaCheck />}
                      onClick={() => handleUpdateStatus(review.id, 'APPROVED')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<FaTimes />}
                      onClick={() => handleUpdateStatus(review.id, 'REJECTED')}
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
    </div>
  );
};

export default DashboardReviewCard;
