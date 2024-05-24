import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import SupplierForm from '../components/SupplierForm';
import SupplierList from '../components/SupplierList';
import axios from 'axios';

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:5432/suppliers'); // Pastikan URL ini sesuai dengan endpoint backend
                setSuppliers(response.data);
            } catch (error) {
                console.error('There was an error fetching the suppliers!', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleAddSupplier = async (newSupplier) => {
        try {
            const response = await axios.post('http://localhost:5432/suppliers', newSupplier);
            setSuppliers([...suppliers, response.data]);
        } catch (error) {
            console.error('There was an error adding the supplier!', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Suppliers
            </Typography>
            <SupplierForm onAdd={handleAddSupplier} />
            <SupplierList suppliers={suppliers} />
        </Container>
    );
};

export default SupplierPage;
