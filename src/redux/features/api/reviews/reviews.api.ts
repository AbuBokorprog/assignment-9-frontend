import { baseApi } from '../BaseApi';

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: '/reviews',
        method: 'GET',
      }),
      providesTags: ['reviews'],
    }),
    getMyAllReviews: builder.query({
      query: () => ({
        url: '/reviews/users/my-review',
        method: 'GET',
      }),
      providesTags: ['reviews'],
    }),
    getVendorAllReviews: builder.query({
      query: () => ({
        url: '/reviews/vendor/my-review',
        method: 'GET',
      }),
      providesTags: ['reviews'],
    }),
    getReviewById: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'GET',
      }),
      providesTags: ['reviews'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetMyAllReviewsQuery,
  useGetVendorAllReviewsQuery,
} = reviewsApi;
