import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const SupplierForm = ({ onAdd }) => {
    const [supplierData, setSupplierData] = useState({
        supplier_name: ''
    });

    const handleChange = (e) => {
        setSupplierData({
            ...supplierData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/suppliers', supplierData);
            onAdd(response.data);
            setSupplierData({ supplier_name: '' });
        } catch (error) {
            console.error('There was an error creating the supplier!', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Supplier Name"
                name="supplier_name"
                value={supplierData.supplier_name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Supplier
            </Button>
        </Box>
    );
};

export default SupplierForm;
