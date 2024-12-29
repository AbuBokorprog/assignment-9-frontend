import { baseApi } from '../BaseApi';

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewsletter: builder.query({
      query: () => ({
        url: '/newsletter',
        method: 'GET',
      }),
      providesTags: ['newsletter'],
    }),
    createNewsletter: builder.mutation({
      query: (data) => ({
        url: '/coupon',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['newsletter'],
    }),
  }),
});

export const { useCreateNewsletterMutation, useGetAllNewsletterQuery } =
  newsletterApi;
