import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const SaleForm = ({ onAdd }) => {
    const [saleData, setSaleData] = useState({
        total_amount: '',
        sale_date: '',
        status: ''
    });

    const handleChange = (e) => {
        setSaleData({
            ...saleData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/sales', saleData);
            onAdd(response.data);
            setSaleData({ total_amount: '', sale_date: '', status: '' });
        } catch (error) {
            console.error('There was an error creating the sale!', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Total Amount"
                name="total_amount"
                value={saleData.total_amount}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                type="number"
            />
            <TextField
                label="Sale Date"
                name="sale_date"
                value={saleData.sale_date}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Status"
                name="status"
                value={saleData.status}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Sale
            </Button>
        </Box>
    );
};

export default SaleForm;
