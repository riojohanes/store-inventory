import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const OrderForm = ({ onAdd }) => {
    const [orderData, setOrderData] = useState({
        supplier_id: '',
        order_date: '',
        status: ''
    });

    const handleChange = (e) => {
        setOrderData({
            ...orderData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/orders', orderData);
            onAdd(response.data);
            setOrderData({ supplier_id: '', order_date: '', status: '' });
        } catch (error) {
            console.error('There was an error creating the order!', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Supplier ID"
                name="supplier_id"
                value={orderData.supplier_id}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Order Date"
                name="order_date"
                value={orderData.order_date}
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
                value={orderData.status}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Order
            </Button>
        </Box>
    );
};

export default OrderForm;
