import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout';
import Dashboard from '../pages/Dashboard';
import OrdersPage from '../pages/Orders';
import CustomersPage from '../pages/Customers';
import ProductsPage from '../pages/Products';
import Analytics from '../pages/Analytics';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="analytics" element={<Analytics />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
