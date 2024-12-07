import { Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { FaSearch, FaStore } from 'react-icons/fa';
import { useGetAllCategoriesQuery } from '../../../redux/features/api/categories/catgeories.api';
import CategoriesCard from '../../../components/ui/dashboard/CategoriesCard';
import { TCategory } from '../../../types/categories.type';

const AdminAllCategories: React.FC = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              All Categories ({data?.data?.length})
            </h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
          <div className="flex gap-4">
            <TextField
              size="small"
              placeholder="Search categories..."
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

        <div className="my-5 lg:my-10">
          <Grid container spacing={3}>
            {data?.data?.map((c: TCategory, index: number) => (
              <Grid item sm={4} xs={6} key={index}>
                <CategoriesCard data={c} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AdminAllCategories;
