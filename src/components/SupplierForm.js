import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const SupplierForm = ({ onAddSupplier }) => {
    const [supplierName, setSupplierName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/suppliers', { name: supplierName });
            onAddSupplier(response.data);
            setSupplierName('');
        } catch (error) {
            console.error('There was an error adding the supplier!', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission on Enter
            handleSubmit();
        }
    };

    return (
        <Box component="form" onSubmit= {handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <TextField
                label="Supplier Name"
                variant="outlined"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Supplier
            </Button>
        </Box>
    );
};

export default SupplierForm;
