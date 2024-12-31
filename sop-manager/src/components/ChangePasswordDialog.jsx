import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

const ChangePasswordDialog = ({ open, handleClose, username }) => {
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        if (!newPassword) {
            setError("New password is required");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3010/api/users/change-password', { username, newPassword });
            console.log('Change Password Response:', response.data);
            if (response.data) {
                setNewPassword('');
                setError('');
                handleClose();
            } else {
                setError("Failed to change password");
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setError("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change Password for {username}</DialogTitle>
            <DialogContent>
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleChangePassword} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Change Password'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;
