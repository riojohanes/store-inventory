import React, { useState, useEffect } from 'react';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';
import axios from 'axios';

const DashboardPage = () => {
    const [stocks, setStocks] = useState([]);

    const handleAddStock = (newStock) => {
        setStocks([...stocks, newStock]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stocks');
                setStocks(response.data);
            } catch (error) {
                console.error('There was an error fetching the stocks!', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <StockForm onAdd={handleAddStock} />
            <StockList stocks={stocks} />
        </div>
    );
};

export default DashboardPage;
