import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:8080/categories');
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setError('Response data is not an array');
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                setError('There was an error fetching the categories');
                console.error('There was an error fetching the categories!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = (newCategory) => {
        if (newCategory && typeof newCategory === 'object') {
            setCategories((prevCategories) => [...prevCategories, newCategory]);
            setSuccess('Category added successfully');
        } else {
            setError('New category is not a valid object');
            console.error('New category is not a valid object:', newCategory);
        }
    };

    const handleUpdateCategory = async (updatedCategory) => {
        try {
            const response = await axios.put(`http://localhost:8080/categories/${updatedCategory.ID}`, updatedCategory);
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.ID === updatedCategory.ID ? response.data : category
                )
            );
            setSuccess('Category updated successfully');
        } catch (error) {
            setError('There was an error updating the category');
            console.error('There was an error updating the category!', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8080/categories/${categoryId}`);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category.ID !== categoryId)
            );
            setSuccess('Category deleted successfully');
        } catch (error) {
            setError('There was an error deleting the category');
            console.error('There was an error deleting the category!', error);
        }
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <CategoryForm onAddCategory={handleAddCategory} />
                    <CategoryList
                        categories={categories}
                        onUpdateCategory={handleUpdateCategory}
                        onDeleteCategory={handleDeleteCategory}
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

export default CategoryPage;
