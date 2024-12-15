import { zodResolver } from '@hookform/resolvers/zod';
import { Person } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { z } from 'zod';
import { shopSchema } from '../../../schema/shop';
import { toast } from 'sonner';
import { useCreateShopMutation } from '../../../redux/features/api/shops/shops.api';
import Loader from '../../../components/ui/Loader';
import { useGetAllCategoriesQuery } from '../../../redux/features/api/categories/catgeories.api';
import { TCategory } from '../../../types/categories.type';

type TCategorySchema = z.infer<typeof shopSchema>;

const VendorAddShop: React.FC = () => {
  const [category, setCategory] = React.useState('');
  const [logo, setLogo] = useState<any>();
  const [cover, setCover] = useState<any>();

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(shopSchema),
    mode: 'onBlur',
  });

  const handleLogo = (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
    setLogo(file);
  };

  const handleCover = (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
    setCover(file);
  };

  const [createShop, { isLoading }] = useCreateShopMutation();
  const { data } = useGetAllCategoriesQuery({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const vendorData = {
      ...data,
      name: `${data.firstName} ${data.lastName},`,
      categoryId: category,
    };

    const formData = new FormData();
    formData.append('logo', logo);
    formData.append('cover', cover);
    formData.append('data', JSON.stringify(vendorData));

    const toastId = toast.loading('Loading...');
    try {
      const response = await createShop(formData).unwrap();
      if (response.success) {
        toast.success('Category created successfully!', {
          id: toastId,
          duration: 200,
        });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const categoryOptions = data?.data?.map((item: TCategory) => ({
    label: item?.name,
    value: item?.id,
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Add Shop</h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label="Shop Name"
                {...register('shopName')}
                error={!!errors.shopName}
                helperText={errors.shopName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="categoryId">Category</InputLabel>
                <Select
                  labelId="categoryId"
                  id="categoryId"
                  value={category}
                  label="Category"
                  {...register('categoryId')}
                  onChange={handleCategory}
                >
                  {categoryOptions?.map((item: any, index: number) => (
                    <MenuItem value={item?.value} key={index}>
                      {item?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Address"
                  {...register('address')}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Registration Number"
                  {...register('registrationNumber')}
                  error={!!errors.registrationNumber}
                  helperText={errors.registrationNumber?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="body1" component="p">
              Upload logo
            </Typography>
            <TextField
              fullWidth
              name="image"
              type="file"
              required
              onChange={handleLogo}
            />
            <Typography variant="body1" component="p">
              Upload Cover Image
            </Typography>
            <TextField
              fullWidth
              name="image"
              type="file"
              required
              onChange={handleCover}
            />
          </Box>

          <div className="mx-auto text-center">
            <Button variant="contained" type="submit">
              Create shop
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorAddShop;
