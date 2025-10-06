import { useState } from "react";
import { Modal, TextField, Box, Typography, Button, CircularProgress, Select } from '@mui/material';
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
    const [profile, setProfile] = useState("");

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!username || !firstName || !lastName || !password || !profile) {
            setError("All fields are required");
            return;
        }

    setLoading(true);
    setError("");
    setNetworkError("");

    try {
        const newUser = { username, first_name: firstName, last_name: lastName, password, profile };
        const response = await axios.post(
            'http://localhost:3010/api/users/add',
             newUser,
            { headers: {
                Authorization : `Bearer ${token}`,
                'Content-Type': 'application/json'
             } 
            }    
            );

        if (response.data.success) {
            setUsername("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setProfile("");
            handleClose();
            alert("User added successfully");
        } else {
            setError(response.data.message || "Error adding user");
        }
    } catch (error) {
        console.error('Error adding user:', error);
        if (error.response) {
            // ⚠️ Error del servidor con respuesta JSON
            setError(error.response.data.message || "Server error occurred.");
        } else if (error.request) {
            // ⚠️ Error de red
            setNetworkError("Network error. Please check your connection.");
        } else {
            // ⚠️ Otro tipo de error
            setError("Unexpected error occurred.");
        }
    } finally {
        setLoading(false);
    }
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
                    Add User
                </Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}            
                />
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Select
                    native
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    <option value="1">Administrator</option>
                    <option value="2">Manager</option>
                    <option value="3">Contributor</option>
                    <option value="4">Viewer</option>

                </Select> 

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