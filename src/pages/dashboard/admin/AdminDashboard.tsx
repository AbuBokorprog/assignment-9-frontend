import React, { useEffect } from 'react';
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
  // FaMoneyBillWave,
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
import DashboardCard from '../../../components/ui/dashboard/DashboardCard';
import { useGetAdminReportsQuery } from '../../../redux/features/api/reports/reports.api';
import { useGetAllOrdersQuery } from '../../../redux/features/api/orders/orders.api';
import { TOrder } from '../../../types/order.type';
import { Link } from 'react-router-dom';
import Loader from '../../../components/ui/Loader';
import Title from '../../../components/helmet/Title';
import { getStatusColor } from '../../../utils/constaints';

const AdminDashboard: React.FC = () => {
  const { data: AdminReports } = useGetAdminReportsQuery({});
  const { data: orders, isLoading } = useGetAllOrdersQuery({});

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

  const orderStatusColors = {
    PENDING: 'warning',
    PROCESSING: 'info',
    SHIPPED: 'primary',
    DELIVERED: 'success',
    CANCELLED: 'error',
  } as const;

  const alerts = [
    'Low stock alert: 15 products below threshold',
    'Payment gateway error reported',
    '5 new vendor applications pending review',
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="Admin Dashboard" content="This is admin dashboard page." />
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

        {/* Metrics */}
        <Grid container spacing={4} className="mb-8">
          <Grid item sm={6} md={4}>
            <Link to={'/dashboard/admin/all-users'}>
              <DashboardCard
                title="Total Users"
                value={AdminReports?.data?.totalUsers}
                icon={<FaUsers className="text-3xl" />}
                bgColor="bg-blue-100"
              />
            </Link>
          </Grid>
          <Grid item sm={6} md={4}>
            <Link to={'/dashboard/admin/all-shops'}>
              <DashboardCard
                title="Total Active Shops"
                value={AdminReports?.data?.totalActiveShop}
                icon={<FaStore className="text-3xl" />}
                bgColor="bg-purple-100"
              />
            </Link>
          </Grid>
          <Grid item sm={6} md={4}>
            <Link to={'/dashboard/admin/all-products'}>
              <DashboardCard
                title="Total Products"
                value={AdminReports?.data?.totalOrders}
                icon={<FaShoppingCart className="text-3xl" />}
                bgColor="bg-yellow-100"
              />
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Sales Chart */}
          <Grid item md={8}>
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
          <Grid item md={4}>
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
                        {categoryData.map((_entry, index) => (
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
          <Grid item md={8}>
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
                      {orders?.data?.slice(0, 10).map((order: TOrder) => (
                        <TableRow key={order?.id} hover>
                          <TableCell>{order?.id}</TableCell>
                          <TableCell>
                            {order?.customer?.customer?.name}
                          </TableCell>
                          <TableCell>
                            {new Date(order?.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${order?.totalAmount}</TableCell>
                          <TableCell>
                            <Chip
                              label={order?.status}
                              color={getStatusColor(
                                order?.status,
                                orderStatusColors
                              )}
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
          <Grid item md={4}>
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
