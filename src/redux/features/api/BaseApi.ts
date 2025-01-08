import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';

// Define a service using a base URL and expected endpoints
const baseUrl = import.meta.env.VITE_BASE_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result: any = baseQuery(args, api, extraOptions);

  // if (result?.error?.status === 500) {
  //   const res = await fetch('http://localhost:3000/api', {
  //     method: 'POST',
  //     credentials: 'include',
  //   });

  //   const data = await res.json();
  //   if (data?.data?.accessToken) {
  //     const user = (api.getState() as RootState).auth.user;

  //     api.dispatch(login({ user: user, token: data.data?.accessToken }));

  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logout());
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  tagTypes: [
    'users',
    'shops',
    'categories',
    'products',
    'reviews',
    'carts',
    'orders',
    'comparison',
    'coupon',
    'followShop',
    'reports',
    'recent-products',
    'wishlist',
    'newsletter',
  ],
  endpoints: () => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
