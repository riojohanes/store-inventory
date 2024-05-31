import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, CircularProgress, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const ItemForm = ({ onAdd }) => {
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        quantity: '',
        category_id: '',
        price: '',
        supplier_id: ''
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategoriesAndSuppliers = async () => {
            try {
                const [categoriesResponse, suppliersResponse] = await Promise.all([
                    axios.get('http://localhost:8080/categories'),
                    axios.get('http://localhost:8080/suppliers')
                ]);
                setCategories(categoriesResponse.data);
                setSuppliers(suppliersResponse.data);
            } catch (error) {
                setError('There was an error fetching categories and suppliers');
                console.error('There was an error fetching categories and suppliers!', error);
            }
        };

        fetchCategoriesAndSuppliers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData((prevData) => ({
            ...prevData,
            [name]: (name === 'quantity' || name === 'price') ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        console.log('Submitting data:', itemData);
        try {
            const response = await axios.post('http://localhost:8080/items', itemData);
            onAdd(response.data);
            setItemData({ name: '', description: '', quantity: '', category_id: '', price: '', supplier_id: '' });
        } catch (error) {
            setError('There was an error creating the item!');
            console.error('There was an error creating the item!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Item Name"
                name="name"
                value={itemData.name}
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
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    name="category_id"
                    value={itemData.category_id}
                    onChange={handleChange}
                    required
                >
                    {categories.map((category) => (
                        <MenuItem key={category.ID} value={category.ID}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
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
            <FormControl fullWidth margin="normal">
                <InputLabel>Supplier</InputLabel>
                <Select
                    name="supplier_id"
                    value={itemData.supplier_id}
                    onChange={handleChange}
                    required
                >
                    {suppliers.map((supplier) => (
                        <MenuItem key={supplier.ID} value={supplier.ID}>
                            {supplier.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Add Item'}
            </Button>
            {error && (
                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default ItemForm;
