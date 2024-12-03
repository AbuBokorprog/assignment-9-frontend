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

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  trackingNumber?: string;
}

const CustomerOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data - replace with actual API call
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-03-15',
      total: 299.99,
      status: 'Delivered',
      items: [
        { name: 'Product 1', quantity: 2, price: 99.99 },
        { name: 'Product 2', quantity: 1, price: 100.01 },
      ],
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-002',
      date: '2024-03-14',
      total: 159.99,
      status: 'Processing',
      items: [{ name: 'Product 3', quantity: 1, price: 159.99 }],
      trackingNumber: 'TRK987654321',
    },
    {
      id: 'ORD-003',
      date: '2024-03-13',
      total: 499.99,
      status: 'Pending',
      items: [
        { name: 'Product 4', quantity: 2, price: 199.99 },
        { name: 'Product 5', quantity: 1, price: 100.01 },
      ],
    },
  ];

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      Pending: 'warning',
      Processing: 'info',
      Shipped: 'primary',
      Delivered: 'success',
      Cancelled: 'error',
    };
    return colors[status];
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (orderId: string) => {
    // Implement order details view logic
    console.log('Viewing order:', orderId);
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
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
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
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
                    {order.trackingNumber ? (
                      <span className="text-sm">{order.trackingNumber}</span>
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

        {filteredOrders.length === 0 && (
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
