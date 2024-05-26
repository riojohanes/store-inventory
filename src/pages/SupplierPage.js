import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import SupplierForm from '../components/SupplierForm';
import SupplierList from '../components/SupplierList';

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:8080/suppliers');
                if (Array.isArray(response.data)) {
                    setSuppliers(response.data);
                } else {
                    setError('Response data is not an array');
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                setError('There was an error fetching the suppliers');
                console.error('There was an error fetching the suppliers!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    const handleAddSupplier = (newSupplier) => {
        if (newSupplier && typeof newSupplier === 'object') {
            setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
            setSuccess('Supplier added successfully');
        } else {
            setError('New supplier is not a valid object');
            console.error('New supplier is not a valid object:', newSupplier);
        }
    };

    const handleUpdateSupplier = async (updatedSupplier) => {
        try {
            const response = await axios.put(`http://localhost:8080/suppliers/${updatedSupplier.ID}`, updatedSupplier);
            setSuppliers((prevSuppliers) =>
                prevSuppliers.map((supplier) =>
                    supplier.ID === updatedSupplier.ID ? response.data : supplier
                )
            );
            setSuccess('Supplier updated successfully');
        } catch (error) {
            setError('There was an error updating the supplier');
            console.error('There was an error updating the supplier!', error);
        }
    };

    const handleDeleteSupplier = async (supplierId) => {
        try {
            await axios.delete(`http://localhost:8080/suppliers/${supplierId}`);
            setSuppliers((prevSuppliers) =>
                prevSuppliers.filter((supplier) => supplier.ID !== supplierId)
            );
            setSuccess('Supplier deleted successfully');
        } catch (error) {
            setError('There was an error deleting the supplier');
            console.error('There was an error deleting the supplier!', error);
        }
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <SupplierForm onAddSupplier={handleAddSupplier} />
                    <SupplierList
                        suppliers={suppliers}
                        onUpdateSupplier={handleUpdateSupplier}
                        onDeleteSupplier={handleDeleteSupplier}
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

export default SupplierPage;
