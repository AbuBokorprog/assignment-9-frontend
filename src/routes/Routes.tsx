import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/main/Main';
import Dashboard from '../layout/dashboard/Dashboard';
import Home from '../pages/Home';

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
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <div>error</div>,
    children: [{}],
  },
]);
