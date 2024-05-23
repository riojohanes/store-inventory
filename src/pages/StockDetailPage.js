import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StockDetailPage = () => {
    const { id } = useParams();
    const [stock, setStock] = useState(null);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get(`/api/stocks/${id}`);
                setStock(response.data);
            } catch (error) {
                console.error('There was an error fetching the stock detail!', error);
            }
        };

        fetchStock();
    }, [id]);

    if (!stock) return <div>Loading...</div>;

    return (
        <div>
            <h1>{stock.name}</h1>
            <p>Quantity: {stock.quantity}</p>
        </div>
    );
};

export default StockDetailPage;
