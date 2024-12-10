import { zodResolver } from '@hookform/resolvers/zod';
import { Person } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { z } from 'zod';
import { useCreateCategoryMutation } from '../../../redux/features/api/categories/catgeories.api';
import { toast } from 'sonner';

const categorySchema = z.object({
  name: z.string().min(2, 'Name is required!'),
  description: z.string().optional(),
});

type TCategorySchema = z.infer<typeof categorySchema>;

const AdminAddCategory: React.FC = () => {
  const [image, setImage] = useState<any>(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  const handleImage = (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
    setImage(file);
  };

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (!image) {
      alert('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image); // Image file
    formData.append('data', JSON.stringify(data)); // JSON stringified data
    const toastId = toast.loading('Loading...');
    try {
      const response = await createCategory(formData).unwrap();
      if (response.success) {
        toast.success('Category created successfully!', {
          id: toastId,
          duration: 200,
        });
        reset();
      }
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error.error, { id: toastId, duration: 200 });
    }
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Add Category</h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <Person className="text-secondary-400" />
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
              className="block p-2.5 w-full text-sm text-secondary-900 bg-secondary-50 rounded-lg border border-secondary-300 focus:ring-primary-500 focus:border-primary-500 "
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <TextField
              fullWidth
              name="image"
              type="file"
              required
              onChange={handleImage}
            />
          </div>
          <div className="mx-auto text-center">
            <Button variant="contained" type="submit">
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCategory;
