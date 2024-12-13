import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  // Google,
  // Facebook,
  Email,
  Lock,
} from '@mui/icons-material';
import { useLoginMutation } from '../../redux/features/api/auth/auth.api';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/auth-slice/AuthSlice';
import { toast } from 'sonner';
import Loader from '../../components/ui/Loader';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [userLogin, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    const tokenId = toast.loading('Loading...');
    try {
      const res = await userLogin(data).unwrap();

      if (res?.success) {
        dispatch(
          login({
            user: {
              email: res?.data.email,
              role: res?.data?.role,
              name: res?.data.name,
              id: res?.data?.id,
            },
            token: res?.data?.token,
          })
        );
        toast.success(res?.message, { id: tokenId, duration: 200 });

        if (res?.data?.role === 'ADMIN' || res?.data?.role === 'SUPER-ADMIN') {
          navigate('/dashboard/admin-dashboard');
        } else if (res?.data?.role === 'VENDOR') {
          navigate('/dashboard/vendor-dashboard');
        } else {
          navigate('/');
        }

        reset();
      }
    } catch (error: any) {
      toast.error(error.error as string, { id: tokenId, duration: 200 });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <TextField
                    fullWidth
                    label="Email address"
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
                </div>

                <div>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="text-gray-400" />
                        </InputAdornment>
                      ),
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Button
                      variant="text"
                      // onClick={() => setOpen(true)}
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="bg-primary-600 hover:bg-primary-700 text-white py-2"
                >
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
