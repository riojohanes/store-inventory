import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const SupplierList = ({ suppliers, onUpdateSupplier, onDeleteSupplier }) => {
    const [editSupplierId, setEditSupplierId] = useState(null);
    const [editSupplierName, setEditSupplierName] = useState('');

    const handleEditClick = (supplier) => {
        setEditSupplierId(supplier.ID);
        setEditSupplierName(supplier.name);
    };

    const handleSaveClick = () => {
        onUpdateSupplier({ ID: editSupplierId, name: editSupplierName });
        setEditSupplierId(null);
        setEditSupplierName('');
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Supplier ID</TableCell>
                        <TableCell>Supplier Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.ID}>
                            <TableCell>{supplier.ID}</TableCell>
                            <TableCell>
                                {editSupplierId === supplier.ID ? (
                                    <TextField
                                        value={editSupplierName}
                                        onChange={(e) => setEditSupplierName(e.target.value)}
                                    />
                                ) : (
                                    supplier.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editSupplierId === supplier.ID ? (
                                    <IconButton onClick={handleSaveClick}>
                                        <SaveIcon />
                                    </IconButton>
                                ) : (
                                    <>
                                        <IconButton onClick={() => handleEditClick(supplier)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteSupplier(supplier.ID)}>
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
    );
};

export default SupplierList;
