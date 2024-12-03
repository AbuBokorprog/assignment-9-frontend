import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material';
import {
  FaUsers,
  FaStore,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartLine,
  FaExclamationTriangle,
  FaEye,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

const AdminDashboard: React.FC = () => {
  // Dummy data - replace with actual API data
  const metrics: DashboardMetric[] = [
    {
      title: 'Total Users',
      value: '2,547',
      change: 12.5,
      icon: <FaUsers className="text-3xl" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Active Shops',
      value: '184',
      change: 8.2,
      icon: <FaStore className="text-3xl" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: '3,890',
      change: 15.3,
      icon: <FaShoppingCart className="text-3xl" />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Total Revenue',
      value: '$287,493',
      change: -2.4,
      icon: <FaMoneyBillWave className="text-3xl" />,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      date: '2024-03-15',
      amount: 299.99,
      status: 'completed',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      date: '2024-03-15',
      amount: 149.99,
      status: 'pending',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      date: '2024-03-14',
      amount: 89.99,
      status: 'cancelled',
    },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Fashion', value: 300 },
    { name: 'Home', value: 200 },
    { name: 'Beauty', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getStatusColor = (
    status: RecentOrder['status']
  ): 'success' | 'warning' | 'error' => {
    const colors = {
      completed: 'success',
      pending: 'warning',
      cancelled: 'error',
    } as const;
    return colors[status];
  };

  const alerts = [
    'Low stock alert: 15 products below threshold',
    'Payment gateway error reported',
    '5 new vendor applications pending review',
  ];

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

        {/* Metrics */}
        <Grid container spacing={4} className="mb-8">
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${metric.color}`}>
                      {metric.icon}
                    </div>
                    <div
                      className={`text-sm ${
                        metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {metric.change >= 0 ? '+' : ''}
                      {metric.change}%
                    </div>
                  </div>
                  <Typography variant="h4" component="div" className="mb-1">
                    {metric.value}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {metric.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Sales Chart */}
          <Grid item xs={12} md={8}>
            <Card className="h-full">
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6" component="h3">
                    Sales Overview
                  </Typography>
                  <FaChartLine className="text-gray-400" />
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Category Distribution */}
          <Grid item xs={12} md={4}>
            <Card className="h-full">
              <CardContent>
                <Typography variant="h6" component="h3" className="mb-4">
                  Category Distribution
                </Typography>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6" component="h3">
                    Recent Orders
                  </Typography>
                  <Button
                    variant="text"
                    startIcon={<FaEye />}
                    href="/dashboard/admin/all-orders"
                  >
                    View All
                  </Button>
                </div>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${order.amount}</TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Alerts */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <FaExclamationTriangle className="text-yellow-500" />
                  <Typography variant="h6" component="h3">
                    System Alerts
                  </Typography>
                </div>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <Paper
                      key={index}
                      className="p-3 bg-yellow-50 border border-yellow-100"
                    >
                      <Typography variant="body2">{alert}</Typography>
                    </Paper>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AdminDashboard;
