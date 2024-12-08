import { baseApi } from '../BaseApi';

export const comparesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyCompares: builder.query({
      query: () => ({
        url: '/comparison/user/my-comparison',
        method: 'GET',
      }),
      providesTags: ['comparison'],
    }),
    getCompareById: builder.query({
      query: (id) => ({
        url: `/comparison/${id}`,
        method: 'GET',
      }),
      providesTags: ['comparison'],
    }),
    createCompare: builder.mutation({
      query: (data) => ({
        url: '/comparison',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comparison'],
    }),
    updateCompare: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comparison/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['comparison'],
    }),
    deleteCompare: builder.mutation({
      query: (id) => ({
        url: `/comparison/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comparison'],
    }),
  }),
});

export const {
  useGetAllMyComparesQuery,
  useGetCompareByIdQuery,
  useCreateCompareMutation,
  useUpdateCompareMutation,
  useDeleteCompareMutation,
} = comparesApi;
