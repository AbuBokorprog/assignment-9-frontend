import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Store,
  Person,
  Email,
  Phone,
  Description,
} from '@mui/icons-material';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCreateVendorMutation } from '../../redux/features/api/auth/auth.api';

const vendorSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required!'),
    lastName: z.string().min(2, 'Last name is required!'),
    email: z.string().email('Invalid email address!'),
    contactNumber: z.string().min(11, 'contactNumber is required!'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    storeName: z.string().min(2, 'Store name is required!'),
    storeDescription: z.string().optional(),
    storeCategory: z.string().min(1, 'Category is required!'),
    registrationNumber: z.string().min(2, 'Registration Number is required!'),
    storeAddress: z.string().min(2, 'Address is required!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match!',
    path: ['confirmPassword'],
  });
type TVendorSchema = z.infer<typeof vendorSchema>;
const VendorRegistration: React.FC = () => {
  const [logo, setLogo] = useState<any>();
  const [cover, setCover] = useState<any>();

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TVendorSchema>({
    resolver: zodResolver(vendorSchema),
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

  const steps = ['Personal Information', 'Store Information'];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const [createVendor, { isLoading }] = useCreateVendorMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const vendorData = { ...data, name: `${data.firstName} ${data.lastName}` };

    const formData = new FormData();
    formData.append('logo', logo);
    formData.append('cover', cover);
    formData.append('data', JSON.stringify(vendorData));

    const toastId = toast.loading('Loading...');
    try {
      const response = await createVendor(formData).unwrap();
      if (response.success) {
        toast.success('Category created successfully!', {
          id: toastId,
          duration: 200,
        });
        reset();
      }
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error.message, { id: toastId, duration: 200 });
    }
  };

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Last Name"
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="contactNumber"
          {...register('contactNumber')}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      </Grid>
    </Grid>
  );

  const renderStoreInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Store Name"
          {...register('storeName')}
          error={!!errors.storeName}
          helperText={errors.storeName?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Store className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Store Description"
          multiline
          rows={4}
          {...register('storeDescription')}
          error={!!errors.storeDescription}
          helperText={errors.storeDescription?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Description className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Store Category</InputLabel>
          <Select {...register('storeCategory')} error={!!errors.storeCategory}>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="home">Home & Living</MenuItem>
            <MenuItem value="beauty">Beauty & Personal Care</MenuItem>
            <MenuItem value="food">Food & Beverages</MenuItem>
          </Select>
          <FormHelperText>{errors.storeCategory?.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="text"
          label="Register Number"
          {...register('registrationNumber')}
          error={!!errors.registrationNumber}
          helperText={errors.registrationNumber?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Store Address"
          {...register('storeAddress')}
          error={!!errors.storeAddress}
          helperText={errors.storeAddress?.message}
        />
      </Grid>
      <Grid item xs={2}>
        <div>
          <label htmlFor="image">Image</label>
          <TextField
            fullWidth
            name="image"
            type="file"
            required
            onChange={handleLogo}
          />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div>
          <label htmlFor="image">Image</label>
          <TextField
            fullWidth
            name="image"
            type="file"
            required
            onChange={handleCover}
          />
        </div>
      </Grid>
    </Grid>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderStoreInfo();
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold text-gray-900"
          >
            Become a Vendor
          </Typography>
          <Typography className="mt-2 text-gray-600">
            Join our marketplace and start selling your products
          </Typography>
        </div>

        <Paper className="p-8">
          <Stepper activeStep={activeStep} className="mb-8">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            {getStepContent(activeStep)}

            <div className="mt-8 flex justify-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className="mr-4"
              >
                Back
              </Button>
              <div>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Submit Registration
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Paper>

        <div className="text-center mt-4">
          <Typography className="text-sm text-gray-600">
            Already have a vendor account?{' '}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
