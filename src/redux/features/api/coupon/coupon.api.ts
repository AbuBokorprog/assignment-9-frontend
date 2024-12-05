import { baseApi } from '../BaseApi';

export const couponsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => ({
        url: '/coupons',
        method: 'GET',
      }),
      providesTags: ['coupon'],
    }),
    getCouponById: builder.query({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'GET',
      }),
      providesTags: ['coupon'],
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: '/coupons',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['coupon'],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupons/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['coupon'],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['coupon'],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
