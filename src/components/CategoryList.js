import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const CategoryList = ({ categories, onUpdateCategory, onDeleteCategory }) => {
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [error, setError] = useState('');

    const handleEditClick = (category) => {
        setEditCategoryId(category.ID);
        setEditCategoryName(category.name);
    };

    const handleSaveClick = () => {
        if (editCategoryName.trim() === '') {
            alert('Category name cannot be empty.');
            return;
        }
        onUpdateCategory({ ID: editCategoryId, name: editCategoryName });
        setEditCategoryId(null);
        setEditCategoryName('');
    };

    const handleDeleteClick = (categoryID) => {
        setCategoryToDelete(categoryID);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await onDeleteCategory(categoryToDelete);
            setDeleteConfirmOpen(false);
            setCategoryToDelete(null);
        } catch (error) {
            setError(error.response?.data?.error || 'There was an error deleting the category');
            console.error('There was an error deleting the category!', error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
        setCategoryToDelete(null);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category ID</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.ID}>
                                <TableCell>{category.ID}</TableCell>
                                <TableCell>
                                    {editCategoryId === category.ID ? (
                                        <TextField
                                            value={editCategoryName}
                                            onChange={(e) => setEditCategoryName(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editCategoryId === category.ID ? (
                                        <IconButton onClick={handleSaveClick}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => handleEditClick(category)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteClick(category.ID)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={deleteConfirmOpen}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this category? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CategoryList;
