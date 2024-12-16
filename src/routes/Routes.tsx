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
import BecomeVendor from '../pages/BecomeVendor';
import VendorAddProduct from '../pages/dashboard/vendor/VendorAddProduct';
import VendorAddShop from '../pages/dashboard/vendor/VendorAddShop';
import AdminAllOrders from '../pages/dashboard/admin/AdminAllOrders';
import ShopDetails from '../pages/shops/ShopDetails';
import ContactUs from '../pages/inner-pages/ContactUs';
import TermsCondition from '../pages/inner-pages/TermsCondition';
import Refund from '../pages/inner-pages/Refund';
import CustomerComparison from '../pages/dashboard/customer/CustomerComparison';
import PrivacyPolicy from '../pages/inner-pages/Privacy';
import PaymentPolicy from '../pages/inner-pages/Payment';
import PrivateRoute from '../private/PrivateRoute';
import { UserRole } from '../utils/UserRole';
import OrderDetails from '../pages/dashboard/customer/OrderDetails';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import VendorEditShop from '../pages/dashboard/vendor/VendorEditShop';
import AdminEditCategory from '../pages/dashboard/admin/AdminEditCategory';
import AdminEditCoupon from '../pages/dashboard/admin/AdminEditCoupon';
import VendorEditProduct from '../pages/dashboard/vendor/VendorEditProduct';
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
        path: '/my-recent-products',
        element: <MyRecentProducts />,
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
      // Admin dashboard route
      {
        path: 'admin-dashboard',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-users',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-shops',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-categories',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllCategories />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/add-category',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAddCategory />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/edit-category/:id',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminEditCategory />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-products',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/add-coupon',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            {' '}
            <AdminAddCoupon />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/edit-coupon/:id',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminEditCoupon />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-coupons',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllCoupon />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-orders',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-reviews',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllReviews />
          </PrivateRoute>
        ),
      },
      // User dashboard route
      {
        path: 'user-dashboard',
        element: (
          <PrivateRoute roles={[UserRole.customer]}>
            <CustomerDashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute
            roles={[
              UserRole.admin,
              UserRole.super_admin,
              UserRole.vendor,
              UserRole.customer,
            ]}
          >
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute roles={[UserRole.customer]}>
            <CustomerOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders/:orderId',
        element: (
          <PrivateRoute roles={[UserRole.customer]}>
            <OrderDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-wishlist',
        element: (
          <PrivateRoute roles={[UserRole.customer]}>
            <CustomerWishlist />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-reviews',
        element: (
          <PrivateRoute roles={[UserRole.customer]}>
            <CustomerReview />
          </PrivateRoute>
        ),
      },
      {
        path: 'followed-shops',
        element: (
          <PrivateRoute roles={[UserRole.customer]}>
            <CustomerFollowShop />
          </PrivateRoute>
        ),
      },
      // vendor dashboard
      {
        path: 'vendor-dashboard',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/all-shop',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorAllShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/add-shop',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            {' '}
            <VendorAddShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/edit-shop/:id',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorEditShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/all-products',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorAllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/add-product',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorAddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/edit-product/:id',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorEditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/order-history',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorOrderHistory />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/review-management',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorReviews />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
