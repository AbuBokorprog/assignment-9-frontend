import { zodResolver } from '@hookform/resolvers/zod';
import { Description, Person } from '@mui/icons-material';
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
import React, { useEffect } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { z } from 'zod';
import { productSchema } from '../../../schema/products';
import { useGetAllShopsByVendorQuery } from '../../../redux/features/api/shops/shops.api';
import { useGetAllCategoriesQuery } from '../../../redux/features/api/categories/catgeories.api';
import { useCreateProductMutation } from '../../../redux/features/api/products/products.api';
import { toast } from 'sonner';
import Loader from '../../../components/ui/Loader';
import { TShop } from '../../../types/shop.type';
import Title from '../../../components/helmet/Title';

type TCategorySchema = z.infer<typeof productSchema>;

const VendorAddProduct: React.FC = () => {
  const [category, setCategory] = React.useState('');
  const [shop, setShop] = React.useState('');
  const [status, setStatus] = React.useState('');

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCategorySchema>({
    resolver: zodResolver(productSchema),
    mode: 'onBlur',
    defaultValues: {
      images: [{}], // Assuming `file` is the field name
      productColors: [{}],
      productSize: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  });

  const {
    fields: colorFields,
    append: addColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: 'productColors',
  });

  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: 'productSize',
  });

  const { data, isLoading } = useGetAllShopsByVendorQuery({});
  const { data: categories } = useGetAllCategoriesQuery({});

  const activeShop = data?.data?.filter(
    (item: TShop) => item.isActive === 'APPROVED'
  );

  const shopOptions = activeShop?.map((s: any) => ({
    label: s.shopName,
    value: s.id,
  }));

  const categoriesOptions = categories?.data?.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  const productStatusOptions = [
    {
      label: 'REGULAR',
      value: 'REGULAR',
    },
    {
      label: 'FLASH_SALE',
      value: 'FLASH_SALE',
    },
    {
      label: 'NEW',
      value: 'NEW',
    },
    {
      label: 'HOT',
      value: 'HOT',
    },
    {
      label: 'DISCOUNT',
      value: 'DISCOUNT',
    },
  ];

  const [createProduct] = useCreateProductMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Loading...');

    const formData = new FormData();

    data.images.forEach((file: any) => {
      formData.append('files[]', file.file);
    });
    formData.append('data', JSON.stringify(data));
    try {
      const res = await createProduct(formData).unwrap();
      if (res?.success) {
        toast.success('Product created successfully!', {
          id: toastId,
          duration: 200,
        });
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data?.message, {
        id: toastId,
        duration: 200,
      });
    }
  };

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleShop = (event: SelectChangeEvent) => {
    setShop(event.target.value as string);
  };
  const handleStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="Add Product" content="This is add product page." />
      {isLoading && <Loader />}
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
          <Box>
            {sizeFields?.map((fields, index) => (
              <Grid container spacing={4} key={fields.id} className="my-3">
                <Grid item sm={6} xs={12}>
                  <Controller
                    name={`productSize.${index}.size`}
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Product size"
                        error={!!errors.productSize}
                        helperText={errors.productSize?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person className="text-gray-400" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Controller
                    name={`productSize.${index}.stock`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Product size stock"
                        error={!!errors.productSize}
                        helperText={errors.productSize?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person className="text-gray-400" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => removeSize(index)}
                    sx={{ marginTop: 2 }}
                  >
                    Remove Size
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => addSize({ size: '', stock: '' })}
              sx={{ marginTop: 2 }}
            >
              Add Size
            </Button>
          </Box>

          <Box>
            {colorFields?.map((fields, index) => (
              <Grid container spacing={4} key={fields.id} className="my-2">
                <Grid item lg={4} sm={6} xs={12}>
                  <Controller
                    name={`productColors.${index}.color`} // Field for color name
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Color"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <Controller
                    name={`productColors.${index}.colorCode`} // Field for color name
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Code (000000)"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <Controller
                    name={`productColors.${index}.colorStock`} // Field for color name
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Stock"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeColor(index)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() =>
                addColor({ color: '', colorCode: '', colorStock: '' })
              }
              sx={{ marginTop: 2 }}
            >
              Add Color
            </Button>
          </Box>

          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="productStatus">Product Status</InputLabel>
                <Select
                  labelId="productStatus"
                  id="productStatus"
                  value={status}
                  label="Product Status"
                  {...register('productStatus')}
                  onChange={handleStatus}
                >
                  {productStatusOptions?.map((c: any, index: number) => (
                    <MenuItem key={index} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  {categoriesOptions?.map((c: any, index: number) => (
                    <MenuItem key={index} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="shopId">Shop</InputLabel>
                <Select
                  labelId="shopId"
                  id="shopId"
                  value={shop}
                  label="Shop"
                  {...register('shopId')}
                  onChange={handleShop}
                >
                  {shopOptions?.map((s: any, index: number) => (
                    <MenuItem key={index} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h5" component="h2">
              Upload Images
            </Typography>

            {fields.map((field, index) => (
              <Box
                key={field.id}
                display="flex"
                alignItems="center"
                gap={2}
                className="field-array-item"
              >
                <Controller
                  name={`images.${index}.file`} // Field name for the image file
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
                      error={!!errors.images?.[index]?.file}
                      helperText={errors.images?.[index]?.file?.message}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => append({})}
          >
            Add Image
          </Button>
          <div>
            <TextField
              fullWidth
              label="Store Description"
              multiline
              rows={4}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
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
