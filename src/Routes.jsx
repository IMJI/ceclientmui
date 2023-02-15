import React from "react";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Outgoings from "./pages/Outgoings";

const AppRoutes = [
    {
        index: true,
        element: (
            <Layout name='Панель'>
                <Dashboard />
            </Layout>
        )
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/outgoings',
        element: (
            <Layout name='Продажи'>
                <Outgoings />
            </Layout>
        )
    },
    {
        path: '/profile',
        element: (
            <Layout name='Профиль'>
                
            </Layout>
        )
    },
    {
        path: '/statistics',
        element: (
            <Layout name='Статистика'>
                
            </Layout>
        )
    },
    {
        path: '/subordinates',
        element: (
            <Layout name='Подчиненные'>
                
            </Layout>
        )
    },
    {
        path: '/settings',
        element: (
            <Layout name='Настройки'>
                
            </Layout>
        )
    }
];

export default AppRoutes;