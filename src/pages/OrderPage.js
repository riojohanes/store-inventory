import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import axios from 'axios';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        };

        fetchOrders();
    }, []);

    const handleAddOrder = (newOrder) => {
        setOrders([...orders, newOrder]);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            <OrderForm onAdd={handleAddOrder} />
            <OrderList orders={orders} />
        </Container>
    );
};

export default OrderPage;
