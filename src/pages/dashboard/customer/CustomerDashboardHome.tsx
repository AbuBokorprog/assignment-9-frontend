import React, { useEffect } from 'react';
import {
  FaBox,
  FaHeart,
  FaShoppingCart,
  FaStore,
  FaStar,
  FaUser,
} from 'react-icons/fa';
import { useGetUserReportsQuery } from '../../../redux/features/api/reports/reports.api';
import DashboardCard from '../../../components/ui/dashboard/DashboardCard';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import { useGetAllMyOrdersQuery } from '../../../redux/features/api/orders/orders.api';
import { TOrder } from '../../../types/order.type';
import Loader from '../../../components/ui/Loader';

const CustomerDashboardHome: React.FC = () => {
  const { data } = useGetUserReportsQuery({});
  const { data: order, isLoading } = useGetAllMyOrdersQuery({});
  const user = useAppSelector(currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <h2 className="text-3xl font-bold mb-8">Welcome Back, {user?.name}</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Orders"
          value={data?.data?.totalOrder || 0}
          icon={<FaBox />}
          bgColor="bg-blue-100"
        />
        <DashboardCard
          title="Wishlist Items"
          value={data?.data?.totalWishlist || 0}
          icon={<FaHeart />}
          bgColor="bg-red-100"
        />
        <DashboardCard
          title="Cart Items"
          value={data?.data.totalCart || 0}
          icon={<FaShoppingCart />}
          bgColor="bg-green-100"
        />
        <DashboardCard
          title="Followed Shops"
          value={data?.data.totalFollowingShop || 0}
          icon={<FaStore />}
          bgColor="bg-purple-100"
        />
        <DashboardCard
          title="My Reviews"
          value={data?.data?.totalReview || 0}
          icon={<FaStar />}
          bgColor="bg-yellow-100"
        />
        {/* <DashboardCard
          title="Pending Orders"
          value={dashboardData.pendingOrders}
          icon={<FaBox />}
          bgColor="bg-orange-100"
        /> */}
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
              {order?.data?.slice(0, 10)?.map((order: TOrder) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">#{order.id}</td>
                  <td className="px-4 py-2">{order.createdAt}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'DELIVERED'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'PROCESSING'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order?.quantity}</td>
                  <td className="px-4 py-2">${order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FaShoppingCart className="text-2xl mb-2 text-primary-500" />
            <span className="text-sm">View Cart</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FaHeart className="text-2xl mb-2 text-primary-500" />
            <span className="text-sm">Wishlist</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FaUser className="text-2xl mb-2 text-primary-500" />
            <span className="text-sm">Profile</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FaStore className="text-2xl mb-2 text-primary-500" />
            <span className="text-sm">Shops</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardHome;
