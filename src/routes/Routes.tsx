import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/main/Main';
import Dashboard from '../layout/dashboard/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import AllShop from '../pages/AllShop';
import AllProducts from '../pages/products/AllProducts';
import ProductDetails from '../pages/products/ProductDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <div>Error</div>,
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
        path: '/all-products',
        element: <AllProducts />,
      },
      {
        path: '/product-details',
        element: <ProductDetails />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Registration />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <div>error</div>,
    children: [{}],
  },
]);
