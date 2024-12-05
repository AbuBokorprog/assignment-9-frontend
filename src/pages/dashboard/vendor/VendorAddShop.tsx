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
import React from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { z } from 'zod';
import { shopSchema } from '../../../schema/shop';

type TCategorySchema = z.infer<typeof shopSchema>;

const VendorAddShop: React.FC = () => {
  const [category, setCategory] = React.useState('');
  const [shop, setShop] = React.useState('');
  const {
    register,
    // reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(shopSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
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
            <Typography variant="h6" component="h6">
              Upload logo
            </Typography>
            <Controller
              name={'shopLogo.file'} // Field name for the image file
              control={control}
              render={({ field }) => (
                <TextField
                  type="file"
                  InputProps={{
                    inputProps: { accept: 'image/*' },
                  }}
                  fullWidth
                  variant="outlined"
                  onChange={(event) => {
                    const target = event.target as HTMLInputElement; // Ensure it's an HTMLInputElement
                    field.onChange(target.files?.[0] || null); // Update the field value with the selected file or null
                  }}
                  error={!!errors.shopLogo}
                  helperText={errors.shopLogo?.file?.message}
                />
              )}
            />
            <Typography variant="h6" component="h6">
              Upload Cover Image
            </Typography>
            <Controller
              name={'shopLogo.file'} // Field name for the image file
              control={control}
              render={({ field }) => (
                <TextField
                  type="file"
                  InputProps={{
                    inputProps: { accept: 'image/*' },
                  }}
                  fullWidth
                  variant="outlined"
                  onChange={(event) => {
                    const target = event.target as HTMLInputElement; // Ensure it's an HTMLInputElement
                    field.onChange(target.files?.[0] || null); // Update the field value with the selected file or null
                  }}
                  error={!!errors.shopLogo}
                  helperText={errors.shopLogo?.file?.message}
                />
              )}
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
