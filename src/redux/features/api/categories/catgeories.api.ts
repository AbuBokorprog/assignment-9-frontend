import { baseApi } from '../BaseApi';

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: '/category',
        method: 'GET',
      }),
      providesTags: ['categories'],
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'GET',
      }),
      providesTags: ['categories'],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
