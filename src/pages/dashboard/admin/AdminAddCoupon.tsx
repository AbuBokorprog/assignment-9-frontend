import { zodResolver } from '@hookform/resolvers/zod';
import { Person } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';
import { z } from 'zod';
import { useCreateCouponMutation } from '../../../redux/features/api/coupon/coupon.api';
import { toast } from 'sonner';
import Loader from '../../../components/ui/Loader';
import Title from '../../../components/helmet/Title';

const couponSchema = z.object({
  name: z.string().min(2, 'Name is required!'),
  code: z.string().min(4, 'Code is required!'),
  discount: z.string().min(1, 'Discount is required!'),
  expiryDate: z.string().min(2, 'Expiry date is required!'),
});

type TCategorySchema = z.infer<typeof couponSchema>;

const AdminAddCoupon: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(couponSchema),
  });
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await createCoupon(data).unwrap();
      if (res?.success) {
        reset();
      }
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="Add Coupon" content="This is add coupon page." />
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Add Coupon</h2>
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
            <label htmlFor="expiryDate">Expiration Date</label>
            <TextField
              fullWidth
              type="datetime-local"
              {...register('expiryDate')}
              error={!!errors.expiryDate}
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
              Create Coupon
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCoupon;
