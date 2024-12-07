import { baseApi } from '../BaseApi';

export const cartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => ({
        url: '/carts',
        method: 'GET',
      }),
      providesTags: ['carts'],
    }),
    getAllMyCarts: builder.query({
      query: () => ({
        url: '/carts/my/carts',
        method: 'GET',
      }),
      providesTags: ['carts'],
    }),
    getCartById: builder.query({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'GET',
      }),
      providesTags: ['carts'],
    }),
    createCart: builder.mutation({
      query: (data) => ({
        url: '/carts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['carts'],
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['carts'],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['carts'],
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useGetCartByIdQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetAllMyCartsQuery,
} = cartsApi;
