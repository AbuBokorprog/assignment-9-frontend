import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useGetAllMyOrdersQuery } from '../../../redux/features/api/orders/orders.api';
import { TOrder, TProductOrder } from '../../../types/order.type';
import Loader from '../../../components/ui/Loader';

const CustomerOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetAllMyOrdersQuery({});

  const getStatusColor = (status: TOrder['status']) => {
    const colors = {
      PENDING: 'warning',
      PROCESSING: 'info',
      SHIPPED: 'primary',
      DELIVERED: 'success',
      CANCELLED: 'error',
    };
    return colors[status];
  };

  const filteredOrders = data?.data?.filter(
    (order: TOrder) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (orderId: string) => {
    // Implement order details view logic
    console.log('Viewing order:', orderId);
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Orders</h2>
          <TextField
            size="small"
            placeholder="Search orders..."
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

        <TableContainer component={Paper} className="shadow-md">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">Order ID</TableCell>
                <TableCell className="font-semibold">Date</TableCell>
                <TableCell className="font-semibold">Items</TableCell>
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell className="font-semibold">Tracking</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders?.map((order: TOrder) => (
                <TableRow
                  key={order?.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>{order?.id}</TableCell>
                  <TableCell>
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.products.map(
                        (item: TProductOrder, index: number) => (
                          <div key={index} className="text-sm">
                            {item.quantity}x {item?.product?.name}
                          </div>
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell>${order?.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order?.status}
                      color={getStatusColor(order?.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {order.id ? (
                      <span className="text-sm">{order?.id}</span>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<FaEye />}
                      onClick={() => handleViewDetails(order.id)}
                      variant="outlined"
                      size="small"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredOrders?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No orders found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
