import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import axios from 'axios';

const ItemPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get('/api/items');
            setItems(response.data);
        };

        fetchItems();
    }, []);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Items
            </Typography>
            <ItemForm onAdd={handleAddItem} />
            <ItemList items={items} />
        </Container>
    );
};

export default ItemPage;
