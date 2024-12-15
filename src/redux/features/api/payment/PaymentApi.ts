import { baseApi } from '../BaseApi';

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePaymentStatus: builder.mutation({
      query: (data) => ({
        url: '/payment/update/payment-status',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['orders'],
    }),
  }),
});

export const { useUpdatePaymentStatusMutation } = ordersApi;
