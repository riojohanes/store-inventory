import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
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
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Stock Management
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/orders">Orders</Button>
                    <Button color="inherit" component={Link} to="/suppliers">Suppliers</Button>
                    <Button color="inherit" component={Link} to="/items">Items</Button>
                    <Button color="inherit" component={Link} to="/categories">Categories</Button>
                    <Button color="inherit" component={Link} to="/sales">Sales</Button>
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
