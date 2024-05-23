import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SaleList = ({ sales }) => {
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
                        <TableRow key={sale.sale_id}>
                            <TableCell>{sale.sale_id}</TableCell>
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
