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
    getAllAvailableShops: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/shop/all-available',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['shops'],
    }),
    getAllShopsByVendor: builder.query({
      query: () => ({
        url: '/shop/vendor-shops',
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
    getMyFollowingShop: builder.query({
      query: () => ({
        url: '/follower/my',
        method: 'GET',
      }),
      providesTags: ['followShop'],
    }),
    shopFollowToggle: builder.mutation({
      query: (data) => ({
        url: '/follower/shop-follow',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['followShop', 'shops'],
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
    updateShopStatus: builder.mutation({
      query: (data) => ({
        url: `/shop/status/update-status`,
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
  useGetAllShopsByVendorQuery,
  useUpdateShopStatusMutation,
  useShopFollowToggleMutation,
  useGetMyFollowingShopQuery,
  useGetAllAvailableShopsQuery,
} = shopsApi;
