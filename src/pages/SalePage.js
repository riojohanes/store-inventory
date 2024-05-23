import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import SaleForm from '../components/SaleForm';
import SaleList from '../components/SaleList';
import axios from 'axios';

const SalePage = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            const response = await axios.get('/api/sales');
            setSales(response.data);
        };

        fetchSales();
    }, []);

    const handleAddSale = (newSale) => {
        setSales([...sales, newSale]);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Sales
            </Typography>
            <SaleForm onAdd={handleAddSale} />
            <SaleList sales={sales} />
        </Container>
    );
};

export default SalePage;
