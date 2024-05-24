import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categories');
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the categories!', error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = (newCategory) => {
        if (newCategory && typeof newCategory === 'object') {
            setCategories((prevCategories) => [...prevCategories, newCategory]);
        } else {
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
        } catch (error) {
            console.error('There was an error updating the category!', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        console.log('Attempting to delete category with ID:', categoryId);
        try {
            const response = await axios.delete(`http://localhost:8080/categories/${categoryId}`);
            console.log('Delete response:', response);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category.ID !== categoryId)
            );
        } catch (error) {
            console.error('There was an error deleting the category!', error);
        }
    };

    return (
        <Box>
            <CategoryForm onAddCategory={handleAddCategory} />
            <CategoryList
                categories={categories}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
            />
        </Box>
    );
};

export default CategoryPage;
