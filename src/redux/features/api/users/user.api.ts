import { baseApi } from '../BaseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['users'],
    }),
    myProfile: builder.query({
      query: () => ({
        url: '/users/profile/my-profile',
        method: 'GET',
      }),
      providesTags: ['users'],
    }),
    getUserById: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['users'],
    }),
    // login: builder.mutation({
    //   query: (data) => ({
    //     url: '/auth/login',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    // createUser: builder.mutation({
    //   query: (data) => ({
    //     url: '/users/create-customer',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    // createVendor: builder.mutation({
    //   query: (data) => ({
    //     url: '/users/create-vendor',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useGetAllUsersQuery,
  useMyProfileQuery,
  useGetUserByIdQuery,
  //   useLoginMutation,
  //   useCreateUserMutation,
  //   useCreateVendorMutation,
} = userApi;
