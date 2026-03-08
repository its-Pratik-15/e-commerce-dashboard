import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PageSkeleton } from '../components/common/Skeletons';
import Layout from '../layout';

// Lazy load all page components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const OrdersPage = lazy(() => import('../pages/Orders'));
const CustomersPage = lazy(() => import('../pages/Customers'));
const ProductsPage = lazy(() => import('../pages/Products'));
const Analytics = lazy(() => import('../pages/Analytics'));

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={
                        <Suspense fallback={<PageSkeleton />}>
                            <Dashboard />
                        </Suspense>
                    } />
                    <Route path="orders" element={
                        <Suspense fallback={<PageSkeleton />}>
                            <OrdersPage />
                        </Suspense>
                    } />
                    <Route path="customers" element={
                        <Suspense fallback={<PageSkeleton />}>
                            <CustomersPage />
                        </Suspense>
                    } />
                    <Route path="products" element={
                        <Suspense fallback={<PageSkeleton />}>
                            <ProductsPage />
                        </Suspense>
                    } />
                    <Route path="analytics" element={
                        <Suspense fallback={<PageSkeleton />}>
                            <Analytics />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
