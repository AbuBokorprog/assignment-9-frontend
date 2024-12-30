import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from '../layout/main/Main';
import Dashboard from '../layout/dashboard/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import AllShop from '../pages/shops/AllShop';
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
import ShopDetails from '../pages/shops/ShopDetails';
import ContactUs from '../pages/inner-pages/ContactUs';
import TermsCondition from '../pages/inner-pages/TermsCondition';
import Refund from '../pages/inner-pages/Refund';
import CustomerComparison from '../pages/dashboard/customer/CustomerComparison';
import PrivacyPolicy from '../pages/inner-pages/Privacy';
import PaymentPolicy from '../pages/inner-pages/Payment';
import PrivateRoute from '../private/PrivateRoute';
import OrderDetails from '../pages/dashboard/customer/OrderDetails';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import AllCoupon from '../pages/AllCoupon';
import SearchProducts from '../pages/products/SearchProducts';

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
        path: '/shop-details/:id',
        element: <ShopDetails />,
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
        path: '/all-products/:searchTerm',
        element: <SearchProducts />,
      },
      {
        path: '/product-details/:id',
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
        path: '/comparison',
        element: <CustomerComparison />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/register',
        element: <Registration />,
      },
      {
        path: '/offer',
        element: <AllCoupon />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terms-condition',
        element: <TermsCondition />,
      },
      {
        path: '/refund',
        element: <Refund />,
      },
      {
        path: '/payment',
        element: <PaymentPolicy />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Navigate to={'/'} replace />,
    children: [
      // User dashboard route
      {
        path: 'user-dashboard',
        element: (
          <PrivateRoute>
            <CustomerDashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <CustomerOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders/:orderId',
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-wishlist',
        element: (
          <PrivateRoute>
            <CustomerWishlist />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-reviews',
        element: (
          <PrivateRoute>
            <CustomerReview />
          </PrivateRoute>
        ),
      },
      {
        path: 'followed-shops',
        element: (
          <PrivateRoute>
            <CustomerFollowShop />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
