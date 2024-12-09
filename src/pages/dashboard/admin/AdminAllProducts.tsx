import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  FaCheck,
  FaEdit,
  FaEllipsisV,
  FaEye,
  FaPlusCircle,
  FaSearch,
  FaStore,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { useGetAllProductsQuery } from '../../../redux/features/api/products/products.api';
import { Product } from '../../../types/product.type';
import DashboardProductCard from '../../../components/ui/dashboard/DashboardProductCard';

const AdminAllProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading } = useGetAllProductsQuery({});

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

  const handleDeleteConfirm = () => {
    // Implement delete product logic
    console.log('Deleting product:', selectedProduct?.id);
    setIsDeleteDialogOpen(false);
  };

  const getStatusColor = (stockStatus: Product['stockStatus']) => {
    const colors = {
      IN_STOCK: 'success',
      LOW_STOCK: 'warning',
      OUT_OF_STOCK: 'error',
    } as const;
    return colors[stockStatus];
  };

  const filteredProducts = data?.data?.data?.filter((product: any) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleUpdateStatus = (id: string, status) => {};

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              All Products ({data?.data?.length})
            </h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
          <div className="flex gap-4">
            <TextField
              size="small"
              placeholder="Search products..."
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
        </div>

        {/* all products */}
        <Grid container spacing={4}>
          {filteredProducts?.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <DashboardProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {filteredProducts?.length === 0 && (
          <div className="text-center py-16">
            <Typography variant="h6" color="textSecondary">
              No products found
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPlusCircle />}
              href="/dashboard/vendor/add-product"
              className="mt-4"
            >
              Add Your First Product
            </Button>
          </div>
        )}

        {/* Product Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditProduct}>
            <FaEdit className="mr-2" /> Edit Product
          </MenuItem>
          <MenuItem onClick={() => console.log('View product details')}>
            <FaEye className="mr-2" /> View Details
          </MenuItem>
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
              Are you sure you want to delete {selectedProduct?.name}? This
              action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminAllProducts;
