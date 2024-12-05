import { baseApi } from '../BaseApi';

export const shopsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: () => ({
        url: '/shops',
        method: 'GET',
      }),
      providesTags: ['shops'],
    }),
    getShopById: builder.query({
      query: (id) => ({
        url: `/shops/${id}`,
        method: 'GET',
      }),
      providesTags: ['shops'],
    }),
    createShop: builder.mutation({
      query: (data) => ({
        url: '/shops',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['shops'],
    }),
    updateShop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shops/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['shops'],
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shops/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['shops'],
    }),
  }),
});

export const {
  useGetAllShopsQuery,
  useGetShopByIdQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = shopsApi;
