import { baseApi } from '../BaseApi';

export const wishlistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyWishlists: builder.query({
      query: () => ({
        url: '/wishlist/user/my-wishlist',
        method: 'GET',
      }),
      providesTags: ['wishlist', 'products'],
    }),
    getWishlistById: builder.query({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: 'GET',
      }),
      providesTags: ['wishlist', 'products'],
    }),
    createWishlist: builder.mutation({
      query: (data) => ({
        url: '/wishlist',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wishlist', 'products'],
    }),
    updateWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/wishlist/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wishlist', 'products'],
    }),
    deleteWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist/user/wishlist-delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['wishlist', 'products'],
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
