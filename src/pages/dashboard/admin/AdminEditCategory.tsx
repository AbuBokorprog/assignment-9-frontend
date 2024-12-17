import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from '../../../redux/features/api/categories/catgeories.api';
import { toast } from 'sonner';
import Loader from '../../../components/ui/Loader';
import { FaStore } from 'react-icons/fa';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Title from '../../../components/helmet/Title';

const categorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

type TCategorySchema = z.infer<typeof categorySchema>;

const AdminEditCategory: React.FC = () => {
  const { id } = useParams();
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

  const { data } = useGetCategoryByIdQuery(id);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const formData = new FormData();
    if (image) {
      formData.append('file', image);
    }

    formData.append('data', JSON.stringify(data));
    const toastId = toast.loading('Loading...');
    try {
      const response = await updateCategory({
        id: id,
        data: formData,
      }).unwrap();
      if (response.success) {
        toast.success(response?.message, {
          id: toastId,
          duration: 200,
        });
        reset();
      }
      toast.success(response?.message, {
        id: toastId,
        duration: 200,
      });
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="Edit Category" content="This is edit category page." />
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Edit Category</h2>
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
              defaultValue={data?.data?.name}
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
              defaultValue={data?.data?.description}
              className="block p-2.5 w-full text-sm text-secondary-900 bg-secondary-50 rounded-lg border border-secondary-300 focus:ring-primary-500 focus:border-primary-500 "
            />
          </div>
          <img src={data?.data?.image} alt="" className="size-40" />
          <div>
            <label htmlFor="image">Image</label>
            <TextField
              fullWidth
              name="image"
              type="file"
              onChange={handleImage}
            />
          </div>
          <div className="mx-auto text-center">
            <Button variant="contained" type="submit">
              Update Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCategory;
