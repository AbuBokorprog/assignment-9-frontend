import React, { useEffect } from 'react';
import ResetPassword from '../../components/ui/ResetPassword';
import Title from '../../components/helmet/Title';

const ResetPasswordPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Title title="Password Reset" content="This is password reset page." />
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
