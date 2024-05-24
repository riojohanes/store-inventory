import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const CategoryList = ({ categories, onUpdateCategory, onDeleteCategory }) => {
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');

    const handleEditClick = (category) => {
        setEditCategoryId(category.ID);
        setEditCategoryName(category.name);
    };

    const handleSaveClick = () => {
        onUpdateCategory({ ID: editCategoryId, name: editCategoryName });
        setEditCategoryId(null);
        setEditCategoryName('');
    };

    return (
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
                                        <IconButton onClick={() => onDeleteCategory(category.ID)}>
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

export default CategoryList;
