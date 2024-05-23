import React, { useState } from 'react';
import axios from 'axios';

const StockForm = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/stocks', { name, quantity });
            setName('');
            setQuantity('');
            alert('Stock added successfully');
        } catch (error) {
            console.error('There was an error adding the stock!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Stock Name"
                required
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                required
            />
            <button type="submit">Add Stock</button>
        </form>
    );
};

export default StockForm;