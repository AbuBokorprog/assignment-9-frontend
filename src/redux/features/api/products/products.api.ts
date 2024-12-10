import { baseApi } from '../BaseApi';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    getAllProductsByVendor: builder.query({
      query: () => ({
        url: '/products/vendor/my-product',
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    getAllAvailableProducts: builder.query({
      query: () => ({
        url: '/products/all-products/available',
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    getAllFlashSaleProducts: builder.query({
      query: () => ({
        url: '/products/all-products/flash-sale',
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
    updateProductStatus: builder.mutation({
      query: (data) => ({
        url: `/products/status/update-status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllProductsByVendorQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
  useGetAllAvailableProductsQuery,
  useGetAllFlashSaleProductsQuery,
} = productsApi;
