import React from 'react';
import { Container, Typography } from '@mui/material';

const DashboardPage = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1">
                Welcome to the Stock Management Dashboard. Use the navigation above to manage orders, suppliers, items, categories, and sales.
            </Typography>
        </Container>
    );
};

export default DashboardPage;
