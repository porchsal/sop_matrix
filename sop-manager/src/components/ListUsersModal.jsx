import { useState, useEffect } from "react";
import { Modal, Table, TableHead, TableBody, TableRow, TableCell, TextField, Box, Typography, Button, CircularProgress, TablePagination } from '@mui/material';
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

// eslint-disable-next-line react/prop-types
const ListUsersModal = ({ open, handleClose}) => {
    
const [data, setData] = useState([]); // Almacena los datos de la lista actual
const [newPasswords, setNewPasswords] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [selectedUser, setSelectedUser] = useState(null);
const [updateModalOpen, setUpdateModalOpen] = useState(false);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3010/api/users`);
            setData(response.data); // Actualiza los datos de la lista
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };
  
  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
    setUpdateModalOpen(false);
  };

const handleChangePassword = async (userId) => {
    setError("");
    const newPassword = newPasswords[userId];
    if (!newPassword) {
        setError("New password is required");
        return;
    }
    setLoading(true);
    setError("");
    try {
        const response = await axios.post('http://localhost:3010/api/change-password', { userId, newPassword });
        if (response.data.success   ) {
            setNewPasswords("");
            handleCloseUpdateModal();
            alert("Password updated successfully");
        } else {
            setError(response.data.message || "Error updating password.");
            
        }
    } catch (error) {
        if (error.response) {
            setError(error.response.data.message || "Error updating password.");
        } else if (error.request) {
            setError("Network error. Please try again.");
        } else {
            setError("An error occurred. Please try again.");
        }
    } finally {
        setLoading(false);
    }
}

const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }  
const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 5));
      setPage(0);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(
            `http://localhost:3010/api/users/${selectedUser.id}`,
            selectedUser
          );
          if (response.data.success) {
            alert("User updated successfully");
            handleCloseUpdateModal();
            // Optionally refresh user list here
          } else {
            alert(response.data.message || "Update failed");
          }
        } catch (error) {
          console.error("Error updating user:", error);
          alert("An error occurred while updating the user");
        }
      };


const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

return (
    <>
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
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpenUpdateModal(user)}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Update Info'}
                                    </Button>
                                    {error && <Typography variant="body1" color="error">{error}</Typography>}
                                </TableCell>
                            </TableRow>
                        ))}
                    
                    </TableBody>
                    
                </Table>
                
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Button onClick={handleClose} color="secondary" variant="contained">Close</Button>
            </Box>
        </Box>
    </Modal>
    <Modal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        aria-labelledby="update-user-modal"
        >
        <Box sx={style}>
            <Typography variant="h6">Update User Info</Typography>
            {selectedUser && (
            <Box component="form" onSubmit={(e) => handleUpdateUser(e)}>
                <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={selectedUser.username}
                //   onChange={(e) =>
                //     setSelectedUser({ ...selectedUser, username: e.target.value })
                //   }
                />
                <TextField
                label="First Name"
                fullWidth
                margin="normal"
                value={selectedUser.first_name}
                //   onChange={(e) =>
                //     setSelectedUser({ ...selectedUser, first_name: e.target.value })
                //   }
                />
                <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={selectedUser.last_name}
                //   onChange={(e) =>
                //     setSelectedUser({ ...selectedUser, last_name: e.target.value })
                //   }
                />
                <TextField
                label="Role"
                fullWidth   
                margin="normal"
                value={selectedUser.role}   
                //   onChange={(e) =>
                //     setSelectedUser({ ...selectedUser, role: e.target.value })
                //   }
                />  
                    


                <TextField
                    label="New Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    //   onChange={(e) =>
                    //     setSelectedUser({ ...selectedUser, password: e.target.value })
                    //   }
                    value={newPasswords[selectedUser.id] || ''}
                    onChange={(e) => setNewPasswords({ ...newPasswords, [selectedUser.id]: e.target.value })}
                    error={!!error}
                    helperText={error}
                    required
                    variant="outlined"
                    sx={{ mb: 3}}
                    

                />
                <Button 
                    onClick={() => handleChangePassword(selectedUser.id)}
                    variant="contained" color="primary">
                    Save Changes
                </Button>
                <Button
                onClick={handleCloseUpdateModal}
                color="secondary"
                    variant="contained"
                    sx={{ ml: 2 }}
                >Cancel 
                </Button>
            </Box>
            )}
        </Box>
    </Modal>
</>
    
);
};



export default ListUsersModal;