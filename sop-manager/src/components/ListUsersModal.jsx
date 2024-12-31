import { useState, useEffect } from "react";
import { Modal, Table, TableHead, TableBody, TableRow, TableCell, TextField, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '2',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ListUsersModal = ({ open, handleClose}) => {
const [data, setData] = useState([]); // Almacena los datos de la lista actual
const [newPasswords, setNewPasswords] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

useEffect(() => {
    const fetchData = async () => {
        try {
            console.log('Fetching data from:', 'users');
            const response = await axios.get(`http://localhost:3010/api/users`);
            setData(response.data); // Actualiza los datos de la lista
            console.log('Data fetched:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

const handleChangePassword = async (userId) => {
    const newPassword = newPasswords[userId];
    if (!newPassword) {
        setError("New password is required");
        return;
    }
    setLoading(true);
    setError("");
    try {
        const response = await axios.post('http://localhost:3010/api/change-password', { userId, newPassword });
        console.log('Change Password Response:', response.data);
        if (response.data) {
            setNewPasswords("");
            handleClose();
        } else {
            setError("Error changing password", error);
        }
    } catch (error) {
        console.error('Error changing password:', error);
    } finally {
        setLoading(false);
    }
}

const handlePasswordChange = (userId, value) => {
    setNewPasswords({ ...newPasswords, [userId]: value });
};


return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                List Users
            </Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>New Password</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>    
                                    <TextField
                                        label="New Password"
                                        value={newPasswords[user.id] || ''}
                                        onChange={(e) => handlePasswordChange(user.id, e.target.value)}
                                        error={!!error}
                                        helperText={error}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 3}}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleChangePassword(user.id)}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Change Password'}
                                    </Button>
                                    {error && <Typography variant="body1" color="error">{error}</Typography>}
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </Box>
        </Box>
    </Modal>
);
};



export default ListUsersModal;