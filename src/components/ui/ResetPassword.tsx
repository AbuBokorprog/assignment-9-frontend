import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/features/api/auth/auth.api';

interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();

  const [resetPassword] = useResetPasswordMutation();
  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    const authData = { ...data, email: email };
    if (!token) {
      setServerError('Invalid or expired token.');
      return;
    }

    try {
      const response = await resetPassword(authData).unwrap();
      if (response?.success) {
        navigate('/login');
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Something went wrong.');
      setServerMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              {...register('newPassword', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              } focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watch('newPassword') || 'Passwords do not match',
              })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Server Messages */}
        {serverMessage && (
          <p className="text-green-500 text-sm mt-4">{serverMessage}</p>
        )}
        {serverError && (
          <p className="text-red-500 text-sm mt-4">{serverError}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
