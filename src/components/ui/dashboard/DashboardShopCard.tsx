import React, { useState } from 'react';
import { Shop } from '../../../types/shop.type';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from '@mui/material';
import {
  FaCheck,
  FaEdit,
  FaEllipsisV,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStore,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import {
  useDeleteShopMutation,
  useUpdateShopStatusMutation,
} from '../../../redux/features/api/shops/shops.api';
import { toast } from 'sonner';

type dashboardShopCardProps = {
  shop: Shop;
};

const DashboardShopCard: React.FC<dashboardShopCardProps> = ({ shop }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, shop: Shop) => {
    setAnchorEl(event.currentTarget);
    setSelectedShop(shop);
  };
  const [updateStatus, { isLoading: isUpdateLoading }] =
    useUpdateShopStatusMutation();
  const [deleteShop, { isLoading: isDeleteLoading }] = useDeleteShopMutation();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditShop = () => {
    // Implement edit shop logic
    console.log('Editing shop:', selectedShop?.id);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async (id: string) => {
    const toastId = toast.loading('Loading...');
    try {
      const res = await deleteShop(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
        setIsDeleteDialogOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const toastId = toast.loading('Loading...');
    const data = { id, status };

    try {
      const res = await updateStatus(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getStatusColor = (isActive: Shop['isActive']) => {
    const colors: Record<Shop['isActive'], 'success' | 'error' | 'warning'> = {
      active: 'success',
      inactive: 'error',
      pending: 'warning',
    };
    return colors[isActive];
  };
  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow">
        <div
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${shop.shopCover})` }}
        >
          <div className="absolute -bottom-6 left-6">
            <Avatar
              src={shop.shopLogo}
              alt={shop.shopName}
              sx={{ width: 84, height: 84 }}
              className="border-4 border-white shadow-md"
            />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Chip
              label={shop.isActive}
              color={getStatusColor(shop.isActive)}
              size="small"
            />
            <IconButton
              onClick={(e) => handleMenuOpen(e, shop)}
              className="bg-white hover:bg-gray-100"
              size="small"
            >
              <FaEllipsisV />
            </IconButton>
          </div>
        </div>
        <CardContent className="pt-8">
          <div className="flex justify-between items-start">
            <div>
              <Typography variant="h5" component="h3" className="mb-1">
                {shop.shopName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-2"
              >
                {/* {shop.category} */}
              </Typography>
              <div className="flex items-center gap-2 mb-3">
                <Rating value={shop.rating} readOnly size="small" />
                <Typography variant="body2" color="textSecondary">
                  {/* ({shop.rating} rating) */}
                </Typography>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Typography variant="h6" color="primary">
                  {shop.products?.length}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Products
                </Typography>
              </div>
              <div>
                <Typography variant="h6" color="primary">
                  {shop.orders?.length}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Orders
                </Typography>
              </div>
              {/* <div>
                        <Typography variant="h6" color="primary">
                          ${shop.totalRevenue.toLocaleString()}
                         
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Revenue
                        </Typography>
                      </div> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt />
              <Typography variant="body2">{shop.address}</Typography>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhoneAlt />
              <Typography variant="body2">
                {shop.vendor?.contactNumber}
              </Typography>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaStore />
              <Typography variant="body2">
                Created on {new Date(shop.createdAt).toLocaleDateString()}
              </Typography>
            </div>
            <div className="flex gap-2">
              {/* <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FaReply />}
                          onClick={() => handleReplyClick(review)}
                        >
                          {review.reply ? 'Edit Reply' : 'Reply'}
                        </Button> */}
              {shop.isActive === 'APPROVED' && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<FaCheck />}
                    onClick={() => handleUpdateStatus(shop.id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<FaTimes />}
                    onClick={() => handleUpdateStatus(shop?.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shop Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditShop}>
          <FaEdit className="mr-2" /> Edit Shop
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} className="text-red-500">
          <FaTrash className="mr-2" /> Delete Shop
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedShop?.shopName}? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteConfirm(shop.id)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardShopCard;
