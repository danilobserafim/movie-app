import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritesPage';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
  {
    path: "/search/:dataSearch",
    element: <SearchPage />,
  },
  {
    path: "/",
    element: <FavoritePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster className='' />
  </React.StrictMode>,
)
