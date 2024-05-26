import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

const ItemPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:8080/items');
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else {
                    setError('Response data is not an array');
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                setError('There was an error fetching the items');
                console.error('There was an error fetching the items!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleAddItem = (newItem) => {
        if (newItem && typeof newItem === 'object') {
            setItems((prevItems) => [...prevItems, newItem]);
            setSuccess('Item added successfully');
        } else {
            setError('New item is not a valid object');
            console.error('New item is not a valid object:', newItem);
        }
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const response = await axios.put(`http://localhost:8080/items/${updatedItem.ID}`, updatedItem);
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.ID === updatedItem.ID ? response.data : item
                )
            );
            setSuccess('Item updated successfully');
        } catch (error) {
            setError('There was an error updating the item');
            console.error('There was an error updating the item!', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/items/${itemId}`);
            setItems((prevItems) =>
                prevItems.filter((item) => item.ID !== itemId)
            );
            setSuccess('Item deleted successfully');
        } catch (error) {
            setError('There was an error deleting the item');
            console.error('There was an error deleting the item!', error);
        }
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <ItemForm onAdd={handleAddItem} />
                    <ItemList
                        items={items}
                        onUpdateItem={handleUpdateItem}
                        onDeleteItem={handleDeleteItem}
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

export default ItemPage;
