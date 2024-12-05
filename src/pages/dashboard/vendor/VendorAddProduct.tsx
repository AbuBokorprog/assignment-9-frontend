import { zodResolver } from '@hookform/resolvers/zod';
import { Person } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(2, 'Name is required!'),
  images: z.string().min(4, 'Images is required!'),
  description: z.string().min(1, 'description is required!'),
  regular_price: z.number().min(1, 'Regular price is required!'),
  discount_price: z.number().min(1, 'Regular price is required!'),
  inventory: z.number().min(1, 'Inventory is required!'),
  shopId: z.string().min(2, 'shopId is required!'),
  vendorId: z.string().min(2, 'shopId is required!'),
  categoryId: z.string().min(2, 'shopId is required!'),
  size: z.string().array().min(1, 'size is required!'),
  sizeStock: z.string().array().min(1, 'size stock is required!'),
  color: z.string().array().min(1, 'color is required!'),
  colorCode: z.string().array().min(1, 'color code is required!'),
  colorStock: z.string().array().min(2, 'color stock is required!'),
});

type TCategorySchema = z.infer<typeof productSchema>;

const VendorAddProduct: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const [category, setCategory] = React.useState('');

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const [shop, setShop] = React.useState('');

  const handleShop = (event: SelectChangeEvent) => {
    setShop(event.target.value as string);
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Add Product</h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <TextField
              fullWidth
              label="Product Name"
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
          <Grid container spacing={4}>
            <Grid item xl={4} sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product regular price"
                  {...register('regular_price')}
                  error={!!errors.regular_price}
                  helperText={errors.regular_price?.message}
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
            <Grid item xl={4} sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product discount price"
                  {...register('discount_price')}
                  error={!!errors.discount_price}
                  helperText={errors.discount_price?.message}
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
            <Grid item xl={4} sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product total stock"
                  {...register('inventory')}
                  error={!!errors.inventory}
                  helperText={errors.inventory?.message}
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
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product size"
                  {...register('size')}
                  error={!!errors.size}
                  helperText={errors.size?.message}
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
                  label="Product size stock"
                  {...register('sizeStock')}
                  error={!!errors.sizeStock}
                  helperText={errors.sizeStock?.message}
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
          <Grid container spacing={4}>
            <Grid item lg={4} sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product color"
                  {...register('color')}
                  error={!!errors.color}
                  helperText={errors.color?.message}
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
            <Grid item lg={4} sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product colorCode"
                  {...register('colorCode')}
                  error={!!errors.colorCode}
                  helperText={errors.colorCode?.message}
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
            <Grid item lg={4} sm={6} xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product colorStock"
                  {...register('colorStock')}
                  error={!!errors.colorStock}
                  helperText={errors.colorStock?.message}
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
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={category}
                  label="Category"
                  onChange={handleCategory}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="shop">Shop</InputLabel>
                <Select
                  labelId="shop"
                  id="shop"
                  value={shop}
                  label="Shop"
                  onChange={handleShop}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div className="mx-auto text-center">
            <Button variant="contained" type="submit">
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorAddProduct;
