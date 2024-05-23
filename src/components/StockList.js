import React from 'react';

const StockList = ({ stocks = [] }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock) => (
                    <tr key={stock._id}>
                        <td>{stock.name}</td>
                        <td>{stock.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StockList;
