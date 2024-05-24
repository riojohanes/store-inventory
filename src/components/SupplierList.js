import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/suppliers');
                setSuppliers(response.data);
                console.log(response);
            } catch (error) {
                console.error('There was an error fetching the suppliers!', error);
            }
        };

        fetchSuppliers();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Supplier ID</TableCell>
                        <TableCell>Supplier Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.ID}</TableCell>
                            <TableCell>{supplier.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SupplierList;
