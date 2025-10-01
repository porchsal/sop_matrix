import { useState } from "react";
import { Modal, TextField, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

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

// eslint-disable-next-line react/prop-types, no-unused-vars
const AddDepartmentModal = ({ open, handleClose, newDepartment }) => {
    const [nameDepartment, setNameDepartment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [, setNetworkError] = useState("");

    const handleSave = async () => {
        if (!nameDepartment) {
            setError("Name is required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const newDepartment = { dep_name: nameDepartment };
            const response = await axios.post('http://localhost:3010/api/department/add', newDepartment);
            if (response.data) {
                setNameDepartment("");
                handleClose();
            } else {
                setNetworkError("Error adding department", error);
            }
        } catch (error) {
            console.error('Error adding department:', error);
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
                    Add Department
                </Typography>
                <TextField
                    label="Name"
                    value={nameDepartment}
                    onChange={(e) => setNameDepartment(e.target.value)}
                    error={!!error}
                    helperText={error}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 3}}
                />
                <Button 
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    Save</Button>
                <Button onClick={handleClose} color="secondary" variant="contained" sx={{ mr: 2 }}>Cancel</Button>
            </Box>
        </Modal>
    );  
}

export default AddDepartmentModal;