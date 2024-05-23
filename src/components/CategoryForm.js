import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const CategoryForm = ({ onAdd }) => {
    const [categoryData, setCategoryData] = useState({
        category_name: ''
    });

    const handleChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/categories', categoryData);
            onAdd(response.data);
            setCategoryData({ category_name: '' });
        } catch (error) {
            console.error('There was an error creating the category!', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Category Name"
                name="category_name"
                value={categoryData.category_name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Category
            </Button>
        </Box>
    );
};

export default CategoryForm;
