import React, { useState } from 'react';
import { Typography } from '@mui/material';
import UserRegistration from '../../components/auth/UserRegistration';

const Registration: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mt-8">
          <Typography
            variant="h3"
            component="h2"
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
