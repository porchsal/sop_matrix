/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Modal, Select, TextField, Typography, MenuItem, CircularProgress } from "@mui/material";

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
const AddPositionModal = ({ open, handleClose, addPosition }) => {
    const [positionName, setPositionName] = useState("");
    const [departments, setDepartments] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState([null]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [networkError, setNetworkError] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:3010/api/department');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);
    
    const handleSave = async () => {
        if (!positionName || !selectedDepartmentId) {
            setError("Both Name and Department are required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const newPosition = { position_name: positionName, department_id: selectedDepartmentId };
            console.log('New Position:', newPosition);
            const response = await axios.post('http://localhost:3010/api/position/add', newPosition);
            console.log('Add Position Response:', response.data);
            if (response.data) {
                setPositionName("");
                setSelectedDepartmentId(null);
                handleClose();
            } else {
                setNetworkError("Error adding position", error);
            }
        } catch (error) {
            console.error('Error adding position:', error);
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
                    Add Position
                </Typography>
                <TextField
                    label="Name"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                />
                <Select
                    label="Department"
                    value={selectedDepartmentId}
                    onChange={(e) => setSelectedDepartmentId(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 3}}
                >
                    {departments.map((department) => (
                        <MenuItem key={department.ID} value={department.ID}>{department.Name}</MenuItem>
                    ))}
                </Select>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleClose} color="secondary" variant="contained" sx={{ mr: 2 }}>Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>Save</Button>
                </Box>
                {loading && <CircularProgress />}
                {error && <Typography color="error">{error}</Typography>}
                {networkError && <Typography color="error">{networkError}</Typography>}
            </Box>
        </Modal>
    );
}

export default AddPositionModal;