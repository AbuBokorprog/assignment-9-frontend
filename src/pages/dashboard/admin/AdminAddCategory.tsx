import { zodResolver } from '@hookform/resolvers/zod';
import { Person } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(2, 'Name is required!'),
  description: z.string().optional(),
});

type TCategorySchema = z.infer<typeof categorySchema>;

const AdminAddCategory: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">All Categories</h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              fullWidth
              label="Category Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <textarea
              placeholder="Category description"
              {...register('description')}
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input name="image" type="file" className="" accept="image/*" />
          </div>
          <div>
            <Button>Create Category</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCategory;
