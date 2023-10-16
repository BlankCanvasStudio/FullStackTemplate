import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Navigate }
    from 'react-router-dom';


import MainTemplatePage from './_templates/body';

import HomePage from './pages/home';
import AdminPage from './pages/admin';

import SignUp from './pages/authorization/signup';
import LogIn from './pages/authorization/login';
import LogoutPage from './pages/authorization/logout';

import './index.css'

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainTemplatePage />,
        children: [
            {
                path: "/home",
                element:<HomePage />,
            },
            {
                path:'/admin',
                element:<AdminPage />
            }
        ],
    },
    {
        path:"/login",
        element:<LogIn />,
    },
    {
        path:"/logout",
        element:<LogoutPage />,
    },
    {
        path:"/signup",
        element:<SignUp />,
    },
]);

ReactDOM.createRoot(document.getElementsByTagName("body")[0]).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
