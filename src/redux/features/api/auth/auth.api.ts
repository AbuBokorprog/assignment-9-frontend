import { baseApi } from '../BaseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: '/users/create-customer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),
    createVendor: builder.mutation({
      query: (data) => ({
        url: '/users/create-vendor',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: '/users/create-admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useCreateVendorMutation,
  useCreateAdminMutation,
} = authApi;
