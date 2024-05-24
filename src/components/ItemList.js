import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/items');
                setItems(response.data);
                console.log(response);
            } catch (error) {
                console.error('There was an error fetching the items!', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Category ID</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Supplier ID</TableCell>
                        <TableCell>Supplier</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.ID}</TableCell>
                            <TableCell>{item.Name}</TableCell>
                            <TableCell>{item.Description}</TableCell>
                            <TableCell>{item.Quantity}</TableCell>
                            <TableCell>{item.CategoryID}</TableCell>
                            <TableCell>{item.Price}</TableCell>
                            <TableCell>{item.SupplierID}</TableCell>
                            <TableCell>{item.Supplier}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ItemList;
