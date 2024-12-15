import React, { useEffect } from 'react';
import ResetPassword from '../../components/ui/ResetPassword';

const ResetPasswordPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
