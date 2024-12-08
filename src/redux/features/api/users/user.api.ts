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
    userStatusChange: builder.mutation({
      query: (data) => ({
        url: '/users/status/user-status',
        method: 'PATCH',
        body: data,
      }),
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: '/users/profile/my-profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),
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
  useUpdateMyProfileMutation,
  //   useCreateUserMutation,
  //   useCreateVendorMutation,
} = userApi;
