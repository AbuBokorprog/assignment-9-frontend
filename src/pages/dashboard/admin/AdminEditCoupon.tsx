import { zodResolver } from '@hookform/resolvers/zod';
import { Person } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';
import { z } from 'zod';
import {
  useGetCouponByIdQuery,
  useUpdateCouponMutation,
} from '../../../redux/features/api/coupon/coupon.api';
import { toast } from 'sonner';
import Loader from '../../../components/ui/Loader';
import { useParams } from 'react-router-dom';
import Title from '../../../components/helmet/Title';

const couponSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  discount: z.string().optional(),
  expiryDate: z.string().optional(),
});

type TCategorySchema = z.infer<typeof couponSchema>;

const AdminEditCoupon: React.FC = () => {
  const { id } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(couponSchema),
  });

  const { data } = useGetCouponByIdQuery(id);
  const [updateCoupon, { isLoading }] = useUpdateCouponMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await updateCoupon({ id: id, data: data }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
        reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="Edit Coupon" content="This is edit coupon page." />
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Edit Coupon</h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <TextField
              fullWidth
              label="Coupon Name"
              {...register('name')}
              error={!!errors.name}
              defaultValue={data?.data?.name}
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
            <TextField
              fullWidth
              label="Coupon Code"
              {...register('code')}
              error={!!errors.code}
              defaultValue={data?.data?.code}
              helperText={errors.code?.message}
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
            <TextField
              fullWidth
              label="Coupon discount"
              {...register('discount')}
              error={!!errors.discount}
              defaultValue={data?.data?.discount}
              helperText={errors.discount?.message}
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
            <label htmlFor="expiryDate">
              Expiration Date: {data?.data?.expiryDate}
            </label>
            <TextField
              fullWidth
              type="datetime-local"
              {...register('expiryDate')}
              error={!!errors.expiryDate}
              defaultValue={new Date(data?.data?.expiryDate)}
              helperText={errors.expiryDate?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FcCalendar className="text-secondary-400" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mx-auto text-center">
            <Button variant="contained" type="submit">
              update Coupon
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCoupon;
