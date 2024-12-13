import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { currentToken } from '../redux/store';
import { JwtDecode } from '../utils/JWTDecode';
import { Navigate } from 'react-router-dom';
import { logout } from '../redux/features/auth-slice/AuthSlice';

type PrivateRouteProps = {
  children: React.ReactNode;
  roles: string[];
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const token = useAppSelector(currentToken);
  const dispatch = useAppDispatch();
  const user: any = JwtDecode(token as string);

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  if (roles?.length > 0 && (!user || !roles.includes(user?.role))) {
    dispatch(logout());
    return <Navigate to={'/login'} replace />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
