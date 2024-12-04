import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './providers/ThemeProvider.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
