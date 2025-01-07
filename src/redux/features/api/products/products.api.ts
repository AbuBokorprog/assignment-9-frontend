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
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/products/all-products/available',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['products'],
    }),
    getAllAvailableProductsInfinityScroll: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/products/all-products/available',
          method: 'GET',
          params: params,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results?.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['products'],
    }),
    getAllFlashSaleProducts: builder.query({
      query: () => ({
        url: '/products/all-products/flash-sale',
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    getAllHomeProducts: builder.query({
      query: () => ({
        url: '/products/all-products/home/home-products',
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
  useLazyGetAllAvailableProductsQuery,
  useGetAllFlashSaleProductsQuery,
  useGetAllHomeProductsQuery,
  useGetAllAvailableProductsInfinityScrollQuery,
} = productsApi;
