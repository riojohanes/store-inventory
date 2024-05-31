import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, IconButton, CircularProgress, Snackbar, Alert} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderForm = ({ onAdd }) => {
    const [orderData, setOrderData] = useState({
        supplier_id: '',
        order_date: '',
        status: 'Pending',
        order_items: []
    });
    const[suppliers, setSuppliers] = useState([]);
    const[items, setItems] = useState([]);
    const[itemData, setItemData] = useState({
        item_id: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSuppliersAndItems = async () => {
            try {
                const[suppliersResponse, itemsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/suppliers'),
                    axios.get('http://localhost:8080/items')
                ]);
                setSuppliers(suppliersResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                setError('There was an error fetching suppliers and items.')
                console.error('There was an error fetching suppliers and items.', error);
            }
        };

        fetchSuppliersAndItems();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: name === 'supplier_id' ? Number(value) : value,
        }));
    };

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setItemData((prevData) => ({
            ...prevData,
            [name]: name === 'item_id' ? Number(value) : value,
        }));
    };

    const addOrderItem = () => {
        if (itemData.item_id && itemData.quantity) {
            setOrderData((prevData) => ({
                ...prevData,
                order_items: [...prevData.order_items, itemData]
            }));
            setItemData({ item_id: '', quantity: '' });
        } else {
            setError('Please select an item and enter a quantity.');
        }
    };

    const removeOrderItem = (index) => {
        setOrderData((prevData) => ({
            ...prevData,
            order_items: prevData.order_items.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const OrderToSubmit = {
            ...orderData,
            supplier_name: suppliers.find((supplier) => supplier.ID === orderData.supplier_id)?.name || ''
        };

        try {
            const response = await axios.post('http://localhost:8080/orders', OrderToSubmit);
            onAdd(response.data);
            setOrderData({ supplier_id: '', supplier_name: '', order_date: '', status: 'Pending', order_items: []});
            setSuccess('Order added successfully');
        } catch (error) {
            setError('There was an error creating the order!');
            console.error('There was an error creating the order!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl fullWidth margin="normal">
                <InputLabel>Supplier</InputLabel>
                <Select
                    name="supplier_id"
                    value={orderData.supplier_id}
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
            <TextField
                label="Order Date"
                name="order_date"
                value={orderData.order_date}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    name="Status"
                    value={orderData.status}
                    onChange={handleChange}
                    disabled
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Item</InputLabel>
                    <Select
                        name="item_id"
                        value={itemData.item_id}
                        onChange={handleNewItemChange}
                        // required
                    >
                        {items.map((item) => (
                            <MenuItem key={item.ID} value={item.ID}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Quantity"
                    name="quantity"
                    value={itemData.quantity}
                    onChange={handleNewItemChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <IconButton onClick={addOrderItem} color="primary">
                    <AddIcon />
                </IconButton>
            </Box>
            {orderData.order_items.map((orderItem, index) => (
                <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                    <span>Item ID: {orderItem.item_id}, Quantity: {orderItem.quantity}</span>
                    <IconButton onClick={() => removeOrderItem(index)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Add Order'}
            </Button>
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')}>
                <Alert onClose={() => setSuccess('')} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OrderForm;
