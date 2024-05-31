import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import SaleForm from '../components/SaleForm';
import SaleList from '../components/SaleList';
import axios from 'axios';

const SalePage = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://localhost:8080/sales'); // Pastikan URL ini sesuai dengan endpoint backend
                setSales(response.data);
            } catch (error) {
                console.error('There was an error fetching the sales!', error);
            }
        };

        fetchSales();
    }, []);

    const handleAddSale = async (newSale) => {
        try {
            const response = await axios.post('http://localhost:5432/sales', newSale);
            setSales([...sales, response.data]);
        } catch (error) {
            console.error('There was an error adding the sale!', error);
        }
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
