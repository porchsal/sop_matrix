/* eslint-disable no-unused-vars */
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

// eslint-disable-next-line react/prop-types
const AddTopicModal = ({ open, handleClose, newTopic }) => {
    const [nameTopic, setNameTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [networkError, setNetworkError] = useState("");
    
    const handleSave = async () => {
        if (!nameTopic) {
            setError("Name is required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const newTopic = { topic_name: nameTopic };
            const response = await axios.post('http://localhost:3010/api/topics/add', newTopic);
            if (response.data) {
                setNameTopic("");
                handleClose();
            } else {
                setNetworkError("Error adding topic", error);
            }
        } catch (error) {
            console.error('Error adding topic:', error);
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
                    Add Topic
                </Typography>
                <TextField
                    label="Name"
                    value={nameTopic}
                    onChange={(e) => setNameTopic(e.target.value)}
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

export default AddTopicModal;