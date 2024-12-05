import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { FaSearch, FaStore } from 'react-icons/fa';
import { useGetAllOrdersQuery } from '../../../redux/features/api/orders/orders.api';

const AdminAllOrders: React.FC = () => {
  const { data, isLoading } = useGetAllOrdersQuery({});
  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              All Orders ({data?.data?.length})
            </h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
          <div className="flex gap-4">
            <TextField
              size="small"
              placeholder="Search orders..."
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>
    </div>
  );
};

export default AdminAllOrders;
