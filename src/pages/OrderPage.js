import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import axios from 'axios';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:8080/orders');
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setError('Response data is not an array');
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                setError('There was an error fetching the orders!');
                console.error('There was an error fetching the orders!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleAddOrder = async (newOrder) => {
        if (newOrder && typeof newOrder === 'object') {
            setOrders((prevOrders) => [...prevOrders, newOrder])
            setSuccess('Order added successfully');
        }else {
            setError('New order is not a valid object:', newOrder);
            console.error('New order is not a valid object:', newOrder);
        }
    };

    const handleUpdateOrder = async (updatedOrder) => {
        try {
            const response = await axios.put(`http://localhost:8080/orders/${updatedOrder.ID}`, updatedOrder);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.ID === updatedOrder.ID ? response.data : order
                )
            );
            setSuccess('Order updated successfully');
        } catch (error) {
            setError('There was an error updating the order');
            console.error('There was an error updating the order!', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try{   
            await axios.delete(`http://localhost:8080/orders/${orderId}`);
            setOrders((prevOrders) =>
                prevOrders.filter((order) => order.ID !== orderId)
            );
            setSuccess('Order deleted successfully');
        } catch (error) {
            setError('');
            console.error('There was an error deleting the item!', error)
        }
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <OrderForm onAdd={handleAddOrder} />
                    <OrderList
                        orders={orders}
                        onUpdateOrder={handleUpdateOrder}
                        onDeleteOrder={handleDeleteOrder}
                    />
                </>
            )}
            {error && (
                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}
            {success && (
                <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')}>
                    <Alert onClose={() => setSuccess('')} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default OrderPage;
