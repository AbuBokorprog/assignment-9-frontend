import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
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
  Business,
  Description,
} from '@mui/icons-material';

const VendorRegistration: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',

    // Business Information
    businessName: '',
    businessType: '',
    registrationNumber: '',
    taxId: '',

    // Store Information
    storeName: '',
    storeDescription: '',
    storeCategory: '',
    storeAddress: '',
    city: '',
    state: '',
    zipCode: '',

    // Documents
    businessLicense: null as File | null,
    taxCertificate: null as File | null,
    identityProof: null as File | null,
  });

  const steps = [
    'Personal Information',
    'Business Details',
    'Store Information',
    'Documents',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.target.files![0],
      }));
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Add your registration logic here
      console.log('Registration data:', formData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
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
          name="lastName"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
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
          label="Phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
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
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          value={formData.password}
          onChange={handleChange}
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
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );

  const renderBusinessDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Business Name"
          name="businessName"
          required
          value={formData.businessName}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Business className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Business Type</InputLabel>
          <Select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange as any}
          >
            <MenuItem value="sole-proprietorship">Sole Proprietorship</MenuItem>
            <MenuItem value="partnership">Partnership</MenuItem>
            <MenuItem value="corporation">Corporation</MenuItem>
            <MenuItem value="llc">LLC</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Registration Number"
          name="registrationNumber"
          required
          value={formData.registrationNumber}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Tax ID"
          name="taxId"
          required
          value={formData.taxId}
          onChange={handleChange}
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
          name="storeName"
          required
          value={formData.storeName}
          onChange={handleChange}
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
          name="storeDescription"
          multiline
          rows={4}
          value={formData.storeDescription}
          onChange={handleChange}
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
          <Select
            name="storeCategory"
            value={formData.storeCategory}
            onChange={handleChange as any}
          >
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="home">Home & Living</MenuItem>
            <MenuItem value="beauty">Beauty & Personal Care</MenuItem>
            <MenuItem value="food">Food & Beverages</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Store Address"
          name="storeAddress"
          required
          value={formData.storeAddress}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="City"
          name="city"
          required
          value={formData.city}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="State"
          name="state"
          required
          value={formData.state}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="ZIP Code"
          name="zipCode"
          required
          value={formData.zipCode}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );

  const renderDocuments = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <input
          accept="image/*,.pdf"
          style={{ display: 'none' }}
          id="business-license"
          type="file"
          onChange={(e) => handleFileChange(e, 'businessLicense')}
        />
        <label htmlFor="business-license">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            className="py-5"
          >
            Upload Business License
            {formData.businessLicense && (
              <span className="ml-2 text-green-600">
                ✓ {formData.businessLicense.name}
              </span>
            )}
          </Button>
        </label>
        <FormHelperText>
          Upload a valid business license (PDF or Image)
        </FormHelperText>
      </Grid>

      <Grid item xs={12}>
        <input
          accept="image/*,.pdf"
          style={{ display: 'none' }}
          id="tax-certificate"
          type="file"
          onChange={(e) => handleFileChange(e, 'taxCertificate')}
        />
        <label htmlFor="tax-certificate">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            className="py-5"
          >
            Upload Tax Certificate
            {formData.taxCertificate && (
              <span className="ml-2 text-green-600">
                ✓ {formData.taxCertificate.name}
              </span>
            )}
          </Button>
        </label>
        <FormHelperText>
          Upload your tax certificate (PDF or Image)
        </FormHelperText>
      </Grid>

      <Grid item xs={12}>
        <input
          accept="image/*,.pdf"
          style={{ display: 'none' }}
          id="identity-proof"
          type="file"
          onChange={(e) => handleFileChange(e, 'identityProof')}
        />
        <label htmlFor="identity-proof">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            className="py-5"
          >
            Upload Identity Proof
            {formData.identityProof && (
              <span className="ml-2 text-green-600">
                ✓ {formData.identityProof.name}
              </span>
            )}
          </Button>
        </label>
        <FormHelperText>Upload a valid ID proof (PDF or Image)</FormHelperText>
      </Grid>
    </Grid>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderBusinessDetails();
      case 2:
        return renderStoreInfo();
      case 3:
        return renderDocuments();
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
          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          <Stepper activeStep={activeStep} className="mb-8">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
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
