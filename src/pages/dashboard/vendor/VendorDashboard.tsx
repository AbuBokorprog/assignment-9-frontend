import React from 'react';
import {
  FaBox,
  FaHeart,
  FaShoppingCart,
  FaStore,
  FaStar,
  FaUser,
} from 'react-icons/fa';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import { useGetVendorAllOrdersQuery } from '../../../redux/features/api/orders/orders.api';
import { useGetVendorReportsQuery } from '../../../redux/features/api/reports/reports.api';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  bgColor,
}) => (
  <div
    className={`${bgColor} rounded-lg p-6 shadow-md flex items-center justify-between`}
  >
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    <div className="text-3xl text-gray-700">{icon}</div>
  </div>
);

const VendorDashboard: React.FC = () => {
  const user = useAppSelector(currentUser);
  // This would typically come from your API/backend
  const dashboardData = {
    totalOrders: 12,
    pendingOrders: 2,
    wishlistItems: 8,
    followedShops: 5,
    cartItems: 3,
    reviews: 7,
  };

  const { data: orders } = useGetVendorAllOrdersQuery({});
  const { data, error } = useGetVendorReportsQuery({});

  const recentOrders = [
    {
      id: '1',
      date: '2024-03-15',
      status: 'Delivered',
      total: 129.99,
      items: 3,
    },
    {
      id: '2',
      date: '2024-03-14',
      status: 'Processing',
      total: 79.99,
      items: 2,
    },
    {
      id: '3',
      date: '2024-03-13',
      status: 'Pending',
      total: 199.99,
      items: 4,
    },
  ];

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <h2 className="text-3xl font-bold mb-8">Welcome Back, {user?.name}!</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Orders"
          value={orders?.data?.length}
          icon={<FaBox />}
          bgColor="bg-blue-100"
        />
        <DashboardCard
          title="Total Shops"
          value={data?.data?.products?.length}
          icon={<FaStore />}
          bgColor="bg-purple-100"
        />
        <DashboardCard
          title="Total Products"
          value={data?.data?.shops?.length}
          icon={<FaBox />}
          bgColor="bg-yellow-100"
        />
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Items</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">#{order.id}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.items}</td>
                  <td className="px-4 py-2">${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
