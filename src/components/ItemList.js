import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const ItemList = ({ items, onUpdateItem, onDeleteItem }) => {
    const [editItemId, setEditItemId] = useState(null);
    const [editItemData, setEditItemData] = useState({});
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

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

    const handleEditClick = (item) => {
        setEditItemId(item.ID);
        setEditItemData(item);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/items/${editItemId}`, editItemData);
            onUpdateItem(response.data);
            setEditItemId(null);
            setEditItemData({});
        } catch (error) {
            setError('There was an error updating the item!');
            console.error('There was an error updating the item!', error);
        }
    };

    const handleDeleteClick = (itemId) => {
        setItemToDelete(itemId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await onDeleteItem(itemToDelete);
            setDeleteConfirmOpen(false);
            setItemToDelete(null);
        } catch (error) {
            setError('There was an error deleting the item!');
            console.error('There was an error deleting the item!', error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
        setItemToDelete(null);
    };

    const handleChange = (e) => {
        setEditItemData({
            ...editItemData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item ID</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Supplier</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.ID}>
                                <TableCell>{item.ID}</TableCell>
                                <TableCell>
                                    {editItemId === item.ID ? (
                                        <TextField
                                            name="Name"
                                            value={editItemData.name}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editItemId === item.ID ? (
                                        <TextField
                                            name="Description"
                                            value={editItemData.description}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    ) : (
                                        item.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editItemId === item.ID ? (
                                        <TextField
                                            name="Quantity"
                                            value={editItemData.quantity}
                                            onChange={handleChange}
                                            fullWidth
                                            type="number"
                                        />
                                    ) : (
                                        item.quantity
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editItemId === item.ID ? (
                                        <Select
                                        name="category_id"
                                        value={editItemData.category_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.ID} value={category.ID}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    ) : (
                                        item.category.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editItemId === item.ID ? (
                                        <TextField
                                            name="Price"
                                            value={editItemData.price}
                                            onChange={handleChange}
                                            fullWidth
                                            type="number"
                                        />
                                    ) : (
                                        item.price
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editItemId === item.ID ? (
                                        <Select
                                        name="Supplier"
                                        value={editItemData.supplier_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        {suppliers.map((supplier) => (
                                            <MenuItem key={supplier.ID} value={supplier.ID}>
                                                {supplier.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    ) : (
                                        item.supplier.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editItemId === item.ID ? (
                                        <IconButton onClick={handleSaveClick}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => handleEditClick(item)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteClick(item.ID)}>
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

            <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item? This action cannot be undone.
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

export default ItemList;
