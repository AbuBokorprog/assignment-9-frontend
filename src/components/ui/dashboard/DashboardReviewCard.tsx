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
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useUpdateReviewStatusMutation } from '../../../redux/features/api/reviews/reviews.api';
import { toast } from 'sonner';
import { activeStatusColor, getStatusColor } from '../../../utils/constaints';

type DashboardReviewCardProps = {
  review: TReview;
};

const DashboardReviewCard: React.FC<DashboardReviewCardProps> = ({
  review,
}): any => {
  const [updateStatus] = useUpdateReviewStatusMutation();

  const handleUpdateStatus = async (
    reviewId: string,
    newStatus: TReview['reviewStatus']
  ) => {
    const toastId = toast.loading('Loading...');
    const data = { id: reviewId, status: newStatus };
    try {
      const res = await updateStatus(data).unwrap();
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.error, { id: toastId, duration: 200 });
    }
  };

  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-32">
              <img
                src={review?.product?.images?.[0]}
                alt={review?.product?.name}
                className="size-32 object-cover rounded-full border"
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
                    color={getStatusColor(
                      review?.reviewStatus,
                      activeStatusColor
                    )}
                    size="small"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Rating value={review.rating} readOnly size="small" />
              </div>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-4"
              >
                {review.comment}
              </Typography>

              <div className="flex gap-2">
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
                      onClick={() => handleUpdateStatus(review.id, 'REJECT')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {review.reviewStatus === 'APPROVED' && (
                  <>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      startIcon={<FaCheck />}
                      onClick={() => handleUpdateStatus(review.id, 'PENDING')}
                    >
                      pending
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<FaTimes />}
                      onClick={() => handleUpdateStatus(review.id, 'REJECT')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {review.reviewStatus === 'REJECT' && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<FaCheck />}
                      onClick={() => handleUpdateStatus(review.id, 'APPROVED')}
                    >
                      approved
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      startIcon={<FaTimes />}
                      onClick={() => handleUpdateStatus(review.id, 'PENDING')}
                    >
                      pending
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
