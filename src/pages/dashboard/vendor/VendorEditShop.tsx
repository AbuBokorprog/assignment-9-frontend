import React, { useState } from 'react';
import { editShopSchema } from '../../../schema/shop';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  useGetShopByIdQuery,
  useUpdateShopMutation,
} from '../../../redux/features/api/shops/shops.api';
import { toast } from 'sonner';
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
import Loader from '../../../components/ui/Loader';
import { FaStore } from 'react-icons/fa';
import { Person } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { TShop } from '../../../types/shop.type';

type TCategorySchema = z.infer<typeof editShopSchema>;

const VendorEditShop = () => {
  const { id } = useParams();
  const [category, setCategory] = React.useState('');
  const [shop, setShop] = React.useState('');
  const [logo, setLogo] = useState<any>();
  const [cover, setCover] = useState<any>();

  const { data } = useGetShopByIdQuery(id);
  const shopData: TShop = data?.data;

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(editShopSchema),
    defaultValues: {
      address: shopData.address,
      categoryId: shopData.category.id,
      description: shopData?.description,
      registrationNumber: shopData?.registrationNumber,
      shopName: shopData?.shopName,
    },
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

  const [updateShop, { isLoading }] = useUpdateShopMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const vendorData = {
      ...data,
      name: `${data.firstName} ${data.lastName},`,
      categoryId: category,
    };

    const formData = new FormData();
    if (logo) {
      formData.append('logo', logo);
    }
    if (cover) {
      formData.append('cover', cover);
    }
    formData.append('data', JSON.stringify(vendorData));

    const toastId = toast.loading('Loading...');
    try {
      const response = await updateShop(formData).unwrap();
      if (response.success) {
        toast.success('Category created successfully!', {
          id: toastId,
          duration: 200,
        });
      }
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error.error, { id: toastId, duration: 200 });
    }
  };

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Edit Shop</h2>
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
              Update shop
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorEditShop;
