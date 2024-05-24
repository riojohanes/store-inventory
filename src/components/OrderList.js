import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/orders');
                setOrders(response.data);
                console.log(response);
            } catch (error) {
                console.error('There was an error fetching the orders!', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Supplier ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.ID}>
                            <TableCell>{order.ID}</TableCell>
                            <TableCell>{order.supplier_id}</TableCell>
                            <TableCell>{order.order_date}</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderList;
