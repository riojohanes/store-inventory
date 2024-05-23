import React from 'react';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';

const StockManagementPage = () => {
    return (
        <div>
            <h1>Stock Management</h1>
            <StockForm />
            <StockList />
        </div>
    );
};

export default StockManagementPage;

