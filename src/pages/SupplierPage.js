import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import SupplierForm from '../components/SupplierForm';
import SupplierList from '../components/SupplierList';
import axios from 'axios';

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await axios.get('/api/suppliers');
            setSuppliers(response.data);
        };

        fetchSuppliers();
    }, []);

    const handleAddSupplier = (newSupplier) => {
        setSuppliers([...suppliers, newSupplier]);
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
