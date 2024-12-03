import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/main/Main';
import Dashboard from '../layout/dashboard/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import AllShop from '../pages/AllShop';
import AllProducts from '../pages/products/AllProducts';
import ProductDetails from '../pages/products/ProductDetails';
import Checkout from '../pages/Checkout';
import ViewCart from '../pages/ViewCart';
import FlashSale from '../pages/FlashSale';
import About from '../pages/inner-pages/About';
import CustomerDashboardHome from '../pages/dashboard/customer/CustomerDashboardHome';
import Error from '../pages/Error';
import Profile from '../pages/dashboard/common/Profile';
import CustomerOrders from '../pages/dashboard/customer/CustomerOrders';
import CustomerWishlist from '../pages/dashboard/customer/CustomerWishlist';
import CustomerReview from '../pages/dashboard/customer/CustomerReview';
import CustomerFollowShop from '../pages/dashboard/customer/CustomerFollowShop';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <AllShop />,
      },
      {
        path: '/flash-sale',
        element: <FlashSale />,
      },
      {
        path: '/all-products',
        element: <AllProducts />,
      },
      {
        path: '/product-details',
        element: <ProductDetails />,
      },
      {
        path: '/view-cart',
        element: <ViewCart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Registration />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: 'user-dashboard',
        element: <CustomerDashboardHome />,
      },
      {
        path: 'my-profile',
        element: <Profile />,
      },
      {
        path: 'my-orders',
        element: <CustomerOrders />,
      },
      {
        path: 'my-wishlist',
        element: <CustomerWishlist />,
      },
      {
        path: 'my-reviews',
        element: <CustomerReview />,
      },
      {
        path: 'followed-shops',
        element: <CustomerFollowShop />,
      },
    ],
  },
]);
