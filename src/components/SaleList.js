import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const SaleList = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://localhost:8080/sales');
                setSales(response.data);
                console.log(response);
            } catch (error) {
                console.error('There was an error fetching the sales!', error);
            }
        };

        fetchSales();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Sale ID</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>Sale Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sales.map((sale) => (
                        <TableRow key={sale.id}>
                            <TableCell>{sale.ID}</TableCell>
                            <TableCell>{sale.total_amount}</TableCell>
                            <TableCell>{sale.sale_date}</TableCell>
                            <TableCell>{sale.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SaleList;
