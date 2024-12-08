import { baseApi } from '../BaseApi';

export const recentViewedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAllRecentProducts: builder.query({
      query: () => ({
        url: '/recently-viewed/user/my-recent-products',
        method: 'GET',
      }),
      providesTags: ['recent-products'],
    }),
    createRecentProducts: builder.mutation({
      query: (data) => ({
        url: '/recently-viewed',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['recent-products'],
    }),
  }),
});

export const {
  useGetMyAllRecentProductsQuery,
  useCreateRecentProductsMutation,
} = recentViewedApi;
