import { baseApi } from '../BaseApi';

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReports: builder.query({
      query: () => ({
        url: '/dashboard-reports/admin/my-reports',
        method: 'GET',
      }),
      providesTags: ['reports'],
    }),
    getVendorReports: builder.query({
      query: () => ({
        url: '/dashboard-reports/admin/my-reports',
        method: 'GET',
      }),
      providesTags: ['reports'],
    }),
    getUserReports: builder.query({
      query: () => ({
        url: '/dashboard-reports/admin/my-reports',
        method: 'GET',
      }),
      providesTags: ['reports'],
    }),
  }),
});

export const {
  useGetAdminReportsQuery,
  useGetVendorReportsQuery,
  useGetUserReportsQuery,
} = reportsApi;
