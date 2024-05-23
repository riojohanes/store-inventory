import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import DashboardPage from './pages/DashboardPage';
import OrderPage from './pages/OrderPage';
import SupplierPage from './pages/SupplierPage';
import ItemPage from './pages/ItemPage';
import CategoryPage from './pages/CategoryPage';
import SalePage from './pages/SalePage';

const App = () => {
    return (
        <Router>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Stock Management</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/orders" element={<OrderPage />} />
                    <Route path="/suppliers" element={<SupplierPage />} />
                    <Route path="/items" element={<ItemPage />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/sales" element={<SalePage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
