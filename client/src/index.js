import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider }
    from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainTemplatePage from './_templates/body';

import HomePage from './pages/home';
import AdminPage from './pages/admin';

import SignUp from './pages/authorization/signup';
import LogIn from './pages/authorization/login';
import LogoutPage from './pages/authorization/logout';
import AccessDeniedPage from './pages/denied';

import PersonalProfilePage from './pages/profile/personal'
import ViewProfilePage from './pages/profile/view'
import SettingsPage from './pages/settings'

import './index.css'

let theme = createTheme({});

theme = createTheme(theme, {
    palette: {
        lightbackground: theme.palette.augmentColor({
            color: {
                main: '#FFFFFF',
                contrastText:"#000000",
            },
            name:'lightbackground',
        }),
        darkbackground: theme.palette.augmentColor({
            color: {
                main: '#808080',
            },
            name:'darkbackground',
        }),
        lighttext: theme.palette.augmentColor({
            color: {
                main: '#FFFFFF',
                contrastText:"#000000",
            },
            name:'lighttext',
        }),
        darktext: theme.palette.augmentColor({
            color: {
                main: '#000000',
                contrastText:"#FFFFFF",
            },
            name:'darktext',
        }),
        error: theme.palette.augmentColor({
            color: {
                main: '#FF5733',
            },
            name:'error',
        }),
    },
});

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainTemplatePage />,
        children: [
            {
                path: "",
                element:<HomePage />,
            },
            {
                path: "/home",
                element:<HomePage />,
            },
            {
                path:'/admin',
                element:<AdminPage />,
            },
            {
                path:'/profile',
                element:<PersonalProfilePage />,
            },
            {
                path:'/settings',
                element:<SettingsPage />,
            },
            {
                path:"/access-denied",
                element:<AccessDeniedPage />,
            },
            {
                path:'/profile/view/:userID',
                element:<ViewProfilePage />,
            },
    ],
    },
    {
        path:"/login",
        element:<LogIn />
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
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
