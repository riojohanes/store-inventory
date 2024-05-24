import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import axios from 'axios';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5432/orders'); // Pastikan URL ini sesuai dengan endpoint backend
                setOrders(response.data);
            } catch (error) {
                console.error('There was an error fetching the orders!', error);
            }
        };

        fetchOrders();
    }, []);

    const handleAddOrder = async (newOrder) => {
        try {
            const response = await axios.post('http://localhost:5432/orders', newOrder);
            setOrders([...orders, response.data]);
        } catch (error) {
            console.error('There was an error adding the order!', error);
        }
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
