import { baseApi } from '../BaseApi';

export const shopsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: () => ({
        url: '/shop',
        method: 'GET',
      }),
      providesTags: ['shops'],
    }),
    getShopById: builder.query({
      query: (id) => ({
        url: `/shop/${id}`,
        method: 'GET',
      }),
      providesTags: ['shops'],
    }),
    createShop: builder.mutation({
      query: (data) => ({
        url: '/shop',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['shops'],
    }),
    updateShop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shop/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['shops'],
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shop/${id}`,
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
