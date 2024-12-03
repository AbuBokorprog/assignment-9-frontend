import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Person, Store } from '@mui/icons-material';
import UserRegistration from '../../components/auth/UserRegistration';
import VendorRegistration from '../../components/auth/VendorRegistration';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`registration-tabpanel-${index}`}
      aria-labelledby={`registration-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Registration: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          {/* <Typography
            variant="h3"
            component="h1"
            className="font-bold text-gray-900"
          >
            Create Account
          </Typography> */}
          <Typography className="mt-2 text-gray-600">
            Choose your account type to get started
          </Typography>
        </div>

        <Paper
          elevation={0}
          className="mx-auto rounded-full max-w-md"
          sx={{ backgroundColor: 'rgba(229, 231, 235, 0.5)' }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="registration tabs"
            sx={{
              '& .MuiTabs-indicator': {
                height: '100%',
                borderRadius: '9999px',
                zIndex: 1,
                backgroundColor: 'white',
              },
              '& .MuiTab-root': {
                zIndex: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                py: 1.5,
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Tab
              icon={<Person />}
              label={isMobile ? 'Customer' : 'Register as Customer'}
              iconPosition="start"
              sx={{ borderRadius: '9999px' }}
            />
            <Tab
              icon={<Store />}
              label={isMobile ? 'Vendor' : 'Register as Vendor'}
              iconPosition="start"
              sx={{ borderRadius: '9999px' }}
            />
          </Tabs>
        </Paper>

        <div className="transition-all duration-300 ease-in-out">
          <TabPanel value={tabValue} index={0}>
            <div
              className={`transform ${
                tabValue === 0
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-full opacity-0'
              }`}
            >
              <UserRegistration />
            </div>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <div
              className={`transform ${
                tabValue === 1
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-full opacity-0'
              }`}
            >
              <VendorRegistration />
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default Registration;
