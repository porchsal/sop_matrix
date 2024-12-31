import { useState } from "react";
import { Modal, TextField, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '2',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // eslint-disable-next-line no-unused-vars
  const AddUserModal = ({ open, handleClose, newUser }) => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [networkError, setNetworkError] = useState("");
    const handleSave = async () => {
        if (!username || !firstName || !lastName || !password) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const newUser = { username, first_name: firstName, last_name: lastName, password };
            console.log('Agregando new user:', newUser);
            const response = await axios.post('http://localhost:3010/api/users/add', newUser);
            console.log('Add User Response:', response.data);
            if (response.data) {
                setUsername("");
                setFirstName("");
                setLastName("");
                setPassword("");
                handleClose();
            } else {
                setNetworkError("Error adding user", error);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add User
                </Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                        onClick={handleClose} 
                        color="secondary" 
                        variant="contained" 
                        sx={{ mr: 2 }}>
                            Cancel
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                    
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                {networkError && <Typography color="error">{networkError}</Typography>}
            </Box>
        </Modal>
    );
}
AddUserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    newUser: PropTypes.object,
};

export default AddUserModal;