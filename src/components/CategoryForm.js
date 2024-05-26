import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const CategoryForm = ({ onAddCategory }) => {
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddCategory = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/categories', { name: categoryName });
            onAddCategory(response.data);
            setCategoryName('');
        } catch (error) {
            setError('There was an error adding the category!');
            console.error('There was an error adding the category!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleAddCategory} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <TextField
                label="Category Name"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                sx={{ mb: 2, width: '300px' }}
                required
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddCategory(e);
                    }
                }}
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Add Category'}
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
    );
};

export default CategoryForm;
