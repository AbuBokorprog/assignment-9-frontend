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
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  FaSearch,
  FaStore,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaPause,
  FaPlay,
} from 'react-icons/fa';
import { useGetAllShopsQuery } from '../../../redux/features/api/shops/shops.api';
import Loader from '../../../components/ui/Loader';

interface Shop {
  id: string;
  shopName: string;
  shopLogo: string;
  shopCover: string;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  address: string;
  phone: string;
  website?: string;
  isActive: 'active' | 'inactive' | 'pending';
  category: string;
  createdAt: string;
}

const VendorAllShop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading } = useGetAllShopsQuery({});

  const filteredShops = data?.data?.filter((shop: any) =>
    shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, shop: Shop) => {
    setAnchorEl(event.currentTarget);
    setSelectedShop(shop);
  };

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

  const handleDeleteConfirm = () => {
    // Implement delete shop logic
    console.log('Deleting shop:', selectedShop?.id);
    setIsDeleteDialogOpen(false);
  };

  const handleToggleStatus = () => {
    // Implement isActive toggle logic
    console.log('Toggling isActive for shop:', selectedShop?.id);
    handleMenuClose();
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold">My Shops</h2>
                <FaStore className="text-2xl text-primary-500" />
              </div>
              <div className="flex gap-4">
                <TextField
                  size="small"
                  placeholder="Search shops..."
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
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaStore />}
                  href="/dashboard/vendor/add-shop"
                >
                  Add New Shop
                </Button>
              </div>
            </div>

            <Grid container spacing={4}>
              {filteredShops?.map((shop: any) => (
                <Grid item xs={12} key={shop.id}>
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
                          <Typography
                            variant="h5"
                            component="h3"
                            className="mb-1"
                          >
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
                          <Typography variant="body2">
                            {shop.address}
                          </Typography>
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
                            Created on{' '}
                            {new Date(shop.createdAt).toLocaleDateString()}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {filteredShops?.length === 0 && (
              <div className="text-center py-16">
                <FaStore className="text-6xl text-gray-300 mx-auto mb-4" />
                <Typography variant="h6" color="textSecondary">
                  No shops found
                </Typography>
                <Typography color="textSecondary">
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : "You haven't created any shops yet"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaStore />}
                  href="/dashboard/vendor/add-shop"
                  className="mt-4"
                >
                  Create Your First Shop
                </Button>
              </div>
            )}

            {/* Shop Actions Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditShop}>
                <FaEdit className="mr-2" /> Edit Shop
              </MenuItem>
              <MenuItem onClick={handleToggleStatus}>
                {selectedShop?.isActive === 'active' ? (
                  <>
                    <FaPause className="mr-2" /> Deactivate Shop
                  </>
                ) : (
                  <>
                    <FaPlay className="mr-2" /> Activate Shop
                  </>
                )}
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
                <Button onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteConfirm} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorAllShop;
