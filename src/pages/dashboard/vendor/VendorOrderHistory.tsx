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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaFilter,
} from 'react-icons/fa';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  shippingAddress: string;
  trackingNumber?: string;
}

const VendorOrderHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Dummy data - replace with actual API call
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-03-15',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [
        {
          productId: 'P1',
          name: 'Wireless Earbuds',
          quantity: 2,
          price: 79.99,
        },
        { productId: 'P2', name: 'Smart Watch', quantity: 1, price: 199.99 },
      ],
      total: 359.97,
      status: 'delivered',
      paymentStatus: 'paid',
      shippingAddress: '123 Main St, City, Country',
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-002',
      date: '2024-03-14',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      items: [
        {
          productId: 'P3',
          name: 'Bluetooth Speaker',
          quantity: 1,
          price: 149.99,
        },
      ],
      total: 149.99,
      status: 'processing',
      paymentStatus: 'paid',
      shippingAddress: '456 Oak St, City, Country',
      trackingNumber: 'TRK987654321',
    },
  ];

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setPaymentFilter(event.target.value);
  };

  const getStatusColor = (
    status: Order['status']
  ): 'success' | 'warning' | 'error' | 'info' => {
    const colors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'info',
      delivered: 'success',
      cancelled: 'error',
    };
    return colors[status];
  };

  const getPaymentStatusColor = (
    status: Order['paymentStatus']
  ): 'success' | 'error' | 'warning' => {
    const colors = {
      paid: 'success',
      unpaid: 'error',
      refunded: 'warning',
    };
    return colors[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleExportOrders = () => {
    // Implement export functionality
    console.log('Exporting orders...');
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Order History</h2>
          <Button
            variant="outlined"
            startIcon={<FaDownload />}
            onClick={handleExportOrders}
          >
            Export Orders
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
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
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
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
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order.id ? null : order.id
                          )
                        }
                      >
                        {expandedOrder === order.id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-gray-500">
                          {order.customerEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.paymentStatus}
                        color={getPaymentStatusColor(order.paymentStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => console.log('Update status:', order.id)}
                      >
                        Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={8}
                    >
                      <Collapse
                        in={expandedOrder === order.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box className="p-4 bg-gray-50">
                          <div className="mb-4">
                            <Typography variant="h6" className="mb-2">
                              Order Details
                            </Typography>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                >
                                  Shipping Address
                                </Typography>
                                <Typography>{order.shippingAddress}</Typography>
                              </div>
                              {order.trackingNumber && (
                                <div>
                                  <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                  >
                                    Tracking Number
                                  </Typography>
                                  <Typography>
                                    {order.trackingNumber}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>
                          <Typography variant="h6" className="mb-2">
                            Items
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.items.map((item) => (
                                <TableRow key={item.productId}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell align="right">
                                    {item.quantity}
                                  </TableCell>
                                  <TableCell align="right">
                                    ${item.price.toFixed(2)}
                                  </TableCell>
                                  <TableCell align="right">
                                    ${(item.quantity * item.price).toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell colSpan={3} align="right">
                                  <strong>Total</strong>
                                </TableCell>
                                <TableCell align="right">
                                  <strong>${order.total.toFixed(2)}</strong>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <Typography variant="h6" color="textSecondary">
              No orders found
            </Typography>
            <Typography color="textSecondary">
              {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No orders have been placed yet'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOrderHistory;
