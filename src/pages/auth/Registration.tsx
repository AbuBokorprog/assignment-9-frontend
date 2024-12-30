import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import UserRegistration from '../../components/auth/UserRegistration';
import Title from '../../components/helmet/Title';

const Registration: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Title title="Register" content="This is register page." />
      <div className="container mx-auto px-2 lg:px-8 py-8">
        <div className="text-center">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold text-gray-900"
          >
            Create Account
          </Typography>
        </div>
        <UserRegistration />
      </div>
    </div>
  );
};
export default Registration;
