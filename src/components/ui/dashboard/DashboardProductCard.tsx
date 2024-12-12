import {
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
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  FaCheck,
  FaEdit,
  FaEllipsisV,
  FaEye,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { Product } from '../../../types/product.type';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import { toast } from 'sonner';
import {
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} from '../../../redux/features/api/products/products.api';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
};

const DashboardProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const user: any = useAppSelector(currentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const [updateStatus] = useUpdateProductStatusMutation();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProduct = () => {
    // Implement edit product logic
    console.log('Editing product:', selectedProduct?.id);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async (id: string) => {
    const toastId = toast.loading('Loading...');
    try {
      const res = await deleteProduct(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
      }
    } catch (error) {
      console.log(error);
    }
    setIsDeleteDialogOpen(false);
  };

  const getStatusColor = (stockStatus: Product['stockStatus']) => {
    const colors = {
      'in-stock': 'success',
      'low-stock': 'warning',
      'out-of-stock': 'error',
    } as const;
    return colors[stockStatus];
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

  return (
    <div>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <IconButton
              onClick={(e) => handleMenuOpen(e, product)}
              className="bg-white hover:bg-gray-100"
              size="small"
            >
              <FaEllipsisV />
            </IconButton>
          </div>

          <div>
            {product?.productStatus !== 'REGULAR' && (
              <Chip
                label={product?.productStatus}
                color="primary"
                size="small"
                className="absolute top-4 left-4"
              />
            )}
          </div>
        </div>
        <CardContent className="">
          <Typography variant="h6" component="h3" className="mb-2">
            {product.name}
          </Typography>
          <div className="">
            <Chip
              label={product?.isActive}
              color="primary"
              size="small"
              className=""
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <div>
              {product.discount_price ? (
                <div className="flex items-center gap-2">
                  <Typography
                    variant="h6"
                    color="primary"
                    className="font-bold"
                  >
                    ${product.discount_price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="line-through"
                  >
                    ${product.regular_price}
                  </Typography>
                </div>
              ) : (
                <Typography variant="h6" color="primary" className="font-bold">
                  ${product.regular_price}
                </Typography>
              )}
            </div>
            <Chip
              label={product.stockStatus.replace('-', ' ')}
              color={getStatusColor(product?.stockStatus)}
              size="small"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Typography variant="caption" color="textSecondary">
                In Stock
              </Typography>
              <Typography variant="body2" className="font-semibold">
                {product?.inventory} units
              </Typography>
            </div>
          </div>
          {user?.role === 'ADMIN' && (
            <div className="flex gap-2">
              {product.isActive === 'PENDING' && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<FaCheck />}
                    onClick={() => handleUpdateStatus(product.id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<FaTimes />}
                    onClick={() => handleUpdateStatus(product?.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          )}
          <Typography variant="caption" color="textSecondary">
            Added on {new Date(product.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      {/* Product Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditProduct}>
          <FaEdit className="mr-2" /> Edit Product
        </MenuItem>
        <Link to={`/product-details/${product?.id}`}>
          <MenuItem>
            <FaEye className="mr-2" /> View Details
          </MenuItem>
        </Link>
        <MenuItem onClick={handleDeleteClick} className="text-red-500">
          <FaTrash className="mr-2" /> Delete Product
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
            Are you sure you want to delete {selectedProduct?.name}? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteConfirm(product.id)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardProductCard;
