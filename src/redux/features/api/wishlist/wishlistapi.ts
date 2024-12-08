import { baseApi } from '../BaseApi';

export const wishlistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyWishlists: builder.query({
      query: () => ({
        url: '/wishlist/user/my-wishlist',
        method: 'GET',
      }),
      providesTags: ['wishlist'],
    }),
    getWishlistById: builder.query({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: 'GET',
      }),
      providesTags: ['wishlist'],
    }),
    createWishlist: builder.mutation({
      query: (data) => ({
        url: '/wishlist',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wishlist'],
    }),
    updateWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/wishlist/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wishlist'],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['wishlist'],
    }),
  }),
});

export const {
  useGetAllMyWishlistsQuery,
  useGetWishlistByIdQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistsApi;
