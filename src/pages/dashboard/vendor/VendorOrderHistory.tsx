import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useGetAllOrdersQuery } from '../../../redux/features/api/orders/orders.api';
import { TOrder } from '../../../types/order.type';
import OrderCard from '../../../components/ui/dashboard/OrderCard';
import Loader from '../../../components/ui/Loader';

const VendorOrderHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const { data, isLoading } = useGetAllOrdersQuery({});

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setPaymentFilter(event.target.value);
  };

  // const getPaymentStatusColor = (
  //   status: TOrder['paymentStatus']
  // ): 'success' | 'error' | 'warning' => {
  //   const colors = {
  //     PAID: 'success',
  //     UNPAID: 'error',
  //     FAILED: 'warning',
  //     REFUNDED: 'warning',
  //   };
  //   return colors[status];
  // };

  const filteredOrders = data?.data?.filter((order: TOrder) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.customer?.customer?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    // const matchesPayment =
    //   paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Order History</h2>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              />
              <FormControl size="small">
                <InputLabel>Order Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Order Status"
                  onChange={handleStatusChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <FaFilter className="text-gray-400" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="PROCESSING">Processing</MenuItem>
                  <MenuItem value="SHIPPED">Shipped</MenuItem>
                  <MenuItem value="DELIVERED">Delivered</MenuItem>
                  <MenuItem value="CANCELLED">Cancelled</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel>Payment Status</InputLabel>
                <Select
                  value={paymentFilter}
                  label="Payment Status"
                  onChange={handlePaymentChange}
                >
                  <MenuItem value="all">All Payments</MenuItem>
                  <MenuItem value="PAID">Paid</MenuItem>
                  <MenuItem value="UNPAID">Unpaid</MenuItem>
                  <MenuItem value="FAILED">Failed</MenuItem>
                  <MenuItem value="REFUNDED">Refunded</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TableContainer component={Paper} className="shadow-md">
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-50">
                    <TableCell />
                    <TableCell className="font-semibold">Order ID</TableCell>
                    <TableCell className="font-semibold">Date</TableCell>
                    <TableCell className="font-semibold">Customer</TableCell>
                    <TableCell className="font-semibold">Total</TableCell>
                    <TableCell className="font-semibold">Status</TableCell>
                    <TableCell className="font-semibold">Payment</TableCell>
                    <TableCell className="font-semibold">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders?.map((order: TOrder, index: number) => (
                    <OrderCard
                      order={order}
                      key={index}
                      expandedOrder={expandedOrder}
                      setExpandedOrder={setExpandedOrder}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredOrders?.length === 0 && (
              <div className="text-center py-8">
                <Typography variant="h6" color="textSecondary">
                  No orders found
                </Typography>
                <Typography color="textSecondary">
                  {searchTerm ||
                  statusFilter !== 'all' ||
                  paymentFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No orders have been placed yet'}
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VendorOrderHistory;
