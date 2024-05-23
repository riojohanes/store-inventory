import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import StockManagementPage from './pages/StockManagementPage';
import StockDetailPage from './pages/StockDetailPage';
import ReportsPage from './pages/ReportsPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/manage" element={<StockManagementPage />} />
                <Route path="/stock/:id" element={<StockDetailPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default App;
