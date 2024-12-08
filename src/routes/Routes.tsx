import { createBrowserRouter } from 'react-router-dom';
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
import VendorDashboard from '../pages/dashboard/vendor/VendorDashboard';
import VendorAllShop from '../pages/dashboard/vendor/VendorAllShop';
import VendorAllProducts from '../pages/dashboard/vendor/VendorAllProducts';
import VendorOrderHistory from '../pages/dashboard/vendor/VendorOrderHistory';
import VendorReviews from '../pages/dashboard/vendor/VendorReviews';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import AdminAllUsers from '../pages/dashboard/admin/AdminAllUsers';
import AdminAllShop from '../pages/dashboard/admin/AdminAllShop';
import AdminAllCategories from '../pages/dashboard/admin/AdminAllCategories';
import AdminAllProducts from '../pages/dashboard/admin/AdminAllProducts';
import AdminAddCategory from '../pages/dashboard/admin/AdminAddCategory';
import AdminAddCoupon from '../pages/dashboard/admin/AdminAddCoupon';
import AdminAllCoupon from '../pages/dashboard/admin/AdminAllCoupon';
import AdminAllReviews from '../pages/dashboard/admin/AdminAllReviews';
import MyRecentProducts from '../pages/products/MyRecentProducts';
import MyCompareProducts from '../pages/products/MyCompareProducts';
import BecomeVendor from '../pages/BecomeVendor';
import VendorAddProduct from '../pages/dashboard/vendor/VendorAddProduct';
import VendorAddShop from '../pages/dashboard/vendor/VendorAddShop';
import AdminAllOrders from '../pages/dashboard/admin/AdminAllOrders';
import Comparison from '../pages/Comparison';
import ShopDetails from '../pages/shops/ShopDetails';
import ContactUs from '../pages/inner-pages/ContactUs';
import Privacy from '../pages/inner-pages/Privacy';
import TermsCondition from '../pages/inner-pages/TermsCondition';
import Refund from '../pages/inner-pages/Refund';
import Payment from '../pages/inner-pages/Payment';

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
        path: 'my-recent-products',
        element: <MyRecentProducts />,
      },
      {
        path: 'comparison',
        element: <Comparison />,
      },
      {
        path: 'my-comparison-products',
        element: <MyCompareProducts />,
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
        path: '/become-vendor',
        element: <BecomeVendor />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
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
        element: <Payment />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      // Admin dashboard route
      {
        path: 'admin-dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'admin/all-users',
        element: <AdminAllUsers />,
      },
      {
        path: 'admin/all-shops',
        element: <AdminAllShop />,
      },
      {
        path: 'admin/all-categories',
        element: <AdminAllCategories />,
      },
      {
        path: 'admin/add-category',
        element: <AdminAddCategory />,
      },
      {
        path: 'admin/all-products',
        element: <AdminAllProducts />,
      },
      {
        path: 'admin/add-coupon',
        element: <AdminAddCoupon />,
      },
      {
        path: 'admin/all-coupons',
        element: <AdminAllCoupon />,
      },
      {
        path: 'admin/all-orders',
        element: <AdminAllOrders />,
      },
      {
        path: 'admin/all-reviews',
        element: <AdminAllReviews />,
      },
      // User dashboard route
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
      // vendor dashboard
      {
        path: 'vendor-dashboard',
        element: <VendorDashboard />,
      },
      {
        path: 'vendor/all-shop',
        element: <VendorAllShop />,
      },
      {
        path: 'vendor/add-shop',
        element: <VendorAddShop />,
      },
      {
        path: 'vendor/all-products',
        element: <VendorAllProducts />,
      },
      {
        path: 'vendor/add-product',
        element: <VendorAddProduct />,
      },
      {
        path: 'vendor/order-history',
        element: <VendorOrderHistory />,
      },
      {
        path: 'vendor/review-management',
        element: <VendorReviews />,
      },
    ],
  },
]);
