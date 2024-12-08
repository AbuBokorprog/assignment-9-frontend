import React, { useEffect } from 'react';
import VendorRegistration from '../components/auth/VendorRegistration';

const BecomeVendor: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <VendorRegistration />
    </div>
  );
};

export default BecomeVendor;
