import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const CategoryForm = ({ onAddCategory }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = async () => {
        try {
            const response = await axios.post('http://localhost:8080/categories', { name: categoryName });
            onAddCategory(response.data);
            setCategoryName('');
        } catch (error) {
            console.error('There was an error adding the category!', error);
        }
    };

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <TextField
                label="Category Name"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                sx={{ mb: 2, width: '300px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
                Add Category
            </Button>
        </Box>
    );
};

export default CategoryForm;
