import React, { useEffect } from 'react';
import { FaBox, FaStore } from 'react-icons/fa';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import { useGetVendorAllOrdersQuery } from '../../../redux/features/api/orders/orders.api';
import { useGetVendorReportsQuery } from '../../../redux/features/api/reports/reports.api';
import DashboardCard from '../../../components/ui/dashboard/DashboardCard';
import { TOrder } from '../../../types/order.type';
import Loader from '../../../components/ui/Loader';

const VendorDashboard: React.FC = () => {
  const user = useAppSelector(currentUser);

  const {
    data: orders,
    isLoading,
    refetch: reportRefetch,
  } = useGetVendorAllOrdersQuery({});
  const { data, isLoading: loading, refetch } = useGetVendorReportsQuery({});

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
    reportRefetch();
  }, [user?.email, reportRefetch, refetch]);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading || (loading && <Loader />)}
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
              {orders?.data?.slice(0, 10)?.map((order: TOrder) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">#{order?.id}</td>
                  <td className="px-4 py-2">{order?.createdAt}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        order?.status === 'DELIVERED'
                          ? 'bg-green-100 text-green-800'
                          : order?.status === 'PROCESSING'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order?.products?.length}</td>
                  <td className="px-4 py-2">${order?.totalAmount}</td>
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
