import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Overview from '../pages/Overview';
import Analytics from '../pages/Analytics';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/overview" replace />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
