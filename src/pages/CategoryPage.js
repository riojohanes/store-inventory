import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';
import axios from 'axios';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        };

        fetchCategories();
    }, []);

    const handleAddCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <CategoryForm onAdd={handleAddCategory} />
            <CategoryList categories={categories} />
        </Container>
    );
};

export default CategoryPage;
