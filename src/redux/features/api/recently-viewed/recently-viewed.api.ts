import { baseApi } from '../BaseApi';

export const recentViewedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReports: builder.query({
      query: () => ({
        url: '/recent-viewed',
        method: 'GET',
      }),
      providesTags: ['recent-products'],
    }),
    getVendorReports: builder.query({
      query: () => ({
        url: '/recent-viewed',
        method: 'GET',
      }),
      providesTags: ['recent-products'],
    }),
    getUserReports: builder.query({
      query: () => ({
        url: '/recent-viewed',
        method: 'GET',
      }),
      providesTags: ['recent-products'],
    }),
  }),
});

export const {
  useGetAdminReportsQuery,
  useGetVendorReportsQuery,
  useGetUserReportsQuery,
} = recentViewedApi;
