import React from 'react';
import { useAppSelector } from '../redux/hooks/hooks';
import { currentToken } from '../redux/store';
import { JwtDecode } from '../utils/JWTDecode';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useAppSelector(currentToken);
  const user: any = JwtDecode(token as string);

  if (!user?.email) {
    return <Navigate to={'/login'} replace />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
