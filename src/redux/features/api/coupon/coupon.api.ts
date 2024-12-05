import { baseApi } from '../BaseApi';

export const couponsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => ({
        url: '/coupon',
        method: 'GET',
      }),
      providesTags: ['coupon'],
    }),
    getCouponById: builder.query({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: 'GET',
      }),
      providesTags: ['coupon'],
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: '/coupon',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['coupon'],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['coupon'],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
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
