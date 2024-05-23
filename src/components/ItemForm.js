import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const ItemForm = ({ onAdd }) => {
    const [itemData, setItemData] = useState({
        item_name: '',
        description: '',
        quantity: '',
        category_id: '',
        price: ''
    });

    const handleChange = (e) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/items', itemData);
            onAdd(response.data);
            setItemData({ item_name: '', description: '', quantity: '', category_id: '', price: '' });
        } catch (error) {
            console.error('There was an error creating the item!', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Item Name"
                name="item_name"
                value={itemData.item_name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={itemData.description}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Quantity"
                name="quantity"
                value={itemData.quantity}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                type="number"
            />
            <TextField
                label="Category ID"
                name="category_id"
                value={itemData.category_id}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                name="price"
                value={itemData.price}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                type="number"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Item
            </Button>
        </Box>
    );
};

export default ItemForm;
