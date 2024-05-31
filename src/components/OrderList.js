import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert, CircularProgress, Select, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const OrderList = ({ orders, onUpdateOrder, onDeleteOrder}) => {
    const [editOrderId, setEditOrderId] = useState(null);
    const [editOrderData, setEditOrderData] = useState({});
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const [suppliersResponse] = await Promise.all([
                    axios.get('http://localhost:8080/suppliers')
                ])
                setSuppliers(suppliersResponse.data);
            } catch (error) {
                setError('There was an error fetching suppliers');
                console.error('There was an error fetching suppliers');
            }
        };

        fetchSuppliers();
    })

    const handleEditClick = (order) => {
        setEditOrderId(order.ID);
        setEditOrderData(order);
    };

    const handleSaveClick = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`http://localhost:8080/orders/${editOrderId}`, editOrderData);
            onUpdateOrder(response.data)
            setEditOrderId(null);
            setEditOrderData({});
        } catch (error) {
            setError('There was an error updating the order!');
            console.error('There was an error updating the order!', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (orderId) => {
        setOrderToDelete(orderId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        setError('');
        try {
            await onDeleteOrder(orderToDelete);
            setDeleteConfirmOpen(false);
            setOrderToDelete(null);
        } catch (error) {
            setError('There was an error deleting the order!');
            console.error('There was an error deleting the order!', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
        setOrderToDelete(null);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditOrderData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Supplier Name</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.ID}>
                                <TableCell>{order.ID}</TableCell>
                                <TableCell>
                                    {editOrderId === order.ID ? (
                                        <Select
                                        name="category_id"
                                        value={editOrderData.supplier_id}
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
                                        order.supplier.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editOrderId === order.ID ? (
                                        <input
                                            type="date"
                                            name="order_date"
                                            value={editOrderData.order_date}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        order.order_date
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editOrderId === order.ID ? (
                                        <input
                                            type="text"
                                            name="status"
                                            value={editOrderData.status}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        order.status
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editOrderId === order.ID ? (
                                        <IconButton onClick={handleSaveClick} disabled={loading}>
                                            {loading ? <CircularProgress size={24} /> : <SaveIcon />}
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => handleEditClick(order)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteClick(order.ID)}>
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
                    <Button onClick={confirmDelete} color="primary" autoFocus disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Confirm'}
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

export default OrderList;
