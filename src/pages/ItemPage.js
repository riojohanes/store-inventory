import React from 'react';
import { Container, Typography } from '@mui/material';
import ItemList from '../components/ItemList';

const ItemPage = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Items
            </Typography>
            <ItemList />
        </Container>
    );
};

export default ItemPage;
